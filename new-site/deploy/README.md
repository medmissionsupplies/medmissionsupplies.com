# NAS deployment

The site is a static build served at the domain root. Build with `npm run build`, then copy only `dist/` contents into a new release directory under the site's NAS folder. The `current` symlink selects the active release. Keep previous releases for rollback.

The NGINX configuration serves all `.html` pages and their directory-index aliases, preserves query strings, and returns the branded missing page with HTTP 404. It does not fall back to the homepage for unknown URLs. The image runs without root privileges, with the site mounted read-only.

The TrueNAS app is named `medmissionsupplies-web`. Its configuration is managed through the supported TrueNAS application API. It uses `nginxinc/nginx-unprivileged:stable-alpine` pinned to digest `sha256:442753882674b49ae2c1de83ed67896131c0777f56df5005e356e62bc3f7e7ce`, serves HTTP on container port 8080, and publishes NAS port 3030. `/tmp` is writable temporary storage; the container filesystem and mounted site are read-only. Retain the image's main NGINX configuration and mount the supplied server configuration at `/etc/nginx/conf.d/default.conf`.

For a new release, build and validate locally, upload to a new release folder, check its files, and atomically switch `current` to the new relative target. Because the parent site folder is mounted, changing that symlink updates the served content without recreating the app. To roll back the NAS site, switch `current` to the previous release. If changing the server configuration, validate it with `nginx -t` and reload the app's NGINX process.

Cloudflare's existing NAS tunnel connects the domain to the web app. No router port forwarding is required. Email and unrelated subdomain DNS records must remain unchanged.

## Previous website DNS (before NAS cutover)

These records were DNS-only with automatic TTL:

| Name | Type | Content |
| --- | --- | --- |
| `medmissionsupplies.com` | A | `185.230.63.171` |
| `medmissionsupplies.com` | A | `185.230.63.107` |
| `medmissionsupplies.com` | A | `185.230.63.186` |
| `www.medmissionsupplies.com` | CNAME | `cdn3.wixdns.net` |

To restore the previous Wix website, restore these four records and remove the replacement website CNAMEs. Preserve all MX, TXT, and unrelated subdomain records.
