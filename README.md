# Miles for Ritual

A separate, Ritual-tailored copy of Miles Mattina’s original Pabst application website. The original Pabst working folder and deployment are untouched.

## Development

- `npm ci`
- `npm run dev`
- `npm run lint`
- `npm run build`

Built from the full local Pabst source snapshot, including its Why Me card deck, videos, case studies, and expandable resume viewer. The resume bottle is an original SVG/CSS illustration; the visual system uses Ritual’s navy, yellow, white, and clear-bottle packaging as reference. DM Sans is an open-source geometric substitute for Ritual’s proprietary CircularXX typeface.

Production: https://miles-for-ritual.vercel.app

Supabase project provisioning is pending the account’s free-project quota. The site’s portfolio and resume features work without a database; no visitor data is collected while that integration is unconfigured.

The resume viewer renders the original PDF as an accessible, zoomable page preview; the original PDF remains downloadable. Videos pause outside the viewport. Reduced-motion preferences are respected for animations and automatic video playback.
