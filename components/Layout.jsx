import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>3D-Menu</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-white border-t mt-auto">
          <div className="max-w-screen-sm mx-auto px-4 py-4 text-center">
            <Link href="/">
              <small className="text-gray-500 cursor-pointer hover:underline">© 2025 3D-Menu</small>
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
} 