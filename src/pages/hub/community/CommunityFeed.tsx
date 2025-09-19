import { useState, useMemo } from "react";
import { useCommunity } from "@/hooks/useCommunity";
import { useAuth } from "@/hooks/useAuth";
import { useEvents } from "@/hooks/useEvents";
import { usePostInteractions } from "@/hooks/usePostInteractions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Plus, Calendar, Users, TrendingUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { CommentsModal } from "@/components/CommentsModal";
import { EventCard } from "@/components/EventCard";

const CommunityFeed = () => {
  const { posts, groups, loading } = useCommunity();
  const { user } = useAuth();
  const { events, loading: eventsLoading, registerForEvent, unregisterFromEvent } = useEvents();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // Calcula trending topics baseado nos posts reais
  const trendingTopics = useMemo(() => {
    const tagCounts: Record<string, number> = {};
    
    posts.forEach(post => {
      // Extrai hashtags do conteúdo
      const hashtags = post.content.match(/#\w+/g);
      if (hashtags) {
        hashtags.forEach(tag => {
          const cleanTag = tag.substring(1);
          tagCounts[cleanTag] = (tagCounts[cleanTag] || 0) + 1;
        });
      }
    });

    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([tag, count]) => ({ tag, posts: count }));
  }, [posts]);

  const PostInteractionButtons = ({ postId }: { postId: string }) => {
    const {
      likesCount,
      commentsCount,
      sharesCount,
      isLiked,
      toggleLike,
      sharePost,
      comments,
      addComment
    } = usePostInteractions(postId);

    return (
      <>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLike}
            className={isLiked ? "text-red-500" : ""}
          >
            <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
            {likesCount}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedPostId(postId)}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            {commentsCount}
          </Button>
          
          <Button variant="ghost" size="sm" onClick={sharePost}>
            <Share2 className="h-4 w-4 mr-1" />
            {sharesCount}
          </Button>
        </div>

        <CommentsModal
          isOpen={selectedPostId === postId}
          onClose={() => setSelectedPostId(null)}
          comments={comments}
          onAddComment={addComment}
          postTitle="Post da Comunidade"
        />
      </>
    );
  };

  if (loading || eventsLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <Skeleton className="h-64 w-full" />
          </div>
          <div className="lg:col-span-6 space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
          <div className="lg:col-span-3">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Topics
              </h3>
            </CardHeader>
            <CardContent className="space-y-2">
              {trendingTopics.length > 0 ? (
                trendingTopics.map((topic, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <span className="text-sm">#{topic.tag}</span>
                    <Badge variant="outline" className="text-xs">
                      {topic.posts} posts
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhum trending topic ainda
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Grupos Sugeridos
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {groups.length > 0 ? (
                groups.slice(0, 3).map((group) => (
                  <div key={group.id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{group.name}</p>
                        <p className="text-xs text-muted-foreground">{group.member_count} membros</p>
                      </div>
                      {group.category && (
                        <Badge variant="outline" className="text-xs">
                          {group.category}
                        </Badge>
                      )}
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      Participar
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground text-center py-4">
                  Nenhum grupo disponível
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Feed da Comunidade</h1>
            <Link to="/hub/community/create-post">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Criar Post
              </Button>
            </Link>
          </div>

          {/* Events Section */}
          {events.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Próximos Eventos</h2>
              </div>
              <div className="grid gap-4">
                {events.slice(0, 2).map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onRegister={registerForEvent}
                    onUnregister={unregisterFromEvent}
                  />
                ))}
              </div>
              {events.length > 2 && (
                <Button variant="outline" className="w-full">
                  Ver todos os eventos
                </Button>
              )}
            </div>
          )}

          {posts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <h3 className="text-lg font-semibold mb-2">Nenhum post ainda</h3>
                <p className="text-muted-foreground mb-4">
                  Seja o primeiro a compartilhar algo com a comunidade!
                </p>
                <Link to="/hub/community/create-post">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Post
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={post.user?.avatar_url} />
                      <AvatarFallback>
                        {post.user?.first_name?.[0]}{post.user?.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">
                        {post.user?.first_name} {post.user?.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(post.created_at), {
                          addSuffix: true,
                          locale: ptBR
                        })}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="whitespace-pre-wrap">{post.content}</p>
                    
                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-2">
                      {post.content.match(/#\w+/g)?.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Interaction buttons */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <PostInteractionButtons postId={post.id} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Próximos Eventos
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {events.length > 0 ? (
                events.slice(0, 3).map((event) => (
                  <div key={event.id} className="space-y-2">
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(event.start_date), { 
                        addSuffix: true, 
                        locale: ptBR 
                      })}
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      {event.is_registered ? 'Inscrito' : 'Participar'}
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground text-center py-4">
                  Nenhum evento próximo
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold">Suas Estatísticas</h3>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Posts esta semana</span>
                <span className="text-sm font-medium">
                  {posts.filter(p => p.user_id === user?.id).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Grupos</span>
                <span className="text-sm font-medium">{groups.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Eventos inscritos</span>
                <span className="text-sm font-medium">
                  {events.filter(e => e.is_registered).length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeed;