import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Clock, Users, Star, CheckCircle, Circle, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface CourseLesson {
  id: string;
  title: string;
  content?: string;
  video_url?: string;
  duration_minutes?: number;
  order_index: number;
  is_preview: boolean;
}

interface Course {
  id: string;
  title: string;
  description?: string;
  instructor_id: string;
  category_id?: string;
  thumbnail_url?: string;
  duration_hours?: number;
  level?: string;
  price?: number;
  is_published: boolean;
  created_at: string;
  instructor?: {
    first_name?: string;
    last_name?: string;
  };
  category?: {
    name: string;
    color?: string;
  };
}

interface CourseEnrollment {
  progress_percentage: number;
  completed_at?: string;
}

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<CourseLesson[]>([]);
  const [enrollment, setEnrollment] = useState<CourseEnrollment | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!id) return;

      try {
        // Buscar dados do curso
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select(`
            *,
            instructor:profiles!instructor_id(first_name, last_name),
            category:course_categories(name, color)
          `)
          .eq('id', id)
          .single();

        if (courseError) throw courseError;
        setCourse(courseData);

        // Buscar aulas do curso
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('course_lessons')
          .select('*')
          .eq('course_id', id)
          .order('order_index');

        if (lessonsError) throw lessonsError;
        setLessons(lessonsData || []);
        
        if (lessonsData && lessonsData.length > 0) {
          setSelectedLesson(lessonsData[0].id);
        }

        // Buscar inscrição do usuário (se logado)
        if (user) {
          const { data: enrollmentData, error: enrollmentError } = await supabase
            .from('course_enrollments')
            .select('progress_percentage, completed_at')
            .eq('course_id', id)
            .eq('user_id', user.id)
            .single();

          if (!enrollmentError && enrollmentData) {
            setEnrollment(enrollmentData);
          }
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do curso.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id, user, toast]);

  const currentLesson = lessons.find(lesson => lesson.id === selectedLesson);

  const getVideoType = (url?: string) => {
    if (!url) return 'upload';
    return url.includes('youtube.com') || url.includes('youtu.be') ? 'youtube' : 'upload';
  };

  const getYouTubeVideoId = (url: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return url;
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return "0min";
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  const getInstructorName = () => {
    if (!course?.instructor) return "Instrutor";
    const { first_name, last_name } = course.instructor;
    return [first_name, last_name].filter(Boolean).join(' ') || "Instrutor";
  };

  const getInstructorInitials = () => {
    const name = getInstructorName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="aspect-video w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Curso não encontrado</h1>
          <Button asChild>
            <Link to="/hub/courses">Voltar aos Cursos</Link>
          </Button>
        </div>
      </div>
    );
  }

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
                {currentLesson && currentLesson.video_url ? (
                  getVideoType(currentLesson.video_url) === 'youtube' ? (
                    <iframe
                      className="w-full h-full rounded-t-lg"
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(currentLesson.video_url)}`}
                      title={currentLesson.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="text-white flex flex-col items-center gap-4">
                      <Play className="h-16 w-16" />
                      <p>Video Player (Upload)</p>
                      <p className="text-sm text-gray-400">URL: {currentLesson.video_url}</p>
                    </div>
                  )
                ) : (
                  <div className="text-white flex flex-col items-center gap-4">
                    <Play className="h-16 w-16" />
                    <p>Selecione uma aula para assistir</p>
                  </div>
                )}
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{currentLesson?.title || course.title}</h2>
                  {currentLesson?.video_url && (
                    <Badge variant={getVideoType(currentLesson.video_url) === 'youtube' ? 'destructive' : 'secondary'}>
                      {getVideoType(currentLesson.video_url) === 'youtube' ? 'YouTube' : 'Upload'}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatDuration(currentLesson?.duration_minutes)}
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
              <TabsTrigger value="certificado">Progresso</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sobre" className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Sobre o Curso</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{course.description || "Sem descrição disponível."}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <strong>Categoria:</strong>
                      <Badge style={{ backgroundColor: course.category?.color || 'var(--primary)' }}>
                        {course.category?.name || "Sem categoria"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <strong>Nível:</strong>
                      <span>{course.level || "Não especificado"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <strong>Duração:</strong>
                      <span>{course.duration_hours ? `${course.duration_hours}h` : "Não especificado"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <strong>Preço:</strong>
                      <span>{course.price ? `R$ ${course.price}` : "Gratuito"}</span>
                    </div>
                  </div>
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
                    <span className="text-lg font-semibold">-</span>
                    <span className="text-muted-foreground">(0 avaliações)</span>
                  </div>
                  <p className="text-muted-foreground">Sistema de avaliações em desenvolvimento...</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="certificado" className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Progresso do Curso</CardTitle>
                </CardHeader>
                <CardContent>
                  {enrollment ? (
                    <>
                      <p className="text-muted-foreground mb-4">
                        {enrollment.completed_at 
                          ? "Parabéns! Você concluiu este curso." 
                          : "Continue assistindo para completar o curso."
                        }
                      </p>
                      <Progress value={enrollment.progress_percentage} className="mt-4" />
                      <p className="text-sm text-muted-foreground mt-2">
                        {enrollment.progress_percentage}% concluído
                      </p>
                    </>
                  ) : (
                    <p className="text-muted-foreground">
                      Inscreva-se no curso para acompanhar seu progresso.
                    </p>
                  )}
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
              {lessons.length > 0 ? (
                lessons.map((lesson, index) => (
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
                      {lesson.is_preview ? (
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{lesson.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{formatDuration(lesson.duration_minutes)}</span>
                          <Badge variant="outline" className="text-xs">
                            {getVideoType(lesson.video_url) === 'youtube' ? 'YouTube' : 'Upload'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm text-center py-4">
                  Nenhuma aula disponível ainda.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Instrutor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold">
                    {getInstructorInitials()}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{getInstructorName()}</p>
                  <p className="text-sm text-muted-foreground">Instrutor</p>
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