# Value Financial Group

Marketing website for Value Financial Group (brand: Value Home Loans), an Arizona mortgage brokerage led by Carlos Cordova.

A static site — no build step, no dependencies.

## Structure

```
index.html                    Homepage (hero, loan options, homebuyers, investors,
                               about, calculator, consultation form, FAQ, footer)
privacy-policy.html           Privacy Policy
terms-of-use.html             Terms of Use
licensing-information.html    NMLS licensing information
advertising-disclosures.html  Mortgage advertising disclosures
css/style.css                 Design system (navy / white / gold / gray) and layout
js/main.js                    Nav, scroll reveal, FAQ accordion, calculator, form UX
images/                       favicon.svg (all other imagery is inline SVG)
CNAME                         Custom domain for GitHub Pages (myvaluefinancial.com)
.github/workflows/deploy-pages.yml   Auto-deploys to GitHub Pages on every push to main
```

## Running locally

Any static file server works, e.g.:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Hosting

Deployed via GitHub Pages, built by `.github/workflows/deploy-pages.yml` on every push to `main`. Live at:

- https://carloscordovajr.github.io/valuefinancialgroup/ (always works)
- https://myvaluefinancial.com (once DNS is configured — see below)

### Custom domain setup

The `CNAME` file in this repo tells GitHub Pages to serve the site at `myvaluefinancial.com`. For that to actually resolve, add these DNS records at the domain's registrar:

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | carloscordovajr.github.io |

DNS changes can take anywhere from a few minutes to 24-48 hours to propagate. Once it resolves, GitHub automatically issues an HTTPS certificate for the domain — no separate action needed, though it's worth confirming "Enforce HTTPS" is checked under the repo's Settings → Pages once the certificate is ready.

## Notes for launch

- **Legal review:** Privacy Policy, Terms of Use, Licensing Information, and Mortgage Advertising Disclosures are live and linked from every page footer, written using only verified facts (real NMLS numbers, no invented license numbers or entity details). They have not been reviewed by an attorney or compliance officer — recommended before treating them as final, especially given multi-state (AZ/TX/CA) mortgage advertising rules.
- **Consultation form:** `#consultation-form` submits via AJAX to Formspree (`https://formspree.io/f/xdekgdyb`) and has been activated with a real test submission.
- **Imagery:** Hero, investment, and headshot visuals are custom inline SVG illustrations (abstract Arizona desert/architecture motifs), not photography, per the brand brief avoiding stock-photo clichés. Swap in professional photography if desired — see `.hero-art`, `.split-media`, and `.headshot` in `index.html`.
- **Calculator:** Estimates only — property tax and closing cost figures are editable placeholders, disclosed in the UI as not a loan offer or commitment.
