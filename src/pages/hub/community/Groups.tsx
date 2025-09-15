import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, MessageCircle, TrendingUp } from "lucide-react";

const Groups = () => {
  const myGroups = [
    {
      id: 1,
      name: "Empreendedores IA",
      description: "Comunidade para discutir aplicações de IA em negócios",
      members: 234,
      posts: 45,
      category: "Tecnologia",
      isOwner: false
    },
    {
      id: 2,
      name: "Marketing Digital",
      description: "Estratégias e ferramentas para marketing digital",
      members: 189,
      posts: 32,
      category: "Marketing",
      isOwner: true
    }
  ];

  const suggestedGroups = [
    {
      id: 3,
      name: "Investimentos & Funding",
      description: "Discussões sobre captação de recursos e investimentos",
      members: 156,
      posts: 28,
      category: "Finanças"
    },
    {
      id: 4,
      name: "Gestão de Startups",
      description: "Desafios e soluções na gestão de startups",
      members: 142,
      posts: 24,
      category: "Empreendedorismo"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Grupos da Comunidade
          </h1>
          <p className="text-muted-foreground">
            Conecte-se com pessoas que compartilham seus interesses
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Criar Grupo
        </Button>
      </div>

      {/* Meus Grupos */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Meus Grupos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myGroups.map((group) => (
            <Card key={group.id} className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {group.name}
                  </CardTitle>
                  {group.isOwner && (
                    <Badge variant="secondary">Owner</Badge>
                  )}
                </div>
                <Badge variant="outline">{group.category}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{group.description}</p>
                
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {group.members} membros
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {group.posts} posts
                  </span>
                </div>

                <Button className="w-full">
                  Ver Grupo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Grupos Sugeridos */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Grupos Sugeridos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedGroups.map((group) => (
            <Card key={group.id} className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {group.name}
                </CardTitle>
                <Badge variant="outline">{group.category}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{group.description}</p>
                
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {group.members} membros
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {group.posts} posts
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Ver Grupo
                  </Button>
                  <Button className="flex-1">
                    Participar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Estatísticas */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Grupos</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Participando ativamente
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posts este Mês</CardTitle>
            <MessageCircle className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +3 desde a semana passada
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-cyber-blue/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
            <TrendingUp className="h-4 w-4 text-cyber-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86%</div>
            <p className="text-xs text-muted-foreground">
              Taxa de participação
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Groups;