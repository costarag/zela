export type CareNeed =
  | "companhia"
  | "higiene"
  | "mobilidade"
  | "medicacao"
  | "noturno"
  | "pos-operatorio";

export type Availability = "Manha" | "Tarde" | "Noite" | "Plantao";

export interface Caregiver {
  id: string;
  nome: string;
  idade: number;
  foto: string;
  cidade: string;
  bairro: string;
  valorHora: number;
  experienciaAnos: number;
  avaliacao: number;
  distanciaKm: number;
  verificado: boolean;
  disponivel: Availability[];
  especialidades: CareNeed[];
  descricao: string;
}

export interface FamilyProfile {
  nomeResponsavel: string;
  cidade: string;
  bairro: string;
  orcamentoHora: number;
  frequencia: "Diaria" | "Semanal" | "Plantao" | "Fim de semana";
  horarios: string[];
  necessidades: CareNeed[];
  preferencias: string[];
}

export interface Interview {
  id: string;
  caregiverId: string;
  caregiverNome: string;
  dataISO: string;
  status: "Confirmada" | "Pendente" | "Reagendar";
  canal: "Video" | "Presencial";
}

export interface DailyCareLog {
  dia: string;
  horasCuidado: number;
  avaliacaoDia: number;
  pontualidade: number;
}

export interface ChatMessage {
  id: string;
  autor: "familia" | "cuidador" | "assistente";
  texto: string;
  timestamp: string;
}
