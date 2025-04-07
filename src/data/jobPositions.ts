
export interface JobPosition {
  title: string;
  type: string;
  location: string;
  salary: string;
  description: string;
}

export const jobPositions: JobPosition[] = [
  {
    title: "Analist Financiar",
    type: "Full-time",
    location: "București",
    salary: "Competitiv",
    description: "Analizează piețele financiare și oferă recomandări de investiții pentru clienții noștri. Cerințe: experiență în analiză financiară, cunoștințe avansate Excel, certificare CFA (avantaj)."
  },
  {
    title: "Consultant Investiții",
    type: "Full-time",
    location: "Cluj-Napoca",
    salary: "Competitiv",
    description: "Oferă consultanță personalizată clienților privind opțiunile de investiții potrivite. Cerințe: experiență în vânzări sau consultanță financiară, abilități excelente de comunicare."
  },
  {
    title: "Specialist Marketing Digital",
    type: "Full-time / Remote",
    location: "Oriunde",
    salary: "Competitiv",
    description: "Dezvoltă și implementează strategii de marketing digital pentru promovarea serviciilor Markets4all. Cerințe: experiență în marketing digital, cunoștințe SEO/SEM, familiaritate cu platformele sociale."
  },
  {
    title: "Content Creator Educație Financiară",
    type: "Part-time / Colaborare",
    location: "Remote",
    salary: "Negociabil",
    description: "Creează conținut educațional despre investiții și piețe financiare. Cerințe: experiență în domeniul financiar, abilități de creare conținut (text, video), pasiune pentru educație financiară."
  }
];
