import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, BookOpen, Users, MessageCircle, Award, ExternalLink } from "lucide-react";

const UserProfile = () => {
  const user = {
    name: "Maria Silva",
    role: "Empreendedora & Mentora",
    location: "São Paulo, SP",
    joinDate: "Janeiro 2024",
    bio: "Fundadora de duas startups de tecnologia. Especialista em IA para negócios e mentora para empreendedores iniciantes. Apaixonada por inovação e impacto social.",
    avatar: "/placeholder-avatar.jpg",
    stats: {
      posts: 42,
      connections: 234,
      courses: 8,
      mentees: 12
    },
    badges: [
      { name: "Expert em IA", color: "primary" },
      { name: "Top Mentor", color: "accent" },
      { name: "Contribuidor Ativo", color: "secondary" }
    ],
    skills: ["Inteligência Artificial", "Empreendedorismo", "Marketing Digital", "Gestão de Startups", "Inovação"],
    projects: [
      {
        name: "EcoTech Solutions",
        description: "Startup de soluções sustentáveis com IA",
        status: "Em desenvolvimento",
        link: "https://ecotech.example.com"
      },
      {
        name: "AI Marketing Tools",
        description: "Ferramentas de IA para pequenas empresas",
        status: "Lançado",
        link: "https://aitools.example.com"
      }
    ]
  };

  const recentPosts = [
    {
      id: 1,
      content: "Acabei de implementar uma solução de IA para automatizar o atendimento da minha startup...",
      timestamp: "2h atrás",
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      content: "💡 Dica: A melhor forma de validar uma ideia é conversando com clientes potenciais...",
      timestamp: "1 dia atrás",
      likes: 45,
      comments: 12
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header do Perfil */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl">MS</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button className="w-full">Conectar</Button>
                  <Button variant="outline" className="w-full">Enviar Mensagem</Button>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-xl text-muted-foreground">{user.role}</p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {user.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Membro desde {user.joinDate}
                  </span>
                </div>

                <p className="leading-relaxed">{user.bio}</p>

                <div className="flex flex-wrap gap-2">
                  {user.badges.map((badge, index) => (
                    <Badge key={index} variant="outline" className="gap-1">
                      <Award className="h-3 w-3" />
                      {badge.name}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{user.stats.posts}</div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{user.stats.connections}</div>
                    <div className="text-sm text-muted-foreground">Conexões</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyber-blue">{user.stats.courses}</div>
                    <div className="text-sm text-muted-foreground">Cursos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-green">{user.stats.mentees}</div>
                    <div className="text-sm text-muted-foreground">Mentorados</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo em Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="projetos">Projetos</TabsTrigger>
            <TabsTrigger value="habilidades">Habilidades</TabsTrigger>
            <TabsTrigger value="atividade">Atividade</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            {recentPosts.map((post) => (
              <Card key={post.id} className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <p className="mb-4">{post.content}</p>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{post.timestamp}</span>
                    <div className="flex gap-4">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comentários</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="projetos" className="space-y-4">
            {user.projects.map((project, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      {project.name}
                      <ExternalLink className="h-4 w-4" />
                    </CardTitle>
                    <Badge variant={project.status === 'Lançado' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="habilidades" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Especialidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="atividade" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">Completou o curso "IA para Negócios"</p>
                    <p className="text-xs text-muted-foreground">3 dias atrás</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">Criou um novo post na comunidade</p>
                    <p className="text-xs text-muted-foreground">5 dias atrás</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">Ingressou no grupo "Investimentos & Funding"</p>
                    <p className="text-xs text-muted-foreground">1 semana atrás</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;