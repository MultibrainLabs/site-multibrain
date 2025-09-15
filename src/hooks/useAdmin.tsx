import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface AdminUser {
  id: string;
  first_name?: string;
  last_name?: string;
  role: 'admin' | 'moderator' | 'instructor' | 'user';
  created_at: string;
  updated_at: string;
}

export interface AdminStats {
  total_users: number;
  total_courses: number;
  total_posts: number;
  total_sessions: number;
}

export const useAdmin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);

  const checkAdminStatus = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.rpc('is_admin');
      
      if (error) {
        console.error('Error checking admin status:', error);
      } else {
        setIsAdmin(data || false);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    if (!isAdmin) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, role, created_at, updated_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Erro ao carregar usuários",
          description: "Não foi possível carregar a lista de usuários.",
          variant: "destructive",
        });
      } else {
        setUsers(data || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'moderator' | 'instructor' | 'user') => {
    if (!isAdmin) return false;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user role:', error);
        toast({
          title: "Erro ao atualizar role",
          description: "Não foi possível atualizar a role do usuário.",
          variant: "destructive",
        });
        return false;
      } else {
        toast({
          title: "Role atualizada",
          description: "A role do usuário foi atualizada com sucesso.",
        });
        await fetchAllUsers(); // Refresh the list
        return true;
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      return false;
    }
  };

  const fetchAdminStats = async () => {
    if (!isAdmin) return;

    try {
      const [usersCount, coursesCount, postsCount, sessionsCount] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('courses').select('id', { count: 'exact', head: true }),
        supabase.from('community_posts').select('id', { count: 'exact', head: true }),
        supabase.from('mentorship_sessions').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        total_users: usersCount.count || 0,
        total_courses: coursesCount.count || 0,
        total_posts: postsCount.count || 0,
        total_sessions: sessionsCount.count || 0,
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      fetchAllUsers();
      fetchAdminStats();
    }
  }, [isAdmin]);

  return {
    isAdmin,
    loading,
    users,
    stats,
    updateUserRole,
    refetchUsers: fetchAllUsers,
    refetchStats: fetchAdminStats,
  };
};