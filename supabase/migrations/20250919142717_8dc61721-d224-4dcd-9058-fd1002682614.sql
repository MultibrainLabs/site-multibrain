-- FASE 1: Criar tabelas essenciais sem dados de perfis específicos

-- 1. Tabelas de Interações da Comunidade
CREATE TABLE public.post_likes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  post_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, post_id)
);

CREATE TABLE public.post_comments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  post_id uuid NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.post_shares (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  post_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- 2. Sistema de Eventos
CREATE TYPE public.event_type AS ENUM ('online', 'presencial');

CREATE TABLE public.events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  start_date timestamp with time zone NOT NULL,
  end_date timestamp with time zone NOT NULL,
  creator_id uuid NOT NULL,
  event_type public.event_type NOT NULL,
  location text,
  meeting_url text,
  address text,
  city text,
  state text,
  country text DEFAULT 'Brasil',
  max_participants integer,
  is_published boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CHECK (
    (event_type = 'online' AND meeting_url IS NOT NULL) OR
    (event_type = 'presencial' AND address IS NOT NULL)
  )
);

CREATE TABLE public.event_participants (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id uuid NOT NULL,
  user_id uuid NOT NULL,
  registered_at timestamp with time zone NOT NULL DEFAULT now(),
  attended boolean DEFAULT false,
  UNIQUE(event_id, user_id)
);

-- 3. RLS Policies
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_participants ENABLE ROW LEVEL SECURITY;

-- Policies para post_likes
CREATE POLICY "Users can view all likes" ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "Users can like posts" ON public.post_likes FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can unlike posts" ON public.post_likes FOR DELETE USING (user_id = auth.uid());

-- Policies para post_comments
CREATE POLICY "Users can view all comments" ON public.post_comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON public.post_comments FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own comments" ON public.post_comments FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete their own comments" ON public.post_comments FOR DELETE USING (user_id = auth.uid());

-- Policies para post_shares
CREATE POLICY "Users can view all shares" ON public.post_shares FOR SELECT USING (true);
CREATE POLICY "Users can share posts" ON public.post_shares FOR INSERT WITH CHECK (user_id = auth.uid());

-- Policies para events
CREATE POLICY "Published events are viewable by everyone" ON public.events FOR SELECT USING (is_published = true);
CREATE POLICY "Users can create events" ON public.events FOR INSERT WITH CHECK (creator_id = auth.uid());
CREATE POLICY "Users can update their own events" ON public.events FOR UPDATE USING (creator_id = auth.uid());
CREATE POLICY "Admins can manage all events" ON public.events FOR ALL USING (is_admin());

-- Policies para event_participants
CREATE POLICY "Users can view event participants" ON public.event_participants FOR SELECT USING (true);
CREATE POLICY "Users can register for events" ON public.event_participants FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can unregister from events" ON public.event_participants FOR DELETE USING (user_id = auth.uid());

-- 4. Triggers
CREATE TRIGGER update_post_comments_updated_at BEFORE UPDATE ON public.post_comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5. Popular especialidades de mentoria
INSERT INTO public.mentor_specialties (name, description, category) VALUES
('Desenvolvimento Frontend', 'React, Vue, Angular e tecnologias frontend', 'Tecnologia'),
('Desenvolvimento Backend', 'APIs, bancos de dados, arquitetura de sistemas', 'Tecnologia'),
('DevOps e Cloud', 'AWS, Docker, Kubernetes, CI/CD', 'Tecnologia'),
('UX/UI Design', 'Design de interfaces, experiência do usuário', 'Design'),
('Marketing Digital', 'SEO, SEM, redes sociais, growth hacking', 'Marketing'),
('Empreendedorismo', 'Criação de startups, business model, funding', 'Negócios'),
('Gestão de Projetos', 'Agile, Scrum, metodologias de gestão', 'Gestão'),
('Data Science', 'Análise de dados, machine learning, BI', 'Tecnologia'),
('Vendas B2B', 'Estratégias de vendas corporativas', 'Vendas'),
('Product Management', 'Gestão de produtos digitais', 'Produto'),
('Growth Hacking', 'Estratégias de crescimento rápido', 'Marketing'),
('Liderança', 'Desenvolvimento de liderança e equipes', 'Gestão'),
('Blockchain', 'Criptomoedas, DeFi, smart contracts', 'Tecnologia');