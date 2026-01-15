import { DollarSign, Rocket, Users, Code, CheckCircle, ArrowRight, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const Acelera = () => {

  const offerings = [
    {
      icon: DollarSign,
      title: "Capital",
      description: "Investimentos de R$ 5K a R$ 100K"
    },
    {
      icon: Rocket,
      title: "Aceleração",
      description: "De 15 a 90 dias de programa intensivo"
    },
    {
      icon: Users,
      title: "Mentoria",
      description: "Acesso a rede de investidores e mentores"
    },
    {
      icon: Code,
      title: "Execução",
      description: "Time técnico dedicado para MVP/produto"
    }
  ];

  const criteria = [
    "Startups em estágio early-stage (pré-seed a seed)",
    "Founders comprometidos full-time (ou dispostos)",
    "Mercado endereçável de no mínimo R$ 1B",
    "Negócio físico ou digital com potencial de escala nacional ou global",
    "MVP funcional ou forte tração inicial"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MultiBrain
            </span>
          </a>
          <a href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Voltar ao Início
            </Button>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8">
            <Rocket className="w-4 h-4" />
            <span className="text-sm font-medium">Programa de Aceleração</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Transforme sua Startup em um{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-cyber-blue bg-clip-text text-transparent">
              Negócio Bilionário
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Capital, mentoria e execução para founders ambiciosos que querem construir 
            empresas que transformam mercados.
          </p>
          
          <Button 
            size="lg"
            onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground px-8 py-6 text-lg"
          >
            Aplicar Agora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* O Que Oferecemos */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O Que Oferecemos
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tudo que você precisa para acelerar o crescimento da sua startup
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((offering, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <offering.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{offering.title}</h3>
                <p className="text-muted-foreground">{offering.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para Quem É */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Para Quem É
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Nosso programa é focado em startups que atendem aos seguintes critérios
            </p>
          </div>
          
          <div className="space-y-4">
            {criteria.map((criterion, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <p className="text-lg text-foreground">{criterion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section id="form-section" className="py-20 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Aplique para o Programa
            </h2>
            <p className="text-muted-foreground text-lg">
              Preencha o formulário abaixo para iniciar sua jornada
            </p>
          </div>
          
          <div className="bg-card rounded-2xl border border-border overflow-hidden min-h-[600px]">
            <iframe
              src="https://form.respondi.app/MRtQPTx9"
              width="100%"
              height="600"
              frameBorder="0"
              style={{ minHeight: '600px', border: 'none' }}
              allow="camera; microphone; autoplay; encrypted-media"
              title="Formulário de Aplicação"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MultiBrain
              </span>
            </div>
            
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} MultiBrain. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Acelera;
