"use client";

import { MOCK_CAREGIVERS, MOCK_DAILY_LOGS, MOCK_INTERVIEWS, MOCK_MESSAGES } from "@/constants";
import { currencyBRL, dateTimeBR } from "@/lib/formatters";
import { clearSession, getStoredProfile, hasSession } from "@/lib/session";
import { Caregiver, ChatMessage } from "@/types";
import {
  CalendarClock,
  CircleCheck,
  Home,
  LogOut,
  MessageCircle,
  SendHorizontal,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DashboardView = "recomendados" | "mensagens" | "entrevistas" | "progresso";

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [activeView, setActiveView] = useState<DashboardView>("recomendados");
  const [profileName, setProfileName] = useState("Responsavel");
  const [maxBudget, setMaxBudget] = useState(50);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState("todos");
  const [chatInput, setChatInput] = useState("");
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([
    {
      id: "assist-1",
      autor: "assistente",
      texto:
        "Ola! Sou o Assistente de Cuidado da Zela. Posso ajudar com perguntas sobre entrevistas e rotina do idoso.",
      timestamp: "agora",
    },
  ]);
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  useEffect(() => {
    if (!hasSession()) {
      router.replace("/onboarding");
      return;
    }
    const profile = getStoredProfile();
    if (profile?.nomeResponsavel) {
      setProfileName(profile.nomeResponsavel);
      setMaxBudget(profile.orcamentoHora + 8);
    }
    setReady(true);
  }, [router]);

  const filteredCaregivers = useMemo(() => {
    return MOCK_CAREGIVERS.filter((caregiver) => {
      const budgetOk = caregiver.valorHora <= maxBudget;
      const verifiedOk = !onlyVerified || caregiver.verificado;
      const needOk =
        selectedNeed === "todos" || caregiver.especialidades.includes(selectedNeed as Caregiver["especialidades"][number]);
      return budgetOk && verifiedOk && needOk;
    });
  }, [maxBudget, onlyVerified, selectedNeed]);

  const stats = useMemo(() => {
    const totalHoras = MOCK_DAILY_LOGS.reduce((acc, item) => acc + item.horasCuidado, 0);
    const mediaAvaliacao =
      MOCK_DAILY_LOGS.reduce((acc, item) => acc + item.avaliacaoDia, 0) / MOCK_DAILY_LOGS.length;
    const pontualidadeMedia =
      MOCK_DAILY_LOGS.reduce((acc, item) => acc + item.pontualidade, 0) / MOCK_DAILY_LOGS.length;

    return {
      totalHoras,
      mediaAvaliacao,
      pontualidadeMedia,
    };
  }, []);

  function handleLogout() {
    clearSession();
    router.push("/");
  }

  function sendFamilyMessage() {
    if (!chatInput.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        autor: "familia",
        texto: chatInput.trim(),
        timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setChatInput("");
  }

  async function sendAiMessage() {
    if (!aiInput.trim() || aiLoading) return;

    const question = aiInput.trim();
    setAiInput("");
    setAiMessages((prev) => [
      ...prev,
      {
        id: `q-${Date.now()}`,
        autor: "familia",
        texto: question,
        timestamp: "agora",
      },
    ]);
    setAiLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = (await response.json()) as { answer: string };

      setAiMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          autor: "assistente",
          texto: data.answer,
          timestamp: "agora",
        },
      ]);
    } catch {
      setAiMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          autor: "assistente",
          texto:
            "Assistente indisponivel no momento. Voce pode continuar usando os filtros e mensagens normalmente.",
          timestamp: "agora",
        },
      ]);
    } finally {
      setAiLoading(false);
    }
  }

  if (!ready) {
    return <div className="p-10 text-center text-foreground-soft">Carregando painel...</div>;
  }

  return (
    <main className="min-h-screen bg-background-soft p-4 sm:p-6">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[280px_1fr]">
        <aside className="glass h-fit rounded-3xl border border-black/5 bg-white/85 p-5 shadow-sm lg:sticky lg:top-4">
          <div className="rounded-2xl bg-brand/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">Familia ativa</p>
            <p className="mt-1 text-lg font-semibold">{profileName}</p>
            <p className="text-sm text-foreground-soft">Cuidado domiciliar em andamento</p>
          </div>

          <nav className="mt-6 space-y-2">
            <button
              type="button"
              onClick={() => setActiveView("recomendados")}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                activeView === "recomendados" ? "bg-brand text-white" : "bg-card hover:bg-card-strong"
              }`}
            >
              <Home size={18} /> Cuidadores Recomendados
            </button>
            <button
              type="button"
              onClick={() => setActiveView("mensagens")}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                activeView === "mensagens" ? "bg-brand text-white" : "bg-card hover:bg-card-strong"
              }`}
            >
              <MessageCircle size={18} /> Mensagens
            </button>
            <button
              type="button"
              onClick={() => setActiveView("entrevistas")}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                activeView === "entrevistas" ? "bg-brand text-white" : "bg-card hover:bg-card-strong"
              }`}
            >
              <CalendarClock size={18} /> Entrevistas
            </button>
            <button
              type="button"
              onClick={() => setActiveView("progresso")}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                activeView === "progresso" ? "bg-brand text-white" : "bg-card hover:bg-card-strong"
              }`}
            >
              <CircleCheck size={18} /> Progresso do Cuidado
            </button>
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-semibold"
          >
            <LogOut size={16} /> Sair
          </button>
        </aside>

        <section className="space-y-4">
          {activeView === "recomendados" && (
            <>
              <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm">
                <h2 className="text-2xl font-semibold">Cuidadores recomendados</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <label className="text-sm font-semibold">
                    Orcamento maximo/hora
                    <input
                      type="range"
                      min={20}
                      max={80}
                      value={maxBudget}
                      onChange={(event) => setMaxBudget(Number(event.target.value))}
                      className="mt-1 w-full accent-brand"
                    />
                    <span className="text-foreground-soft">{currencyBRL.format(maxBudget)}</span>
                  </label>
                  <label className="text-sm font-semibold">
                    Especialidade
                    <select
                      value={selectedNeed}
                      onChange={(event) => setSelectedNeed(event.target.value)}
                      className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-2"
                    >
                      <option value="todos">Todas</option>
                      <option value="companhia">Companhia</option>
                      <option value="higiene">Higiene</option>
                      <option value="mobilidade">Mobilidade</option>
                      <option value="medicacao">Medicacao</option>
                      <option value="noturno">Noturno</option>
                      <option value="pos-operatorio">Pos-operatorio</option>
                    </select>
                  </label>
                  <label className="mt-6 flex items-center gap-2 text-sm font-semibold">
                    <input
                      type="checkbox"
                      checked={onlyVerified}
                      onChange={(event) => setOnlyVerified(event.target.checked)}
                      className="h-4 w-4 rounded accent-brand"
                    />
                    Somente perfis verificados
                  </label>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {filteredCaregivers.map((caregiver) => (
                  <article key={caregiver.id} className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={caregiver.foto} alt={caregiver.nome} className="h-44 w-full object-cover" />
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">{caregiver.nome}</h3>
                        <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                          ⭐ {caregiver.avaliacao.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-sm text-foreground-soft">
                        {caregiver.idade} anos • {caregiver.bairro} • {caregiver.distanciaKm} km
                      </p>
                      <p className="mt-3 text-sm text-foreground-soft">{caregiver.descricao}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {caregiver.especialidades.map((item) => (
                          <span key={item} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                            {item}
                          </span>
                        ))}
                        {caregiver.verificado && (
                          <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
                            Verificado
                          </span>
                        )}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="font-semibold">{currencyBRL.format(caregiver.valorHora)}/h</p>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="rounded-full border border-black/10 px-3 py-1.5 text-sm font-semibold"
                          >
                            Ver Perfil
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveView("mensagens")}
                            className="rounded-full bg-brand px-3 py-1.5 text-sm font-semibold text-white"
                          >
                            Conversar
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {activeView === "mensagens" && (
            <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
              <section className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm">
                <h2 className="text-2xl font-semibold">Mensagens com cuidadores</h2>
                <div className="mt-4 space-y-3 rounded-2xl bg-background-soft p-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                        message.autor === "familia"
                          ? "ml-auto bg-brand text-white"
                          : "bg-white text-foreground shadow-sm"
                      }`}
                    >
                      <p>{message.texto}</p>
                      <span
                        className={`mt-1 block text-[11px] ${
                          message.autor === "familia" ? "text-white/80" : "text-foreground-soft"
                        }`}
                      >
                        {message.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <input
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="w-full rounded-full border border-black/10 px-4 py-2 outline-none ring-brand/30 focus:ring"
                  />
                  <button
                    type="button"
                    onClick={sendFamilyMessage}
                    className="rounded-full bg-brand px-4 text-white"
                  >
                    <SendHorizontal size={16} />
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Tem experiencia com idosos acamados?",
                    "Pode iniciar na proxima semana?",
                    "Qual sua rotina de medicacao assistida?",
                  ].map((quick) => (
                    <button
                      type="button"
                      key={quick}
                      onClick={() => setChatInput(quick)}
                      className="rounded-full border border-black/10 px-3 py-1.5 text-xs"
                    >
                      {quick}
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold">Assistente de Cuidado</h3>
                <p className="text-sm text-foreground-soft">Respostas curtas e praticas em pt-BR.</p>
                <div className="mt-4 max-h-80 space-y-3 overflow-y-auto rounded-2xl bg-background-soft p-3">
                  {aiMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`rounded-2xl px-3 py-2 text-sm ${
                        message.autor === "familia" ? "bg-brand text-white" : "bg-white"
                      }`}
                    >
                      {message.texto}
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <input
                    value={aiInput}
                    onChange={(event) => setAiInput(event.target.value)}
                    placeholder="Ex.: Como organizar rotina para Alzheimer leve?"
                    className="w-full rounded-full border border-black/10 px-4 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={sendAiMessage}
                    disabled={aiLoading}
                    className="rounded-full bg-accent px-3 text-white disabled:opacity-60"
                  >
                    {aiLoading ? "..." : <SendHorizontal size={16} />}
                  </button>
                </div>
              </section>
            </div>
          )}

          {activeView === "entrevistas" && (
            <section className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-semibold">Entrevistas agendadas</h2>
              <div className="mt-4 space-y-3">
                {MOCK_INTERVIEWS.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/5 bg-background-soft p-4"
                  >
                    <div>
                      <p className="font-semibold">{item.caregiverNome}</p>
                      <p className="text-sm text-foreground-soft">
                        {dateTimeBR.format(new Date(item.dataISO))} • {item.canal}
                      </p>
                    </div>
                    <span className="rounded-full bg-brand/10 px-3 py-1 text-sm font-semibold text-brand">
                      {item.status}
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="rounded-full border border-black/10 px-4 py-1.5 text-sm font-semibold"
                      >
                        Reagendar
                      </button>
                      <button
                        type="button"
                        className="rounded-full bg-slate-200 px-4 py-1.5 text-sm font-semibold"
                      >
                        Cancelar
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {activeView === "progresso" && (
            <>
              <div className="grid gap-4 md:grid-cols-3">
                <MetricCard title="Horas na semana" value={`${stats.totalHoras}h`} icon={<CalendarClock size={18} />} />
                <MetricCard title="Pontualidade media" value={`${stats.pontualidadeMedia.toFixed(0)}%`} icon={<CircleCheck size={18} />} />
                <MetricCard title="Satisfacao media" value={`${stats.mediaAvaliacao.toFixed(1)} / 5`} icon={<UserRound size={18} />} />
              </div>

              <section className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm">
                <h2 className="text-2xl font-semibold">Evolucao do cuidado</h2>
                <div className="mt-5 h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={MOCK_DAILY_LOGS}>
                      <XAxis dataKey="dia" stroke="#526071" />
                      <YAxis yAxisId="left" stroke="#3f7d6a" />
                      <YAxis yAxisId="right" orientation="right" stroke="#2f5f73" domain={[3.5, 5]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "14px",
                        }}
                      />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="horasCuidado"
                        stroke="#3f7d6a"
                        fill="#3f7d6a"
                        fillOpacity={0.2}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="avaliacaoDia"
                        stroke="#2f5f73"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </section>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

function MetricCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <article className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm">
      <div className="mb-2 inline-flex rounded-xl bg-brand/10 p-2 text-brand">{icon}</div>
      <p className="text-sm text-foreground-soft">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </article>
  );
}
