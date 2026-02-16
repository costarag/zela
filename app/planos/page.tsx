import Link from "next/link";
import { BadgeCheck, BriefcaseBusiness, Crown, Handshake, ShieldCheck } from "lucide-react";

const PLANOS_FAMILIA = [
  {
    nome: "Gratis",
    preco: "R$0",
    periodo: "/mes",
    descricao: "Ideal para conhecer a plataforma antes de contratar.",
    itens: ["Visualizacao limitada de perfis", "Filtros basicos", "Sem contato direto"],
    cta: "Criar conta gratis",
    destaque: false,
  },
  {
    nome: "Familia Plus",
    preco: "R$69",
    periodo: "/mes",
    descricao: "O plano mais escolhido para achar e conversar com seguranca.",
    itens: ["Mensagens ilimitadas", "Filtros avancados", "Agendamento de entrevistas", "Suporte prioritario"],
    cta: "Assinar Plus",
    destaque: true,
  },
  {
    nome: "Familia Premium",
    preco: "R$159",
    periodo: "/mes",
    descricao: "Acompanhamento assistido para familias com rotina mais complexa.",
    itens: [
      "Tudo do Plus",
      "Matching assistido por especialista",
      "Checklist de onboarding",
      "Revisao mensal do plano de cuidado",
    ],
    cta: "Assinar Premium",
    destaque: false,
  },
];

const EXTRAS = [
  {
    titulo: "Taxa de Sucesso",
    descricao: "Cobrada apenas no fechamento da primeira contratacao confirmada pela plataforma.",
    valor: "R$99 a R$299",
    icon: Handshake,
  },
  {
    titulo: "Match Concierge",
    descricao: "Curadoria humana para familias que querem recomendacao pronta em menos tempo.",
    valor: "R$149 a R$399",
    icon: ShieldCheck,
  },
  {
    titulo: "Cuidador Pro",
    descricao: "Plano para cuidadores com destaque de perfil e mais oportunidades de entrevista.",
    valor: "R$29 a R$59/mes",
    icon: BriefcaseBusiness,
  },
];

const FAQ = [
  {
    pergunta: "Posso cancelar quando quiser?",
    resposta: "Sim. Os planos sao mensais e voce pode cancelar sem multa diretamente no painel.",
  },
  {
    pergunta: "O plano gratis permite contratar?",
    resposta: "O gratis ajuda na descoberta. Para iniciar conversas e entrevistas, recomendamos o Familia Plus.",
  },
  {
    pergunta: "Como funciona a taxa de sucesso?",
    resposta: "Ela so e aplicada quando a contratacao e confirmada pela familia na plataforma.",
  },
];

export default function PlanosPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#e9f0ed_0%,#f8f6f1_52%,#fff_100%)] px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="text-sm font-semibold text-brand transition hover:text-brand-deep">
            ← Voltar para inicio
          </Link>
          <Link
            href="/onboarding"
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand/25"
          >
            Comecar agora
          </Link>
        </div>

        <section className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
            <Crown size={14} /> Planos Zela
          </span>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Preco justo para cada etapa da sua familia</h1>
          <p className="mt-3 max-w-2xl text-foreground-soft">
            Comece sem risco e evolua conforme sua rotina exigir. Os planos foram desenhados para equilibrar
            previsibilidade de custo com qualidade de cuidado.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {PLANOS_FAMILIA.map((plano) => (
              <article
                key={plano.nome}
                className={`rounded-3xl border p-6 ${
                  plano.destaque
                    ? "relative border-brand/35 bg-brand/5 shadow-lg shadow-brand/10"
                    : "border-black/5 bg-background-soft"
                }`}
              >
                {plano.destaque && (
                  <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                    Mais escolhido
                  </span>
                )}
                <p className="text-sm font-semibold text-foreground-soft">{plano.nome}</p>
                <p className="mt-1 text-4xl font-semibold text-slate-900">
                  {plano.preco}
                  <span className="text-base font-medium text-foreground-soft">{plano.periodo}</span>
                </p>
                <p className="mt-2 text-sm text-foreground-soft">{plano.descricao}</p>
                <ul className="mt-4 space-y-2">
                  {plano.itens.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground-soft">
                      <BadgeCheck size={16} className="mt-0.5 shrink-0 text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/onboarding"
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                    plano.destaque
                      ? "bg-brand text-white hover:bg-brand-deep"
                      : "border border-black/10 bg-white text-foreground hover:border-brand/30"
                  }`}
                >
                  {plano.cta}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {EXTRAS.map(({ titulo, descricao, valor, icon: Icon }) => (
            <article key={titulo} className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="mb-3 inline-flex rounded-xl bg-brand/10 p-2 text-brand">
                <Icon size={18} />
              </div>
              <h2 className="text-lg font-semibold">{titulo}</h2>
              <p className="mt-1 text-sm font-semibold text-brand">{valor}</p>
              <p className="mt-2 text-sm text-foreground-soft">{descricao}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Perguntas frequentes</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {FAQ.map((item) => (
              <article key={item.pergunta} className="rounded-2xl border border-black/5 bg-background-soft p-4">
                <h3 className="font-semibold">{item.pergunta}</h3>
                <p className="mt-2 text-sm text-foreground-soft">{item.resposta}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
