import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Award, DollarSign, Calendar, Star, CheckCircle, X } from "lucide-react";

const BecomeMentor = () => {
  const [expertise, setExpertise] = useState<string[]>([]);
  const [newExpertise, setNewExpertise] = useState("");

  const addExpertise = () => {
    if (newExpertise.trim() && !expertise.includes(newExpertise.trim())) {
      setExpertise([...expertise, newExpertise.trim()]);
      setNewExpertise("");
    }
  };

  const removeExpertise = (item: string) => {
    setExpertise(expertise.filter(exp => exp !== item));
  };

  const benefits = [
    {
      icon: DollarSign,
      title: "Monetize seu Conhecimento",
      description: "Defina suas próprias tarifas e ganhe com suas sessões de mentoria"
    },
    {
      icon: Users,
      title: "Impacte Carreiras",
      description: "Ajude outros profissionais a alcançar seus objetivos e crescer"
    },
    {
      icon: Award,
      title: "Reconhecimento",
      description: "Construa sua reputação como especialista na sua área"
    },
    {
      icon: Calendar,
      title: "Flexibilidade Total",
      description: "Defina seus próprios horários e disponibilidade"
    }
  ];

  const requirements = [
    "Mínimo de 3 anos de experiência profissional",
    "Expertise reconhecida na sua área",
    "Disponibilidade de pelo menos 2 horas por semana",
    "Comunicação clara e didática",
    "Compromisso com o desenvolvimento dos mentorados"
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Torne-se um Mentor
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Compartilhe seu conhecimento, impacte carreiras e construa uma fonte de renda extra
        </p>
      </div>

      {/* Benefícios */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur-sm text-center">
            <CardContent className="p-6 space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário de Aplicação */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Aplicação para Mentor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Informações Básicas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informações Básicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="Seu nome completo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Título Profissional</Label>
                    <Input id="title" placeholder="Ex: CEO, CTO, Diretor de Marketing" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio Profissional</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Conte sobre sua experiência, conquistas e por que quer ser mentor..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Anos de Experiência</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3-5">3-5 anos</SelectItem>
                        <SelectItem value="5-10">5-10 anos</SelectItem>
                        <SelectItem value="10-15">10-15 anos</SelectItem>
                        <SelectItem value="15+">15+ anos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Localização</Label>
                    <Input id="location" placeholder="Cidade, Estado" />
                  </div>
                </div>
              </div>

              {/* Áreas de Expertise */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Áreas de Expertise</h3>
                <div className="flex gap-2">
                  <Input
                    value={newExpertise}
                    onChange={(e) => setNewExpertise(e.target.value)}
                    placeholder="Ex: Inteligência Artificial, Marketing Digital..."
                    className="flex-1"
                  />
                  <Button onClick={addExpertise} variant="outline">
                    Adicionar
                  </Button>
                </div>
                {expertise.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {expertise.map((item, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        {item}
                        <button
                          onClick={() => removeExpertise(item)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Preços e Disponibilidade */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Preços e Disponibilidade</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço por Hora (R$)</Label>
                    <Input id="price" type="number" placeholder="150" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hours">Horas Disponíveis por Semana</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2-5">2-5 horas</SelectItem>
                        <SelectItem value="5-10">5-10 horas</SelectItem>
                        <SelectItem value="10-20">10-20 horas</SelectItem>
                        <SelectItem value="20+">20+ horas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Idiomas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Idiomas</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="portuguese" defaultChecked />
                    <Label htmlFor="portuguese">Português</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="english" />
                    <Label htmlFor="english">Inglês</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="spanish" />
                    <Label htmlFor="spanish">Espanhol</Label>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                Enviar Aplicação
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar com Informações */}
        <div className="space-y-6">
          {/* Requisitos */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-neon-green" />
                Requisitos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm">{req}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Processo de Aprovação */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Processo de Aprovação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Aplicação</p>
                    <p className="text-sm text-muted-foreground">Envie sua aplicação</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Análise</p>
                    <p className="text-sm text-muted-foreground">Revisão em 2-3 dias</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Entrevista</p>
                    <p className="text-sm text-muted-foreground">30min de conversa</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-sm font-bold">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Aprovação</p>
                    <p className="text-sm text-muted-foreground">Bem-vindo ao time!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Nossos Mentores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Mentores Ativos</span>
                <span className="font-bold">127</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Sessões Realizadas</span>
                <span className="font-bold">2,341</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Avaliação Média</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-bold">4.8</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BecomeMentor;