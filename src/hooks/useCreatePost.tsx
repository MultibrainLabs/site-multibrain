import { useState } from "react";
import { useAuth } from "./useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export interface PostData {
  title: string;
  content: string;
  post_type: string;
  group_id?: string;
  resource_link?: string;
  tags: string[];
  visibility: string;
  media_urls?: string[];
}

export const useCreatePost = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const savePost = async (postData: PostData, isPublished: boolean = false) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para criar um post.",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    try {
      // Preparar o conteúdo do post baseado no tipo
      let content = postData.content;
      if (postData.resource_link) {
        content += `\n\nLink do recurso: ${postData.resource_link}`;
      }

      const { data: post, error: postError } = await supabase
        .from('community_posts')
        .insert({
          user_id: user.id,
          content: `${postData.title}\n\n${content}`,
          post_type: postData.post_type,
          group_id: postData.group_id || null,
          media_urls: postData.media_urls || []
        })
        .select()
        .single();

      if (postError) throw postError;

      toast({
        title: isPublished ? "Post publicado!" : "Post salvo!",
        description: isPublished 
          ? "Seu post foi publicado na comunidade."
          : "Seu post foi salvo como rascunho.",
      });

      navigate('/hub/community');
      return true;
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o post. Tente novamente.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    savePost,
    loading
  };
};