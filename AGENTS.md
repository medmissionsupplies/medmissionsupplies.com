# MedMission website team workflow

Repository: `medmissionsupplies/medmissionsupplies.com`. The active site is in `new-site/`, on `main`. Read `new-site/README.md` and `new-site/deploy/MANUAL-ACCESS.md` before development/deployment.

Fetch through the existing GitHub Desktop account before switching PCs. Preserve local changes and use feature branches. Run `npm test` and `npm run build` inside `new-site`. Use `npm run dev` for local testing.

Deploy manually only when requested, to the existing NAS app. Keep DNS, mail, Cloudflare, Nginx configuration and other projects unchanged unless the user explicitly asks for those changes. Repository pushes do not trigger deployment.
