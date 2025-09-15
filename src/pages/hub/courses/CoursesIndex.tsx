import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Clock, Users, Plus, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useCourses } from "@/hooks/useCourses";

const CoursesIndex = () => {
  const { courses, enrollments, loading, enrollInCourse } = useCourses();

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="space-y-4">
          <Skeleton className="h-6 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <Skeleton className="aspect-video w-full" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-2 w-full mb-2" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
          {enrollments.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum curso em andamento</h3>
              <p className="text-muted-foreground mb-4">
                Você ainda não está inscrito em nenhum curso. Explore os cursos disponíveis abaixo!
              </p>
            </div>
          ) : (
            enrollments.map((enrollment) => (
              <Card key={enrollment.id} className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm">
                <CardHeader className="space-y-3">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Play className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    {enrollment.course.category && (
                      <Badge variant="outline" style={{ borderColor: enrollment.course.category.color }}>
                        {enrollment.course.category.name}
                      </Badge>
                    )}
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {enrollment.course.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Por {enrollment.course.instructor?.first_name} {enrollment.course.instructor?.last_name}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>{enrollment.progress_percentage}%</span>
                    </div>
                    <Progress value={enrollment.progress_percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        {enrollment.completed_at ? 'Concluído' : 'Em andamento'}
                      </span>
                      {enrollment.course.duration_hours && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {enrollment.course.duration_hours}h
                        </span>
                      )}
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link to={`/hub/courses/${enrollment.course.id}`}>
                      {enrollment.completed_at ? 'Revisar Curso' : 'Continuar Curso'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>

      {/* Cursos Disponíveis */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Explorar Novos Cursos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum curso disponível</h3>
              <p className="text-muted-foreground">
                Novos cursos serão adicionados em breve!
              </p>
            </div>
          ) : (
            courses.map((course) => {
              const isEnrolled = enrollments.some(e => e.course_id === course.id);
              
              return (
                <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="space-y-3">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      {course.category && (
                        <Badge variant="outline" style={{ borderColor: course.category.color }}>
                          {course.category.name}
                        </Badge>
                      )}
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {course.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Por {course.instructor?.first_name} {course.instructor?.last_name}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {course.level || 'Iniciante'}
                      </span>
                      {course.duration_hours && (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {course.duration_hours}h
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary">
                        {course.price === 0 ? 'Gratuito' : `R$ ${course.price}`}
                      </span>
                    </div>
                    {isEnrolled ? (
                      <Button variant="outline" className="w-full" disabled>
                        Já Inscrito
                      </Button>
                    ) : (
                      <Button 
                        className="w-full"
                        onClick={() => enrollInCourse(course.id)}
                      >
                        Inscrever-se
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default CoursesIndex;