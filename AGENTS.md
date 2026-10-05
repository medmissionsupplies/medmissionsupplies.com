# MedMission website team workflow

Repository: `medmissionsupplies/medmissionsupplies.com`. The active site is in `new-site/`, on `main`. Read `new-site/README.md` and `new-site/deploy/MANUAL-ACCESS.md` before development/deployment.

Fetch through the existing GitHub Desktop account before switching PCs. Preserve local changes and use feature branches. Run `npm test` and `npm run build` inside `new-site`. Use `npm run dev` for local testing.

Production is hosted on the Meeting Stone VPS as of October 5, 2026. Pushes to `main` trigger the build-and-deploy workflow; feature branches and pull requests do not deploy. See `deploy/AUTOMATIC-DEPLOYMENT.md`. Deploy only within an authorized release task. The former NAS copy is retained for rollback and is not the production destination. Keep DNS, mail, Cloudflare, Nginx configuration and other projects unchanged unless the user explicitly asks for those changes.
