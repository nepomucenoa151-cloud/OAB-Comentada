import React, { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ChevronRight, ChevronLeft, GraduationCap, BookOpen, Target, ArrowRight, ShieldCheck, X, ShoppingBag, Gift, Sparkles, Calendar, FileText } from "lucide-react";

const CAROUSEL_IMAGES = [
  {
    src: "https://i.ibb.co/ZtngG03/Captura-de-tela-2026-11-12-083021.png",
    alt: "Amostra do Material 1",
    link: "https://ibb.co/5tNjGPd"
  },
  {
    src: "https://i.ibb.co/xKtBJ76Q/Captura-de-tela-2026-11-12-083052.png",
    alt: "Amostra do Material 2",
    link: "https://ibb.co/0pR6hGr3"
  },
  {
    src: "https://i.ibb.co/DPNY1kWL/Captura-de-tela-2026-11-12-083112.png",
    alt: "Amostra do Material 3",
    link: "https://ibb.co/nqTBwfmR"
  },
  {
    src: "https://i.ibb.co/S7r2n1Bj/Captura-de-tela-2026-11-12-083137.png",
    alt: "Amostra do Material 4",
    link: "https://ibb.co/1J63qpTg"
  },
  {
    src: "https://i.ibb.co/B2pk8GtQ/Captura-de-tela-2026-11-12-083206.png",
    alt: "Amostra do Material 5",
    link: "https://ibb.co/SwjSqcPM"
  }
];

function AutomaticCarousel() {
  // Duplicando as imagens para fluxo contínuo infinito e perfeito
  const duplicatedImages = [
    ...CAROUSEL_IMAGES,
    ...CAROUSEL_IMAGES,
    ...CAROUSEL_IMAGES,
    ...CAROUSEL_IMAGES
  ];

  return (
    <div className="relative w-full overflow-hidden py-4 my-6">
      {/* Esfumaçado suave nas extremidades para entrada/saída elegante */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-brand-dark to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-brand-dark to-transparent z-10" />

      {/* Imagens passando continuamente uma do lado da outra */}
      <div className="animate-marquee-infinite flex gap-6 items-center">
        {duplicatedImages.map((img, index) => (
          <div
            key={index}
            className="shrink-0 transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
          >
            <a
              href={img.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              title="Amostra do material - clique para ampliar"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-[280px] sm:h-[360px] md:h-[420px] w-auto max-w-none rounded-2xl shadow-2xl shadow-black/80 object-contain hover:ring-2 hover:ring-[#d7ff00]/60 transition-all duration-300"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

const PURCHASERS = [
  { name: "Lucas Mendes", location: "São Paulo - SP", time: "há 2 minutos" },
  { name: "Mariana Siqueira", location: "Belo Horizonte - MG", time: "há 1 minuto" },
  { name: "Rodrigo Alves", location: "Rio de Janeiro - RJ", time: "há 3 minutos" },
  { name: "Camila Santos", location: "Curitiba - PR", time: "há 4 minutos" },
  { name: "Felipe Costa", location: "Brasília - DF", time: "há 2 minutos" },
  { name: "Juliana Lima", location: "Salvador - BA", time: "há 1 minuto" },
  { name: "Gabriel Ribeiro", location: "Porto Alegre - RS", time: "há 5 minutos" },
  { name: "Beatriz Souza", location: "Campinas - SP", time: "há 2 minutos" },
  { name: "Matheus Oliveira", location: "Goiânia - GO", time: "há 3 minutos" },
  { name: "Fernanda Rocha", location: "Fortaleza - CE", time: "há 1 minuto" },
  { name: "Bruno Nogueira", location: "Florianópolis - SC", time: "há 4 minutos" },
  { name: "Larissa Ferreira", location: "Recife - PE", time: "há 2 minutos" },
  { name: "Thiago Martins", location: "Vitória - ES", time: "há 3 minutos" },
  { name: "Amanda Barbosa", location: "Manaus - AM", time: "há 6 minutos" },
  { name: "Rafael Duarte", location: "Santos - SP", time: "há 2 minutos" },
  { name: "Letícia Cardoso", location: "Ribeirão Preto - SP", time: "há 1 minuto" },
];

const FadeIn = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string; key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [notification, setNotification] = useState<{
    id: number;
    name: string;
    location: string;
    time: string;
  } | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let hideTimeoutId: NodeJS.Timeout;

    const showRandomNotification = () => {
      const randomPurchaser = PURCHASERS[Math.floor(Math.random() * PURCHASERS.length)];
      setNotification({
        id: Date.now(),
        ...randomPurchaser,
      });

      // Fica visível por 5 segundos
      hideTimeoutId = setTimeout(() => {
        setNotification(null);
        // Delay de 9 segundos até a próxima notificação aleatória
        timeoutId = setTimeout(showRandomNotification, 9000);
      }, 5000);
    };

    // Delay inicial de 9 segundos para exibir a primeira notificação
    timeoutId = setTimeout(showRandomNotification, 9000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(hideTimeoutId);
    };
  }, []);

  return (
    <div className="bg-brand-dark text-white min-h-screen font-sans selection:bg-brand-primary selection:text-brand-dark relative">
      {/* Notificação Flutuante de Compra - Canto Superior Direito */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 pointer-events-none max-w-sm w-[calc(100vw-2rem)] sm:w-auto">
        <AnimatePresence>
          {notification && (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -20, x: 25, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.9, transition: { duration: 0.25 } }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
              className="pointer-events-auto bg-emerald-800/95 backdrop-blur-md border-2 border-yellow-400/60 rounded-2xl p-3.5 sm:p-4 shadow-2xl shadow-black/70 flex items-start gap-3 relative overflow-hidden"
            >
              {/* Barra luminosa lateral em amarelo */}
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-yellow-300 via-yellow-400 to-amber-300" />
              
              {/* Ícone de sacola em amarelo com radar ativo */}
              <div className="relative shrink-0 mt-0.5">
                <div className="w-10 h-10 rounded-full bg-emerald-950/70 border border-yellow-400/50 flex items-center justify-center text-yellow-300 shadow-inner">
                  <ShoppingBag className="w-5 h-5 text-yellow-300" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
                </span>
              </div>

              {/* Informações da compra em branco e amarelo */}
              <div className="flex-1 pr-2">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-yellow-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-300" /> Compra Confirmada
                  </span>
                  <span className="text-yellow-100/80 text-[10px] font-medium">• {notification.time}</span>
                </div>

                <p className="text-sm font-extrabold text-white leading-tight">
                  {notification.name}
                  <span className="text-xs font-semibold text-yellow-200 block sm:inline sm:ml-1.5">
                    ({notification.location})
                  </span>
                </p>

                <p className="text-xs text-white/95 mt-1 font-medium">
                  Acabou de comprar o <span className="font-black text-yellow-300 underline decoration-yellow-400/50">Pacote Completo (R$ 47)</span>
                </p>
              </div>

              {/* Botão de fechar */}
              <button
                onClick={() => setNotification(null)}
                className="text-white/80 hover:text-yellow-300 transition-colors p-1 -mr-1 -mt-1 rounded-lg hover:bg-emerald-900/50 cursor-pointer"
                aria-label="Fechar notificação"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2000&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-brand-dark via-brand-dark/90 to-brand-dark/40" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 py-20">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="bg-[#d7ff00] text-black font-display font-black text-3xl md:text-4xl px-5 py-2 uppercase tracking-wide inline-block shadow-lg">OAB HACKEADA</div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8"
            >
              Garanta <span className="text-brand-primary">50+ pontos</span> na prova da 1ª fase: O método prático com mais de <span className="text-brand-primary underline decoration-brand-accent">500 questões comentadas</span> para sua aprovação.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl"
            >
              Descubra o padrão da banca FGV, aprenda o que realmente cai na prova e estude de forma inteligente mesmo com pouco tempo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6"
            >
              <h2 className="text-2xl md:text-4xl font-display font-black tracking-wider text-[#d7ff00] uppercase inline-block border-b-4 border-[#d7ff00] pb-2">
                DESCUBRA O PADRÃO AGORA!
              </h2>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-brand-dark px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">Parece bom demais para ser verdade?</h2>
              <p className="text-gray-400 text-lg">Veja como centenas de alunos estão acelerando seus resultados.</p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { id: "WwMrJS0d2Rw", name: "Bruna Palhão - Rio das Pedras Sp" },
              { id: "QwgQt58RNes", name: "Camila Felix - Campinas -Sp" },
              { id: "8_yiiG3CfrQ", name: "Renata Silva - Fortaleza -CE" }
            ].map((item, i) => (
              <FadeIn key={i} delay={0.1 * (i + 1)}>
                <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden p-4 hover:border-brand-primary/30 transition-all duration-300 shadow-2xl relative group bg-linear-to-b from-white/5 to-transparent">
                  <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black/40 shadow-inner">
                    <iframe
                      src={`https://www.youtube.com/embed/${item.id}`}
                      title={`Depoimento de ${item.name}`}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-view"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-xs font-bold text-[#d7ff00] tracking-wide uppercase">
                      ★ {item.name}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* O Que Você Recebe Section */}
      <section className="py-24 bg-brand-dark border-t border-b border-white/5 px-6">
        <div className="container mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="bg-[#d7ff00]/10 border border-[#d7ff00]/20 text-[#d7ff00] text-xs md:text-sm font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 inline-block">
                CONTEÚDO COMPLETO
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                O QUE VOCÊ RECEBE NO <span className="bg-[#d7ff00] text-black px-4 py-1.5 inline-block mx-1">OAB HACKEADA</span>
              </h2>
            </div>
          </FadeIn>

          {/* Carrossel Automático de Amostras do Material */}
          <FadeIn>
            <AutomaticCarousel />
          </FadeIn>

          {/* Sendo Elas Grid Header */}
          <FadeIn>
            <div className="text-center mb-10">
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#d7ff00] flex items-center justify-center gap-2 italic">
                <span>📚Máterias:</span>
              </h3>
            </div>
          </FadeIn>

          {/* Subjects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { emoji: "🏛️", name: "Constitucional", count: "65+ questões" },
              { emoji: "📝", name: "Civil", count: "70+ questões" },
              { emoji: "🔒", name: "Penal", count: "60+ questões" },
              { emoji: "💼", name: "Trabalho", count: "50+ questões" },
              { emoji: "📄", name: "Processo Civil", count: "55+ questões" },
              { emoji: "🗃️", name: "Processo Penal", count: "45+ questões" },
              { emoji: "🏢", name: "Administrativo", count: "40+ questões" },
              { emoji: "💰", name: "Tributário", count: "35+ questões" },
              { emoji: "📖", name: "Ética + Estatuto", count: "80+ questões" },
              { emoji: "🏠", name: "Empresarial", count: "30+ questões", description: "PDF com análise das disciplinas, mapa visual e estratégico e questões comentadas por especialistas." }
            ].map((subject, i) => (
              <FadeIn key={i} delay={0.05 * i} className={subject.description ? "sm:col-span-2 lg:col-span-3" : ""}>
                <div className="bg-white/5 border border-white/5 hover:border-[#d7ff00]/20 hover:bg-white/10 transition-all duration-300 px-6 py-5 rounded-2xl flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" role="img" aria-label={subject.name}>{subject.emoji}</span>
                      <span className="font-bold text-lg text-white">{subject.name}</span>
                    </div>
                    <span className="bg-[#d7ff00]/10 text-[#d7ff00] font-extrabold px-3 py-1 rounded-full text-sm shrink-0 border border-[#d7ff00]/20">
                      {subject.count}
                    </span>
                  </div>
                  {subject.description && (
                    <p className="text-sm text-gray-300 mt-3 border-t border-white/10 pt-3 text-left font-medium leading-relaxed">
                      💡 <span className="text-[#d7ff00] font-bold">Nota:</span> {subject.description}
                    </p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          {/* BÔNUS EXCLUSIVO PARA VOCÊ Section */}
          <FadeIn>
            <div className="mt-20 pt-16 border-t border-white/10 max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="bg-[#d7ff00] text-black font-extrabold text-xs md:text-sm tracking-widest uppercase px-4 py-1.5 rounded-full shadow-lg inline-flex items-center gap-1.5 mb-4">
                  <Gift className="w-4 h-4 text-black" /> LIBERADO EXCLUSIVAMENTE HOJE
                </span>
                <h3 className="font-display text-3xl md:text-5xl font-black text-white leading-tight uppercase">
                  + <span className="text-[#d7ff00]">BÔNUS EXCLUSIVO</span> PARA VOCÊ :
                </h3>
                <p className="text-gray-300 text-base md:text-lg mt-3 max-w-2xl mx-auto">
                  Materiais complementares estratégicos desenvolvidos para acelerar a sua aprovação na 1ª fase da OAB sem custo adicional.
                </p>
              </div>

              {/* Grid dos 4 Bônus em Super Destaque */}
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    tag: "BÔNUS #1",
                    title: "Cronograma 60 dias até a prova",
                    desc: "Passo a passo diário estruturado para você estudar o que realmente cai na FGV, mesmo tendo pouco tempo na rotina.",
                    icon: Calendar,
                    highlight: "GRÁTIS HOJE"
                  },
                  {
                    tag: "BÔNUS #2",
                    title: "Resumão Top 10 Assuntos mais cobrados",
                    desc: "Direto ao ponto com os 10 tópicos estatisticamente mais repetidos nas provas passadas para garantir pontos cruciais.",
                    icon: FileText,
                    highlight: "GRÁTIS HOJE"
                  },
                  {
                    tag: "BÔNUS #3",
                    title: "Modelo de Peça Profissional",
                    desc: "Estrutura esquematizada pronta para fixar o raciocínio jurídico e a aplicação prática das matérias de forma visual.",
                    icon: BookOpen,
                    highlight: "GRÁTIS HOJE"
                  },
                  {
                    tag: "BÔNUS #4",
                    title: "Guia anti pegadinha FGV",
                    desc: "As armadilhas e pegadinhas clássicas que a banca FGV mais usa para reprovar candidatos desatentos desvendadas.",
                    icon: ShieldCheck,
                    highlight: "GRÁTIS HOJE"
                  }
                ].map((bonus, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent border-2 border-[#d7ff00]/40 rounded-3xl p-6 sm:p-7 shadow-xl shadow-black/60 overflow-hidden group hover:border-[#d7ff00] transition-all duration-300"
                  >
                    {/* Efeito Glow no fundo */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#d7ff00]/10 rounded-full blur-2xl group-hover:bg-[#d7ff00]/25 transition-all pointer-events-none" />

                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#d7ff00] text-black flex items-center justify-center shrink-0 shadow-lg shadow-[#d7ff00]/20">
                        <bonus.icon className="w-6 h-6 stroke-[2.5]" />
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[11px] font-black uppercase tracking-wider text-black bg-[#d7ff00] px-3 py-1 rounded-full">
                          {bonus.tag}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-400 mt-1 uppercase tracking-wide flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {bonus.highlight}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white group-hover:text-[#d7ff00] transition-colors leading-snug mb-2">
                      {bonus.title}
                    </h4>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      {bonus.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Highlight Banner */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-fixed bg-center opacity-40 grayscale" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2000&auto=format&fit=crop')" }} />
        <div className="absolute inset-0 bg-linear-to-b from-brand-dark via-brand-dark/80 to-brand-dark" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold max-w-4xl mx-auto leading-tight italic">
              "96% dos alunos que entenderam o padrão da banca aumentaram sua pontuação já no primeiro simulado."
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* Audience Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="font-display text-4xl md:text-6xl font-extrabold text-brand-primary leading-tight">
                PARA QUEM É O <span className="bg-[#d7ff00] text-black px-4 py-1.5 inline-block mx-1">OAB HACKEADA</span>:
              </h2>
            </FadeIn>
            
            <div className="space-y-6">
              {[
                "Quem quer focar só no que realmente cai na OAB.",
                "Quem já reprovou e precisa de estratégia.",
                "Quem trabalha e tem pouco tempo para estudar.",
                "Quem vai fazer a primeira prova da OAB.",
                "Quem quer aprender o padrão da banca FGV."
              ].map((item, i) => (
                <FadeIn key={i} delay={0.1 * i}>
                  <div className="flex items-start gap-4 text-xl md:text-2xl text-gray-200">
                    <CheckCircle2 className="w-8 h-8 text-brand-primary shrink-0 mt-1" />
                    <span>{item}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section id="oferta" className="py-24 px-6 bg-brand-primary rounded-[3rem] mx-4 md:mx-12 my-12 text-brand-dark overflow-hidden relative">
        <div className="container mx-auto relative z-10 space-y-24">
          
          {/* Package R$ 10 */}
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <FadeIn>
                <div className="text-center mb-8">
                  <span className="bg-brand-dark text-brand-primary text-xs md:text-sm font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 inline-block">
                    PACOTE BÁSICO
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-extrabold italic text-brand-dark">
                    O que você vai receber no pacote básico:
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "500 QUESTÕES COMENTADAS",
                    "ACESSO POR 7 DIAS !",
                    "CONTEÚDO PARCIAL (NÃO INCLUI TUDO)"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 font-semibold text-lg">
                      <div className="w-5 h-5 bg-brand-dark text-white rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-2">
              <FadeIn delay={0.2}>
                <div className="bg-brand-dark p-8 md:p-10 rounded-[2rem] text-center text-white shadow-2xl border-2 border-brand-primary/20">
                  <span className="text-brand-primary font-bold uppercase text-xs tracking-widest block mb-4">Pacote Básico</span>
                  <div className="flex justify-center items-start mb-6">
                    <span className="text-3xl font-bold mt-2">R$</span>
                    <span className="text-8xl md:text-9xl font-extrabold text-brand-primary leading-none">10</span>
                  </div>
                  <p className="text-gray-400 mb-8 font-medium">Lote Especial</p>
                  <button 
                    onClick={() => setShowOfferModal(true)}
                    className="block w-full bg-brand-primary text-brand-dark hover:opacity-95 active:scale-[0.98] transition-all py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-xl shadow-xl uppercase tracking-wider text-center cursor-pointer"
                  >
                    APROVEITAR AGORA
                  </button>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="h-px bg-brand-dark/10 w-full" />

          {/* Package R$ 47 */}
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 space-y-8">
              <FadeIn>
                <div className="text-center mb-8">
                  <motion.span 
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="bg-brand-dark text-brand-primary text-xs md:text-sm font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 inline-flex items-center gap-2 shadow-lg border border-brand-primary/30"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-80"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-primary"></span>
                    </span>
                    PACOTE COMPLETO
                  </motion.span>
                  <h2 className="font-display text-3xl md:text-4xl font-extrabold italic text-brand-dark">
                    O que você vai receber no pacote completo:
                  </h2>
                </div>
                
                {/* +500 Questões Comentadas */}
                <div className="bg-brand-dark/5 p-6 rounded-2xl mb-6 border border-brand-dark/10">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-brand-dark">
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    +500 Questões Comentadas (Matérias Incluídas)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm font-semibold">
                    {[
                      "Direito Administrativo 2",
                      "Direito Administrativo",
                      "Direito Ambiental",
                      "Direito Civil",
                      "Direito Constitucional",
                      "Direito do Consumidor",
                      "Direito do Trabalho",
                      "Direito Empresarial",
                      "Direito Internacional",
                      "Direito Penal",
                      "Direito Processual Civil",
                      "Direito Processual Penal",
                      "Direito Tributário 2",
                      "Direito Tributário",
                      "Direitos Humanos",
                      "ECA",
                      "Ética Profissional",
                      "Filosofia do Direito",
                      "Processo do Trabalho"
                    ].map((materia, idx) => (
                      <span key={idx} className="bg-brand-dark/10 px-3 py-1.5 rounded-lg text-brand-dark text-left flex items-center gap-1.5">
                        <span className="text-brand-dark font-bold">✔</span> {materia}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bônus Exclusivo */}
                <div className="bg-brand-dark/5 p-6 rounded-2xl mb-6 border border-brand-dark/10">
                  <h3 className="font-bold text-xl mb-4 text-brand-dark flex items-center gap-2">
                    <span className="text-brand-accent">★</span> Bônus Exclusivo:
                  </h3>
                  <div className="grid gap-3 text-sm md:text-base font-semibold">
                    {[
                      "Cronograma 60 dias até a prova",
                      "Resumão Top 10 Assuntos mais cobrados",
                      "Modelo de Peça Profissional",
                      "Guia anti pegadinha FGV"
                    ].map((bonus, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-brand-dark">
                        <CheckCircle2 className="w-5 h-5 text-brand-dark shrink-0" />
                        <span>{bonus}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mapas Visuais e Estratégicos & Extras */}
                <div className="bg-brand-dark/5 p-6 rounded-2xl border border-brand-dark/10 space-y-4 text-brand-dark">
                  <div>
                    <h4 className="font-bold text-base mb-1">🗺️ Mapas Visuais e Estratégicos:</h4>
                    <p className="text-sm md:text-base font-medium opacity-90">Direito penal, Trabalhista, direito empresarial, Direitos constitucionais e Humanos</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-between pt-4 border-t border-brand-dark/10 font-bold">
                    <span className="flex items-center gap-2">📈 Plano de Estudo Acelerado</span>
                    <span className="text-brand-accent">+ Bônus Extra</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-2">
              <FadeIn delay={0.2}>
                <div className="relative">
                  {/* Aura / Halo pulsante atrás do card */}
                  <div className="absolute -inset-1.5 rounded-[2.3rem] bg-linear-to-r from-brand-accent via-brand-primary to-brand-accent opacity-40 blur-lg animate-pulse pointer-events-none -z-10" />

                  <motion.div 
                    animate={{ 
                      scale: [1, 1.025, 1],
                      boxShadow: [
                        "0 20px 30px -10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 90, 31, 0.35)",
                        "0 25px 45px -10px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 90, 31, 0.75)",
                        "0 20px 30px -10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 90, 31, 0.35)"
                      ]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2.2, 
                      ease: "easeInOut" 
                    }}
                    className="bg-brand-dark p-8 md:p-12 rounded-[2rem] text-center text-white relative border-2 border-brand-accent"
                  >
                    <div className="absolute -top-4 -right-4 bg-brand-accent text-white px-4 py-2 rounded-xl text-sm font-bold rotate-12 shadow-lg z-20 animate-bounce">
                      MAIS POPULAR
                    </div>
                    <span className="text-gray-400 line-through text-xl block mb-2">DE R$197,00</span>
                    <div className="flex justify-center items-start mb-6">
                      <span className="text-3xl font-bold mt-2">R$</span>
                      <span className="text-8xl md:text-9xl font-extrabold text-brand-primary leading-none">47</span>
                    </div>
                    <p className="text-gray-400 mb-8 font-medium">Pagamento Único — Completo</p>
                    <motion.a 
                      animate={{ scale: [1, 1.04, 1] }}
                      transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                      href="https://pay.wiapy.com/ZKQs_w7h-E" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full bg-brand-accent hover:opacity-95 active:scale-[0.98] transition-all py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-xl shadow-xl shadow-brand-accent/40 uppercase tracking-wider text-center cursor-pointer"
                    >
                      QUERO MINHA APROVAÇÃO
                    </motion.a>
                  </motion.div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-24 px-6 border-t border-white/5 bg-linear-to-b from-brand-dark to-black/40">
        <div className="container mx-auto max-w-4xl text-center">
          <FadeIn>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d7ff00]/10 text-[#d7ff00] rounded-full mb-8 border border-[#d7ff00]/20 shadow-lg shadow-[#d7ff00]/5">
              <ShieldCheck className="w-10 h-10" />
            </div>
            
            <span className="text-[#d7ff00] text-xs md:text-sm font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 inline-block bg-[#d7ff00]/10 border border-[#d7ff00]/20">
              Garantia 7 Dias
            </span>
            
            <h2 className="font-display text-3xl md:text-5xl font-black mb-6 text-white tracking-tight uppercase">
              RISCO ZERO: <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-[#d7ff00]">GARANTIA INCONDICIONAL DE 7 DIAS</span>
            </h2>
            
            <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden max-w-3xl mx-auto backdrop-blur-sm text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d7ff00]/5 rounded-full filter blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-primary/5 rounded-full filter blur-2xl pointer-events-none" />
              
              <div className="grid md:grid-cols-5 gap-8 items-center relative z-10">
                {/* Imagem da Garantia */}
                <div className="md:col-span-2 flex justify-center">
                  <a href="https://ibb.co/QvwL79G4" target="_blank" rel="noopener noreferrer" className="block transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="https://i.ibb.co/r2rYKkJV/Selo-de-Garantia-de-7-Dias-PNG-Transparente-Sem-Fundo.png" 
                      alt="Selo de Garantia de 7 Dias" 
                      referrerPolicy="no-referrer"
                      className="w-full max-w-[160px] md:max-w-[200px] h-auto object-contain"
                    />
                  </a>
                </div>

                {/* Texto da Garantia */}
                <div className="md:col-span-3 flex flex-col justify-center">
                  <p className="text-gray-200 text-base md:text-lg leading-relaxed font-medium mb-6 text-center md:text-left">
                    O seu investimento está 100% protegido. Você tem 7 dias inteiros para acessar todo o conteúdo do Mega Pack Direito Simplificado. Se por qualquer motivo você não ficar satisfeito, basta nos enviar um e-mail e devolvemos cada centavo do seu dinheiro. Sem perguntas e sem complicações.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#d7ff05]" />
                      <span>Devolução Sem Burocracia</span>
                    </div>
                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full hidden sm:block" />
                    <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#d7ff05]" />
                      <span>Reembolso Integral Garantido</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center px-6">
        <div className="container mx-auto">
          <div className="bg-[#d7ff00] text-black font-display font-black text-xl md:text-2xl px-4 py-1.5 inline-block mb-4">OAB HACKEADA</div>
          <p className="text-gray-500 mb-6">© 2026 — Todos os direitos reservados.</p>
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
          </div>
        </div>
      </footer>

      {/* Modal - Oferta Exclusiva */}
      <AnimatePresence>
        {showOfferModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOfferModal(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-brand-dark border-2 border-[#d7ff00]/30 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative text-white z-10 max-h-[90vh] flex flex-col"
            >
              {/* Top Warning Banner */}
              <div className="bg-[#d7ff00] text-brand-dark px-6 py-3 font-extrabold text-xs md:text-sm uppercase tracking-widest text-center flex items-center justify-center gap-2">
                <span>🚨</span> OPORTUNIDADE ÚNICA E EXCLUSIVA!
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setShowOfferModal(false)}
                className="absolute top-14 right-6 text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all cursor-pointer z-20"
                aria-label="Fechar"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-6 md:p-10 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                <div className="text-center mb-8">
                  <span className="text-[#d7ff00] font-black text-xs md:text-sm tracking-widest uppercase bg-[#d7ff00]/10 px-4 py-1.5 rounded-full border border-[#d7ff00]/20">
                    SÓ NESTA PÁGINA
                  </span>
                  <h3 className="font-display text-2xl md:text-4xl font-black mt-4 leading-tight">
                    Leve o <span className="text-[#d7ff00]">PACOTE COMPLETO</span> por apenas <span className="text-[#d7ff00]">R$ 27,00</span>!
                  </h3>
                  <p className="text-gray-300 mt-2 font-medium text-sm md:text-base">
                    Por apenas <span className="text-[#d7ff00] font-bold">R$ 17,00 a mais</span> do que o básico, garanta o método completo definitivo para sua aprovação.
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5 mb-8">
                  <h4 className="font-bold text-[#d7ff00] text-sm uppercase tracking-wider mb-2">🎁 Benefícios Inclusos (Os mesmos do pacote de R$ 47):</h4>
                  
                  <div className="space-y-4 text-sm md:text-base">
                    {/* Item 1 */}
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#d7ff00] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white">+500 Questões Comentadas (Matérias Incluídas):</p>
                        <p className="text-gray-400 text-xs md:text-sm mt-1 leading-relaxed">
                          Direito Administrativo 2, Direito Administrativo, Direito Ambiental, Direito Civil, Direito Constitucional, Direito do Consumidor, Direito do Trabalho, Direito Empresarial, Direito Internacional, Direito Penal, Direito Processual Civil, Direito Processual Penal, Direito Tributário 2, Direito Tributário, Direitos Humanos, ECA, Ética Profissional, Filosofia do Direito, Processo do Trabalho.
                        </p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#d7ff00] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white">Bônus Exclusivos:</p>
                        <p className="text-gray-400 text-xs md:text-sm mt-1">
                          Cronograma 60 dias até a prova, Resumão Top 10 Assuntos mais cobrados, Modelo de Peça Profissional e Guia anti pegadinha FGV.
                        </p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#d7ff00] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white">Mapas Visuais e Estratégicos:</p>
                        <p className="text-gray-400 text-xs md:text-sm mt-1">
                          Direito penal, Trabalhista, direito empresarial, Direitos constitucionais e Humanos.
                        </p>
                      </div>
                    </div>

                    {/* Item 4 */}
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#d7ff00] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white">Plano de Estudo Acelerado + Bônus Extra</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price block & CTA */}
                <div className="text-center space-y-6">
                  <div>
                    <span className="text-gray-500 line-through text-sm md:text-base mr-3">DE R$ 197,00</span>
                    <span className="text-gray-400 line-through text-xs md:text-sm mr-3">OU R$ 47,00</span>
                    <div className="flex justify-center items-start mt-2">
                      <span className="text-xl md:text-2xl font-bold mt-1 text-[#d7ff00]">R$</span>
                      <span className="text-6xl md:text-7xl font-extrabold text-[#d7ff00] leading-none">27</span>
                      <span className="text-sm md:text-base font-bold text-gray-300 self-end ml-1 mb-1">PAGAMENTO ÚNICO</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Primary Button for discount */}
                    <motion.a 
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                      href="https://pay.wiapy.com/rg85iH1OSm" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full bg-[#d7ff00] text-brand-dark hover:opacity-95 active:scale-[0.98] transition-all py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-xl shadow-xl shadow-[#d7ff00]/20 uppercase tracking-wider text-center cursor-pointer"
                    >
                      QUERO O PACOTE COMPLETO POR R$ 27
                    </motion.a>

                    {/* Basic option */}
                    <a 
                      href="https://pay.wiapy.com/eqnm5Fa3To"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowOfferModal(false)}
                      className="block w-full text-gray-400 hover:text-white transition-colors py-2 text-xs md:text-sm text-center underline font-medium"
                    >
                      Não, quero continuar apenas com o Pacote Básico por R$ 10,00
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
