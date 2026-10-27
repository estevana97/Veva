# Véva — reservation platform

A website for booking curated experiences in the Netherlands: restaurants, golf & padel, sport events
(marathons, iron-distance triathlons) and culture (museums, festivals).

Built with **Next.js 14 (App Router)**, **TypeScript** and **Tailwind CSS**. Ready for **Vercel**.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy: GitHub → Vercel

1. Create an empty repository on GitHub (e.g. `veva`), with no README.
2. Push this folder:
   ```bash
   git remote add origin https://github.com/<your-username>/veva.git
   git branch -M main
   git push -u origin main
   ```
3. Go to <https://vercel.com/new>, choose **Import Git Repository** and select `veva`.
   Vercel detects Next.js automatically, so click **Deploy**.
4. Every push to `main` redeploys the site, and every pull request gets its own preview URL.
5. Optional: add your own domain under *Project → Settings → Domains*.

## Where to change things

| What | File |
| --- | --- |
| Experiences, prices, time slots, tickets, images | `lib/data.ts` |
| Reward tiers and perks | `lib/data.ts` (`tiers`) |
| Colours, fonts, button styles | `tailwind.config.ts`, `app/globals.css` |
| Navigation links | `components/Navbar.tsx` |
| Pages | `app/**/page.tsx` |

Images are Unsplash URLs. Replace them with your own photos by putting files in `public/` and using
paths like `/images/golf.jpg`.

## Pages

- `/` home: hero, categories, how it works, rewards teaser
- `/experiences`: "Our experiences" overview
- `/experiences/[category]`: list with city filter
- `/experiences/[category]/[slug]`: detail page with reservation form
- `/rewards`: Silver circle, Gold elite, Diamond vanguard
- `/community`: app download and waitlist
- `/about`, `/contact`, `/login`

## Next steps (not included yet)

- **Database:** reservations are validated and confirmed by `app/api/reservations/route.ts`
  but not stored. Connect Vercel Postgres, Neon or Supabase there.
- **Emails:** send confirmations with Resend or Postmark (see the TODOs in the API routes).
- **Accounts:** the login page is UI only. Add Auth.js, Clerk or Supabase Auth.
- **Payments:** add Stripe Checkout or Mollie (popular in the Netherlands) before confirming a booking.
