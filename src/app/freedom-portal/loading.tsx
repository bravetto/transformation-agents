export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-purple-400 rounded-full animate-ping"></div>
          <div className="absolute inset-0 border-4 border-purple-600 rounded-full animate-spin"></div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Opening Divine Portal...
        </h2>
        <p className="text-purple-300">Preparing miracles for manifestation</p>
      </div>
    </div>
  );
}
