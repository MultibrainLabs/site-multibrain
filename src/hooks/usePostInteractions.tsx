import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export interface PostInteraction {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
}

export interface PostComment extends PostInteraction {
  content: string;
  updated_at: string;
}

export const usePostInteractions = (postId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [likes, setLikes] = useState<PostInteraction[]>([]);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [shares, setShares] = useState<PostInteraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const fetchInteractions = async () => {
    try {
      // Fetch likes
      const { data: likesData } = await supabase
        .from('post_likes')
        .select('*')
        .eq('post_id', postId);

      // Fetch comments
      const { data: commentsData } = await supabase
        .from('post_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      // Fetch shares
      const { data: sharesData } = await supabase
        .from('post_shares')
        .select('*')
        .eq('post_id', postId);

      setLikes(likesData || []);
      setComments(commentsData || []);
      setShares(sharesData || []);

      // Check if current user has liked/shared
      if (user) {
        setIsLiked(likesData?.some(like => like.user_id === user.id) || false);
        setIsShared(sharesData?.some(share => share.user_id === user.id) || false);
      }
    } catch (error) {
      console.error('Error fetching interactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para curtir posts.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isLiked) {
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
        
        setIsLiked(false);
        setLikes(prev => prev.filter(like => like.user_id !== user.id));
      } else {
        await supabase
          .from('post_likes')
          .insert({ post_id: postId, user_id: user.id });
        
        setIsLiked(true);
        setLikes(prev => [...prev, { 
          id: Date.now().toString(), 
          post_id: postId, 
          user_id: user.id, 
          created_at: new Date().toISOString() 
        }]);
      }

      // Update post likes count
      await supabase
        .from('community_posts')
        .update({ 
          likes_count: isLiked ? Math.max(0, likes.length - 1) : likes.length + 1 
        })
        .eq('id', postId);

    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: "Erro",
        description: "Não foi possível curtir o post.",
        variant: "destructive",
      });
    }
  };

  const addComment = async (content: string) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para comentar.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('post_comments')
        .insert({ 
          post_id: postId, 
          user_id: user.id, 
          content 
        })
        .select('*')
        .single();

      if (error) throw error;

      setComments(prev => [...prev, data]);

      // Update post comments count
      await supabase
        .from('community_posts')
        .update({ comments_count: comments.length + 1 })
        .eq('id', postId);

      toast({
        title: "Comentário adicionado",
        description: "Seu comentário foi publicado com sucesso!",
      });

      return true;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o comentário.",
        variant: "destructive",
      });
      return false;
    }
  };

  const sharePost = async () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para compartilhar.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!isShared) {
        await supabase
          .from('post_shares')
          .insert({ post_id: postId, user_id: user.id });
        
        setIsShared(true);
        setShares(prev => [...prev, { 
          id: Date.now().toString(), 
          post_id: postId, 
          user_id: user.id, 
          created_at: new Date().toISOString() 
        }]);

        // Copy link to clipboard
        const postUrl = `${window.location.origin}/hub/community/post/${postId}`;
        await navigator.clipboard.writeText(postUrl);

        toast({
          title: "Post compartilhado",
          description: "Link copiado para a área de transferência!",
        });
      }
    } catch (error) {
      console.error('Error sharing post:', error);
      toast({
        title: "Erro",
        description: "Não foi possível compartilhar o post.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchInteractions();
  }, [postId, user]);

  return {
    likes,
    comments,
    shares,
    loading,
    isLiked,
    isShared,
    likesCount: likes.length,
    commentsCount: comments.length,
    sharesCount: shares.length,
    toggleLike,
    addComment,
    sharePost,
    refetch: fetchInteractions
  };
};