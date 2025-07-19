"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Divine Intervention Needed
        </h2>
        <p className="text-gray-300 mb-6">
          A temporary disruption in the spiritual connection has occurred.
        </p>
        <button
          onClick={reset}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
        >
          Restore Connection
        </button>
      </div>
    </div>
  );
}
