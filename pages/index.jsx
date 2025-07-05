import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to 3D-Menu!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Interactive menu with AR support for restaurants
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Demo Restaurant
            </h2>
            <p className="text-gray-600 mb-6">
              Try our interactive menu with 3D dish previews
            </p>
            <Link
              href="/demo-restaurant"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View Menu
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500">
            <div className="flex items-center justify-center">
              <span className="mr-2">📱</span>
              Mobile-first design
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-2">🎲</span>
              3D model viewer
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-2">⚡</span>
              Fast & responsive
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-2">🎨</span>
              Beautiful UI
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 