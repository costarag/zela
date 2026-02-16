import Link from "next/link";
import { HeartHandshake, Instagram, Linkedin, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-black/5 bg-[linear-gradient(135deg,#f4efe3_0%,#f9f8f4_55%,#eef4f2_100%)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-8 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/70 px-3 py-1 text-xs font-semibold text-brand">
            <HeartHandshake size={14} /> Cuidado com presenca e confianca
          </div>
          <p className="mt-4 font-display text-3xl font-semibold text-slate-900">Zela</p>
          <p className="mt-2 max-w-md text-sm text-foreground-soft">
            Conectamos familias a cuidadores de idosos com uma experiencia acolhedora,
            segura e humana em cada etapa da jornada.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
            <ShieldCheck size={14} /> Perfis com foco em seguranca e qualidade
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-slate-900">Navegacao</p>
            <div className="mt-3 space-y-2 text-sm text-foreground-soft">
              <Link href="/" className="block transition hover:text-foreground">
                Inicio
              </Link>
              <Link href="/onboarding" className="block transition hover:text-foreground">
                Encontrar cuidador(a)
              </Link>
              <Link href="/planos" className="block transition hover:text-foreground">
                Planos
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Acompanhe a Zela</p>
            <div className="mt-3 space-y-2 text-sm text-foreground-soft">
              <a
                href="https://www.instagram.com/zela.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-foreground"
              >
                <Instagram size={14} /> Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/zela-care"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-foreground"
              >
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/5 bg-white/70 py-3">
        <p className="mx-auto max-w-6xl px-4 text-xs text-foreground-soft sm:px-8">
          {new Date().getFullYear()} Zela. Feito para familias que cuidam com amor.
        </p>
      </div>
    </footer>
  );
}
