# ANTIGRAVITY — AUTONOMOUS RUNNER PROMPT

Use with: `luxury-clothing-store-master-prompt.md` (the phase file).

---

## SETUP (do once, 5 minutes)

1. Create an empty folder `maison-aure-store` → open it in Antigravity.
2. Put BOTH files inside the folder:
   - `luxury-clothing-store-master-prompt.md`
   - `antigravity-autonomous-runner.md` (this file)
3. Run `git init` in the folder (so any bad change can be rolled back).
4. Before starting, have these ready (the agent will ask for them ONCE, at the beginning):
   - Supabase: Project URL, anon key, service-role key (create a free project at supabase.com)
   - Razorpay: TEST mode Key ID + Key Secret + webhook secret (test mode only, never live)
   - Resend API key (optional — skip if you don't have it)
5. Antigravity settings: allow terminal commands to run automatically and let the agent use
   the browser for testing. Keep the project in its own folder; do not open your whole
   Documents/Desktop as the workspace.
6. Paste the prompt below into the agent chat.

---

## THE PROMPT

```
You are an autonomous senior full-stack engineer. In this folder there is a file
`luxury-clothing-store-master-prompt.md`. It contains PART A (master rules) and PART B
(Phase 0 to Phase 12). Your job: build the whole project yourself, phase by phase, and
VERIFY each phase yourself before moving on. I will not paste phases manually.

SETTINGS
START_PHASE = 0
STOP_AFTER_PHASE = 5

OVERRIDE RULE
Inside the phase file, ignore these lines because they are for manual mode:
"Build ONLY the phase I paste", "Reply 'done' to continue", "Confirm you understood by
replying...". Everything else in PART A (stack, design system, white-label rule, engineering
rules) is binding. If PART A and this prompt conflict, this prompt wins.
```
