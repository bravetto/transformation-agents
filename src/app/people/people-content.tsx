"use client";

import Link from 'next/link';
import { getAllPeople } from '@/data/people';

export default function PeopleContent() {
  let people;
  
  try {
    people = getAllPeople();
  } catch (error) {
    console.error('Error loading people:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading People</h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Transformation Agents
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Meet the extraordinary individuals whose faith journeys are transforming lives and communities.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {people.map((person) => (
            <Link 
              key={person.id} 
              href={`/people/${person.slug}`}
              className="block"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full border border-gray-200 dark:border-gray-700">
                <div className="space-y-3">
                  {/* Avatar with initials */}
                  <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  {/* Name */}
                  <h2 className="text-xl font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {person.name}
                  </h2>
                  
                  {/* Title */}
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {person.title}
                  </p>
                  
                  {/* Bio */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {person.impact.description}
                  </p>
                  
                  {/* Read Story Link */}
                  <div className="pt-2">
                    <span className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                      Read Story 
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
} 