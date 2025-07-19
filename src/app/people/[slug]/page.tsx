import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPerson, getAllPeople } from "@/data/people";

interface PersonPageParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PersonPageParams): Promise<Metadata> {
  const { slug } = await params;
  const personData = getPerson(slug);

  if (!personData) {
    return {
      title: "Person Not Found",
    };
  }

  return {
    title: `${personData.name} | The Bridge Project`,
    description: personData.bio || `Learn about ${personData.name}`,
  };
}

export async function generateStaticParams() {
  const people = getAllPeople();
  return people.map((person) => ({
    slug: person.slug,
  }));
}

export default async function PersonPage({ params }: PersonPageParams) {
  const { slug } = await params;
  const personData = getPerson(slug);

  if (!personData) {
    notFound();
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {personData.name}
          </h1>
          <p className="text-xl text-gray-600 mb-8">{personData.bio}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">
            About {personData.name}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            This page is temporarily simplified for deployment. Full content
            will be restored soon.
          </p>
        </div>
      </div>
    </div>
  );
}
