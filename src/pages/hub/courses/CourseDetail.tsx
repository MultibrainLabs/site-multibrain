import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Clock, Users, Star, CheckCircle, Circle, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const CourseDetail = () => {
  const { id } = useParams();
  const [selectedLesson, setSelectedLesson] = useState(1);

  const course = {
    id: 1,
    title: "IA para Negócios",
    instructor: "Dr. Carlos Silva",
    description: "Aprenda como implementar soluções de Inteligência Artificial em seu negócio, desde conceitos básicos até aplicações práticas que podem revolucionar sua empresa.",
    progress: 60,
    rating: 4.8,
    students: 234,
    duration: "4h 30min",
    category: "Tecnologia",
    price: "R$ 199",
    thumbnail: "/placeholder-course.jpg"
  };

  const lessons = [
    { id: 1, title: "Introdução à IA nos Negócios", duration: "15min", completed: true, type: "youtube", url: "dQw4w9WgXcQ" },
    { id: 2, title: "Tipos de IA e Aplicações", duration: "22min", completed: true, type: "youtube", url: "dQw4w9WgXcQ" },
    { id: 3, title: "Análise de Dados com IA", duration: "18min", completed: true, type: "upload", url: "/course-videos/lesson3.mp4" },
    { id: 4, title: "Automação de Processos", duration: "25min", completed: false, type: "youtube", url: "dQw4w9WgXcQ" },
    { id: 5, title: "IA no Atendimento ao Cliente", duration: "20min", completed: false, type: "upload", url: "/course-videos/lesson5.mp4" },
  ];

  const currentLesson = lessons.find(lesson => lesson.id === selectedLesson);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="gap-2 mb-4">
          <Link to="/hub/courses">
            <ArrowLeft className="h-4 w-4" />
            Voltar aos Cursos
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="aspect-video bg-black rounded-t-lg flex items-center justify-center">
                {currentLesson?.type === 'youtube' ? (
                  <iframe
                    className="w-full h-full rounded-t-lg"
                    src={`https://www.youtube.com/embed/${currentLesson.url}`}
                    title={currentLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="text-white flex flex-col items-center gap-4">
                    <Play className="h-16 w-16" />
                    <p>Video Player (Upload)</p>
                  </div>
                )}
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{currentLesson?.title}</h2>
                  <Badge variant={currentLesson?.type === 'youtube' ? 'destructive' : 'secondary'}>
                    {currentLesson?.type === 'youtube' ? 'YouTube' : 'Upload'}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {currentLesson?.duration}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Info */}
          <Tabs defaultValue="sobre" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sobre">Sobre</TabsTrigger>
              <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
              <TabsTrigger value="certificado">Certificado</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sobre" className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Sobre o Curso</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{course.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="avaliacoes" className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Avaliações dos Alunos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    <span className="text-lg font-semibold">{course.rating}</span>
                    <span className="text-muted-foreground">({course.students} avaliações)</span>
                  </div>
                  <p className="text-muted-foreground">Sistema de avaliações em desenvolvimento...</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="certificado" className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Certificado de Conclusão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Complete todas as aulas para receber seu certificado digital.</p>
                  <Progress value={course.progress} className="mt-4" />
                  <p className="text-sm text-muted-foreground mt-2">{course.progress}% concluído</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Lessons Sidebar */}
        <div className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Aulas do Curso</span>
                <Badge variant="outline">{lessons.length} aulas</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedLesson === lesson.id
                      ? 'bg-primary/20 border border-primary/30'
                      : 'bg-muted/50 hover:bg-muted'
                  }`}
                  onClick={() => setSelectedLesson(lesson.id)}
                >
                  <div className="flex items-center gap-3">
                    {lesson.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{lesson.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{lesson.duration}</span>
                        <Badge variant="outline" className="text-xs">
                          {lesson.type === 'youtube' ? 'YouTube' : 'Upload'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Instrutor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold">CS</span>
                </div>
                <div>
                  <p className="font-medium">{course.instructor}</p>
                  <p className="text-sm text-muted-foreground">Especialista em IA</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;