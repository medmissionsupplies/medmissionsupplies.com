# Automatic production deployment

Pushes to `main` build and deploy this site directly to the Meeting Stone VPS (`51.81.244.151`). Other branches and pull requests do not deploy. The workflow can also be run manually on `main`.

GitHub-hosted runners build the exact commit. They send the artifact through a site-specific, forced-command SSH key. The server verifies the artifact, deploys it, checks health and records the commit before GitHub reports success. The VPS publishes the prebuilt static files through nginx; production does not require a NAS connection.

The `production` environment contains `DEPLOY_SSH_KEY`; repository variables `DEPLOY_HOST` and `DEPLOY_KNOWN_HOSTS` identify the trusted VPS. Never commit keys. Server promotion scripts are root-owned and are not automatically overwritten by application pushes.

Deployment is serialized per repository and on the server. A stale build skips deployment if a newer main commit exists. Failed health checks restore the previous release. Inspect a failed deployment receipt and server logs before retrying; failed artifacts are retained for diagnosis. Do not prune images, snapshots or releases without checking current and rollback references.

Runtime environment variables, access restrictions, database files and mounted data stay on the server. Deployment does not authorize eBay publication, emails, data deletion or other business actions.

For a rollback after a successful release, revert the application change on `main` and push; this creates a new traceable build. For urgent outages, use the retained previous release and the existing administrative access.

## Production layout and October 5, 2026 migration

The root-owned receiver at `/opt/website-ci/receiver.py` dispatches `mms` to the VPS promoter. `/opt/website-ci/config.json` sets the site root to `/var/www/medmissionsupplies.com`. Releases are stored under `releases/github-COMMIT`, and `current` selects the live release. Promotion validates the archive and commit marker, switches the symlink atomically, and checks the origin over HTTPS. Failed checks restore the previous symlink. Successful receipts are recorded in `/var/lib/website-ci/state/mms.json`.

Cloudflare has proxied A records for the apex and `www`, both pointing to `51.81.244.151`. The `listing` and `solar` subdomains continue using their existing NAS tunnels. MX and TXT records are unchanged. The VPS certificate covers both website hostnames and renews through Certbot's webroot `/var/www/letsencrypt`; the existing timer runs renewal, followed by nginx validation and reload.

The cutover copied all 145 files of the live NAS release at commit `dcb7aa146a2790e163d6a6871d486dc893e135b6`, matching GitHub `main`, without rebuilding older local source. The NAS website and tunnel routes remain available as a retained rollback copy; future MMS pushes deploy only to the VPS. ListingPilot still uses the NAS queue.

Before an emergency rollback to the NAS, verify its retained content and application health. Restore the apex and `www` to proxied CNAME records targeting `6eaba381-2d6d-4642-a6b9-9df9bb521932.cfargotunnel.com`. Restore the receiver/promoter/config backup from `/var/backups/website-migration-20261005/website-ci-before-mms` if future releases must also return to the NAS. Do not change the `listing` or `solar` records. A NAS rollback serves its retained older release, not later VPS releases.
