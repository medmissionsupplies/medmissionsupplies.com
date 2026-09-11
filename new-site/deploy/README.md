# NAS deployment

The site is a static build served at the domain root. Build with `npm run build`, then copy only `dist/` contents into a new release directory under the site's NAS folder. The `current` symlink selects the active release. Keep previous releases for rollback.

The NGINX configuration serves all `.html` pages and their directory-index aliases, preserves query strings, and returns the branded missing page with HTTP 404. It does not fall back to the homepage for unknown URLs. The image runs without root privileges, with the site mounted read-only.

The TrueNAS app is named `medmissionsupplies-web`. Its configuration is managed through the supported TrueNAS application API. It uses `nginxinc/nginx-unprivileged:stable-alpine` pinned to digest `sha256:442753882674b49ae2c1de83ed67896131c0777f56df5005e356e62bc3f7e7ce`, serves HTTP on container port 8080, and publishes NAS port 3030. `/tmp` is writable temporary storage; the container filesystem and mounted site are read-only. Retain the image's main NGINX configuration and mount the supplied server configuration at `/etc/nginx/conf.d/default.conf`.

For a new release, build and validate locally, upload to a new release folder, check its files, and atomically switch `current` to the new relative target. Because the parent site folder is mounted, changing that symlink updates the served content without recreating the app. To roll back the NAS site, switch `current` to the previous release. If changing the server configuration, validate it with `nginx -t` and reload the app's NGINX process.

Cloudflare's existing NAS tunnel connects the domain to the web app. No router port forwarding is required. Email and unrelated subdomain DNS records must remain unchanged.

## Intermittent Cloudflare error investigation — September 11, 2026

Error 1034 was reproduced when the local network resolved `www.medmissionsupplies.com` through the former Wix CNAME to `162.159.143.12`. The same hostname returned the correct site with HTTP 200 through both current Cloudflare IPv4 addresses and both IPv6 addresses. The base domain passed the same checks.

Both authoritative nameservers (`amit.ns.cloudflare.com` and `sureena.ns.cloudflare.com`) and Cloudflare, Google, and Quad9 public resolvers returned the current records. The local router's IPv4 and IPv6 DNS endpoints still returned the former Wix addresses. Registry data showed a domain update on September 10 at 18:35 UTC; the parent nameserver delegation TTL was 48 hours. These observations are consistent with old DNS caches remaining after the nameserver migration. An authoritative DNS edit or website cache purge cannot expire a record already cached by another resolver.

The Cloudflare dashboard showed one healthy NAS connector with four edge connections and the expected routes. Since the site was first deployed, the NAS web container had no restarts, no out-of-memory events, no NGINX errors, and no HTTP 5xx responses; the relevant tunnel had no warning or error entries during that period. The NGINX configuration passed validation. No conflicting website DNS records or DNSSEC delegation mismatch was found.

For an affected device, resolving through `1.1.1.1`/`1.0.0.1` can avoid the stale resolver while its cache expires. DNS changes to devices or routers should be deliberate; the investigation did not change them. If errors persist after propagation, record the exact Cloudflare code, time, hostname, network, and resolved address before changing the tunnel. Cloudflare documents [error 1034](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1034/) and [DNS TTL behavior](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/).

## Previous website DNS (before NAS cutover)

These records were DNS-only with automatic TTL:

| Name | Type | Content |
| --- | --- | --- |
| `medmissionsupplies.com` | A | `185.230.63.171` |
| `medmissionsupplies.com` | A | `185.230.63.107` |
| `medmissionsupplies.com` | A | `185.230.63.186` |
| `www.medmissionsupplies.com` | CNAME | `cdn3.wixdns.net` |

To restore the previous Wix website, restore these four records and remove the replacement website CNAMEs. Preserve all MX, TXT, and unrelated subdomain records.
