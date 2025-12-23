import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Brain, 
  Rocket, 
  Code, 
  TrendingUp, 
  Users, 
  Zap, 
  Target, 
  Shield,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Building2,
  Lightbulb,
  BarChart3,
  MessageSquare,
  Plane,
  Heart,
  Megaphone,
  Bot,
  PieChart,
  HardHat,
  Award,
  Phone,
  Mail,
  ChevronRight,
  Sparkles,
  Globe,
  Calendar,
  Cloud
} from "lucide-react";

// Animated counter component
const AnimatedCounter = ({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{prefix}{count}{suffix}</span>;
};

// Portfolio data organized by vertical
const portfolioData = {
  "Martech / Adtech": {
    icon: Megaphone,
    color: "text-cyber-blue",
    products: [
      { name: "Cloaker Pro", desc: "Sistema de cloaking para campanhas" },
      { name: "UTMTrack", desc: "Analytics de marketing com integração Meta Ads" },
      { name: "InstaTracker Pro", desc: "Analytics para Instagram" },
    ]
  },
  "AItech (GenAI / Conversational)": {
    icon: Bot,
    color: "text-primary",
    products: [
      { name: "CopyBuilder", desc: "Estúdio de copywriting com IA (Claude integrada)" },
      { name: "PIPO/Dualis", desc: "Chatbot com múltiplas personalidades de IA" },
    ]
  },
  "Healthtech": {
    icon: Heart,
    color: "text-cyber-pink",
    products: [
      { name: "VitaSync", desc: "Plataforma de gestão de saúde pessoal" },
    ]
  },
  "Traveltech": {
    icon: Plane,
    color: "text-accent",
    products: [
      { name: "ChecklistTrip", desc: "Planejamento de viagens com IA" },
    ]
  },
  "DataTech / Analytics": {
    icon: PieChart,
    color: "text-neon-green",
    products: [
      { name: "MegaSena Analyzer", desc: "Análise estatística de loterias" },
    ]
  },
  "Cloudtech (DevOps / Infra Tools)": {
    icon: Cloud,
    color: "text-sky-400",
    products: [
      { name: "AutoStacker", desc: "Automação de infraestrutura e DevOps" },
    ]
  },
  "Construtech / Govtech / Franchisetech": {
    icon: HardHat,
    color: "text-electric-orange",
    products: [
      { name: "LinkObras", desc: "Gestão de obras e construção" },
      { name: "LinkAgente", desc: "CRM para agentes e corretores" },
      { name: "LinkLicita", desc: "Gestão de licitações públicas" },
      { name: "Expert Franquias", desc: "Gestão de franquias" },
    ]
  }
};

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    segment: "",
    message: ""
  });

  const scrollToForm = () => {
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToConsultoria = () => {
    document.getElementById("consultoria")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-4">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-neural opacity-80" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-neural-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-neural-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 container mx-auto text-center max-w-5xl">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Brain className="w-24 h-24 text-primary animate-float" />
              <div className="absolute inset-0 blur-xl bg-primary/30 animate-glow" />
            </div>
          </div>

          {/* Badge */}
          <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 px-4 py-2 text-sm font-semibold animate-pulse">
            <Zap className="w-4 h-4 mr-2" />
            Vagas abertas para 2026
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-cyber-blue bg-clip-text text-transparent leading-tight">
            Transformamos Ideias em Produtos Funcionais em 48h
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Software personalizado + Investimento + Execução. <span className="text-primary font-semibold">Tudo em um só lugar.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="xl" 
              variant="cyber" 
              onClick={scrollToForm}
              className="group"
            >
              <Rocket className="w-5 h-5 mr-2 group-hover:animate-float" />
              Quero receber Investimento
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="xl" 
              variant="neon" 
              onClick={scrollToForm}
              className="group"
            >
              <Code className="w-5 h-5 mr-2" />
              Quero Criar Meu Software em 48h
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
              <div className="text-4xl font-bold text-primary mb-2">
                R$ <AnimatedCounter end={100} suffix="M+" />
              </div>
              <p className="text-muted-foreground">Investidos em startups</p>
            </div>
            <div className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
              <div className="text-4xl font-bold text-cyber-blue mb-2">
                <AnimatedCounter end={50} suffix="+" />
              </div>
              <p className="text-muted-foreground">Empresas no portfólio</p>
            </div>
            <div className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
              <div className="text-4xl font-bold text-accent mb-2">
                <AnimatedCounter end={200} suffix="+" />
              </div>
              <p className="text-muted-foreground">Founders acelerados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Para Quem É Section */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Para <span className="text-primary">Quem</span> É?
          </h2>
          <p className="text-muted-foreground text-center mb-16 text-lg">
            Duas portas de entrada para transformar seu negócio
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Founders */}
            <Card className="bg-card border-primary/30 hover:border-primary transition-all duration-300 group hover:shadow-glow-primary">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Founders & Startups</h3>
                <p className="text-muted-foreground mb-6">
                  Você tem uma ideia inovadora ou uma startup early-stage buscando capital inteligente e execução técnica para escalar.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Investimento + Smart Money</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Equipe técnica dedicada</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Mentoria de executivos</span>
                  </li>
                </ul>
                <Button variant="cyber" className="w-full" onClick={scrollToForm}>
                  Aplicar para Investimento
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Empresários */}
            <Card className="bg-card border-accent/30 hover:border-accent transition-all duration-300 group hover:shadow-glow-accent">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Building2 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Empresários & Corporações</h3>
                <p className="text-muted-foreground mb-6">
                  Você precisa de soluções tecnológicas rápidas ou liderança executiva sob demanda para acelerar resultados.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>Software em 48 horas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>Custo 10x menor que software houses</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>Consultoria executiva on-demand</span>
                  </li>
                </ul>
                <Button variant="neon" className="w-full bg-accent/10 border-accent text-accent hover:bg-accent hover:text-background" onClick={scrollToForm}>
                  Criar Meu Software
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* O Que É a MultiBrain Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Brain className="w-4 h-4 mr-2" />
              Builders & Operators
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              O Que É a <span className="text-primary">MultiBrain</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Não somos apenas investidores. Somos <span className="text-primary font-semibold">Builders & Operators</span> — 
              executivos que investem, constroem e operam junto com você.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border/50 text-center p-8 hover:border-primary/50 transition-all duration-300">
              <div className="w-20 h-20 rounded-full bg-gradient-primary mx-auto mb-6 flex items-center justify-center">
                <DollarSign className="w-10 h-10 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Capital Inteligente</h3>
              <p className="text-muted-foreground">
                Investimento com Smart Money — experiência e rede de contatos além do capital.
              </p>
            </Card>

            <Card className="bg-card border-border/50 text-center p-8 hover:border-cyber-blue/50 transition-all duration-300">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyber-blue to-primary mx-auto mb-6 flex items-center justify-center">
                <Code className="w-10 h-10 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Execução Técnica</h3>
              <p className="text-muted-foreground">
                Equipe de desenvolvimento própria para construir seu produto em tempo recorde.
              </p>
            </Card>

            <Card className="bg-card border-border/50 text-center p-8 hover:border-accent/50 transition-all duration-300">
              <div className="w-20 h-20 rounded-full bg-gradient-accent mx-auto mb-6 flex items-center justify-center">
                <Target className="w-10 h-10 text-background" />
              </div>
              <h3 className="text-xl font-bold mb-3">Operação Conjunta</h3>
              <p className="text-muted-foreground">
                Trabalhamos lado a lado na estratégia, vendas e crescimento do negócio.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Software em 48h Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-neon-green/20 text-neon-green border-neon-green/30">
                <Clock className="w-4 h-4 mr-2" />
                Entrega Expressa
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Software Funcional em <span className="text-neon-green">48 Horas</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Enquanto software houses levam meses e cobram fortunas, nós entregamos seu MVP ou sistema interno funcionando em até 48 horas.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-neon-green/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-neon-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Login e Autenticação</h4>
                    <p className="text-sm text-muted-foreground">Sistema seguro de usuários pronto para usar</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-neon-green/10 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-neon-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Banco de Dados Completo</h4>
                    <p className="text-sm text-muted-foreground">Estrutura escalável para seus dados</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-neon-green/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-neon-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Módulos Sob Medida</h4>
                    <p className="text-sm text-muted-foreground">Funcionalidades específicas para seu negócio</p>
                  </div>
                </div>
              </div>

              <Button variant="neon" size="lg" onClick={scrollToForm}>
                Solicitar Orçamento Express
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="relative">
              <Card className="bg-card border-neon-green/30 p-8">
                <h3 className="text-xl font-bold mb-6 text-center">Comparativo de Custos</h3>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Software House Tradicional</span>
                      <span className="text-destructive font-bold">R$ 50.000+</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>3-6 meses de desenvolvimento</span>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-neon-green/10 border border-neon-green/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">MultiBrain 48h</span>
                      <span className="text-neon-green font-bold">A partir de R$ 5.000</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="w-4 h-4" />
                      <span>48 horas para entrega</span>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-6">
                  Economize até <span className="text-neon-green font-bold">90%</span> do investimento tradicional
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Investimento para Startups Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <TrendingUp className="w-4 h-4 mr-2" />
              Venture Capital
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Investimento para <span className="text-primary">Startups</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Buscamos startups early-stage com founders ambiciosos e mercados bilionários.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-card border-border/50 p-6 text-center hover:border-primary/50 transition-all">
              <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Capital</h3>
              <p className="text-sm text-muted-foreground">Tickets de R$ 100K a R$ 2M</p>
            </Card>
            <Card className="bg-card border-border/50 p-6 text-center hover:border-cyber-blue/50 transition-all">
              <Users className="w-12 h-12 text-cyber-blue mx-auto mb-4" />
              <h3 className="font-bold mb-2">Smart Money</h3>
              <p className="text-sm text-muted-foreground">Rede de 500+ investidores</p>
            </Card>
            <Card className="bg-card border-border/50 p-6 text-center hover:border-accent/50 transition-all">
              <Code className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-bold mb-2">Execução</h3>
              <p className="text-sm text-muted-foreground">Time técnico dedicado</p>
            </Card>
            <Card className="bg-card border-border/50 p-6 text-center hover:border-neon-green/50 transition-all">
              <Globe className="w-12 h-12 text-neon-green mx-auto mb-4" />
              <h3 className="font-bold mb-2">Expansão</h3>
              <p className="text-sm text-muted-foreground">Go-to-market acelerado</p>
            </Card>
          </div>

          <div className="text-center">
            <Button variant="cyber" size="xl" onClick={scrollToForm}>
              <Rocket className="w-5 h-5 mr-2" />
              Aplicar para Investimento
            </Button>
          </div>
        </div>
      </section>

      {/* Portfólio Section */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30">
              <Award className="w-4 h-4 mr-2" />
              +13 Produtos
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Nosso <span className="text-cyber-blue">Portfólio</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Produtos desenvolvidos e operados em diferentes verticais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(portfolioData).map(([vertical, data]) => (
              <Card key={vertical} className="bg-card border-border/50 hover:border-primary/30 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center ${data.color}`}>
                      <data.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm">{vertical}</h3>
                  </div>
                  <div className="space-y-3">
                    {data.products.map((product) => (
                      <div key={product.name} className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                        <h4 className={`font-semibold text-sm ${data.color}`}>{product.name}</h4>
                        <p className="text-xs text-muted-foreground">{product.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Consultoria Executiva Section */}
      <section id="consultoria" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
              <Users className="w-4 h-4 mr-2" />
              Leadership On-Demand
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Consultoria <span className="text-accent">Executiva</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Liderança experiente sob demanda para acelerar seus resultados
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* DaaS */}
            <Card className="bg-card border-primary/30 hover:border-primary transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <CardContent className="p-8 relative">
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">Premium</Badge>
                <h3 className="text-2xl font-bold mb-2">Director as a Service</h3>
                <p className="text-primary font-semibold mb-4">DaaS</p>
                <p className="text-muted-foreground mb-6 text-sm">
                  Direção Estratégica Sem o Overhead de uma Contratação Permanente. 
                  C-Levels poliglotas com 15+ anos de experiência.
                </p>
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Ideal para:</p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      Scale-ups em expansão acelerada
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      Empresas em reestruturação
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      Transformação digital e IA
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      Novas unidades de negócio
                    </li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 mb-6">
                  <p className="text-xs text-muted-foreground">A partir de</p>
                  <p className="text-2xl font-bold text-primary">R$ 45.000<span className="text-sm font-normal">/mês</span></p>
                  <p className="text-xs text-muted-foreground">Dedicação parcial</p>
                </div>
                <Button variant="cyber" className="w-full" onClick={scrollToForm}>
                  Agende uma Conversa Estratégica
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* MaaS */}
            <Card className="bg-card border-cyber-blue/30 hover:border-cyber-blue transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-blue/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <CardContent className="p-8 relative">
                <Badge className="mb-4 bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30">Flexível</Badge>
                <h3 className="text-2xl font-bold mb-2">Manager as a Service</h3>
                <p className="text-cyber-blue font-semibold mb-4">MaaS</p>
                <p className="text-muted-foreground mb-6 text-sm">
                  Gestão Especializada para Resultados Imediatos. 
                  Metodologias ágeis, OKRs e gestão por resultados.
                </p>
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Aplicações:</p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-cyber-blue" />
                      Implementação de PMO
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-cyber-blue" />
                      Gestão de squads ágeis
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-cyber-blue" />
                      Estruturação comercial/CS
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-cyber-blue" />
                      Turnaround de equipes
                    </li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-cyber-blue/10 mb-6">
                  <p className="text-xs text-muted-foreground">A partir de</p>
                  <p className="text-2xl font-bold text-cyber-blue">R$ 20.000<span className="text-sm font-normal">/mês</span></p>
                  <p className="text-xs text-muted-foreground">Modelo flexível</p>
                </div>
                <Button className="w-full bg-cyber-blue/10 border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-background" onClick={scrollToForm}>
                  Solicite uma Proposta
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* FastLaunch */}
            <Card className="bg-card border-accent/30 hover:border-accent transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <CardContent className="p-8 relative">
                <Badge className="mb-4 bg-accent/10 text-accent border-accent/30">30 Dias</Badge>
                <h3 className="text-2xl font-bold mb-2">FastLaunch Sprint</h3>
                <p className="text-accent font-semibold mb-4">Diagnóstico + Tração</p>
                <p className="text-muted-foreground mb-6 text-sm">
                  Resultados Tangíveis em 4 Semanas. 
                  Metodologia proprietária com +200 empresas aceleradas.
                </p>
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Entregáveis:</p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Diagnóstico 360° completo
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      3-5 quick-wins implementadas
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Dashboard de KPIs
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Plano de 90 dias detalhado
                    </li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-accent/10 mb-6">
                  <p className="text-xs text-muted-foreground">Investimento único</p>
                  <p className="text-2xl font-bold text-accent">R$ 45.000</p>
                  <p className="text-xs text-muted-foreground">Pagamento único</p>
                </div>
                <Button className="w-full bg-accent/10 border border-accent text-accent hover:bg-accent hover:text-background" onClick={scrollToForm}>
                  Reserve Sua Sprint
                  <Calendar className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Por Que MultiBrain */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="bg-card/50 border-border/50 p-6 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-bold mb-1">Velocidade</h4>
              <p className="text-xs text-muted-foreground">Profissionais em até 7 dias</p>
            </Card>
            <Card className="bg-card/50 border-border/50 p-6 text-center">
              <Shield className="w-8 h-8 text-cyber-blue mx-auto mb-3" />
              <h4 className="font-bold mb-1">Flexibilidade</h4>
              <p className="text-xs text-muted-foreground">Contratos mensais sem multa</p>
            </Card>
            <Card className="bg-card/50 border-border/50 p-6 text-center">
              <Award className="w-8 h-8 text-accent mx-auto mb-3" />
              <h4 className="font-bold mb-1">Expertise</h4>
              <p className="text-xs text-muted-foreground">Pool com 50+ executivos</p>
            </Card>
            <Card className="bg-card/50 border-border/50 p-6 text-center">
              <Target className="w-8 h-8 text-neon-green mx-auto mb-3" />
              <h4 className="font-bold mb-1">ROI Garantido</h4>
              <p className="text-xs text-muted-foreground">Métricas em contrato</p>
            </Card>
          </div>

          {/* Garantia */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 p-8 text-center">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Garantia MultiBrain</h3>
            <p className="text-muted-foreground mb-4">
              Se em 15 dias você não perceber valor tangível, <span className="text-primary font-semibold">devolvemos 100% do investimento.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:+5551993410110" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                +55 51 993410110
              </a>
              <a href="mailto:charles@multibrain.com.br" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                charles@multibrain.com.br
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Nosso <span className="text-primary">Manifesto</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Os princípios que guiam tudo que fazemos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card border-border/50 p-8 hover:border-primary/50 transition-all">
              <MessageSquare className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Verdade Radical</h3>
              <p className="text-muted-foreground">
                Feedback honesto e direto. Sem rodeios. Crescemos juntos através da transparência.
              </p>
            </Card>
            <Card className="bg-card border-border/50 p-8 hover:border-cyber-blue/50 transition-all">
              <Rocket className="w-10 h-10 text-cyber-blue mb-4" />
              <h3 className="text-xl font-bold mb-3">Pensar Grande</h3>
              <p className="text-muted-foreground">
                Mercados bilionários. Impacto massivo. Não perdemos tempo com problemas pequenos.
              </p>
            </Card>
            <Card className="bg-card border-border/50 p-8 hover:border-accent/50 transition-all">
              <Zap className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-3">Velocidade Obsessiva</h3>
              <p className="text-muted-foreground">
                Execução rápida supera planejamento perfeito. Iteramos e aprendemos em tempo real.
              </p>
            </Card>
            <Card className="bg-card border-border/50 p-8 hover:border-neon-green/50 transition-all">
              <Award className="w-10 h-10 text-neon-green mb-4" />
              <h3 className="text-xl font-bold mb-3">Excelência Implacável</h3>
              <p className="text-muted-foreground">
                Bom não é suficiente. Buscamos a excelência em cada detalhe, sempre.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="py-24 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Rocket className="w-4 h-4 mr-2" />
              Aplique Agora
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Vamos <span className="text-primary">Conversar</span>?
            </h2>
            <p className="text-muted-foreground">
              Preencha o formulário e nossa equipe entrará em contato em até 24h
            </p>
          </div>

          <Card className="bg-card border-primary/30 p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome Completo</label>
                  <Input 
                    placeholder="Seu nome" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-secondary border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input 
                    type="email"
                    placeholder="seu@email.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Empresa / Startup</label>
                <Input 
                  placeholder="Nome da sua empresa" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="bg-secondary border-border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">O que você busca?</label>
                <select 
                  className="w-full p-3 rounded-lg bg-secondary border border-border text-foreground"
                  value={formData.segment}
                  onChange={(e) => setFormData({...formData, segment: e.target.value})}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="investimento">Quero receber Investimento</option>
                  <option value="software">Quero criar meu Software em 48h</option>
                  <option value="consultoria">Quero Consultoria Executiva (DaaS/MaaS)</option>
                  <option value="fastlaunch">Quero o FastLaunch Sprint (30 dias)</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Conte-nos mais sobre seu projeto</label>
                <Textarea 
                  placeholder="Descreva brevemente sua ideia, desafio ou necessidade..." 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="bg-secondary border-border min-h-[120px]"
                />
              </div>

              <Button variant="cyber" size="xl" className="w-full">
                Enviar Aplicação
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Ao enviar, você concorda com nossa política de privacidade. 
                Responderemos em até 24h úteis.
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">MultiBrain</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 text-center sm:text-left">
              <a href="tel:+5551993410110" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                +55 51 993410110
              </a>
              <a href="mailto:charles@multibrain.com.br" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                charles@multibrain.com.br
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border/50 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 MultiBrain. Builders & Operators.
            </p>
            <p className="text-xs text-muted-foreground/70 mt-2">
              Transformando ideias em produtos funcionais desde 2019.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
