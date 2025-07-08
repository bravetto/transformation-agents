import { PersonData } from "@/types/person";
import { jahmereWebb } from "./jahmere-webb";
import { coachDungy } from "./coach-dungy";
import { jordanDungy } from "./jordan-dungy";
import { jayForte } from "./jay-forte";
import { michaelMataluni } from "./michael-mataluni";
import { marthaHenderson } from "./martha-henderson";
import { philGhuneim } from "./phil-ghuneim";
import { kristinMataluni } from "./kristin-mataluni";
import { mohammadAliRaza } from "./mohammad-ali-raza";
import { billMcDade } from "./bill-mcdade";
import { brooksLopez } from "./brooks-lopez";
import { allisonLopez } from "./allison-lopez";
import { jacob } from "./jacob";
import { paul } from "./paul";

export const people: PersonData[] = [
  jahmereWebb,
  coachDungy,
  jordanDungy,
  jayForte,
  michaelMataluni,
  marthaHenderson,
  philGhuneim,
  kristinMataluni,
  mohammadAliRaza,
  billMcDade,
  brooksLopez,
  allisonLopez,
  jacob,
  paul,
];

export const getPerson = (id: string): PersonData | undefined => {
  return people.find((person) => person.id === id);
};

export const getFeaturedPeople = (): PersonData[] => {
  return people
    .filter((person) => person.metadata?.featured)
    .sort((a, b) => (a.metadata?.order || 999) - (b.metadata?.order || 999));
};

export const getPeopleByCategory = (category: string): PersonData[] => {
  return people
    .filter((person) => person.metadata?.category === category)
    .sort((a, b) => (a.metadata?.order || 999) - (b.metadata?.order || 999));
};

export const getAllPeople = (): PersonData[] => {
  return people;
};

export const getPersonBySlug = (slug: string): PersonData | undefined => {
  return people.find((person) => person.id === slug || person.slug === slug);
};
