import { jahmereWebb } from './jahmere-webb';
import { jordanDungy } from './jordan-dungy';
import { michaelMataluni } from './michael-mataluni';
import { coachDungy } from './coach-dungy';
import { jayForte } from './jay-forte';
import { marthaHenderson } from './martha-henderson';
import type { PersonData } from '@/types/person';

export const people: Record<string, PersonData> = {
  'jahmere-webb': jahmereWebb,
  'martha-henderson': marthaHenderson,
  'jordan-dungy': jordanDungy,
  'michael-mataluni': michaelMataluni,
  'coach-dungy': coachDungy,
  'jay-forte': jayForte,
};

export const getAllPeople = () => Object.values(people);
export const getPersonBySlug = (slug: string) => people[slug];

// Validate that all slugs match their keys
Object.entries(people).forEach(([key, person]) => {
  if (key !== person.slug) {
    console.warn(`Warning: Person key '${key}' does not match slug '${person.slug}'`);
  }
}); 