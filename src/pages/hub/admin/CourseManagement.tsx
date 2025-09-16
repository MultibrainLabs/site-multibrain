import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Users, 
  Clock, 
  BookOpen,
  Filter
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  enrollments_count?: number;
  lessons_count?: number;
}

const CourseManagement = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          instructor:profiles!instructor_id(first_name, last_name),
          category:course_categories(name, color)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Buscar contagens de inscrições e aulas para cada curso
      const coursesWithCounts = await Promise.all((data || []).map(async (course) => {
        const [enrollmentsResult, lessonsResult] = await Promise.all([
          supabase
            .from('course_enrollments')
            .select('id', { count: 'exact' })
            .eq('course_id', course.id),
          supabase
            .from('course_lessons')
            .select('id', { count: 'exact' })
            .eq('course_id', course.id)
        ]);

        return {
          ...course,
          enrollments_count: enrollmentsResult.count || 0,
          lessons_count: lessonsResult.count || 0
        };
      }));

      setCourses(coursesWithCounts);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os cursos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleCourseVisibility = async (courseId: string, isPublished: boolean) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ is_published: !isPublished })
        .eq('id', courseId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `Curso ${!isPublished ? 'publicado' : 'despublicado'} com sucesso.`,
      });

      fetchCourses();
    } catch (error) {
      console.error('Error toggling course visibility:', error);
      toast({
        title: "Erro",
        description: "Não foi possível alterar a visibilidade do curso.",
        variant: "destructive",
      });
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      // Primeiro deletar aulas relacionadas
      await supabase
        .from('course_lessons')
        .delete()
        .eq('course_id', courseId);

      // Depois deletar inscrições relacionadas
      await supabase
        .from('course_enrollments')
        .delete()
        .eq('course_id', courseId);

      // Por fim deletar o curso
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Curso excluído com sucesso.",
      });

      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o curso.",
        variant: "destructive",
      });
    }
  };

  const getInstructorName = (instructor?: { first_name?: string; last_name?: string }) => {
    if (!instructor) return "Instrutor não encontrado";
    const { first_name, last_name } = instructor;
    return [first_name, last_name].filter(Boolean).join(' ') || "Sem nome";
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getInstructorName(course.instructor).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "published" && course.is_published) ||
                         (statusFilter === "draft" && !course.is_published);

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="space-y-6">
          <Skeleton className="h-16 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Cursos</h1>
          <p className="text-muted-foreground">Gerencie todos os cursos da plataforma</p>
        </div>
        <Button asChild>
          <Link to="/hub/courses/create">
            <Plus className="h-4 w-4 mr-2" />
            Novo Curso
          </Link>
        </Button>
      </div>

      {/* Filtros */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título ou instrutor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={statusFilter} onValueChange={(value: "all" | "published" | "draft") => setStatusFilter(value)}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os cursos</SelectItem>
                  <SelectItem value="published">Publicados</SelectItem>
                  <SelectItem value="draft">Rascunhos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Cursos</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Publicados</p>
                <p className="text-2xl font-bold">{courses.filter(c => c.is_published).length}</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rascunhos</p>
                <p className="text-2xl font-bold">{courses.filter(c => !c.is_published).length}</p>
              </div>
              <EyeOff className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Badge variant={course.is_published ? "default" : "secondary"}>
                  {course.is_published ? "Publicado" : "Rascunho"}
                </Badge>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCourseVisibility(course.id, course.is_published)}
                  >
                    {course.is_published ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/hub/courses/${course.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir Curso</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir o curso "{course.title}"? 
                          Esta ação não pode ser desfeita e todos os dados relacionados serão perdidos.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteCourse(course.id)}>
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Por {getInstructorName(course.instructor)}
                </p>
              </div>
              
              {course.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {course.category && (
                  <Badge 
                    variant="outline" 
                    style={{ backgroundColor: course.category.color || 'var(--primary)', color: 'white' }}
                  >
                    {course.category.name}
                  </Badge>
                )}
                {course.level && (
                  <Badge variant="outline">{course.level}</Badge>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.enrollments_count || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.lessons_count || 0} aulas</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration_hours || 0}h</span>
                </div>
              </div>

              {course.price !== undefined && (
                <div className="text-right">
                  <span className="text-lg font-bold text-primary">
                    {course.price > 0 ? `R$ ${course.price}` : "Gratuito"}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Nenhum curso encontrado</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== "all" 
              ? "Tente ajustar os filtros para encontrar cursos."
              : "Comece criando seu primeiro curso!"
            }
          </p>
          {!searchTerm && statusFilter === "all" && (
            <Button asChild>
              <Link to="/hub/courses/create">
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Curso
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseManagement;