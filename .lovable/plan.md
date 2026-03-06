

## Problem

The "Cere Demo Gratuit" form on the `/salesflow` page (`src/pages/SalesFlow.tsx`, lines 22-33) does **not save data anywhere**. It simply runs a `setTimeout` to simulate a submission, then clears the form. All submitted data (name, company, email, phone, platform, message) is lost.

## Solution

Save demo requests to a new `demo_requests` table in the database.

### Step 1 — Create `demo_requests` table (migration)

```sql
CREATE TABLE public.demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  phone text,
  platform text,
  message text,
  status text NOT NULL DEFAULT 'pending'
);

ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a demo request (public form)
CREATE POLICY "Anyone can submit demo request"
  ON public.demo_requests FOR INSERT
  WITH CHECK (name IS NOT NULL AND email IS NOT NULL AND company IS NOT NULL);

-- Only admins can view demo requests
CREATE POLICY "Only admins can view demo requests"
  ON public.demo_requests FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));
```

### Step 2 — Update `src/pages/SalesFlow.tsx`

Replace the simulated `handleSubmit` (lines 22-33) with an actual insert into `demo_requests`:

- Import `supabase` from `@/integrations/supabase/client`
- Replace the `setTimeout` simulation with:
  ```ts
  const { error } = await supabase.from('demo_requests').insert({
    name: formData.name,
    company: formData.company,
    email: formData.email,
    phone: formData.phone || null,
    platform: formData.platform || null,
    message: formData.message || null,
  });
  ```
- Show error toast if insert fails, success toast if it succeeds
- Remove the "Datele introduse nu sunt salvate" text from the demo section (line 237-238) since data will now be saved

This is a small change — only 2 files affected (1 migration + 1 component edit).

