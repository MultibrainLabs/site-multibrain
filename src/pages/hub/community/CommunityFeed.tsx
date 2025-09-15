import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Plus, TrendingUp, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useCommunity } from "@/hooks/useCommunity";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo } from "react";

const CommunityFeed = () => {
  const { posts, groups, loading } = useCommunity();
  const { user } = useAuth();

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

  const suggestedGroups = groups.slice(0, 3);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando feed...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Esquerda */}
        <div className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Trending Topics
              </h3>
            </CardHeader>
            <CardContent className="space-y-2">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-sm">#{topic.tag}</span>
                  <Badge variant="outline" className="text-xs">
                    {topic.posts} posts
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Grupos Sugeridos
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestedGroups.length > 0 ? (
                suggestedGroups.map((group) => (
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

        {/* Feed Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header com botão de criar post */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Feed da Comunidade
            </h1>
            <Button asChild className="gap-2">
              <Link to="/hub/community/create-post">
                <Plus className="h-4 w-4" />
                Criar Post
              </Link>
            </Button>
          </div>

          {/* Posts */}
          {posts.length > 0 ? (
            posts.map((post) => {
              const authorName = `${post.user?.first_name || ''} ${post.user?.last_name || ''}`.trim() || 'Usuário';
              const timeAgo = formatDistanceToNow(new Date(post.created_at), { locale: ptBR, addSuffix: true });
              
              return (
                <Card key={post.id} className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={post.user?.avatar_url} alt={authorName} />
                        <AvatarFallback>
                          {authorName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{authorName}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {post.post_type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{timeAgo}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm leading-relaxed">{post.content}</p>
                    
                    {/* Extrai e exibe hashtags do conteúdo */}
                    {(() => {
                      const hashtags = post.content.match(/#\w+/g);
                      return hashtags && hashtags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {hashtags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      ) : null;
                    })()}

                    <div className="flex items-center justify-between pt-4 border-t border-border/40">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Heart className="h-4 w-4" />
                          {post.likes_count}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments_count}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Share2 className="h-4 w-4" />
                          0
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground mb-4">Nenhum post encontrado na comunidade.</p>
                <Button asChild variant="outline">
                  <Link to="/hub/community/create-post">
                    Seja o primeiro a postar!
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar Direita */}
        <div className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-cyber-blue" />
                Próximos Eventos
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <p className="font-medium text-sm">Workshop: IA no Marketing</p>
                <p className="text-xs text-muted-foreground">Amanhã, 19h</p>
                <Button size="sm" variant="outline" className="w-full">
                  Participar
                </Button>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-sm">Networking MultiBrain</p>
                <p className="text-xs text-muted-foreground">Sexta, 18h</p>
                <Button size="sm" variant="outline" className="w-full">
                  Participar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <h3 className="font-semibold">Suas Estatísticas</h3>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Posts esta semana</span>
                <span className="text-sm font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Conexões</span>
                <span className="text-sm font-medium">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Grupos</span>
                <span className="text-sm font-medium">5</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeed;