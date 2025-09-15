import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CommunityPost {
  id: string;
  user_id: string;
  group_id?: string;
  content: string;
  media_urls?: string[];
  post_type: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  user: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
}

export interface CommunityGroup {
  id: string;
  name: string;
  description?: string;
  creator_id: string;
  category?: string;
  is_private: boolean;
  member_count: number;
  avatar_url?: string;
  created_at: string;
}

export const useCommunity = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [groups, setGroups] = useState<CommunityGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          user:profiles!user_id(first_name, last_name, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: "Erro ao carregar posts",
          description: "Não foi possível carregar os posts da comunidade.",
          variant: "destructive",
        });
      } else {
        setPosts(data || []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchGroups = async () => {
    try {
      const { data, error } = await supabase
        .from('community_groups')
        .select('*')
        .eq('is_private', false)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching groups:', error);
        toast({
          title: "Erro ao carregar grupos",
          description: "Não foi possível carregar os grupos da comunidade.",
          variant: "destructive",
        });
      } else {
        setGroups(data || []);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const createPost = async (content: string, groupId?: string) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('community_posts')
        .insert({
          user_id: user.id,
          content,
          group_id: groupId,
          post_type: 'text'
        })
        .select(`
          *,
          user:profiles!user_id(first_name, last_name, avatar_url)
        `)
        .single();

      if (error) {
        console.error('Error creating post:', error);
        toast({
          title: "Erro ao criar post",
          description: "Não foi possível publicar seu post.",
          variant: "destructive",
        });
        return false;
      } else {
        toast({
          title: "Post publicado",
          description: "Seu post foi publicado com sucesso!",
        });
        await fetchPosts();
        return true;
      }
    } catch (error) {
      console.error('Error creating post:', error);
      return false;
    }
  };

  const createGroup = async (name: string, description: string, category: string) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('community_groups')
        .insert({
          name,
          description,
          creator_id: user.id,
          category,
          is_private: false,
          member_count: 1
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating group:', error);
        toast({
          title: "Erro ao criar grupo",
          description: "Não foi possível criar o grupo.",
          variant: "destructive",
        });
        return false;
      } else {
        toast({
          title: "Grupo criado",
          description: "Seu grupo foi criado com sucesso!",
        });
        await fetchGroups();
        return true;
      }
    } catch (error) {
      console.error('Error creating group:', error);
      return false;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchPosts(),
        fetchGroups()
      ]);
      setLoading(false);
    };

    loadData();
  }, [user]);

  return {
    posts,
    groups,
    loading,
    createPost,
    createGroup,
    refetch: () => {
      fetchPosts();
      fetchGroups();
    }
  };
};