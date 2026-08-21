-- roles
CREATE TYPE public.app_role AS ENUM ('user','admin');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  email text,
  phone text,
  eco_points integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'user',
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE POLICY "own roles read" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

-- signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email,'@',1)), NEW.email)
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user') ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- centres
CREATE TABLE public.drop_off_centres (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  pincode text NOT NULL,
  latitude double precision,
  longitude double precision,
  opening_hours text NOT NULL DEFAULT '9:00 AM - 6:00 PM',
  accepted_materials text[] NOT NULL DEFAULT '{}',
  facilities text[] NOT NULL DEFAULT '{}',
  instructions text,
  contact_phone text,
  contact_email text,
  capacity integer NOT NULL DEFAULT 100,
  current_load integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'Open',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.drop_off_centres TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.drop_off_centres TO authenticated;
GRANT ALL ON public.drop_off_centres TO service_role;
ALTER TABLE public.drop_off_centres ENABLE ROW LEVEL SECURITY;
CREATE POLICY "centres public read" ON public.drop_off_centres FOR SELECT USING (true);
CREATE POLICY "centres admin write" ON public.drop_off_centres FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- reference id
CREATE SEQUENCE public.drop_off_ref_seq START 124;
CREATE OR REPLACE FUNCTION public.generate_reference_id()
RETURNS text LANGUAGE sql VOLATILE SET search_path = public AS $$
  SELECT 'PVC-' || to_char(now(),'YYYY') || '-' || lpad(nextval('public.drop_off_ref_seq')::text, 5, '0')
$$;

CREATE TABLE public.drop_off_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id text NOT NULL UNIQUE DEFAULT public.generate_reference_id(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  centre_id uuid REFERENCES public.drop_off_centres(id) ON DELETE SET NULL,
  idol_type text,
  detected_material text NOT NULL DEFAULT 'Unknown',
  confidence integer,
  environmental_risk text,
  quantity integer NOT NULL DEFAULT 1,
  image_url text,
  status text NOT NULL DEFAULT 'Selected',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.drop_off_records TO authenticated;
GRANT ALL ON public.drop_off_records TO service_role;
ALTER TABLE public.drop_off_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "records own read" ON public.drop_off_records FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "records own insert" ON public.drop_off_records FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "records own update" ON public.drop_off_records FOR UPDATE TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin')) WITH CHECK (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "records admin delete" ON public.drop_off_records FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.recovery_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  drop_off_id uuid NOT NULL REFERENCES public.drop_off_records(id) ON DELETE CASCADE,
  material text NOT NULL,
  quantity numeric NOT NULL DEFAULT 0,
  recovery_method text,
  status text NOT NULL DEFAULT 'Pending',
  recovery_date timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.recovery_records TO authenticated;
GRANT ALL ON public.recovery_records TO service_role;
ALTER TABLE public.recovery_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "recovery read" ON public.recovery_records FOR SELECT TO authenticated USING (
  public.has_role(auth.uid(),'admin') OR EXISTS (SELECT 1 FROM public.drop_off_records d WHERE d.id = drop_off_id AND d.user_id = auth.uid())
);
CREATE POLICY "recovery admin write" ON public.recovery_records FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.eco_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  points integer NOT NULL DEFAULT 0,
  reason text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.eco_points TO authenticated;
GRANT ALL ON public.eco_points TO service_role;
ALTER TABLE public.eco_points ENABLE ROW LEVEL SECURITY;
CREATE POLICY "points own read" ON public.eco_points FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "points own insert" ON public.eco_points FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text,
  kind text NOT NULL DEFAULT 'info',
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notif own all" ON public.notifications FOR ALL TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin')) WITH CHECK (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE TABLE public.impact_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL UNIQUE,
  metric_value numeric NOT NULL DEFAULT 0,
  unit text,
  is_demo boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.impact_metrics TO anon;
GRANT SELECT, INSERT, UPDATE ON public.impact_metrics TO authenticated;
GRANT ALL ON public.impact_metrics TO service_role;
ALTER TABLE public.impact_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "impact public read" ON public.impact_metrics FOR SELECT USING (true);
CREATE POLICY "impact admin write" ON public.impact_metrics FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- award points + notification on completion
CREATE OR REPLACE FUNCTION public.on_drop_off_completed()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.status = 'Completed' AND COALESCE(OLD.status,'') <> 'Completed' THEN
    NEW.completed_at := COALESCE(NEW.completed_at, now());
    INSERT INTO public.eco_points (user_id, points, reason) VALUES (NEW.user_id, 50 * GREATEST(NEW.quantity,1), 'Responsible drop-off completed: ' || NEW.reference_id);
    UPDATE public.profiles SET eco_points = eco_points + 50 * GREATEST(NEW.quantity,1) WHERE id = NEW.user_id;
    INSERT INTO public.notifications (user_id, title, body, kind)
    VALUES (NEW.user_id, 'Drop-off completed', 'Thank you for choosing responsible disposal. Reference ' || NEW.reference_id, 'success');
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER trg_drop_off_completed BEFORE UPDATE ON public.drop_off_records FOR EACH ROW EXECUTE FUNCTION public.on_drop_off_completed();

INSERT INTO public.drop_off_centres (name, address, city, pincode, latitude, longitude, opening_hours, accepted_materials, facilities, instructions, contact_phone, contact_email, capacity, current_load, status) VALUES
('PVIRA Riverside Recovery Hub','Plot 14, Riverside Industrial Estate, Sector 21','Pune','411045',18.5911,73.7389,'8:00 AM - 8:00 PM (Mon-Sun)','{"Natural Clay","Plaster of Paris","Mixed Material"}','{"POP crushing unit","Clay reclamation tank","Water treatment"}','Please remove non-idol decorations, flowers and cloth before drop-off.','+91 20 4000 1201','riverside@pviracycle.org',400,120,'Open'),
('PVIRA Green Circle Centre','Unit 8, Green Circle Eco Park, Andheri East','Mumbai','400069',19.1197,72.8697,'9:00 AM - 7:00 PM (Mon-Sat)','{"Plastic","Metal","Mixed Material"}','{"Plastic shredder","Metal segregation bay"}','Enter from Gate 2 and follow the signage for Idol Recovery.','+91 22 4000 3320','greencircle@pviracycle.org',300,265,'Open'),
('PVIRA Lakeview Material Recovery','Survey 44, Lakeview Road, Hebbal','Bengaluru','560024',13.0358,77.5970,'8:30 AM - 6:30 PM (Mon-Sun)','{"Natural Clay","Paper/Mud","Plaster of Paris"}','{"Clay reclamation tank","Composting yard"}','Clay idols may be immersed in our on-site reclamation tank with a short ritual space provided.','+91 80 4000 7710','lakeview@pviracycle.org',250,60,'Open'),
('PVIRA Yamuna Bank Facility','Block C, Municipal Recovery Yard, Mayur Vihar','New Delhi','110091',28.6084,77.2986,'7:00 AM - 5:00 PM (Mon-Sun)','{"Plaster of Paris","Mixed Material","Other"}','{"POP crushing unit","Paint residue handling"}','Large idols above 4 feet should be brought before 3:00 PM.','+91 11 4000 5590','yamuna@pviracycle.org',500,470,'Full'),
('PVIRA Sabarmati Eco Station','Near Riverfront Gate 5, Paldi','Ahmedabad','380007',23.0120,72.5680,'9:00 AM - 6:00 PM (Tue-Sun)','{"Natural Clay","Plastic","Metal"}','{"Clay reclamation tank","Plastic shredder"}','Closed on Mondays for processing operations.','+91 79 4000 2244','sabarmati@pviracycle.org',200,80,'Open'),
('PVIRA Marina Recovery Point','Shed 3, Corporation Yard, Besant Nagar','Chennai','600090',13.0002,80.2668,'8:00 AM - 7:00 PM (Mon-Sun)','{"Natural Clay","Plaster of Paris","Paper/Mud","Mixed Material"}','{"POP crushing unit","Water treatment","Composting yard"}','Free reusable carry bags available at the reception counter.','+91 44 4000 8811','marina@pviracycle.org',350,140,'Open'),
('PVIRA Hussain Sagar Centre','Gate 4, Necklace Road Civic Yard','Hyderabad','500063',17.4239,78.4738,'9:00 AM - 6:00 PM (Mon-Sat)','{"Plaster of Paris","Metal","Other"}','{"Metal segregation bay","Paint residue handling"}','Temporarily accepting POP idols only in limited quantities.','+91 40 4000 6677','hussainsagar@pviracycle.org',180,90,'Maintenance'),
('PVIRA Ganga Ghat Recovery Unit','Ward 7, Municipal Recovery Yard, Sigra','Varanasi','221010',25.3176,82.9739,'7:30 AM - 6:00 PM (Mon-Sun)','{"Natural Clay","Paper/Mud","Mixed Material"}','{"Clay reclamation tank","Composting yard","Water treatment"}','Dedicated respectful handling area with a small prayer space.','+91 542 400 1155','gangaghat@pviracycle.org',220,45,'Open');

INSERT INTO public.impact_metrics (metric_name, metric_value, unit, is_demo) VALUES
('idols_responsibly_disposed', 12840, 'idols', true),
('material_recovered_kg', 96400, 'kg', true),
('plastic_diverted_kg', 8200, 'kg', true),
('pop_processed_kg', 61500, 'kg', true),
('waste_diverted_kg', 118000, 'kg', true),
('participating_users', 5420, 'users', true),
('active_centres', 8, 'centres', true),
('communities_served', 34, 'communities', true);