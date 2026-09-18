#!/usr/bin/env bash
set -euo pipefail
artifact=${1:?Pass the prepared release archive}
[[ "$GITHUB_REF" == refs/heads/main && "$GITHUB_SHA" =~ ^[0-9a-f]{40}$ ]]
latest=$(gh api "repos/$GITHUB_REPOSITORY/git/ref/heads/main" --jq .object.sha)
if [[ "$latest" != "$GITHUB_SHA" ]]; then
  echo 'A newer main commit exists; this run will not deploy.' >> "$GITHUB_STEP_SUMMARY"
  exit 0
fi
workdir=$(mktemp -d)
trap 'rm -rf "$workdir"' EXIT
umask 077
printf '%s\n' "$DEPLOY_SSH_KEY" > "$workdir/key"
printf '%s\n' "$DEPLOY_KNOWN_HOSTS" > "$workdir/known_hosts"
ssh_args=(-T -i "$workdir/key" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes -o "UserKnownHostsFile=$workdir/known_hosts" -o ConnectTimeout=20 -o ServerAliveInterval=20 -o ServerAliveCountMax=6)
destination="website-ci@$DEPLOY_HOST"
ssh "${ssh_args[@]}" "$destination" "upload $GITHUB_SHA $GITHUB_RUN_ID $GITHUB_RUN_NUMBER $GITHUB_RUN_ATTEMPT" < "$artifact"
for ((attempt=0; attempt<180; attempt++)); do
  if receipt=$(ssh "${ssh_args[@]}" "$destination" "status $GITHUB_SHA"); then
    state=$(python3 -c 'import json,sys;print(json.load(sys.stdin)["status"])' <<< "$receipt")
    case "$state" in
      success)
        printf 'Deployed `%s` successfully. Server health and revision checks passed.\n' "$GITHUB_SHA" >> "$GITHUB_STEP_SUMMARY"
        printf '%s\n' "$receipt"
        exit 0 ;;
      superseded)
        echo 'A newer workflow run superseded this release.' >> "$GITHUB_STEP_SUMMARY"
        exit 0 ;;
      failed)
        printf '%s\n' "$receipt"
        echo 'Deployment failed. See the server receipt; the previous application is retained for rollback.' >> "$GITHUB_STEP_SUMMARY"
        exit 1 ;;
    esac
  fi
  sleep 10
done
echo 'Timed out waiting for the server receipt. Inspect the existing run before starting another release.' >&2
exit 1
