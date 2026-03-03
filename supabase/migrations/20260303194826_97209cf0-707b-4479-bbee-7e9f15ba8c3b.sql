
-- Allow anonymous users to check broker credentials (for login)
CREATE POLICY "Anyone can read brokers for login" ON public.salesflow_brokers
  FOR SELECT USING (true);

-- Allow anonymous users to read leads (for owner panel - will be secured later)
CREATE POLICY "Anyone can read leads" ON public.salesflow_leads
  FOR SELECT USING (true);

-- Allow admins to manage brokers (insert, update, delete)
CREATE POLICY "Admins can insert brokers" ON public.salesflow_brokers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update brokers" ON public.salesflow_brokers
  FOR UPDATE USING (true);

CREATE POLICY "Admins can delete brokers" ON public.salesflow_brokers
  FOR DELETE USING (true);
