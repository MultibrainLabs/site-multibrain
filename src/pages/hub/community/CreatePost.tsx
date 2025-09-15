import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Image, Link as LinkIcon, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCreatePost, PostData } from "@/hooks/useCreatePost";

const CreatePost = () => {
  const { savePost, loading } = useCreatePost();
  const [postType, setPostType] = useState("discussion");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  
  // Form state
  const [postData, setPostData] = useState<PostData>({
    title: "",
    content: "",
    post_type: "discussion",
    tags: [],
    visibility: "public"
  });

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const updatePostData = (field: keyof PostData, value: string | string[]) => {
    setPostData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = () => {
    const finalPostData = { ...postData, tags, post_type: postType };
    savePost(finalPostData, false);
  };

  const handlePublish = () => {
    const finalPostData = { ...postData, tags, post_type: postType };
    savePost(finalPostData, true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild className="gap-2 mb-4">
            <Link to="/hub/community">
              <ArrowLeft className="h-4 w-4" />
              Voltar à Comunidade
            </Link>
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Criar Nova Publicação
          </h1>
          <p className="text-muted-foreground">
            Compartilhe conhecimento e conecte-se com a comunidade
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Nova Publicação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tipo de Post */}
            <div className="space-y-2">
              <Label>Tipo de Publicação</Label>
              <Select value={postType} onValueChange={setPostType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discussion">💬 Discussão</SelectItem>
                  <SelectItem value="question">❓ Pergunta</SelectItem>
                  <SelectItem value="resource">📎 Compartilhar Recurso</SelectItem>
                  <SelectItem value="celebration">🎉 Celebração</SelectItem>
                  <SelectItem value="event">📅 Evento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Grupo (opcional) */}
            <div className="space-y-2">
              <Label>Publicar em Grupo (opcional)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um grupo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai-entrepreneurs">Empreendedores IA</SelectItem>
                  <SelectItem value="digital-marketing">Marketing Digital</SelectItem>
                  <SelectItem value="investments">Investimentos & Funding</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="title">
                {postType === 'question' ? 'Sua Pergunta' : 
                 postType === 'resource' ? 'Título do Recurso' :
                 postType === 'celebration' ? 'O que você está celebrando?' :
                 postType === 'event' ? 'Nome do Evento' : 'Título da Discussão'}
              </Label>
              <Input 
                id="title" 
                placeholder={
                  postType === 'question' ? 'Como posso implementar IA no meu negócio?' :
                  postType === 'resource' ? 'Ferramenta incrível para automação' :
                  postType === 'celebration' ? 'Conquistei meu primeiro cliente!' :
                  postType === 'event' ? 'Workshop: IA para Iniciantes' :
                  'Vamos discutir sobre...'
                }
                value={postData.title}
                onChange={(e) => updatePostData('title', e.target.value)}
              />
            </div>

            {/* Conteúdo */}
            <div className="space-y-2">
              <Label htmlFor="content">
                {postType === 'question' ? 'Detalhes da Pergunta' :
                 postType === 'resource' ? 'Descrição do Recurso' :
                 postType === 'celebration' ? 'Conte sua história!' :
                 postType === 'event' ? 'Detalhes do Evento' : 'Conteúdo'}
              </Label>
              <Textarea 
                id="content" 
                rows={6}
                placeholder={
                  postType === 'question' ? 'Descreva sua situação e o que você gostaria de saber...' :
                  postType === 'resource' ? 'Por que este recurso é útil? Como usar?' :
                  postType === 'celebration' ? 'Compartilhe sua conquista e inspire outros!' :
                  postType === 'event' ? 'Data, horário, local e como participar...' :
                  'Compartilhe seus pensamentos, experiências ou insights...'
                }
                value={postData.content}
                onChange={(e) => updatePostData('content', e.target.value)}
              />
            </div>

            {/* Link (para recursos) */}
            {postType === 'resource' && (
              <div className="space-y-2">
                <Label htmlFor="resource-link">Link do Recurso</Label>
                <Input 
                  id="resource-link" 
                  placeholder="https://exemplo.com/ferramenta"
                  type="url"
                  value={postData.resource_link || ""}
                  onChange={(e) => updatePostData('resource_link', e.target.value)}
                />
              </div>
            )}

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags (ajuda outros a encontrar seu post)</Label>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ex: IA, Startup, Marketing..."
                  className="flex-1"
                />
                <Button onClick={addTag} variant="outline">
                  Adicionar
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Anexos */}
            <div className="space-y-2">
              <Label>Anexos (opcional)</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
                  <Image className="h-6 w-6" />
                  <span className="text-sm">Adicionar Imagem</span>
                </Button>
                <Button variant="outline" className="gap-2 h-auto p-4 flex-col">
                  <LinkIcon className="h-6 w-6" />
                  <span className="text-sm">Adicionar Link</span>
                </Button>
              </div>
            </div>

            {/* Opções de Privacidade */}
            <div className="space-y-2">
              <Label>Visibilidade</Label>
              <Select value={postData.visibility} onValueChange={(value) => updatePostData('visibility', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">🌍 Público (toda a comunidade)</SelectItem>
                  <SelectItem value="connections">👥 Apenas conexões</SelectItem>
                  <SelectItem value="group">👨‍👩‍👧‍👦 Apenas membros do grupo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ações */}
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
                {loading ? "Publicando..." : "Publicar"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePost;