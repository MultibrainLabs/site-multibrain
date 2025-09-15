import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Video, MessageCircle, Star, FileText, Plus, Users } from "lucide-react";
import { Link } from "react-router-dom";

const MySessions = () => {
  const upcomingSessions = [
    {
      id: 1,
      mentor: "Dr. Carlos Silva",
      avatar: "/placeholder-avatar.jpg",
      topic: "Estratégia de IA para Startups",
      date: "Amanhã",
      time: "14:00 - 15:00",
      type: "Video Call",
      status: "confirmed",
      meetingLink: "https://meet.google.com/abc-def-ghi"
    },
    {
      id: 2,
      mentor: "Ana Costa",
      avatar: "/placeholder-avatar.jpg",
      topic: "Growth Hacking para E-commerce",
      date: "Sexta-feira",
      time: "16:00 - 17:00",
      type: "Video Call",
      status: "pending",
      meetingLink: null
    }
  ];

  const pastSessions = [
    {
      id: 3,
      mentor: "Pedro Santos",
      avatar: "/placeholder-avatar.jpg",
      topic: "Captação de Investimento Seed",
      date: "Semana passada",
      time: "10:00 - 11:00",
      rating: 5,
      feedback: "Sessão excelente! Pedro me ajudou muito com a estruturação do pitch deck.",
      notes: "Principais pontos: foco no problema, validação de mercado, métricas de tração."
    },
    {
      id: 4,
      mentor: "Dr. Carlos Silva",
      avatar: "/placeholder-avatar.jpg",
      topic: "Implementação de IA no Backend",
      date: "Há 2 semanas",
      time: "14:00 - 15:00",
      rating: 5,
      feedback: "Carlos explicou de forma muito clara como integrar APIs de IA.",
      notes: "Recursos recomendados: OpenAI API, LangChain, vector databases."
    }
  ];

  const mentoringSessions = [
    {
      id: 5,
      mentee: "Julia Oliveira",
      avatar: "/placeholder-avatar.jpg",
      topic: "Primeiros passos no empreendedorismo",
      date: "Hoje",
      time: "15:00 - 16:00",
      type: "Video Call",
      status: "confirmed"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Minhas Sessões
          </h1>
          <p className="text-muted-foreground">
            Gerencie suas sessões de mentoria e acompanhe seu progresso
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/hub/mentorship/find">
            <Plus className="h-4 w-4" />
            Agendar Nova Sessão
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Próximas Sessões</TabsTrigger>
          <TabsTrigger value="past">Histórico</TabsTrigger>
          <TabsTrigger value="mentoring">Como Mentor</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {upcomingSessions.length > 0 ? (
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <Card key={session.id} className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={session.avatar} alt={session.mentor} />
                        <AvatarFallback>{session.mentor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{session.topic}</h3>
                            <p className="text-sm text-muted-foreground">com {session.mentor}</p>
                          </div>
                          <Badge variant={session.status === 'confirmed' ? 'default' : 'secondary'}>
                            {session.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {session.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {session.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Video className="h-4 w-4" />
                            {session.type}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          {session.meetingLink && (
                            <Button size="sm" className="gap-2">
                              <Video className="h-4 w-4" />
                              Entrar na Chamada
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="gap-2">
                            <MessageCircle className="h-4 w-4" />
                            Mensagem
                          </Button>
                          <Button variant="outline" size="sm">
                            Reagendar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma sessão agendada</h3>
                <p className="text-muted-foreground mb-4">
                  Que tal agendar uma sessão com um mentor?
                </p>
                <Button asChild>
                  <Link to="/hub/mentorship/find">Encontrar Mentores</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          <div className="space-y-4">
            {pastSessions.map((session) => (
              <Card key={session.id} className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={session.avatar} alt={session.mentor} />
                      <AvatarFallback>{session.mentor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{session.topic}</h3>
                          <p className="text-sm text-muted-foreground">com {session.mentor}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: session.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {session.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {session.time}
                        </span>
                      </div>

                      {session.feedback && (
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="text-sm font-medium mb-1">Seu Feedback:</p>
                          <p className="text-sm">{session.feedback}</p>
                        </div>
                      )}

                      {session.notes && (
                        <div className="bg-muted/30 p-3 rounded-lg">
                          <p className="text-sm font-medium mb-1">Suas Anotações:</p>
                          <p className="text-sm">{session.notes}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <FileText className="h-4 w-4" />
                          Ver Detalhes
                        </Button>
                        <Button variant="outline" size="sm">
                          Agendar Novamente
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mentoring" className="space-y-6">
          {mentoringSessions.length > 0 ? (
            <div className="space-y-4">
              {mentoringSessions.map((session) => (
                <Card key={session.id} className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={session.avatar} alt={session.mentee} />
                        <AvatarFallback>{session.mentee.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{session.topic}</h3>
                            <p className="text-sm text-muted-foreground">com {session.mentee}</p>
                          </div>
                          <Badge variant="default">Confirmada</Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {session.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {session.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Video className="h-4 w-4" />
                            {session.type}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="gap-2">
                            <Video className="h-4 w-4" />
                            Entrar na Chamada
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <MessageCircle className="h-4 w-4" />
                            Mensagem
                          </Button>
                          <Button variant="outline" size="sm">
                            Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma sessão como mentor</h3>
                <p className="text-muted-foreground mb-4">
                  Comece a ajudar outros profissionais e compartilhe seu conhecimento
                </p>
                <Button asChild>
                  <Link to="/hub/mentorship/become-mentor">Tornar-se Mentor</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MySessions;