import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Youtube, Upload, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCreateCourse, CourseLesson, CourseData } from "@/hooks/useCreateCourse";

const CreateCourse = () => {
  const { saveCourse, loading } = useCreateCourse();
  const [lessons, setLessons] = useState<CourseLesson[]>([
    { id: 1, title: "", duration: "", type: "youtube", url: "" }
  ]);
  
  // Form state
  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    description: "",
    category_id: "",
    price: 0,
    duration_hours: 0,
    level: ""
  });

  const addLesson = () => {
    const newLesson: CourseLesson = {
      id: Date.now(),
      title: "",
      duration: "",
      type: "youtube" as const,
      url: ""
    };
    setLessons([...lessons, newLesson]);
  };

  const removeLesson = (id: number) => {
    setLessons(lessons.filter(lesson => lesson.id !== id));
  };

  const updateLesson = (id: number, field: string, value: string) => {
    setLessons(lessons.map(lesson => 
      lesson.id === id ? { ...lesson, [field]: value } : lesson
    ));
  };

  const updateCourseData = (field: keyof CourseData, value: string | number) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = () => {
    saveCourse(courseData, lessons, false);
  };

  const handlePublish = () => {
    saveCourse(courseData, lessons, true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="gap-2 mb-4">
          <Link to="/hub/courses">
            <ArrowLeft className="h-4 w-4" />
            Voltar aos Cursos
          </Link>
        </Button>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Criar Novo Curso
        </h1>
        <p className="text-muted-foreground">
          Compartilhe seu conhecimento com a comunidade MultiBrain
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Informações Básicas</TabsTrigger>
            <TabsTrigger value="lessons">Aulas</TabsTrigger>
            <TabsTrigger value="publish">Publicar</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Informações do Curso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Curso</Label>
                    <Input 
                      id="title" 
                      placeholder="Ex: IA para Negócios" 
                      value={courseData.title}
                      onChange={(e) => updateCourseData('title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select value={courseData.category_id} onValueChange={(value) => updateCourseData('category_id', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="empreendedorismo">Empreendedorismo</SelectItem>
                        <SelectItem value="financas">Finanças</SelectItem>
                        <SelectItem value="gestao">Gestão</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Descreva o que os alunos vão aprender neste curso..."
                    rows={4}
                    value={courseData.description}
                    onChange={(e) => updateCourseData('description', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="199" 
                      value={courseData.price}
                      onChange={(e) => updateCourseData('price', Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração Total (horas)</Label>
                    <Input 
                      id="duration" 
                      type="number" 
                      placeholder="4.5" 
                      value={courseData.duration_hours}
                      onChange={(e) => updateCourseData('duration_hours', Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Nível</Label>
                    <Select value={courseData.level} onValueChange={(value) => updateCourseData('level', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o nível" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iniciante">Iniciante</SelectItem>
                        <SelectItem value="intermediario">Intermediário</SelectItem>
                        <SelectItem value="avancado">Avançado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lessons" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Aulas do Curso</CardTitle>
                  <Button onClick={addLesson} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Adicionar Aula
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {lessons.map((lesson, index) => (
                  <Card key={lesson.id} className="bg-muted/30">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Aula {index + 1}</h4>
                        {lessons.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeLesson(lesson.id)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Título da Aula</Label>
                          <Input
                            placeholder="Ex: Introdução à IA"
                            value={lesson.title}
                            onChange={(e) => updateLesson(lesson.id, 'title', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Duração</Label>
                          <Input
                            placeholder="Ex: 15min"
                            value={lesson.duration}
                            onChange={(e) => updateLesson(lesson.id, 'duration', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Tipo de Vídeo</Label>
                        <div className="flex gap-2">
                          <Button
                            variant={lesson.type === 'youtube' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => updateLesson(lesson.id, 'type', 'youtube')}
                            className="gap-2"
                          >
                            <Youtube className="h-4 w-4" />
                            YouTube
                          </Button>
                          <Button
                            variant={lesson.type === 'upload' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => updateLesson(lesson.id, 'type', 'upload')}
                            className="gap-2"
                          >
                            <Upload className="h-4 w-4" />
                            Upload
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>
                          {lesson.type === 'youtube' ? 'URL do YouTube' : 'Arquivo de Vídeo'}
                        </Label>
                        {lesson.type === 'youtube' ? (
                          <Input
                            placeholder="https://www.youtube.com/watch?v=..."
                            value={lesson.url}
                            onChange={(e) => updateLesson(lesson.id, 'url', e.target.value)}
                          />
                        ) : (
                          <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-muted-foreground">
                              Clique para fazer upload do vídeo
                            </p>
                            <Badge variant="outline" className="mt-2">
                              MP4, WebM até 500MB
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publish" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Revisar e Publicar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium mb-2">Resumo do Curso</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Aulas:</span>
                      <span className="ml-2">{lessons.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Categoria:</span>
                      <span className="ml-2">Tecnologia</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Opções de Publicação</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="cursor-pointer hover:bg-muted/30 transition-colors">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-medium">Rascunho</h4>
                        <p className="text-sm text-muted-foreground">
                          Salvar para continuar editando depois
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer hover:bg-muted/30 transition-colors border-primary">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-medium">Publicar</h4>
                        <p className="text-sm text-muted-foreground">
                          Disponibilizar para a comunidade
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleSaveDraft}
                    disabled={loading}
                  >
                    {loading ? "Salvando..." : "Salvar como Rascunho"}
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={handlePublish}
                    disabled={loading}
                  >
                    {loading ? "Publicando..." : "Publicar Curso"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreateCourse;