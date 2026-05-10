# rant 🌙

> some thoughts are easier to type than say out loud.

a calm little corner of the internet. talk to oli, track your mood, breathe for a second. that's it.

&nbsp;

## what it does

- **oli** — an ai companion that just... listens. no judgment, no agenda.
- **mood tracking** — log how you're feeling, day by day
- **breathing exercises** — for when things get loud
- **chat history** — so you can look back if you want to

&nbsp;

## stack

```
Next.js  ·  React  ·  Tailwind CSS
MongoDB  ·  Clerk  ·  Groq API  ·  Vercel
```

&nbsp;

## run it locally

```bash
git clone https://github.com/yourusername/rant.git
npm install
```

add a `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
MONGODB_URI=
GROQ_API_KEY=
```

```bash
npm run dev
```

&nbsp;

## why

most mental health apps feel clinical. or corporate. or both.

this one's meant to feel like opening your notes app at 2am — familiar, quiet, no pressure.

oli isn't a therapist. just something that listens. which is honestly enough sometimes.

&nbsp;

## live

→ [rant-taupe.vercel.app](https://rant-taupe.vercel.app)

&nbsp;

---

*still improving. still overthinking the ui at 3am. but deployed.*