import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Users, Plus, Play } from "lucide-react";
import { Link } from "react-router-dom";

const CoursesIndex = () => {
  const myCourses = [
    {
      id: 1,
      title: "IA para Negócios",
      instructor: "Dr. Carlos Silva",
      progress: 60,
      totalLessons: 12,
      completedLessons: 7,
      thumbnail: "/placeholder-course.jpg",
      category: "Tecnologia",
      duration: "4h 30min"
    },
    {
      id: 2,
      title: "Marketing Digital Avançado",
      instructor: "Ana Costa",
      progress: 25,
      totalLessons: 16,
      completedLessons: 4,
      thumbnail: "/placeholder-course.jpg",
      category: "Marketing",
      duration: "6h 15min"
    }
  ];

  const availableCourses = [
    {
      id: 3,
      title: "Fundamentos de Blockchain",
      instructor: "Pedro Santos",
      students: 245,
      rating: 4.8,
      price: "R$ 299",
      thumbnail: "/placeholder-course.jpg",
      category: "Tecnologia",
      duration: "8h 45min"
    },
    {
      id: 4,
      title: "Gestão de Startups",
      instructor: "Maria Fernandes",
      students: 189,
      rating: 4.9,
      price: "R$ 199",
      thumbnail: "/placeholder-course.jpg",
      category: "Empreendedorismo",
      duration: "5h 20min"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Meus Cursos
          </h1>
          <p className="text-muted-foreground">
            Continue sua jornada de aprendizado
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/hub/courses/create">
            <Plus className="h-4 w-4" />
            Criar Curso
          </Link>
        </Button>
      </div>

      {/* Cursos em Andamento */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Cursos em Andamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm">
              <CardHeader className="space-y-3">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Play className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <Badge variant="outline">{course.category}</Badge>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Por {course.instructor}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{course.completedLessons}/{course.totalLessons} aulas</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </span>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link to={`/hub/courses/${course.id}`}>
                    Continuar Curso
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Cursos Disponíveis */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Explorar Novos Cursos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm">
              <CardHeader className="space-y-3">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <Badge variant="outline">{course.category}</Badge>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Por {course.instructor}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students} alunos
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">{course.price}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm">{course.rating}</span>
                  </div>
                </div>
                <Button variant="outline" asChild className="w-full">
                  <Link to={`/hub/courses/${course.id}`}>
                    Ver Detalhes
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CoursesIndex;