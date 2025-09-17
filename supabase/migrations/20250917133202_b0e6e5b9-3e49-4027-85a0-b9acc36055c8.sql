-- Create post_likes table
CREATE TABLE public.post_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  post_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Create post_comments table
CREATE TABLE public.post_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  post_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create post_shares table
CREATE TABLE public.post_shares (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  post_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  location TEXT,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  creator_id UUID NOT NULL,
  is_public BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for post_likes
CREATE POLICY "Users can view all likes" ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "Users can like posts" ON public.post_likes FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can unlike their own likes" ON public.post_likes FOR DELETE USING (user_id = auth.uid());

-- RLS Policies for post_comments
CREATE POLICY "Users can view all comments" ON public.post_comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON public.post_comments FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own comments" ON public.post_comments FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete their own comments" ON public.post_comments FOR DELETE USING (user_id = auth.uid());
CREATE POLICY "Admins can manage all comments" ON public.post_comments FOR ALL USING (is_admin());

-- RLS Policies for post_shares
CREATE POLICY "Users can view all shares" ON public.post_shares FOR SELECT USING (true);
CREATE POLICY "Users can share posts" ON public.post_shares FOR INSERT WITH CHECK (user_id = auth.uid());

-- RLS Policies for events
CREATE POLICY "Public events are viewable by everyone" ON public.events FOR SELECT USING (is_public = true);
CREATE POLICY "Users can create events" ON public.events FOR INSERT WITH CHECK (creator_id = auth.uid());
CREATE POLICY "Users can update their own events" ON public.events FOR UPDATE USING (creator_id = auth.uid());
CREATE POLICY "Admins can manage all events" ON public.events FOR ALL USING (is_admin());

-- Add triggers for updated_at
CREATE TRIGGER update_post_comments_updated_at
  BEFORE UPDATE ON public.post_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample mentor specialties
INSERT INTO public.mentor_specialties (name, description, category) VALUES
('JavaScript', 'Desenvolvimento com JavaScript moderno', 'Desenvolvimento'),
('React', 'Desenvolvimento de interfaces com React', 'Frontend'),
('Node.js', 'Desenvolvimento backend com Node.js', 'Backend'),
('Python', 'Programação em Python', 'Desenvolvimento'),
('Data Science', 'Análise de dados e machine learning', 'Dados'),
('UI/UX Design', 'Design de interfaces e experiência do usuário', 'Design'),
('DevOps', 'Infraestrutura e deployment', 'Infraestrutura'),
('Mobile Development', 'Desenvolvimento de aplicativos móveis', 'Mobile');

-- Insert sample mentor profiles
INSERT INTO public.mentor_profiles (user_id, bio, specialties, hourly_rate, availability, experience_years, is_active) VALUES
('00000000-0000-0000-0000-000000000001', 'Desenvolvedor Full Stack com 8 anos de experiência em React e Node.js', ARRAY['JavaScript', 'React', 'Node.js'], 150.00, 'Manhãs e tardes durante a semana', 8, true),
('00000000-0000-0000-0000-000000000002', 'Especialista em Data Science e Machine Learning', ARRAY['Python', 'Data Science'], 200.00, 'Flexível', 12, true),
('00000000-0000-0000-0000-000000000003', 'UI/UX Designer com foco em produtos digitais', ARRAY['UI/UX Design'], 120.00, 'Tardes', 6, true);

-- Insert sample events
INSERT INTO public.events (title, description, start_date, end_date, location, max_participants, creator_id) VALUES
('Workshop React Avançado', 'Aprenda técnicas avançadas de React', '2025-01-20 14:00:00+00', '2025-01-20 17:00:00+00', 'Online', 50, '00000000-0000-0000-0000-000000000001'),
('Networking Tech', 'Evento de networking para profissionais de tecnologia', '2025-01-25 19:00:00+00', '2025-01-25 22:00:00+00', 'São Paulo - SP', 100, '00000000-0000-0000-0000-000000000002'),
('Masterclass UX Design', 'Design de experiências excepcionais', '2025-02-01 15:00:00+00', '2025-02-01 18:00:00+00', 'Online', 30, '00000000-0000-0000-0000-000000000003');