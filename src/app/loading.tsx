export default function RootLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section Loading */}
        <div className="text-center mb-16">
          <div className="mx-auto w-3/4 md:w-2/3 h-16 bg-gray-200 animate-pulse rounded-lg mb-6"></div>
          <div className="mx-auto w-full md:w-1/2 h-6 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>

        {/* Simple loading message */}
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center">
            <div className="relative h-10 w-10 mr-4">
              <div className="absolute inset-0 rounded-full border-2 border-gray-200 border-t-blue-600 animate-spin"></div>
            </div>
            <p className="text-lg text-gray-600 font-medium">Loading...</p>
          </div>
          <div className="max-w-md mx-auto mt-6 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 w-1/3"></div>
          </div>
        </div>

        {/* Grid Loading Skeleton */}
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md h-80"
              >
                <div className="absolute inset-0 bg-gray-100"></div>
                <div className="relative h-full flex flex-col justify-end z-10">
                  <div className="bg-white/90 rounded-b-xl space-y-4 p-5">
                    <div className="h-7 w-3/5 rounded-md bg-gray-200 animate-pulse"></div>
                    <div className="h-5 w-4/5 rounded-md bg-gray-200 animate-pulse opacity-80"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded-md bg-gray-200 animate-pulse opacity-60"></div>
                      <div className="h-4 w-11/12 rounded-md bg-gray-200 animate-pulse opacity-60"></div>
                      <div className="h-4 w-4/5 rounded-md bg-gray-200 animate-pulse opacity-60"></div>
                    </div>
                    <div className="h-5 w-28 rounded-md bg-gray-200 animate-pulse opacity-70 mt-4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
