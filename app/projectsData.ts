export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  tech: string[];
  href?: string;
  repo?: string;
  media?: string;
  description: string;
  challenges: string;
}

export const projects: Project[] = [];