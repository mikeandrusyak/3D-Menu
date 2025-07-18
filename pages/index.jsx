import Image from 'next/image';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="max-w-md mx-auto px-2 py-4">
        {/* Header */}
        <header className="flex justify-between items-center px-2 py-4 mb-2">
          <div>
            <Image src="/icons/logo.jpg" alt="AR Menu Logo" width={56} height={56} className="rounded-full" />
          </div>
          <div className="space-x-2">
            <button className="bg-orange-400 hover:bg-orange-500 text-white rounded-lg px-4 py-2 font-medium transition">About us</button>
            <button className="bg-orange-400 hover:bg-orange-500 text-white rounded-lg px-4 py-2 font-medium transition">Contact</button>
          </div>
        </header>

        {/* Hero Image */}
        <div className="w-full h-auto rounded-xl overflow-hidden mb-4">
          <Image src="/hero-dish.jpg" alt="Dish on tablet" width={400} height={200} className="w-full object-cover" />
        </div>

        {/* Welcome */}
        <div className="text-center text-3xl text-orange-500 font-oleo flex justify-center items-center gap-2 mb-4">
          <span role="img" aria-label="wave">👋</span>Welcome
        </div>

        {/* Benefits */}
        <section className="rounded-xl p-4 mb-4 space-y-4 bg-white">
          <div className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="text-green-600 text-xl">✅</span>
            <span className="text-black">Benefits</span>
          </div>

          <div className="bg-brand-green rounded-xl p-4 text-black">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🧠</span>
              <span className="font-bold text-base">Easy to use</span>
            </div>
            <div className="text-sm">Clear and intuitive interface.</div>
          </div>

          <div className="bg-brand-green rounded-xl p-4 text-black">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">📱</span>
              <span className="font-bold text-base">See before you order</span>
            </div>
            <div className="text-sm">3D preview of dish size and presentation.</div>
          </div>

          <div className="bg-brand-green rounded-xl p-4 text-black">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">💬</span>
              <span className="font-bold text-base">Inclusive design</span>
            </div>
            <div className="text-sm">For people with visual, cognitive or language-related needs.</div>
          </div>
        </section>

        {/* How it Works */}
        <section className="border-2 border-purple-300 rounded-xl bg-white p-4 mb-4">
          <div className="text-orange-500 text-2xl font-oleo text-center mb-2">How it Works</div>
          <ol className="list-decimal list-inside text-sm text-gray-800 space-y-1">
            <li><span className="font-semibold">Scan the QR code</span> — Open the menu using your phone’s camera.</li>
            <li><span className="font-semibold">Point at the table</span> — Your camera opens — point it at your table.</li>
            <li><span className="font-semibold">See the dish in real size</span> — View the meal in 3D right on your table.</li>
            <li><span className="font-semibold">😊 Order & enjoy</span> — Choose your favorite — now you know what to expect.</li>
          </ol>
        </section>

        {/* About us */}
        <section className="border-2 border-green-300 bg-green-50 rounded-xl p-4 mb-4">
          <div className="text-orange-500 text-2xl font-oleo text-center mb-2">About us</div>
          <div className="text-sm text-gray-800">
            <span className="font-bold">🥗 AR. Inclusive Menu — food for everyone</span>
            <p className="mt-1">We believe that everyone deserves to understand what they’re ordering — clearly, easily, and visually. Inclusive Menu is a tool that helps people with language barriers, cognitive differences, or special needs explore restaurant dishes in 3D or AR, right on their table.</p>
            <p className="mt-1">Whether you’re traveling, neurodivergent, non-verbal, or just love knowing exactly what you’ll get — we’re here for you.</p>
            <p className="mt-1">🌐 Scan. See. Enjoy.</p>
            <p className="mt-1 text-xs text-gray-500">Created by a small team with a big vision for inclusive dining.</p>
          </div>
        </section>

        {/* Contacts */}
        <section className="border-2 border-orange-300 bg-orange-50 rounded-xl p-4 mb-4">
          <div className="text-orange-500 text-2xl font-bold text-center mb-2">Contacts</div>
          <div className="flex flex-col items-center gap-2 text-base">
            <div className="flex items-center gap-2"><span className="text-orange-500">📱</span>+41 79 602 23 48</div>
            <div className="flex items-center gap-2"><span className="text-orange-500">✉️</span>ar.menu@gmail.com</div>
          </div>
        </section>
      </div>
    </Layout>
  );
} 