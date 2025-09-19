-- FASE 1: Criar todas as tabelas e dados necessários

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

-- 3. RLS Policies para Interações
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_participants ENABLE ROW LEVEL SECURITY;

-- Policies para post_likes
CREATE POLICY "Users can view all likes" ON public.post_likes
FOR SELECT USING (true);

CREATE POLICY "Users can like posts" ON public.post_likes
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can unlike posts" ON public.post_likes
FOR DELETE USING (user_id = auth.uid());

-- Policies para post_comments
CREATE POLICY "Users can view all comments" ON public.post_comments
FOR SELECT USING (true);

CREATE POLICY "Users can create comments" ON public.post_comments
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own comments" ON public.post_comments
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own comments" ON public.post_comments
FOR DELETE USING (user_id = auth.uid());

-- Policies para post_shares
CREATE POLICY "Users can view all shares" ON public.post_shares
FOR SELECT USING (true);

CREATE POLICY "Users can share posts" ON public.post_shares
FOR INSERT WITH CHECK (user_id = auth.uid());

-- Policies para events
CREATE POLICY "Published events are viewable by everyone" ON public.events
FOR SELECT USING (is_published = true);

CREATE POLICY "Users can create events" ON public.events
FOR INSERT WITH CHECK (creator_id = auth.uid());

CREATE POLICY "Users can update their own events" ON public.events
FOR UPDATE USING (creator_id = auth.uid());

CREATE POLICY "Admins can manage all events" ON public.events
FOR ALL USING (is_admin());

-- Policies para event_participants
CREATE POLICY "Users can view event participants" ON public.event_participants
FOR SELECT USING (true);

CREATE POLICY "Users can register for events" ON public.event_participants
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can unregister from events" ON public.event_participants
FOR DELETE USING (user_id = auth.uid());

-- 4. Triggers para updated_at
CREATE TRIGGER update_post_comments_updated_at
BEFORE UPDATE ON public.post_comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 5. Popular especialidades de mentoria
INSERT INTO public.mentor_specialties (name, description, category) VALUES
('Desenvolvimento Frontend', 'Especialização em React, Vue, Angular e tecnologias frontend', 'Tecnologia'),
('Desenvolvimento Backend', 'APIs, bancos de dados, arquitetura de sistemas', 'Tecnologia'),
('DevOps e Cloud', 'AWS, Docker, Kubernetes, CI/CD', 'Tecnologia'),
('UX/UI Design', 'Design de interfaces, experiência do usuário', 'Design'),
('Marketing Digital', 'SEO, SEM, redes sociais, growth hacking', 'Marketing'),
('Empreendedorismo', 'Criação de startups, business model, funding', 'Negócios'),
('Gestão de Projetos', 'Agile, Scrum, metodologias de gestão', 'Gestão'),
('Data Science', 'Análise de dados, machine learning, BI', 'Tecnologia'),
('Vendas B2B', 'Estratégias de vendas corporativas', 'Vendas'),
('Recursos Humanos', 'Recrutamento, cultura organizacional', 'RH'),
('Finanças Corporativas', 'CFO, controladoria, investimentos', 'Finanças'),
('Product Management', 'Gestão de produtos digitais', 'Produto'),
('Growth Hacking', 'Estratégias de crescimento rápido', 'Marketing'),
('Liderança', 'Desenvolvimento de liderança e equipes', 'Gestão'),
('Blockchain', 'Criptomoedas, DeFi, smart contracts', 'Tecnologia');

-- 6. Inserir perfis de mentores de exemplo
-- Primeiro, vamos inserir alguns usuários de exemplo (assumindo que não existem)
INSERT INTO public.profiles (id, first_name, last_name, bio, location, role) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Carlos', 'Silva', 'Tech Lead com 10 anos de experiência em startups', 'São Paulo, SP', 'user'),
('550e8400-e29b-41d4-a716-446655440002', 'Ana', 'Costa', 'Especialista em UX Design e Product Strategy', 'Rio de Janeiro, RJ', 'user'),
('550e8400-e29b-41d4-a716-446655440003', 'Roberto', 'Santos', 'Empreendedor serial e mentor de startups', 'Belo Horizonte, MG', 'user'),
('550e8400-e29b-41d4-a716-446655440004', 'Mariana', 'Oliveira', 'Growth Specialist e Marketing Digital', 'Porto Alegre, RS', 'user'),
('550e8400-e29b-41d4-a716-446655440005', 'Felipe', 'Lima', 'DevOps Engineer e Cloud Architect', 'Florianópolis, SC', 'user')
ON CONFLICT (id) DO NOTHING;

-- Agora inserir perfis de mentores
INSERT INTO public.mentor_profiles (user_id, bio, specialties, hourly_rate, availability, experience_years, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Tech Lead experiente com foco em React, Node.js e arquitetura de sistemas. Já mentorei mais de 50 desenvolvedores e liderei equipes em 3 startups unicórnios.', 
 ARRAY['Desenvolvimento Frontend', 'Desenvolvimento Backend', 'Liderança'], 150, 'Disponível às terças e quintas, 19h-22h', 10, true),

('550e8400-e29b-41d4-a716-446655440002', 'Designer UX/UI com experiência internacional. Trabalhei no Google e Spotify, especializada em design systems e research. Apaixonada por ensinar design thinking.', 
 ARRAY['UX/UI Design', 'Product Management'], 120, 'Flexível, preferencialmente manhãs', 7, true),

('550e8400-e29b-41d4-a716-446655440003', 'Fundador de 2 startups exitosas (1 exit). Mentor oficial do Endeavor e palestrante TEDx. Foco em validação de MVP, business model e captação de recursos.', 
 ARRAY['Empreendedorismo', 'Gestão de Projetos'], 200, 'Segundas e quartas, 14h-18h', 12, true),

('550e8400-e29b-41d4-a716-446655440004', 'Growth Hacker certificada pelo Growth Tribe. Responsável pelo crescimento de 300% em 2 anos em fintech. Especialista em acquisition, activation e retention.', 
 ARRAY['Marketing Digital', 'Growth Hacking'], 100, 'Disponível aos fins de semana', 5, true),

('550e8400-e29b-41d4-a716-446655440005', 'DevOps Engineer sênior, certificado AWS Solutions Architect. Implantei infraestrutura cloud para empresas que processam milhões de transações por dia.', 
 ARRAY['DevOps e Cloud', 'Desenvolvimento Backend'], 180, 'Quintas e sextas, após 20h', 8, true);

-- 7. Criar eventos de exemplo
INSERT INTO public.events (id, title, description, start_date, end_date, creator_id, event_type, location, meeting_url, address, city, state, max_participants) VALUES
-- Eventos Online
('650e8400-e29b-41d4-a716-446655440001', 'Workshop: Introdução ao React Hooks', 
 'Aprenda os conceitos fundamentais dos React Hooks e como aplicá-los em projetos reais. Workshop prático com exercícios hands-on.',
 '2024-02-15 19:00:00+00', '2024-02-15 21:00:00+00', '550e8400-e29b-41d4-a716-446655440001',
 'online', 'Zoom', 'https://zoom.us/j/123456789', NULL, NULL, NULL, 50),

('650e8400-e29b-41d4-a716-446655440002', 'Masterclass: UX Research para Iniciantes', 
 'Descubra como conduzir pesquisas eficazes com usuários e transformar insights em decisões de design.',
 '2024-02-20 20:00:00+00', '2024-02-20 22:00:00+00', '550e8400-e29b-41d4-a716-446655440002',
 'online', 'Google Meet', 'https://meet.google.com/abc-defg-hij', NULL, NULL, NULL, 30),

-- Eventos Presenciais
('650e8400-e29b-41d4-a716-446655440003', 'Meetup: Networking de Empreendedores', 
 'Encontro presencial para networking entre empreendedores, startups e investidores. Inclui happy hour.',
 '2024-02-25 18:00:00+00', '2024-02-25 22:00:00+00', '550e8400-e29b-41d4-a716-446655440003',
 'presencial', 'Hub de Inovação Tech', NULL, 'Rua da Inovação, 123 - Vila Madalena', 'São Paulo', 'SP', 80),

('650e8400-e29b-41d4-a716-446655440004', 'Workshop: Growth Hacking na Prática', 
 'Workshop presencial intensivo sobre estratégias de growth hacking. Inclui estudos de caso reais e ferramentas práticas.',
 '2024-03-02 14:00:00+00', '2024-03-02 18:00:00+00', '550e8400-e29b-41d4-a716-446655440004',
 'presencial', 'Centro de Convenções RJ', NULL, 'Av. das Américas, 3000 - Barra da Tijuca', 'Rio de Janeiro', 'RJ', 40);

-- 8. Criar alguns grupos da comunidade
INSERT INTO public.community_groups (id, name, description, creator_id, category, is_private, member_count) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'Desenvolvedores React Brasil', 'Comunidade brasileira de desenvolvedores React para trocar experiências e dúvidas', '550e8400-e29b-41d4-a716-446655440001', 'Tecnologia', false, 156),
('750e8400-e29b-41d4-a716-446655440002', 'UX/UI Designers', 'Grupo para designers compartilharem portfolios, dicas e oportunidades', '550e8400-e29b-41d4-a716-446655440002', 'Design', false, 89),
('750e8400-e29b-41d4-a716-446655440003', 'Empreendedores Tech', 'Espaço para founders e empreendedores tech discutirem desafios e oportunidades', '550e8400-e29b-41d4-a716-446655440003', 'Empreendedorismo', false, 134);

-- 9. Criar posts de exemplo com interações
INSERT INTO public.community_posts (id, user_id, content, post_type, group_id, likes_count, comments_count) VALUES
('850e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 
 'Acabei de lançar um novo curso sobre React Server Components! 🚀 Quem quiser dar uma olhada, o link está na bio. #React #WebDev #Curso', 
 'text', '750e8400-e29b-41d4-a716-446655440001', 23, 8),

('850e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 
 'Dica rápida de UX: sempre teste suas interfaces com usuários reais antes de partir para o desenvolvimento. Pode economizar semanas de retrabalho! 💡 #UX #Design', 
 'text', '750e8400-e29b-41d4-a716-446655440002', 35, 12),

('850e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 
 'Quem aqui está trabalhando com IA generativa em suas startups? Tenho visto casos incríveis de automação de processos. Compartilhem suas experiências! 🤖 #IA #Startup', 
 'text', '750e8400-e29b-41d4-a716-446655440003', 41, 15);

-- 10. Adicionar algumas interações de exemplo
INSERT INTO public.post_likes (user_id, post_id) VALUES
('550e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440004', '850e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440003');

INSERT INTO public.post_comments (user_id, post_id, content) VALUES
('550e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440001', 'Muito legal! Vou dar uma olhada no curso.'),
('550e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440002', 'Concordo 100%! User testing é fundamental.'),
('550e8400-e29b-41d4-a716-446655440004', '850e8400-e29b-41d4-a716-446655440003', 'Estamos usando IA para automação de customer success. Os resultados são impressionantes!');

-- 11. Registrar participações em eventos
INSERT INTO public.event_participants (event_id, user_id) VALUES
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002'),
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004'),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005');