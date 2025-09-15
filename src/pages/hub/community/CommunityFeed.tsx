import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Plus, TrendingUp, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const CommunityFeed = () => {
  const posts = [
    {
      id: 1,
      author: "Maria Silva",
      avatar: "/placeholder-avatar.jpg",
      role: "Empreendedora",
      timestamp: "2h atrás",
      content: "Acabei de implementar uma solução de IA para automatizar o atendimento da minha startup. Os resultados foram incríveis - 80% de redução no tempo de resposta! Alguém mais aqui já experimentou chatbots inteligentes?",
      likes: 24,
      comments: 8,
      shares: 3,
      tags: ["IA", "Automação", "Startup"]
    },
    {
      id: 2,
      author: "João Santos",
      avatar: "/placeholder-avatar.jpg",
      role: "Mentor",
      timestamp: "4h atrás",
      content: "💡 Dica do dia: A melhor forma de validar uma ideia de negócio é conversando com potenciais clientes, não criando funcionalidades. O feedback real vale mais que qualquer plano de negócios perfeito.",
      likes: 45,
      comments: 12,
      shares: 8,
      tags: ["Empreendedorismo", "Validação", "Dicas"]
    },
    {
      id: 3,
      author: "Ana Costa",
      avatar: "/placeholder-avatar.jpg",
      role: "Especialista em Marketing",
      timestamp: "6h atrás",
      content: "Estou organizando um grupo de estudos sobre Marketing Digital com IA. Quem tem interesse em participar? A ideia é nos reunirmos semanalmente para discutir cases práticos e trocar experiências.",
      likes: 32,
      comments: 15,
      shares: 5,
      tags: ["Marketing", "IA", "Grupo de Estudos"]
    }
  ];

  const trendingTopics = [
    { tag: "IA Generativa", posts: 45 },
    { tag: "Startups", posts: 32 },
    { tag: "Investimentos", posts: 28 },
    { tag: "Marketing Digital", posts: 24 }
  ];

  const suggestedGroups = [
    { name: "Empreendedores IA", members: 234, category: "Tecnologia" },
    { name: "Marketing Digital", members: 189, category: "Marketing" },
    { name: "Investimentos", members: 156, category: "Finanças" }
  ];

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
              {suggestedGroups.map((group, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{group.name}</p>
                      <p className="text-xs text-muted-foreground">{group.members} membros</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {group.category}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Participar
                  </Button>
                </div>
              ))}
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
          {posts.map((post) => (
            <Card key={post.id} className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src={post.avatar} alt={post.author} />
                    <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{post.author}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {post.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">{post.content}</p>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Heart className="h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      {post.shares}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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