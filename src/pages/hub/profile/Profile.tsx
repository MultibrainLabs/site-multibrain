import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Edit, MapPin, Calendar, BookOpen, Users, MessageCircle, Award, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = {
    name: "João Silva",
    email: "joao@email.com",
    role: "Empreendedor",
    location: "São Paulo, SP",
    joinDate: "Janeiro 2024",
    bio: "Empreendedor apaixonado por tecnologia e inovação. Fundador de uma startup de IA aplicada ao agronegócio.",
    avatar: "/placeholder-avatar.jpg",
    stats: {
      posts: 24,
      connections: 47,
      coursesCompleted: 3,
      coursesInProgress: 2
    }
  };

  const badges = [
    { name: "Primeira Conexão", description: "Fez sua primeira conexão na plataforma", earned: true },
    { name: "Curso Completo", description: "Completou seu primeiro curso", earned: true },
    { name: "Contribuidor", description: "Fez 10 posts na comunidade", earned: true },
    { name: "Mentor", description: "Tornou-se mentor da comunidade", earned: false },
    { name: "Especialista", description: "Reconhecido como especialista na área", earned: false }
  ];

  const coursesInProgress = [
    {
      title: "IA para Negócios",
      progress: 60,
      instructor: "Dr. Carlos Silva",
      nextLesson: "Automação de Processos"
    },
    {
      title: "Marketing Digital",
      progress: 25,
      instructor: "Ana Costa",
      nextLesson: "SEO Avançado"
    }
  ];

  const coursesCompleted = [
    {
      title: "Fundamentos de Empreendedorismo",
      completedAt: "15 dias atrás",
      instructor: "Pedro Santos",
      certificate: true
    },
    {
      title: "Gestão de Startups",
      completedAt: "1 mês atrás",
      instructor: "Maria Fernandes",
      certificate: true
    }
  ];

  const recentActivity = [
    {
      type: "course",
      content: "Completou a aula 'Automação com IA'",
      timestamp: "2 horas atrás"
    },
    {
      type: "community",
      content: "Comentou no post de Maria Silva",
      timestamp: "1 dia atrás"
    },
    {
      type: "connection",
      content: "Conectou-se com Ana Costa",
      timestamp: "2 dias atrás"
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
                  <AvatarFallback className="text-2xl">JS</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full gap-2">
                    <Edit className="h-4 w-4" />
                    Editar Perfil
                  </Button>
                  <Button variant="outline" asChild className="w-full gap-2">
                    <Link to="/hub/profile/settings">
                      <Settings className="h-4 w-4" />
                      Configurações
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-xl text-muted-foreground">{user.role}</p>
                  <p className="text-muted-foreground">{user.email}</p>
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
                    <div className="text-2xl font-bold text-cyber-blue">{user.stats.coursesCompleted}</div>
                    <div className="text-sm text-muted-foreground">Concluídos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-green">{user.stats.coursesInProgress}</div>
                    <div className="text-sm text-muted-foreground">Em Andamento</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo em Tabs */}
        <Tabs defaultValue="cursos" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cursos">Meus Cursos</TabsTrigger>
            <TabsTrigger value="conquistas">Conquistas</TabsTrigger>
            <TabsTrigger value="atividade">Atividade</TabsTrigger>
            <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
          </TabsList>

          <TabsContent value="cursos" className="space-y-6">
            {/* Cursos em Andamento */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Cursos em Andamento</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coursesInProgress.map((course, index) => (
                  <Card key={index} className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">Por {course.instructor}</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progresso</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Próxima aula:</span> {course.nextLesson}
                      </p>
                      <Button size="sm" className="w-full">
                        Continuar Curso
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cursos Concluídos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Cursos Concluídos</h3>
              <div className="space-y-3">
                {coursesCompleted.map((course, index) => (
                  <Card key={index} className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Por {course.instructor} • Concluído {course.completedAt}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {course.certificate && (
                            <Badge variant="secondary" className="gap-1">
                              <Award className="h-3 w-3" />
                              Certificado
                            </Badge>
                          )}
                          <Button variant="outline" size="sm">
                            Ver Certificado
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="conquistas" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {badges.map((badge, index) => (
                <Card key={index} className={`bg-card/50 backdrop-blur-sm ${badge.earned ? 'border-primary/50' : 'opacity-60'}`}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.earned ? 'bg-primary/20' : 'bg-muted'}`}>
                      <Award className={`h-6 w-6 ${badge.earned ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{badge.name}</h4>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                    </div>
                    {badge.earned && (
                      <Badge variant="secondary">Conquistado</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="atividade" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'course' ? 'bg-primary' :
                      activity.type === 'community' ? 'bg-accent' : 'bg-cyber-blue'
                    }`}></div>
                    <div>
                      <p className="text-sm">{activity.content}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="estatisticas" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Aprendizado
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total de Cursos</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Horas Estudadas</span>
                    <span className="font-medium">47h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Certificados</span>
                    <span className="font-medium">3</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    Networking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Conexões</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Grupos</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Mensagens</span>
                    <span className="font-medium">234</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-cyber-blue" />
                    Comunidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Posts</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Comentários</span>
                    <span className="font-medium">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Likes Recebidos</span>
                    <span className="font-medium">156</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;