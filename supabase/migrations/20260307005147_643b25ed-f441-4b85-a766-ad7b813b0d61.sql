
CREATE TABLE public.user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  classification text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  qualified_at timestamp with time zone NOT NULL DEFAULT now(),
  answers jsonb DEFAULT '{}',
  resources_viewed integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE UNIQUE INDEX user_profiles_user_id_idx ON public.user_profiles (user_id);

CREATE POLICY "Users can view their own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.user_profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
