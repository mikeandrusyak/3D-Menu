import Image from 'next/image';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="">
        {/* Header */}
        <header className="flex justify-between items-center px-2 py-4 mb-2">
          <div>
            <Image src="/icons/logo.jpg" alt="AR Menu Logo" width={56} height={56} className="rounded-full" />
          </div>
          <div className="space-x-2">
            <a href="#demo menu" className="bg-orange-400 hover:bg-orange-500 text-white rounded-lg px-4 py-2 font-medium transition">Demo Menu</a>
            <a href="#contacts" className="bg-orange-400 hover:bg-orange-500 text-white rounded-lg px-4 py-2 font-medium transition">Contact</a>
          </div>
        </header>

        {/* Hero Image */}
        <div className="w-full h-auto overflow-hidden mb-4">
          <Image src="/hero-dish.jpg" alt="Dish on tablet" width={400} height={200} className="w-full object-cover" />
        </div>

        {/* Welcome */}
        <div className="text-orange-500 text-3xl font-oleo text-center m-1">
          <span role="img" aria-label="wave">👋</span>Welcome
        </div>

        {/* Benefits */}
        <section className="rounded-4xl p-4 space-y-2 bg-white">
          <div className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="text-green-600 text-xl">✅</span>
            <span className="text-black">Benefits</span>
          </div>

          <div className="bg-brand-green rounded-xl p-2 text-black">
            <div className="flex items-center gap-2 mb-0">
              <span className="text-l">🧠</span>
              <span className="font-bold text-base">Easy to use</span>
            </div>
            <div className="text-sm">Clear and intuitive interface.</div>
          </div>

          <div className="bg-brand-green rounded-xl p-2 text-black">
            <div className="flex items-center gap-2 mb-0">
              <span className="text-l">📱</span>
              <span className="font-bold text-base">See before you order</span>
            </div>
            <div className="text-sm">3D preview of dish size and presentation.</div>
          </div>

          <div className="bg-brand-green rounded-xl p-2 text-black">
            <div className="flex items-center gap-2 mb-0">
              <span className="text-l">💬</span>
              <span className="font-bold text-base">Inclusive design</span>
            </div>
            <div className="text-sm">For people with visual, cognitive or language-related needs.</div>
          </div>
        </section>

        {/* How it Works */}
        <section>
          <div className="text-orange-500 text-3xl font-oleo text-center mb-2">How It Works</div>
          <div className="bg-brand-orange p-8 mb-0 shadow-lg space-y-2 text-black">
            <div>
              <p className="font-bold text-l">
                <span className="text-black">1</span> <span className="font-bold">Scan the QR code</span>
              </p>
              <p className="text-base">Open the menu using your phone’s camera.</p>
            </div>

            <div>
              <p className="font-bold text-l">
                <span className="text-black">2</span> <span className="font-bold">Point at the table</span>
              </p>
              <p className="text-base">Your camera opens — point it at your table.</p>
            </div>

            <div>
              <p className="font-bold text-l">
                <span className="text-black">3</span> <span className="font-bold">See the dish in real size</span>
              </p>
              <p className="text-base">View the meal in 3D right on your table — real size, real look.</p>
            </div>

            <div>
              <p className="font-bold text-l">
                <span role="img" aria-label="smile">😊</span> <span className="font-bold">Order & enjoy</span>
              </p>
              <p className="text-base">Choose your favorite — now you know exactly what to expect.</p>
            </div>
          </div>
        </section>

        {/* About us */}
        <section>
          <div className="text-orange-500 text-3xl font-oleo text-center m-2">About us</div>
          <div className="bg-brand-green rounded-xl m-2 p-6 text-black">
            <span className="font-bold">🥗 AR. Inclusive Menu — food for everyone</span>
            <p className="mt-1">We believe that everyone deserves to understand what they’re ordering — clearly, easily, and visually. Inclusive Menu is a tool that helps people with language barriers, cognitive differences, or special needs explore restaurant dishes in 3D or AR, right on their table.</p>
            <p className="mt-1">Whether you’re traveling, neurodivergent, non-verbal, or just love knowing exactly what you’ll get — we’re here for you.</p>
            <p className="mt-1">🍽️ Scan. See. Enjoy.</p>
            <p className="mt-1">Created by a small team with a big vision for inclusive dining.</p>
          </div>
        </section>

        {/* Contacts */}
        <section id="contacts">
          <div className="text-orange-500 text-3xl font-oleo text-center m-2">Contacts</div>
          <div className="bg-brand-orange p-6 mb-0 shadow-lg space-y-2 text-black">
            <div className="flex items-center gap-2"><span className="text-orange-500">📱</span>+41 79 602 23 48</div>
            <div className="flex items-center gap-2"><span className="text-orange-500">✉️</span>ar.menu@gmail.com</div>
          </div>
        </section>
      </div>
    </Layout>
  );
} 