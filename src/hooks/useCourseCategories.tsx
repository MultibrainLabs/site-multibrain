import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CourseCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export const useCourseCategories = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('course_categories')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: "Erro ao carregar categorias",
          description: "Não foi possível carregar as categorias de cursos.",
          variant: "destructive",
        });
      } else {
        setCategories(data || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    refetch: fetchCategories
  };
};