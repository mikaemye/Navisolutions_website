# Navi Solutions — Website

Static site, ready to host on GitHub Pages.

## Deploy to GitHub Pages
1. Create a new GitHub repository (e.g. `navi-site`).
2. Upload **all files in this folder** to the repo root (keep the structure — `index.html` must be at the top level).
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/ (root)**, then **Save**.
6. Wait ~1 minute. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### Custom domain (optional)
In **Settings → Pages → Custom domain**, enter your domain (e.g. `navisolutions.ai`) and follow the DNS instructions. Add a `CNAME` file to the repo if prompted.

## Files
- `index.html` — the page
- `site.css`, `site.js` — styles and behavior
- images / videos — logo, compass, founder photos, client logos, backgrounds

## Notes — features that only work on the live site
These rely on external services and will NOT work from a local file preview, only once hosted on a real domain:
- **Contact form** → submissions route through Web3Forms to your inbox.
- **"Book a discovery call" buttons** → open the Calendly popup.

After deploying, send yourself a test message and book a test call to confirm both work.

> The auto-reply email (Web3Forms autoresponder) requires a Web3Forms Pro plan and is enabled in their dashboard — the page is already set up for it.
