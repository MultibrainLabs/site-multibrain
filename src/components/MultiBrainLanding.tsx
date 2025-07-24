import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Zap, TrendingUp, Users, MessageCircle, Send, Sparkles, Rocket, Target, DollarSign } from "lucide-react";
import heroImage from "@/assets/multibrain-hero.jpg";

const MultiBrainLanding = () => {
  const [chatMessage, setChatMessage] = useState("");

  const pilares = [
    {
      icon: Brain,
      title: "Smart Money",
      description: "Mentoria, Parcerias Estratégicas, Consultorias, DaaS (Director as a Service)",
      color: "cyber-purple",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: DollarSign,
      title: "Captação de Recursos",
      description: "Investimento, Sociedade, Equity",
      color: "neon-green",
      gradient: "from-green-400 to-blue-500"
    },
    {
      icon: Zap,
      title: "Inovação",
      description: "Alavancagem com Novas Tecnologias",
      color: "electric-orange",
      gradient: "from-orange-400 to-yellow-500"
    },
    {
      icon: Target,
      title: "Oportunidades",
      description: "Vagas Estratégicas para empresas do ecossistema",
      color: "cyber-blue",
      gradient: "from-blue-400 to-cyan-500"
    }
  ];

  const empresas = [
    {
      name: "Linkobras",
      type: "Investimento",
      description: "Marketplace de construção e reformas",
      badge: "Investimento"
    },
    {
      name: "Expert Soluções",
      type: "Advisor",
      description: "Empresa de incorporação imobiliária e construção",
      badge: "Advisor"
    },
    {
      name: "Huaw",
      type: "Investimento, Smart Money",
      description: "Empresa de Consultoria de IA",
      badge: "IA & Consultoria"
    }
  ];

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Aqui seria integrada a lógica de IA para avaliar a mensagem
      console.log("Mensagem enviada:", chatMessage);
      setChatMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-neural opacity-50" />
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-pulse" />
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="animate-float">
            <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-glow">
              MultiBrain
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            O cérebro coletivo dos fundadores. Conectamos mentes brilhantes para acelerar o crescimento do seu negócio através de inteligência estratégica compartilhada.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="cyber" size="xl" className="animate-neural-pulse">
              <Sparkles className="mr-2" />
              Conectar ao Ecossistema
            </Button>
            <Button variant="neural" size="xl">
              <Brain className="mr-2" />
              Explorar Pilares
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Empresas Conectadas", value: "50+" },
              { label: "Investimentos Realizados", value: "R$ 100M+" },
              { label: "Fundadores Ativos", value: "200+" },
              { label: "Taxa de Sucesso", value: "95%" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-card/50 border border-primary/20 backdrop-blur-sm">
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilares Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-accent bg-clip-text text-transparent">
            Nossos Pilares
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Quatro dimensões de crescimento para acelerar seu negócio
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pilares.map((pilar, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 hover:shadow-glow-primary">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${pilar.gradient} p-3 group-hover:animate-neural-pulse`}>
                    <pilar.icon className="w-full h-full text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{pilar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center leading-relaxed">
                    {pilar.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Empresas do Ecossistema */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Ecossistema MultiBrain
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Empresas que já se beneficiam da nossa inteligência coletiva
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {empresas.map((empresa, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 bg-card/90 backdrop-blur-sm border-accent/30 hover:border-accent hover:shadow-glow-accent">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{empresa.name}</CardTitle>
                    <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                      {empresa.badge}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm text-primary font-medium">
                    {empresa.type}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{empresa.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Conecte-se Conosco
            </h2>
            <p className="text-muted-foreground text-lg">
              Descreva sua necessidade e nossa IA avaliará como podemos ajudar
            </p>
          </div>
          
          <Card className="bg-card/90 backdrop-blur-sm border-primary/30 shadow-glow-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-primary" />
                Fale com a MultiBrain IA
              </CardTitle>
              <CardDescription>
                Conte-nos sobre seu projeto, necessidade de investimento, ou como podemos colaborar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Ex: Preciso de investimento para minha startup de tecnologia, ou estou buscando mentoria para escalar meu negócio..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="min-h-32 bg-background/50 border-primary/20 focus:border-primary"
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleSendMessage}
                  variant="cyber"
                  disabled={!chatMessage.trim()}
                  className="min-w-32"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Enviar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-primary/20 bg-card/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              MultiBrain
            </h3>
            <p className="text-muted-foreground">
              Conectando mentes. Acelerando futuros.
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
            <span>© 2024 MultiBrain</span>
            <span>•</span>
            <span>Inteligência Coletiva</span>
            <span>•</span>
            <span>Crescimento Exponencial</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MultiBrainLanding;