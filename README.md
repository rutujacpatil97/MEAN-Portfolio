# Portfolio frontend (Angular)

## Structure

```
src/
  styles.css                      design tokens (colours, fonts) + base styles + shared classes
  app/
    app.component.*               page shell: nav, sections, footer. Lower sections load with @defer
    core/
      api.config.ts               API base URL (set window.__PORTFOLIO_API_URL__ for production)
      profile.model.ts            TypeScript types for the data coming from the API
      profile.service.ts          loads the profile once (API first, assets/profile.json as fallback)
    layout/
      site-nav.component.*        sticky header, pill navigation, mobile menu, scroll highlighting
    sections/
      hero/                       introduction + flip-over season pass
      journey/                    train ride through experience and education
        platform-indicator.*      LED board with the details of the current stop
        local-train.*             the three-coach Mumbai local (SVG)
        journey-stop.ts           helpers: short station names, dates for the seven-segment display
      skills/                     circuit board of skill groups
      projects/                   project cards
      awards/                     night sky of awards
      contact/                    LinkedIn QR code + message form
    shared/
      seven-seg.component.*       reusable seven-segment display
```

## Colours

All colours are variables in `styles.css`. The page alternates between light sections
(`--color-paper`) and one dark colour (`--color-night`). A section that follows a section of a
different colour gets the class `fade-in-from-above` and sets `--fade-colour`, which draws a soft
fade at its top edge.

## Data

Every section reads from one `GET /api/profile` call. Journey stops may carry an optional
`short` field (the name shown on the station sign); without it a built-in list in
`journey-stop.ts` is used. The footer shows where the data came from (API or bundled copy).

## Running

```
npm install
npm install qrcode && npm install -D @types/qrcode
ng serve
```
