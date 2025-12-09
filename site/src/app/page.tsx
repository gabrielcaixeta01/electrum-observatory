import SiteImage from "@/components/SiteImage";

export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      
      {/* ------------------------------------------------------------ */}
      {/* HEADER */}
      {/* ------------------------------------------------------------ */}
      <section className="flex flex-col md:flex-row items-start gap-8">
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-6">Electrum Observatory</h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
            Electrum is one of the most widely used Bitcoin light wallets. Because it relies on
            remote servers instead of full validation, its trust model differs significantly
            from Bitcoin Core. This project empirically investigates whether the Electrum server
            ecosystem shows signs of <span className="font-semibold">centralization</span>,
            <span className="font-semibold"> surveillance</span>,
            <span className="font-semibold"> fingerprinting</span>, or
            <span className="font-semibold"> honeypot-like behavior</span>.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mt-4">
            The Electrum Observatory maps the global Electrum network, analyzes server metadata,
            performs behavioral fingerprinting, identifies suspicious clusters, and measures
            privacy risks affecting millions of Bitcoin users.
          </p>
        </div>

        <div className="shrink-0 w-full md:w-64">
          <SiteImage src="/images/electrum.png" alt="Electrum Logo" width={256} height={256} className="w-full h-auto" />
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* FEATURE GRID */}
      {/* ------------------------------------------------------------ */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-6 border border-white/10 rounded-xl bg-white/5">
            <h2 className="text-xl font-semibold mb-2">Network Mapping</h2>
            <p className="text-gray-400">
              Enumeration of reachable Electrum servers, including infrastructure metadata,
              latency, protocol versions, and TLS certificate analysis.
            </p>
          </div>

          <div className="p-6 border border-white/10 rounded-xl bg-white/5">
            <h2 className="text-xl font-semibold mb-2">Behavioral Fingerprinting</h2>
            <p className="text-gray-400">
              Controlled queries detect deviations from reference behavior, revealing shared
              operators, modified backends, or surveillance patterns.
            </p>
          </div>

          <div className="p-6 border border-white/10 rounded-xl bg-white/5">
            <h2 className="text-xl font-semibold mb-2">Privacy Analysis</h2>
            <p className="text-gray-400">
              Assessment of xpub/address leakage, IP correlation, timing fingerprints, and
              client-side deanonymization vectors.
            </p>
          </div>

          <div className="p-6 border border-white/10 rounded-xl bg-white/5">
            <h2 className="text-xl font-semibold mb-2">Honeypot Research</h2>
            <p className="text-gray-400">
              Detection of TLS certificate reuse, identical behavior clusters, abnormal uptime,
              and infrastructure patterns consistent with monitoring nodes.
            </p>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* THREAT MODEL */}
      {/* ------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Threat Model</h2>

        <p className="text-gray-300 max-w-3xl leading-relaxed mb-6">
          The Electrum ecosystem exposes users to several privacy and surveillance risks.
          The following threat model summarizes the adversaries, capabilities, and assets
          at risk within the network.
        </p>

        {/* Adversary Types */}
        <h3 className="text-2xl font-semibold mb-3">1. Adversary Types</h3>
        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          <li><strong>Blockchain analytics firms</strong> — deanonymization of wallet activity.</li>
          <li><strong>Governments & law enforcement</strong> — monitoring financial flows.</li>
          <li><strong>Malicious individuals</strong> — IP harvesting, phishing, tracking.</li>
          <li><strong>Commercial entities</strong> — large-scale traffic analytics.</li>
        </ul>

        {/* Capabilities */}
        <h3 className="text-2xl font-semibold mt-8 mb-3">2. Adversary Capabilities</h3>
        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          <li>Operate many Electrum servers across different networks.</li>
          <li>Collect IP addresses, address queries, and xpub-derived identifiers.</li>
          <li>Perform active fingerprinting and timing correlation.</li>
          <li>Log incoming traffic indefinitely.</li>
          <li>Deploy modified or custom Electrum server implementations.</li>
        </ul>

        {/* Assets at Risk */}
        <h3 className="text-2xl font-semibold mt-8 mb-3">3. Assets at Risk</h3>
        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          <li>User IP addresses and identity patterns.</li>
          <li>Address reuse and behavioral habits.</li>
          <li>Xpub leakage revealing wallet structure.</li>
          <li>Timing metadata that fingerprints wallets.</li>
          <li>Client software fingerprints.</li>
        </ul>

        {/* Project Posture */}
        <h3 className="text-2xl font-semibold mt-8 mb-3">4. Project Security Posture</h3>
        <p className="text-gray-300 max-w-3xl leading-relaxed">
          The Electrum Observatory does not deanonymize users.  
          It performs only controlled, non-sensitive scans and adheres to strict ethical research
          practices. The objective is to measure privacy risks — not exploit them.
        </p>
      </section>

    </main>
  );
}