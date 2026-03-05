# Theem

Make beautiful themes easier

## From Themes to Styles

Theem is evolving from color-token theme switching into a full **Style Picker** system where each style can change layout, spacing rhythm, typography scale, radius/shadow models, motion behavior, and component composition patterns.

This transition is planned to be compatibility-first: existing theme behavior stays intact while the new style engine is introduced in phases.

- Plan: `docs/style-picker-overhaul-plan.md`
- Execution checklist: `docs/style-picker-checklist.md`

## Style System (v1)

The picker now includes a layered style engine with three shipped profiles:

- `minimal-swiss`
- `glassmorphism`
- `neubrutalism`

The style engine resolves five layers at runtime:

1. Token layer: color/radius/border/opacity/blur/elevation tokens.
2. Composition layer: density/spacing/panel rhythm.
3. Component layer: style-aware recipes for Button/Card/Input/Sidebar/Dialog/Tabs.
4. Motion layer: duration/easing/choreography with reduced-motion fallback.
5. Surface FX layer: panel treatments (plain/glass/brutal).

### Runtime behavior

- Selected style profile is persisted in local storage key `theem.style.profile`.
- Style variables are applied on `document.documentElement` using `applyStyleProfileToDOM`.
- Existing theme color behavior remains compatible: style profiles layer on top of current theme token application.

### Extend with a new style profile

1. Add a profile to `lib/style-system/packs.ts`.
2. Define `light`/`dark` layers for `token`, `composition`, `component`, `motion`, and `surfaceFx`.
3. Add any new token namespaces/shape updates to `lib/style-system/types.ts`.
4. If new component slots are introduced, update recipe resolution in `lib/style-system/component-recipes.ts`.
5. Verify output with `pnpm test` and `pnpm build`.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Postgres](https://www.postgresql.org/)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Payments**: [Stripe](https://stripe.com/)
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/)

## Getting Started

```bash
git clone https://github.com/nextjs/saas-starter
cd saas-starter
pnpm install
```

## Running Locally

Use the included setup script to create your `.env` file:

```bash
pnpm db:setup
```

Then, run the database migrations and seed the database with a default user and team:

```bash
pnpm db:migrate
pnpm db:seed
```

This will create the following user and team:

- User: `test@test.com`
- Password: `admin123`

You can, of course, create new users as well through `/sign-up`.

Finally, run the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

Optionally, you can listen for Stripe webhooks locally through their CLI to handle subscription change events:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Testing Payments

To test Stripe payments, use the following test card details:

- Card Number: `4242 4242 4242 4242`
- Expiration: Any future date
- CVC: Any 3-digit number

## Going to Production

When you're ready to deploy your SaaS application to production, follow these steps:

### Set up a production Stripe webhook

1. Go to the Stripe Dashboard and create a new webhook for your production environment.
2. Set the endpoint URL to your production API route (e.g., `https://yourdomain.com/api/stripe/webhook`).
3. Select the events you want to listen for (e.g., `checkout.session.completed`, `customer.subscription.updated`).

### Deploy to Vercel

1. Push your code to a GitHub repository.
2. Connect your repository to [Vercel](https://vercel.com/) and deploy it.
3. Follow the Vercel deployment process, which will guide you through setting up your project.

### Add environment variables

In your Vercel project settings (or during deployment), add all the necessary environment variables. Make sure to update the values for the production environment, including:

1. `BASE_URL`: Set this to your production domain.
2. `STRIPE_SECRET_KEY`: Use your Stripe secret key for the production environment.
3. `STRIPE_WEBHOOK_SECRET`: Use the webhook secret from the production webhook you created in step 1.
4. `POSTGRES_URL`: Set this to your production database URL.
5. `AUTH_SECRET`: Set this to a random string. `openssl rand -base64 32` will generate one.

## Other Templates

While this template is intentionally minimal and to be used as a learning resource, there are other paid versions in the community which are more full-featured:

- https://achromatic.dev
- https://shipfa.st
- https://makerkit.dev
