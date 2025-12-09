import Link from "next/link";
import SiteImage from "@/components/SiteImage";

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 space-y-12">
      
      {/* Title */}
      <section>
        <h1 className="text-4xl font-bold mb-6">About</h1>

        <p className="text-gray-300 max-w-3xl leading-relaxed mb-6">
          The Electrum Observatory is an independent research project dedicated to
          measuring and analyzing the privacy, security, and decentralization properties
          of the Electrum server ecosystem. Our primary goal is to provide transparency,
          reproducible measurements, and data-driven insights for researchers, privacy
          advocates, and Bitcoin developers.
        </p>

        <p className="text-gray-400 leading-relaxed max-w-3xl">
          This project investigates how Electrum servers behave in the wild, what metadata
          they expose, how clusters may reveal shared operators, and whether any servers
          show indicators of surveillance, manipulation, or honeypot-like behavior. All
          scanning and analysis strictly follow ethical standards and avoid any collection
          of real user data.
        </p>
      </section>

      {/* Maintainers */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Maintainers</h2>

        <div className="space-y-10">

          {/* Gabriel Card */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
            
            <SiteImage
              src="/images/gabriel.jpg"
              alt="Gabriel Caixeta Romero"
              width={120}
              height={120}
              className="rounded-xl object-cover shadow-md"
            />

            <div>
              <p className="text-gray-200 text-lg font-semibold">
                Gabriel Caixeta Romero
              </p>
              <p className="text-gray-400 mb-3">
                Research, analysis, implementation
              </p>

              <Link
                href="https://github.com/gabrielcaixeta01"
                target="_blank"
                className="inline-block px-5 py-2 rounded-lg bg-white/10 border border-white/20 
                           text-gray-200 hover:bg-white/20 transition"
              >
                GitHub Profile
              </Link>
            </div>
          </div>

          {/* Lucas Card */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
            
            <SiteImage
              src="/images/saad.jpg"
              alt="Lucas Saad Rodrigues"
              width={120}
              height={120}
              className="rounded-xl object-cover shadow-md"
            />

            <div>
              <p className="text-gray-200 text-lg font-semibold">
                Lucas Saad Rodrigues
              </p>
              <p className="text-gray-400 mb-3">
                Research, analysis, implementation
              </p>

              <Link
                href="https://github.com/lucassaad"
                target="_blank"
                className="inline-block px-5 py-2 rounded-lg bg-white/10 border border-white/20 
                           text-gray-200 hover:bg-white/20 transition"
              >
                GitHub Profile
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}