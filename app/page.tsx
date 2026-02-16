"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Menu, ShieldCheck, Sparkles, UserRoundSearch, X } from "lucide-react";
import { useState } from "react";

const BENEFICIOS = [
  {
    titulo: "Perfis Verificados",
    texto:
      "Visualize historico, avaliacao e validacao de identidade para contratar com mais tranquilidade.",
    icon: ShieldCheck,
  },
  {
    titulo: "Match por Necessidade",
    texto:
      "Filtros por especialidade, disponibilidade e faixa de valor para encontrar o perfil ideal.",
    icon: UserRoundSearch,
  },
  {
    titulo: "Suporte Humanizado",
    texto:
      "Da entrevista ao primeiro dia de cuidado, a Zela acompanha sua familia em cada etapa.",
    icon: ShieldCheck,
  },
];

const PASSOS = [
  "Descreva a rotina e o tipo de cuidado necessario.",
  "Receba recomendacoes de cuidadores proximos e qualificados.",
  "Converse, agende entrevista e escolha com seguranca.",
];

const DEPOIMENTOS = [
  {
    nome: "Familia Martins",
    texto:
      "Encontramos uma cuidadora muito atenciosa em dois dias. O processo foi simples e acolhedor.",
  },
  {
    nome: "Ana Paula, filha cuidadora",
    texto:
      "A triagem por experiencia com Alzheimer fez toda a diferenca para nossa decisao.",
  },
  {
    nome: "Joao e Clarice",
    texto:
      "A entrevista por video nos deu seguranca. Hoje temos uma rotina muito mais tranquila.",
  },
];

const PLANOS_PREVIEW = [
  {
    nome: "Gratis",
    preco: "R$0",
    descricao: "Para conhecer a plataforma",
    itens: ["Perfis limitados", "Filtros basicos", "Sem contato direto"],
    destaque: false,
  },
  {
    nome: "Familia Plus",
    preco: "R$69/mes",
    descricao: "Para encontrar e conversar com seguranca",
    itens: ["Mensagens ilimitadas", "Filtros avancados", "Agendamento de entrevistas"],
    destaque: true,
  },
  {
    nome: "Familia Premium",
    preco: "R$159/mes",
    descricao: "Para familias com acompanhamento proximo",
    itens: ["Matching assistido", "Checklist de onboarding", "Suporte prioritario"],
    destaque: false,
  },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f1e9db_0%,#f8f6f1_45%,#ffffff_100%)] text-foreground">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-background-soft/80 px-4 py-3 glass sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="font-display text-2xl font-semibold text-brand">Zela</div>
          <nav className="hidden items-center gap-6 text-sm text-foreground-soft md:flex">
            <a href="#como-funciona" className="transition hover:text-foreground">
              Como funciona
            </a>
            <a href="#beneficios" className="transition hover:text-foreground">
              Beneficios
            </a>
            <a href="#depoimentos" className="transition hover:text-foreground">
              Depoimentos
            </a>
            <Link href="/planos" className="transition hover:text-foreground">
              Planos
            </Link>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/onboarding"
              className="rounded-full border border-brand/25 px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand/10"
            >
              Quero trabalhar
            </Link>
            <Link
              href="/onboarding"
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand/30 transition hover:bg-brand-deep"
            >
              Encontrar cuidador(a)
            </Link>
          </div>
          <button
            type="button"
            aria-label="Abrir menu"
            className="rounded-xl border border-black/10 p-2 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="mx-auto mt-3 flex max-w-6xl flex-col gap-3 rounded-2xl border border-black/5 bg-white p-4 md:hidden">
            <a href="#como-funciona">Como funciona</a>
            <a href="#beneficios">Beneficios</a>
            <a href="#depoimentos">Depoimentos</a>
            <Link href="/planos">Planos</Link>
            <Link
              href="/onboarding"
              className="rounded-full bg-brand px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Encontrar cuidador(a)
            </Link>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-8">
        <section className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
              Cuidado com seguranca e proximidade
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              Encontre o cuidado certo para quem voce mais ama.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-foreground-soft">
              A Zela conecta sua familia a cuidadores de idosos com experiencia,
              avaliacao e disponibilidade alinhada a sua rotina.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/onboarding"
                className="rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-deep"
              >
                Encontrar Cuidador(a)
              </Link>
              <Link
                href="/onboarding"
                className="rounded-full border border-black/10 bg-white px-6 py-3 font-semibold text-foreground transition hover:border-brand/30"
              >
                Quero Trabalhar como Cuidador(a)
              </Link>
            </div>
          </div>
          <div className="relative h-[360px] overflow-hidden rounded-[30px] shadow-xl shadow-slate-900/10">
            <Image
              src="https://picsum.photos/seed/elder-care-home/1200/900"
              alt="Cuidadora e idosa sorrindo em casa"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/40 bg-white/85 p-4 backdrop-blur-sm">
              <p className="text-sm font-semibold text-slate-900">+4.500 familias atendidas no Brasil</p>
              <p className="text-sm text-foreground-soft">Atendimento em grandes capitais e regioes metropolitanas.</p>
            </div>
          </div>
        </section>

        <section id="beneficios" className="mt-16">
          <h2 className="text-3xl font-semibold">Porque familias escolhem a Zela</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {BENEFICIOS.map(({ titulo, texto, icon: Icon }) => (
              <article key={titulo} className="rounded-3xl border border-black/5 bg-card p-6 shadow-sm">
                <div className="mb-4 inline-flex rounded-2xl bg-brand/10 p-3 text-brand">
                  <Icon size={20} />
                </div>
                <h3 className="text-xl font-semibold">{titulo}</h3>
                <p className="mt-2 text-foreground-soft">{texto}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="como-funciona" className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold">Como funciona</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {PASSOS.map((passo, index) => (
              <div key={passo} className="rounded-2xl border border-black/5 bg-background-soft p-5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand/15 font-semibold text-brand">
                  {index + 1}
                </span>
                <p className="mt-3 text-foreground-soft">{passo}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="depoimentos" className="mt-16">
          <h2 className="text-3xl font-semibold">Historias reais de cuidado</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {DEPOIMENTOS.map((item) => (
              <blockquote key={item.nome} className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                <p className="text-foreground-soft">&ldquo;{item.texto}&rdquo;</p>
                <footer className="mt-4 font-semibold text-slate-900">{item.nome}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                <Sparkles size={14} /> Monetizacao pronta para escalar
              </span>
              <h2 className="mt-3 text-3xl font-semibold">Planos transparentes para cada momento</h2>
            </div>
            <Link
              href="/planos"
              className="rounded-full border border-brand/20 bg-brand/5 px-5 py-2 text-sm font-semibold text-brand transition hover:bg-brand/10"
            >
              Ver detalhes dos planos
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {PLANOS_PREVIEW.map((plano) => (
              <article
                key={plano.nome}
                className={`rounded-3xl border p-5 ${
                  plano.destaque
                    ? "border-brand/30 bg-brand/5 shadow-md shadow-brand/10"
                    : "border-black/5 bg-background-soft"
                }`}
              >
                <p className="text-sm font-semibold text-foreground-soft">{plano.nome}</p>
                <p className="mt-1 text-3xl font-semibold text-slate-900">{plano.preco}</p>
                <p className="mt-1 text-sm text-foreground-soft">{plano.descricao}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {plano.itens.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-foreground-soft">
                      <BadgeCheck size={15} className="text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
