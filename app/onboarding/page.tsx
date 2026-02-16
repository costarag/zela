"use client";

import { setLoggedSession } from "@/lib/session";
import { CareNeed, FamilyProfile } from "@/types";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const CARE_NEEDS: { label: string; value: CareNeed }[] = [
  { label: "Companhia", value: "companhia" },
  { label: "Higiene", value: "higiene" },
  { label: "Mobilidade", value: "mobilidade" },
  { label: "Medicacao", value: "medicacao" },
  { label: "Noturno", value: "noturno" },
  { label: "Pos-operatorio", value: "pos-operatorio" },
];

const HORARIOS = ["Manha", "Tarde", "Noite", "Plantao"];

const PREFERENCIAS = [
  "Experiencia com Alzheimer",
  "Experiencia com idoso acamado",
  "Formacao em enfermagem",
  "Nao fumante",
  "Primeiros socorros",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [form, setForm] = useState<FamilyProfile>({
    nomeResponsavel: "",
    cidade: "Sao Paulo",
    bairro: "",
    orcamentoHora: 35,
    frequencia: "Diaria",
    horarios: [],
    necessidades: [],
    preferencias: [],
  });

  const progresso = Math.round((step / 5) * 100);

  const resumo = useMemo(() => {
    const totalPrioridades = form.necessidades.length + form.preferencias.length;
    const recomendados = Math.max(6, 14 - totalPrioridades);
    return {
      recomendados,
      perfil: totalPrioridades >= 4 ? "criterios especificos" : "perfil flexivel",
    };
  }, [form]);

  function toggleListItem<K extends "horarios" | "necessidades" | "preferencias">(
    field: K,
    value: FamilyProfile[K] extends Array<infer T> ? T : never,
  ) {
    setForm((prev) => {
      const current = prev[field] as string[];
      const exists = current.includes(value as string);
      const next = exists
        ? current.filter((item) => item !== value)
        : [...current, value as string];

      return { ...prev, [field]: next };
    });
  }

  function nextStep() {
    if (step === 4) {
      setStep(5);
      setIsAnalyzing(true);
      window.setTimeout(() => setIsAnalyzing(false), 1800);
      return;
    }
    setStep((prev) => Math.min(prev + 1, 5));
  }

  function prevStep() {
    setStep((prev) => Math.max(prev - 1, 1));
  }

  function finishOnboarding() {
    const safeProfile = {
      ...form,
      nomeResponsavel: form.nomeResponsavel || "Responsavel",
    };
    setLoggedSession(safeProfile);
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,#e7efe9_0%,#f8f6f1_55%,#fff_100%)] px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-black/5 bg-white p-7 shadow-xl shadow-slate-900/10">
        <div className="mb-7">
          <p className="text-sm font-semibold text-brand">Onboarding Zela</p>
          <h1 className="mt-1 text-3xl font-semibold">Vamos encontrar o cuidado ideal</h1>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-brand transition-all duration-300"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-foreground-soft">Etapa {step} de 5</p>
        </div>

        {step === 1 && (
          <section>
            <h2 className="text-xl font-semibold">1) Tipo de cuidado necessario</h2>
            <p className="mt-1 text-foreground-soft">Selecione as necessidades principais da rotina.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {CARE_NEEDS.map((need) => {
                const ativo = form.necessidades.includes(need.value);
                return (
                  <button
                    type="button"
                    key={need.value}
                    className={`rounded-2xl border p-3 text-left transition ${
                      ativo
                        ? "border-brand bg-brand/10 text-brand"
                        : "border-black/10 hover:border-brand/30"
                    }`}
                    onClick={() => toggleListItem("necessidades", need.value)}
                  >
                    {need.label}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <h2 className="text-xl font-semibold">2) Frequencia e horarios</h2>
            <label className="mt-4 block text-sm font-semibold">Frequencia de cuidado</label>
            <select
              value={form.frequencia}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  frequencia: event.target.value as FamilyProfile["frequencia"],
                }))
              }
              className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-2 outline-none ring-brand/30 focus:ring"
            >
              <option>Diaria</option>
              <option>Semanal</option>
              <option>Plantao</option>
              <option>Fim de semana</option>
            </select>
            <p className="mt-4 text-sm font-semibold">Horarios desejados</p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {HORARIOS.map((slot) => {
                const ativo = form.horarios.includes(slot);
                return (
                  <button
                    type="button"
                    key={slot}
                    className={`rounded-2xl border p-3 text-left transition ${
                      ativo
                        ? "border-brand bg-brand/10 text-brand"
                        : "border-black/10 hover:border-brand/30"
                    }`}
                    onClick={() => toggleListItem("horarios", slot)}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <h2 className="text-xl font-semibold">3) Localizacao e orcamento</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">
                Nome do responsavel
                <input
                  value={form.nomeResponsavel}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, nomeResponsavel: event.target.value }))
                  }
                  className="mt-1 w-full rounded-2xl border border-black/10 px-3 py-2 outline-none ring-brand/30 focus:ring"
                />
              </label>
              <label className="text-sm font-semibold">
                Bairro
                <input
                  value={form.bairro}
                  onChange={(event) => setForm((prev) => ({ ...prev, bairro: event.target.value }))}
                  className="mt-1 w-full rounded-2xl border border-black/10 px-3 py-2 outline-none ring-brand/30 focus:ring"
                />
              </label>
            </div>
            <label className="mt-4 block text-sm font-semibold">Orcamento por hora</label>
            <input
              type="range"
              min={20}
              max={80}
              value={form.orcamentoHora}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, orcamentoHora: Number(event.target.value) }))
              }
              className="mt-2 w-full accent-brand"
            />
            <p className="text-sm text-foreground-soft">Faixa selecionada: R$ {form.orcamentoHora}/h</p>
          </section>
        )}

        {step === 4 && (
          <section>
            <h2 className="text-xl font-semibold">4) Preferencias de perfil</h2>
            <p className="mt-1 text-foreground-soft">Marque o que e importante para sua familia.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {PREFERENCIAS.map((pref) => {
                const ativo = form.preferencias.includes(pref);
                return (
                  <button
                    type="button"
                    key={pref}
                    className={`rounded-2xl border p-3 text-left transition ${
                      ativo
                        ? "border-brand bg-brand/10 text-brand"
                        : "border-black/10 hover:border-brand/30"
                    }`}
                    onClick={() => toggleListItem("preferencias", pref)}
                  >
                    {pref}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === 5 && (
          <section>
            <h2 className="text-xl font-semibold">5) Analise do seu perfil</h2>
            {isAnalyzing ? (
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-black/10 bg-background-soft p-5 text-foreground-soft">
                <LoaderCircle className="animate-spin text-brand" />
                Analisando suas prioridades e disponibilidade local...
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-brand/20 bg-brand/5 p-6">
                <p className="text-lg font-semibold text-brand">Tudo pronto, perfil calculado.</p>
                <p className="mt-2 text-foreground-soft">
                  Encontramos cerca de <strong>{resumo.recomendados} cuidadores</strong> compativeis
                  com seu orcamento e {resumo.perfil}.
                </p>
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-foreground-soft">
                  <li>Prioridades selecionadas: {form.necessidades.length || 1}</li>
                  <li>Horarios escolhidos: {form.horarios.length || 1}</li>
                  <li>Faixa media de valor: R$ {form.orcamentoHora}/h</li>
                </ul>
              </div>
            )}
          </section>
        )}

        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="rounded-full border border-black/10 px-5 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-45"
          >
            Voltar
          </button>
          {step < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              className="rounded-full bg-brand px-5 py-2 font-semibold text-white shadow-md shadow-brand/25"
            >
              Continuar
            </button>
          ) : (
            <button
              type="button"
              onClick={finishOnboarding}
              disabled={isAnalyzing}
              className="rounded-full bg-brand px-5 py-2 font-semibold text-white shadow-md shadow-brand/25 disabled:opacity-60"
            >
              Ver cuidadores recomendados
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
