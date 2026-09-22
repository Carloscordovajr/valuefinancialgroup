# Value Financial Group

Marketing website for Value Financial Group (brand: Value Home Loans), an Arizona mortgage brokerage led by Carlos Cordova.

A static site — no build step, no dependencies.

## Structure

```
index.html      Full one-page site (hero, loan options, homebuyers, investors,
                 about, calculator, consultation form, FAQ, footer)
css/style.css    Design system (navy / white / gold / gray) and layout
js/main.js       Nav, scroll reveal, FAQ accordion, mortgage calculator, form UX
images/          favicon.svg (all other imagery is inline SVG in index.html)
```

## Running locally

Any static file server works, e.g.:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Notes for launch

- **Legal/licensing:** Footer now shows real NMLS numbers (Company #2133511, Carlos Cordova #1918110). Footer links for Privacy Policy, Terms of Use, Licensing Information, and Mortgage Advertising Disclosures are still placeholders (`href="#"`) — real policy pages are needed before launch.
- **Consultation form:** `#consultation-form` submits via AJAX to Formspree (`https://formspree.io/f/xdekgdyb`). Formspree's free tier requires confirming the form the first time a real submission comes through — send one real test submission from the live site to activate it.
- **Imagery:** Hero, investment, and headshot visuals are custom inline SVG illustrations (abstract Arizona desert/architecture motifs), not photography, per the brand brief avoiding stock-photo clichés. Swap in professional photography if desired — see `.hero-art`, `.split-media`, and `.headshot` in `index.html`.
- **Calculator:** Estimates only — property tax and closing cost figures are editable placeholders, disclosed in the UI as not a loan offer or commitment.
