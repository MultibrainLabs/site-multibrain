import { useState } from "react";
import { useAuth } from "./useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export interface CourseLesson {
  id: number;
  title: string;
  duration: string;
  type: 'youtube' | 'upload';
  url: string;
  content?: string;
}

export interface CourseData {
  title: string;
  description: string;
  category_id: string;
  price: number;
  duration_hours: number;
  level: string;
  thumbnail_url?: string;
}

export const useCreateCourse = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const saveCourse = async (courseData: CourseData, lessons: CourseLesson[], isPublished: boolean = false) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para criar um curso.",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    try {
      // Buscar categorias para validação se necessário
      let categoryId = courseData.category_id;
      
      // Se category_id não é um UUID válido, buscar por nome
      if (categoryId && !categoryId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        const { data: categories, error: categoryError } = await supabase
          .from('course_categories')
          .select('id')
          .ilike('name', categoryId)
          .limit(1);
        
        if (categoryError) {
          console.error('Error fetching category:', categoryError);
          categoryId = null;
        } else if (categories && categories.length > 0) {
          categoryId = categories[0].id;
        } else {
          categoryId = null;
        }
      }

      // Criar o curso
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .insert({
          title: courseData.title,
          description: courseData.description,
          instructor_id: user.id,
          category_id: categoryId,
          price: courseData.price,
          duration_hours: courseData.duration_hours,
          level: courseData.level,
          thumbnail_url: courseData.thumbnail_url,
          is_published: isPublished
        })
        .select()
        .single();

      if (courseError) throw courseError;

      // Criar as aulas
      if (lessons.length > 0) {
        const lessonsData = lessons.map((lesson, index) => {
          // Parse duration from string like "15min" to number
          let durationMinutes = 0;
          if (lesson.duration) {
            const match = lesson.duration.match(/(\d+)/);
            if (match) {
              durationMinutes = parseInt(match[1]);
            }
          }

          return {
            course_id: course.id,
            title: lesson.title,
            content: lesson.content || '',
            video_url: lesson.url,
            duration_minutes: durationMinutes,
            order_index: index + 1,
            is_preview: index === 0 // Primeira aula como preview
          };
        });

        const { error: lessonsError } = await supabase
          .from('course_lessons')
          .insert(lessonsData);

        if (lessonsError) throw lessonsError;
      }

      toast({
        title: isPublished ? "Curso publicado!" : "Curso salvo!",
        description: isPublished 
          ? "Seu curso foi publicado e está disponível para a comunidade."
          : "Seu curso foi salvo como rascunho.",
      });

      navigate('/hub/courses');
      return true;
    } catch (error) {
      console.error('Error saving course:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o curso. Tente novamente.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveCourse,
    loading
  };
};