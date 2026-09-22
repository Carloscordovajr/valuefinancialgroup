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

- **Legal/licensing:** Footer contains bracketed placeholders (`[Company NMLS # to be provided]`, `[Individual NMLS # to be provided]`) and placeholder links for Privacy Policy, Terms of Use, Licensing Information, and Mortgage Advertising Disclosures. These must be filled in with real NMLS numbers and real policy pages before launch — none were invented.
- **Consultation form:** `#consultation-form` currently shows a client-side "thank you" confirmation on submit (no backend). Wire the `submit` handler in `js/main.js` to your CRM/email provider (e.g. an API endpoint or a form service) before launch.
- **Imagery:** Hero, investment, and headshot visuals are custom inline SVG illustrations (abstract Arizona desert/architecture motifs), not photography, per the brand brief avoiding stock-photo clichés. Swap in professional photography if desired — see `.hero-art`, `.split-media`, and `.headshot` in `index.html`.
- **Calculator:** Estimates only — property tax and closing cost figures are editable placeholders, disclosed in the UI as not a loan offer or commitment.
