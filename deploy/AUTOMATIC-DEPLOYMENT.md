# Automatic production deployment

Pushes to `main` build and deploy this site to TrueNAS, through an outbound queue poll. Other branches and pull requests do not deploy. The workflow can also be run manually on `main`.

GitHub-hosted runners build the exact commit. They send the artifact through a site-specific, forced-command SSH key. The server verifies the artifact, deploys it, checks health and records the commit before GitHub reports success. Builds do not run on the memory-limited NAS. Static sites publish prebuilt files through their existing nginx servers; application containers use prebuilt Docker images.

The `production` environment contains `DEPLOY_SSH_KEY`; repository variables `DEPLOY_HOST` and `DEPLOY_KNOWN_HOSTS` identify the trusted VPS. Never commit keys. Server promotion scripts are root-owned and are not automatically overwritten by application pushes.

Deployment is serialized per repository and on the server. A stale build skips deployment if a newer main commit exists. Failed health checks restore the previous release. Inspect a failed deployment receipt and server logs before retrying; failed artifacts are retained for diagnosis. Do not prune images, snapshots or releases without checking current and rollback references.

Runtime environment variables, access restrictions, database files and mounted data stay on the server. Deployment does not authorize eBay publication, emails, data deletion or other business actions.

For a rollback after a successful release, revert the application change on `main` and push; this creates a new traceable build. For urgent outages, use the retained previous release and the existing administrative access.

The NAS checks the VPS queue every minute with a restricted outbound SSH key. Its existing `mms-sites` helper owns release validation, app updates, data snapshots and rollback. No compiler or dependency installation runs on the NAS.
