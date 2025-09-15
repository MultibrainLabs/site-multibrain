-- Primeiro, vamos garantir que a função handle_new_user existe e está correta
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, role)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data ->> 'first_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'last_name',
    'user'::user_role
  );
  RETURN new;
END;
$$;

-- Recriar o trigger se não existir
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Criar perfil para o usuário existente charleslucca@gmail.com
INSERT INTO public.profiles (id, first_name, last_name, role) 
VALUES (
  'c7e047a6-d6e2-436c-b05f-50819b506221',
  'Charles',
  'Lucca',
  'admin'::user_role
) ON CONFLICT (id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  role = EXCLUDED.role;

-- Popular algumas categorias de cursos básicas
INSERT INTO course_categories (name, description, icon, color, order_index) VALUES
  ('Tecnologia', 'Cursos de programação, desenvolvimento e tecnologia', 'Code', '#3B82F6', 1),
  ('Negócios', 'Empreendedorismo, gestão e estratégia empresarial', 'Briefcase', '#10B981', 2),
  ('Design', 'Design gráfico, UX/UI e criatividade', 'Palette', '#F59E0B', 3),
  ('Marketing', 'Marketing digital, vendas e comunicação', 'Megaphone', '#EF4444', 4),
  ('Desenvolvimento Pessoal', 'Soft skills, liderança e crescimento pessoal', 'User', '#8B5CF6', 5)
ON CONFLICT (name) DO NOTHING;

-- Popular especialidades de mentoria
INSERT INTO mentor_specialties (name, description, category) VALUES
  ('Desenvolvimento Web', 'Desenvolvimento frontend e backend', 'Tecnologia'),
  ('Mobile Development', 'Desenvolvimento de aplicativos móveis', 'Tecnologia'),
  ('Data Science', 'Análise de dados e machine learning', 'Tecnologia'),
  ('Gestão de Projetos', 'Metodologias ágeis e liderança de equipes', 'Negócios'),
  ('UX/UI Design', 'Design de experiência e interface do usuário', 'Design'),
  ('Marketing Digital', 'Estratégias de marketing online', 'Marketing'),
  ('Empreendedorismo', 'Criação e gestão de startups', 'Negócios'),
  ('Liderança', 'Desenvolvimento de habilidades de liderança', 'Desenvolvimento Pessoal')
ON CONFLICT (name) DO NOTHING;

-- Criar badges básicas
INSERT INTO badges (name, description, icon, criteria) VALUES
  ('Primeiro Curso', 'Completou seu primeiro curso na plataforma', 'Trophy', 'complete_first_course'),
  ('Mentor Dedicado', 'Realizou mais de 10 sessões de mentoria', 'Users', 'complete_10_sessions'),
  ('Estudante Ativo', 'Logou na plataforma por 30 dias consecutivos', 'Calendar', 'login_30_days'),
  ('Colaborador', 'Fez sua primeira postagem na comunidade', 'MessageCircle', 'first_community_post'),
  ('Expert', 'Concluiu 5 cursos em uma categoria', 'Award', 'complete_5_courses_category')
ON CONFLICT (name) DO NOTHING;