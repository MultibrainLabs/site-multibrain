import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Mentor {
  user_id: string;
  bio?: string;
  specialties: string[];
  hourly_rate?: number;
  availability?: string;
  experience_years?: number;
  is_active: boolean;
  profile?: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
    location?: string;
  };
}

export interface MentorFilters {
  search: string;
  expertise: string;
  priceRange: string;
  availability: string;
}

export const useMentors = () => {
  const { toast } = useToast();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<MentorFilters>({
    search: '',
    expertise: '',
    priceRange: '',
    availability: ''
  });

  const fetchMentors = async () => {
    try {
      const { data, error } = await supabase
        .from('mentor_profiles')
        .select(`
          *,
          profile:profiles(first_name, last_name, avatar_url, location)
        `)
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching mentors:', error);
        toast({
          title: "Erro ao carregar mentores",
          description: "Não foi possível carregar a lista de mentores.",
          variant: "destructive",
        });
      } else {
        const mentorsData = data || [];
        setMentors(mentorsData);
        setFilteredMentors(mentorsData);
      }
    } catch (error) {
      console.error('Error fetching mentors:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...mentors];

    // Filtro de busca
    if (filters.search) {
      filtered = filtered.filter(mentor => {
        const fullName = `${mentor.profile?.first_name || ''} ${mentor.profile?.last_name || ''}`.toLowerCase();
        const specialtiesText = mentor.specialties.join(' ').toLowerCase();
        const searchTerm = filters.search.toLowerCase();
        
        return fullName.includes(searchTerm) || 
               specialtiesText.includes(searchTerm) ||
               mentor.bio?.toLowerCase().includes(searchTerm);
      });
    }

    // Filtro de expertise
    if (filters.expertise) {
      filtered = filtered.filter(mentor => 
        mentor.specialties.some(specialty => 
          specialty.toLowerCase().includes(filters.expertise.toLowerCase())
        )
      );
    }

    // Filtro de preço
    if (filters.priceRange) {
      filtered = filtered.filter(mentor => {
        if (!mentor.hourly_rate) return false;
        
        switch (filters.priceRange) {
          case '0-100':
            return mentor.hourly_rate <= 100;
          case '100-150':
            return mentor.hourly_rate > 100 && mentor.hourly_rate <= 150;
          case '150-200':
            return mentor.hourly_rate > 150 && mentor.hourly_rate <= 200;
          case '200+':
            return mentor.hourly_rate > 200;
          default:
            return true;
        }
      });
    }

    setFilteredMentors(filtered);
  };

  const updateFilters = (newFilters: Partial<MentorFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, mentors]);

  return {
    mentors: filteredMentors,
    loading,
    filters,
    updateFilters,
    refetch: fetchMentors
  };
};