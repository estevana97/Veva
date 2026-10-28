# Véva — reservation platform

A social reservation platform with a loyalty program for curated experiences in the Netherlands:

- **Dining** (Amsterdam): fine dining, bistros & brasseries, wine bars & tapas
- **Sports**: challenges, marathon, triathlon, cycling, recreational (golf, padel, tennis) and Véva Exclusive Tournaments
- **Culture**: museums & art, theatre/opera/concerts, festivals & galas
- **Wellness**: spa & treatments, yoga & mindfulness, personal training

Members earn **Véva Points** for every reservation (plus a premium bonus) and for what they spend at the venue,
confirmed with a personal QR code. Verified visits can be shared with the community.

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
| Categories, groups, experiences, prices, time slots, tickets, images | `lib/data.ts` |
| Véva Points rules (per booking, premium bonus, per euro) | `lib/data.ts` (`points`) |
| Reward tiers and perks | `lib/data.ts` (`tiers`) |
| Colours, fonts, button styles | `tailwind.config.ts`, `app/globals.css` |
| Navigation links | `components/Navbar.tsx` |
| Pages | `app/**/page.tsx` |

Restaurant photos live in `public/images/restaurants/` (named after the restaurant's slug); the other
images are Unsplash URLs. To replace a photo, add a file under `public/images/` and set `image` in
`lib/data.ts` to a path like `/images/restaurants/troef.jpg`.

Restaurant pages show a "Véva circle" block with member numbers. Fill them in per restaurant with
`memberStats: { visits: 120, recommend: 96 }` in `lib/data.ts`; until then they show `[x]`.

## Pages

- `/` home: hero, categories, how it works, rewards teaser
- `/experiences`: "Our experiences" overview
- `/experiences/[category]`: experiences grouped by type, with type and city filters
- `/experiences/[category]/[slug]`: detail page with reservation form, Véva Points and QR code (challenges: sign-up form and stages)
- `/experiences/sports/[challenge]/[stage]`: challenge stage pages, e.g. each European Marathon Classics city
- `/rewards`: how to earn and use Véva Points, Bronze explorer, Silver circle, Gold elite, Diamond vanguard
- `/community`: app download, verified sharing, profiles, challenges and waitlist
- `/about` (incl. benefits for partner venues), `/contact`, `/login`

## Next steps (not included yet)

- **Database:** reservations are validated and confirmed by `app/api/reservations/route.ts`
  but not stored. Connect Vercel Postgres, Neon or Supabase there.
- **Points & QR scans:** reservation points are shown on confirmation; storing balances, crediting spend
  points when a venue scans the QR code (or a receipt is uploaded) and the social feed need a database and accounts.
- **Emails:** send confirmations with Resend or Postmark (see the TODOs in the API routes).
- **Accounts:** the login page is UI only. Add Auth.js, Clerk or Supabase Auth.
- **Payments:** add Stripe Checkout or Mollie (popular in the Netherlands) before confirming a booking.
