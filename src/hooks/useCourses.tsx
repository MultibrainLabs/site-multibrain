import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Course {
  id: string;
  title: string;
  description?: string;
  instructor_id: string;
  category_id?: string;
  thumbnail_url?: string;
  duration_hours?: number;
  level?: string;
  price?: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  instructor?: {
    first_name?: string;
    last_name?: string;
  };
  category?: {
    name: string;
    color?: string;
  };
}

export interface CourseEnrollment {
  id: string;
  user_id: string;
  course_id: string;
  progress_percentage: number;
  completed_at?: string;
  certificate_url?: string;
  enrolled_at: string;
  course: Course;
}

export const useCourses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPublishedCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          instructor:profiles!instructor_id(first_name, last_name),
          category:course_categories(name, color)
        `)
        .eq('is_published', true);

      if (error) {
        console.error('Error fetching courses:', error);
        toast({
          title: "Erro ao carregar cursos",
          description: "Não foi possível carregar a lista de cursos.",
          variant: "destructive",
        });
      } else {
        setCourses(data || []);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchUserEnrollments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('course_enrollments')
        .select(`
          *,
          course:courses(
            *,
            instructor:profiles!instructor_id(first_name, last_name),
            category:course_categories(name, color)
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching enrollments:', error);
        toast({
          title: "Erro ao carregar inscrições",
          description: "Não foi possível carregar seus cursos inscritos.",
          variant: "destructive",
        });
      } else {
        setEnrollments(data || []);
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };

  const enrollInCourse = async (courseId: string) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('course_enrollments')
        .insert({
          user_id: user.id,
          course_id: courseId,
          progress_percentage: 0
        })
        .select()
        .single();

      if (error) {
        console.error('Error enrolling in course:', error);
        toast({
          title: "Erro na inscrição",
          description: "Não foi possível se inscrever no curso.",
          variant: "destructive",
        });
        return false;
      } else {
        toast({
          title: "Inscrição realizada",
          description: "Você foi inscrito no curso com sucesso!",
        });
        await fetchUserEnrollments();
        return true;
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      return false;
    }
  };

  const updateProgress = async (enrollmentId: string, progress: number) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('course_enrollments')
        .update({ 
          progress_percentage: progress,
          completed_at: progress >= 100 ? new Date().toISOString() : null
        })
        .eq('id', enrollmentId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating progress:', error);
        return false;
      } else {
        await fetchUserEnrollments();
        return true;
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      return false;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchPublishedCourses(),
        fetchUserEnrollments()
      ]);
      setLoading(false);
    };

    loadData();
  }, [user]);

  return {
    courses,
    enrollments,
    loading,
    enrollInCourse,
    updateProgress,
    refetch: () => {
      fetchPublishedCourses();
      fetchUserEnrollments();
    }
  };
};