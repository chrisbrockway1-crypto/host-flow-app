import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold text-indigo-600 mb-6">Host Flow</h1>
        <p className="text-xl text-gray-600 mb-8">
          The simple, automated way to manage your short-term rental welcome books and guest messaging.
        </p>
        
        <div className="space-x-4">
          <Link href="/properties/new">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
              Get Started (Demo)
            </button>
          </Link>
          
          <Link href="/auth/login">
            <button className="bg-white text-indigo-600 border border-indigo-200 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}