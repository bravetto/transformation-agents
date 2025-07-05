import { Metadata } from 'next';
import PeopleContent from './people-content';

export const metadata: Metadata = {
  title: 'Transformation Agents | The Bridge',
  description: 'Meet the extraordinary individuals whose faith journeys are transforming lives and communities through The Bridge Project.'
};

export default function PeopleIndexPage() {
  return <PeopleContent />;
} 