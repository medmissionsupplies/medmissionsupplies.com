# Private six-site measurement

The owner requested all-source totals, article views/clicks, meaningful outcomes, QA exclusion and one dashboard on October 22, 2026. This collector adds no paid subscription or ad-platform pixel.

`server.py` listens only on 127.0.0.1:3196. The six named nginx application blocks expose exactly `GET /__metrics/v1/client.js` and write-only `POST /__metrics/v1/event`. They do not expose a report. Cookies, authorization and forwarding IP headers are removed; location access logs are off. Reports are retrieved through existing authorized SSH. Existing website access logs are not imported.

The SQLite file is `/var/lib/first-party-metrics/counts.sqlite3`, outside website releases, owned by www-data. It stores daily UTC counters by site, public path, fixed source bucket, fixed event and visitor/test quality. No individual browsing records, raw referrers/query strings, answers, scores, contact details or visitor IDs. Each delivery has a distinct random receipt hashed for deduplication for three hours. Daily aggregates expire after 90 days; cleanup is on next write. The systemd service is sandboxed and has no external network access. This is a web-serving process, not an agent monitoring automation.

Deploy tested sources to a new server staging directory and run `sudo python3 install.py`. It backs up only the six exact nginx files, validates nginx before reloading, preserves runtime data, and restores configurations on failure. Site-specific frontend changes deploy through their established workflows. Do not overwrite other server files or environments. After installation verify script/collector on each host and report-only access is unavailable publicly. Preserve the release receipt and previous symlink for rollback.

## Interpretation

- Page views are visible browser page opens and route changes. Visit starts are per-tab visits after 30 minutes inactivity, not unique people. Privacy signals, blocking, no-JS and bot filtering can undercount. Bots that mimic people can still pass.
- Article clicks count links into an article; views count arrivals. These do not provide card-impression CTR. Article engagement requires 60 visible/focused seconds and a trusted interaction.
- Source categories come from fixed UTM categories or known referrer domains, not proof of paid incrementality. No cross-domain visitor joining.
- MMS `inquiry_accepted` occurs only after the form service accepts the submission; mailbox receipt, qualification and revenue need separate confirmation.
- Assessment starts, first answer, completion, new save and existing-profile load hook into existing transitions. No answer values are read. App Store clicks are not installs or native activation.
- Doctors pathway clicks require engaged time on hospitals/apply pages before an external link. They are not applications or service delivered.
- `?traffic_test=1` on each site sets a browser-local internal-test flag. A badge appears except on MissionaryDoctors, whose banners remain clear. Test counts stay separate on every site. `?traffic_test=0` removes the flag. Known QA campaign codes and WebDriver also use the test bucket. Team members must enable this on each browser they use. Old legacy campaign counters and Bible read counts remain separate; historical totals cannot be reconstructed as humans or source-level traffic.

Run `python -m unittest test_server.py` and `node --test test-client.mjs`. The private dashboard refresh tool exports only aggregate rows and builds a local HTML dashboard. No public analytics credentials, cron jobs, extra advertising or account permissions are introduced.

## Dashboard refresh

Run `python refresh_dashboard.py --output <private-output-folder> --ledger <traffic-spend-ledger.json> --coverage <coverage.json>` from the authorized workstation. It uses the existing `meetingstone-vps` SSH alias, reads only daily aggregate tables and the separately labeled legacy counters, and writes `Website-Traffic-Dashboard.html` plus `Website-Traffic-Data.json`. Open the HTML locally; never deploy the report or its data under a public website. The ad table is a separately dated ledger snapshot, not a live billing feed. Website statistics update when the refresh command runs.
