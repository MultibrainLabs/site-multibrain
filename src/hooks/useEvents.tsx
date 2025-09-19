import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export interface Event {
  id: string;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  creator_id: string;
  event_type: 'online' | 'presencial';
  location?: string;
  meeting_url?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  max_participants?: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  creator?: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
  participants_count: number;
  is_registered: boolean;
}

export interface EventFilters {
  type: 'all' | 'online' | 'presencial';
  timeframe: 'all' | 'today' | 'week' | 'month';
  search: string;
}

export const useEvents = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<EventFilters>({
    type: 'all',
    timeframe: 'all',
    search: ''
  });

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .gte('end_date', new Date().toISOString())
        .order('start_date', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
        toast({
          title: "Erro ao carregar eventos",
          description: "Não foi possível carregar os eventos.",
          variant: "destructive",
        });
        return;
      }

      // Get user registrations and participant counts
      let userRegistrations: string[] = [];
      const participantCounts: Record<string, number> = {};
      
      if (user) {
        const { data: registrations } = await supabase
          .from('event_participants')
          .select('event_id')
          .eq('user_id', user.id);
        
        userRegistrations = registrations?.map(r => r.event_id) || [];
      }

      // Get participant counts for all events
      const { data: participantsData } = await supabase
        .from('event_participants')
        .select('event_id')
        .in('event_id', data.map(event => event.id));

      participantsData?.forEach(p => {
        participantCounts[p.event_id] = (participantCounts[p.event_id] || 0) + 1;
      });

      const eventsWithRegistration = data.map(event => ({
        ...event,
        participants_count: participantCounts[event.id] || 0,
        is_registered: userRegistrations.includes(event.id)
      }));

      setEvents(eventsWithRegistration);
      setFilteredEvents(eventsWithRegistration);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const registerForEvent = async (eventId: string) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para se inscrever em eventos.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('event_participants')
        .insert({ event_id: eventId, user_id: user.id });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Já inscrito",
            description: "Você já está inscrito neste evento.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return false;
      }

      // Update local state
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, is_registered: true, participants_count: event.participants_count + 1 }
          : event
      ));
      setFilteredEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, is_registered: true, participants_count: event.participants_count + 1 }
          : event
      ));

      toast({
        title: "Inscrição realizada",
        description: "Você foi inscrito no evento com sucesso!",
      });

      return true;
    } catch (error) {
      console.error('Error registering for event:', error);
      toast({
        title: "Erro",
        description: "Não foi possível se inscrever no evento.",
        variant: "destructive",
      });
      return false;
    }
  };

  const unregisterFromEvent = async (eventId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('event_participants')
        .delete()
        .eq('event_id', eventId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, is_registered: false, participants_count: Math.max(0, event.participants_count - 1) }
          : event
      ));
      setFilteredEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, is_registered: false, participants_count: Math.max(0, event.participants_count - 1) }
          : event
      ));

      toast({
        title: "Inscrição cancelada",
        description: "Sua inscrição foi cancelada com sucesso.",
      });

      return true;
    } catch (error) {
      console.error('Error unregistering from event:', error);
      toast({
        title: "Erro",
        description: "Não foi possível cancelar a inscrição.",
        variant: "destructive",
      });
      return false;
    }
  };

  const applyFilters = () => {
    let filtered = [...events];

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(event => event.event_type === filters.type);
    }

    // Timeframe filter
    if (filters.timeframe !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.start_date);
        
        switch (filters.timeframe) {
          case 'today':
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            return eventDate >= today && eventDate < tomorrow;
          case 'week':
            const nextWeek = new Date(today);
            nextWeek.setDate(nextWeek.getDate() + 7);
            return eventDate >= today && eventDate < nextWeek;
          case 'month':
            const nextMonth = new Date(today);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            return eventDate >= today && eventDate < nextMonth;
          default:
            return true;
        }
      });
    }

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.description?.toLowerCase().includes(searchTerm) ||
        event.location?.toLowerCase().includes(searchTerm) ||
        event.city?.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredEvents(filtered);
  };

  const updateFilters = (newFilters: Partial<EventFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  useEffect(() => {
    fetchEvents();
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [filters, events]);

  return {
    events: filteredEvents,
    loading,
    filters,
    updateFilters,
    registerForEvent,
    unregisterFromEvent,
    refetch: fetchEvents
  };
};