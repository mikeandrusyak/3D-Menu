import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>3D-Menu</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-screen-sm mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900">3D-Menu</h1>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-white border-t mt-auto">
          <div className="max-w-screen-sm mx-auto px-4 py-4 text-center">
            <small className="text-gray-500">© 2024 3D-Menu</small>
          </div>
        </footer>
      </div>
    </>
  );
} 