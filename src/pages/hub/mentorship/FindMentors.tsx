import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Calendar, Clock, MapPin, Search, Users, Video } from "lucide-react";

const FindMentors = () => {
  const mentors = [
    {
      id: 1,
      name: "Dr. Carlos Silva",
      title: "Especialista em IA & Fundador",
      avatar: "/placeholder-avatar.jpg",
      rating: 4.9,
      sessions: 150,
      price: "R$ 150/h",
      location: "São Paulo, SP",
      expertise: ["Inteligência Artificial", "Startups", "Tecnologia"],
      bio: "15 anos de experiência em IA. Fundou 3 startups de sucesso. Mentor de mais de 200 empreendedores.",
      nextAvailable: "Amanhã, 14h",
      languages: ["Português", "Inglês"]
    },
    {
      id: 2,
      name: "Ana Costa",
      title: "Diretora de Marketing & Growth",
      avatar: "/placeholder-avatar.jpg",
      rating: 4.8,
      sessions: 230,
      price: "R$ 120/h",
      location: "Rio de Janeiro, RJ",
      expertise: ["Marketing Digital", "Growth Hacking", "Branding"],
      bio: "Executiva com 12 anos em marketing. Ajudou 50+ empresas a escalar. Especialista em growth.",
      nextAvailable: "Hoje, 16h",
      languages: ["Português", "Inglês", "Espanhol"]
    },
    {
      id: 3,
      name: "Pedro Santos",
      title: "Investidor & Ex-CEO",
      avatar: "/placeholder-avatar.jpg",
      rating: 5.0,
      sessions: 89,
      price: "R$ 200/h",
      location: "Belo Horizonte, MG",
      expertise: ["Investimentos", "Gestão", "Estratégia"],
      bio: "Ex-CEO de unicórnio brasileiro. Angel investor ativo. Especialista em captação de recursos.",
      nextAvailable: "Sexta, 10h",
      languages: ["Português", "Inglês"]
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Encontrar Mentores
        </h1>
        <p className="text-muted-foreground">
          Conecte-se com especialistas e acelere seu crescimento profissional
        </p>
      </div>

      {/* Filtros */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por nome ou expertise..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Área de Expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ai">Inteligência Artificial</SelectItem>
                <SelectItem value="marketing">Marketing Digital</SelectItem>
                <SelectItem value="startups">Startups</SelectItem>
                <SelectItem value="investment">Investimentos</SelectItem>
                <SelectItem value="management">Gestão</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Faixa de Preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-100">R$ 0 - R$ 100</SelectItem>
                <SelectItem value="100-150">R$ 100 - R$ 150</SelectItem>
                <SelectItem value="150-200">R$ 150 - R$ 200</SelectItem>
                <SelectItem value="200+">R$ 200+</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Disponibilidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="tomorrow">Amanhã</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mês</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Mentores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mentors.map((mentor) => (
          <Card key={mentor.id} className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={mentor.avatar} alt={mentor.name} />
                  <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {mentor.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{mentor.title}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-medium">{mentor.rating}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{mentor.sessions} sessões</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {mentor.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {mentor.nextAvailable}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">{mentor.bio}</p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Especialidades:</p>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-border/40">
                <div>
                  <p className="text-lg font-bold text-primary">{mentor.price}</p>
                  <p className="text-xs text-muted-foreground">por sessão</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Users className="h-4 w-4" />
                    Perfil
                  </Button>
                  <Button size="sm" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    Agendar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-neural border-primary/20">
        <CardContent className="p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">Não encontrou o mentor ideal?</h2>
          <p className="text-muted-foreground">
            Você também pode se tornar um mentor e compartilhar seu conhecimento com a comunidade
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline">
              Ver Mais Mentores
            </Button>
            <Button>
              Tornar-se Mentor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FindMentors;