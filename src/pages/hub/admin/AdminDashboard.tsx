import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/hooks/useAdmin";
import { Users, BookOpen, MessageSquare, Calendar, TrendingUp, Settings, UserCog } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { stats } = useAdmin();

  const statCards = [
    {
      title: "Total de Usuários",
      value: stats?.total_users || 0,
      icon: Users,
      description: "Usuários registrados na plataforma"
    },
    {
      title: "Cursos Publicados", 
      value: stats?.total_courses || 0,
      icon: BookOpen,
      description: "Cursos disponíveis"
    },
    {
      title: "Posts da Comunidade",
      value: stats?.total_posts || 0,
      icon: MessageSquare,
      description: "Posts criados na comunidade"
    },
    {
      title: "Sessões de Mentoria",
      value: stats?.total_sessions || 0,
      icon: Calendar,
      description: "Sessões agendadas"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <TrendingUp className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground">Visão geral da plataforma MultiBrain</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ações Administrativas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Administrativas</CardTitle>
          <CardDescription>
            Acesso rápido às principais funcionalidades administrativas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild variant="outline" className="h-20 flex flex-col gap-2">
              <Link to="/hub/admin/users">
                <UserCog className="h-6 w-6" />
                <span>Gerenciar Usuários</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex flex-col gap-2">
              <Link to="/hub/admin/courses">
                <BookOpen className="h-6 w-6" />
                <span>Gerenciar Cursos</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex flex-col gap-2">
              <Link to="/hub/admin">
                <Settings className="h-6 w-6" />
                <span>Configurações</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Últimas ações realizadas na plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Log de atividades em desenvolvimento...
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status do Sistema</CardTitle>
            <CardDescription>
              Monitoramento dos serviços principais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Banco de Dados</span>
                <span className="text-sm text-green-600">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API</span>
                <span className="text-sm text-green-600">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage</span>
                <span className="text-sm text-green-600">Online</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;