-- Create user profiles table with social media fields
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  bio TEXT,
  location TEXT,
  role TEXT DEFAULT 'user',
  instagram_url TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  avatar_url TEXT,
  join_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create trigger for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create course categories table
CREATE TABLE public.course_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for course categories
ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone" 
ON public.course_categories 
FOR SELECT 
USING (true);

-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  instructor_id UUID NOT NULL REFERENCES public.profiles(id),
  category_id UUID REFERENCES public.course_categories(id),
  thumbnail_url TEXT,
  duration_hours DECIMAL,
  level TEXT CHECK (level IN ('Iniciante', 'Intermediário', 'Avançado')),
  price DECIMAL DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for courses
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published courses are viewable by everyone" 
ON public.courses 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Instructors can manage their own courses" 
ON public.courses 
FOR ALL 
USING (instructor_id = auth.uid());

-- Create course enrollments table
CREATE TABLE public.course_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  course_id UUID NOT NULL REFERENCES public.courses(id),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  completed_at TIMESTAMP WITH TIME ZONE,
  certificate_url TEXT,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS for course enrollments
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own enrollments" 
ON public.course_enrollments 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can enroll in courses" 
ON public.course_enrollments 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own enrollments" 
ON public.course_enrollments 
FOR UPDATE 
USING (user_id = auth.uid());

-- Create course lessons table
CREATE TABLE public.course_lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  order_index INTEGER DEFAULT 0,
  duration_minutes INTEGER,
  is_preview BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for course lessons
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lessons are viewable for enrolled users or previews" 
ON public.course_lessons 
FOR SELECT 
USING (
  is_preview = true OR 
  EXISTS (
    SELECT 1 FROM public.course_enrollments 
    WHERE course_id = course_lessons.course_id 
    AND user_id = auth.uid()
  )
);

-- Create community groups table
CREATE TABLE public.community_groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  creator_id UUID NOT NULL REFERENCES public.profiles(id),
  category TEXT,
  is_private BOOLEAN DEFAULT false,
  member_count INTEGER DEFAULT 0,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for community groups
ALTER TABLE public.community_groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public groups are viewable by everyone" 
ON public.community_groups 
FOR SELECT 
USING (is_private = false);

-- Create community posts table
CREATE TABLE public.community_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  group_id UUID REFERENCES public.community_groups(id),
  content TEXT NOT NULL,
  media_urls TEXT[],
  post_type TEXT DEFAULT 'text',
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for community posts
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts are viewable by everyone" 
ON public.community_posts 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create posts" 
ON public.community_posts 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own posts" 
ON public.community_posts 
FOR UPDATE 
USING (user_id = auth.uid());

-- Create mentor specialties table
CREATE TABLE public.mentor_specialties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for mentor specialties
ALTER TABLE public.mentor_specialties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Specialties are viewable by everyone" 
ON public.mentor_specialties 
FOR SELECT 
USING (true);

-- Create mentor profiles table
CREATE TABLE public.mentor_profiles (
  user_id UUID NOT NULL REFERENCES public.profiles(id) PRIMARY KEY,
  hourly_rate DECIMAL,
  bio TEXT,
  experience_years INTEGER,
  specialties TEXT[],
  availability TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for mentor profiles
ALTER TABLE public.mentor_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active mentor profiles are viewable by everyone" 
ON public.mentor_profiles 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Users can manage their own mentor profile" 
ON public.mentor_profiles 
FOR ALL 
USING (user_id = auth.uid());

-- Create mentorship sessions table
CREATE TABLE public.mentorship_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mentor_id UUID NOT NULL REFERENCES public.mentor_profiles(user_id),
  mentee_id UUID NOT NULL REFERENCES public.profiles(id),
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  meeting_url TEXT,
  notes TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for mentorship sessions
ALTER TABLE public.mentorship_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sessions" 
ON public.mentorship_sessions 
FOR SELECT 
USING (mentor_id = auth.uid() OR mentee_id = auth.uid());

CREATE POLICY "Users can create sessions as mentee" 
ON public.mentorship_sessions 
FOR INSERT 
WITH CHECK (mentee_id = auth.uid());

CREATE POLICY "Participants can update sessions" 
ON public.mentorship_sessions 
FOR UPDATE 
USING (mentor_id = auth.uid() OR mentee_id = auth.uid());

-- Create badges table
CREATE TABLE public.badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  criteria TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for badges
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active badges are viewable by everyone" 
ON public.badges 
FOR SELECT 
USING (is_active = true);

-- Create user badges table
CREATE TABLE public.user_badges (
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  badge_id UUID NOT NULL REFERENCES public.badges(id),
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, badge_id)
);

-- Enable RLS for user badges
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all user badges" 
ON public.user_badges 
FOR SELECT 
USING (true);

-- Create user stats table for performance
CREATE TABLE public.user_stats (
  user_id UUID NOT NULL REFERENCES public.profiles(id) PRIMARY KEY,
  posts_count INTEGER DEFAULT 0,
  connections_count INTEGER DEFAULT 0,
  courses_completed INTEGER DEFAULT 0,
  courses_in_progress INTEGER DEFAULT 0,
  mentees_count INTEGER DEFAULT 0,
  sessions_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for user stats
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User stats are viewable by everyone" 
ON public.user_stats 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own stats" 
ON public.user_stats 
FOR ALL 
USING (user_id = auth.uid());

-- Insert some initial data
INSERT INTO public.course_categories (name, description, color, icon, order_index) VALUES
('Tecnologia', 'Cursos de programação, IA e tecnologia', '#3B82F6', 'Code', 1),
('Negócios', 'Empreendedorismo e gestão empresarial', '#10B981', 'Briefcase', 2),
('Marketing', 'Marketing digital e estratégias de vendas', '#F59E0B', 'Megaphone', 3),
('Design', 'Design gráfico, UX/UI e criatividade', '#8B5CF6', 'Palette', 4);

INSERT INTO public.mentor_specialties (name, description, category) VALUES
('Programação Python', 'Desenvolvimento em Python para iniciantes e avançados', 'Tecnologia'),
('Marketing Digital', 'Estratégias de marketing online e redes sociais', 'Marketing'),
('UX/UI Design', 'Design de experiência do usuário e interfaces', 'Design'),
('Empreendedorismo', 'Como iniciar e gerir um negócio próprio', 'Negócios');

INSERT INTO public.badges (name, description, icon, criteria) VALUES
('Primeiro Curso', 'Completou seu primeiro curso na plataforma', '🎓', 'Complete 1 curso'),
('Mentor Ativo', 'Realizou mais de 10 sessões de mentoria', '👨‍🏫', 'Complete 10 sessões como mentor'),
('Comunidade Ativa', 'Fez mais de 50 posts na comunidade', '💬', 'Publique 50 posts'),
('Networking Master', 'Conectou-se com mais de 100 pessoas', '🤝', 'Tenha 100+ conexões');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_course_categories_updated_at
BEFORE UPDATE ON public.course_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_course_lessons_updated_at
BEFORE UPDATE ON public.course_lessons
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_community_groups_updated_at
BEFORE UPDATE ON public.community_groups
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_community_posts_updated_at
BEFORE UPDATE ON public.community_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mentor_profiles_updated_at
BEFORE UPDATE ON public.mentor_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mentorship_sessions_updated_at
BEFORE UPDATE ON public.mentorship_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at
BEFORE UPDATE ON public.user_stats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();