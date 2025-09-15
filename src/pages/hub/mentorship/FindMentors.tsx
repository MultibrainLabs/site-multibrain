import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Calendar, Clock, MapPin, Search, Users, Video } from "lucide-react";
import { useMentors } from "@/hooks/useMentors";
import { MentorProfileModal } from "@/components/MentorProfileModal";
import { ScheduleSessionModal } from "@/components/ScheduleSessionModal";

const FindMentors = () => {
  const { mentors, loading, filters, updateFilters } = useMentors();
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const handleViewProfile = (mentor: any) => {
    setSelectedMentor(mentor);
    setShowProfileModal(true);
  };

  const handleScheduleSession = (mentor: any) => {
    setSelectedMentor(mentor);
    setShowScheduleModal(true);
  };

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
              <Input 
                placeholder="Buscar por nome ou expertise..." 
                className="pl-10" 
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
              />
            </div>
            <Select value={filters.expertise} onValueChange={(value) => updateFilters({ expertise: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Área de Expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as áreas</SelectItem>
                <SelectItem value="ai">Inteligência Artificial</SelectItem>
                <SelectItem value="marketing">Marketing Digital</SelectItem>
                <SelectItem value="startups">Startups</SelectItem>
                <SelectItem value="investment">Investimentos</SelectItem>
                <SelectItem value="management">Gestão</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.priceRange} onValueChange={(value) => updateFilters({ priceRange: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Faixa de Preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Qualquer preço</SelectItem>
                <SelectItem value="0-100">R$ 0 - R$ 100</SelectItem>
                <SelectItem value="100-150">R$ 100 - R$ 150</SelectItem>
                <SelectItem value="150-200">R$ 150 - R$ 200</SelectItem>
                <SelectItem value="200+">R$ 200+</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.availability} onValueChange={(value) => updateFilters({ availability: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Disponibilidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Qualquer horário</SelectItem>
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
        {loading ? (
          <div className="col-span-2 text-center py-8">
            <p>Carregando mentores...</p>
          </div>
        ) : mentors.length === 0 ? (
          <div className="col-span-2 text-center py-8">
            <p className="text-muted-foreground">Nenhum mentor encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          mentors.map((mentor) => {
            const fullName = `${mentor.profile?.first_name || ''} ${mentor.profile?.last_name || ''}`.trim();
            return (
              <Card key={mentor.user_id} className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={mentor.profile?.avatar_url} alt={fullName} />
                      <AvatarFallback>{fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {fullName}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">Mentor Especialista</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            <span className="font-medium">4.9</span>
                          </div>
                          <p className="text-sm text-muted-foreground">150 sessões</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {mentor.profile?.location || 'Localização não informada'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {mentor.availability || 'Consulte disponibilidade'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed">{mentor.bio || 'Bio não disponível.'}</p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Especialidades:</p>
                    <div className="flex flex-wrap gap-2">
                      {mentor.specialties?.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-border/40">
                    <div>
                      <p className="text-lg font-bold text-primary">R$ {mentor.hourly_rate || 0}/h</p>
                      <p className="text-xs text-muted-foreground">por sessão</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => handleViewProfile(mentor)}
                      >
                        <Users className="h-4 w-4" />
                        Perfil
                      </Button>
                      <Button 
                        size="sm" 
                        className="gap-2"
                        onClick={() => handleScheduleSession(mentor)}
                      >
                        <Calendar className="h-4 w-4" />
                        Agendar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
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

      {/* Modals */}
      <MentorProfileModal
        mentor={selectedMentor}
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onSchedule={() => {
          setShowProfileModal(false);
          setShowScheduleModal(true);
        }}
      />

      <ScheduleSessionModal
        mentor={selectedMentor}
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      />
    </div>
  );
};

export default FindMentors;