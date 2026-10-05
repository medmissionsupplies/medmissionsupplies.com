# Retained NAS manual deployment procedure

Production moved to the Meeting Stone VPS on October 5, 2026. Use [automatic production deployment](../../deploy/AUTOMATIC-DEPLOYMENT.md) for current releases. The commands below target only the retained NAS copy; they do not update the public website while DNS points to the VPS. Keep this procedure for deliberate NAS recovery.

Both Mac and Windows use GitHub Desktop for authenticated source fetch/push. The existing Windows account is `medmissionsupplies-org`. Each PC uses its own existing private SSH key through `mms-nas-deploy` (`mms-deploy@192.168.1.100`).

Read [NAS deployment](README.md) for the existing Nginx/app layout. The administrator-installed helper `/mnt/MMS/deployment-tools/mms-sites` permits only `mms` and `listingpilot`. It grants no generic sudo or Docker socket access.

## Build and stage

Fetch and review the chosen commit, then in `new-site/`:

```sh
npm ci
npm test
npm run build
```

Commit/push source changes through GitHub Desktop. Get the full 40-character commit with `git rev-parse HEAD`. Replace `COMMIT` below with that value. Mac tar and Windows built-in tar support these commands:

```sh
tar -czf COMMIT.tar.gz -C dist .
scp COMMIT.tar.gz mms-nas-deploy:incoming/mms/
ssh mms-nas-deploy 'sudo -n /mnt/MMS/deployment-tools/mms-sites mms prepare COMMIT'
ssh mms-nas-deploy 'sudo -n /mnt/MMS/deployment-tools/mms-sites mms status'
```

Preparation copies the archive into protected staging, rejects unsafe archive entries and missing core pages, and records a SHA-256 digest. It does not change the live site. The authorized operator must ensure the built `dist` corresponds to the reviewed commit; the helper does not independently reproduce or authenticate that mapping. A commit can be staged once; failed staging requires administrator inspection before retrying.

## Publish when requested

```sh
ssh mms-nas-deploy 'sudo -n /mnt/MMS/deployment-tools/mms-sites mms deploy COMMIT'
```

This creates a new protected release and atomically switches the relative `current` symlink. It checks the NAS HTTP service and restores the previous pointer on failure. It does not restart the container or alter Nginx, DNS, mail or Cloudflare settings. Verify the NAS origin directly; the public domain now serves the VPS.

To restore the recorded previous site:

```sh
ssh mms-nas-deploy 'sudo -n /mnt/MMS/deployment-tools/mms-sites mms rollback'
```

These commands describe the September 17 manual setup. Automatic production deployment is now installed and targets the VPS; see the linked current procedure.
