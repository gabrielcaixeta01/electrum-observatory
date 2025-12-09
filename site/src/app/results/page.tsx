import SiteImage from "@/components/SiteImage";

export default function ResultsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      <h1 className="text-4xl font-bold mb-6">Results</h1>

      <p className="text-gray-300 max-w-3xl leading-relaxed">
        This section contains visual outputs produced by the Electrum Observatory.
        Each block already includes a prepared placeholder for inserting notebook-generated
        images once analysis is complete.
      </p>

      {/* --------------------- 1. Software Diversity --------------------- */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Electrum Server Diversity</h2>
        <p className="text-gray-400 mb-4 max-w-2xl">
         Breakdown of server implementations across the network
        </p>

        <div className="border border-white/10 bg-white/5 rounded-xl p-4 h-fit w-fit flex items-center justify-center">
          <SiteImage
            src="/results/software_diversity.png"
            alt="Electrum network world map"
            width={900}
            height={500}
            className="rounded-lg border border-white/10"
          />
        </div>
      </section>

      {/* --------------------- 2. TLS Certificate Reuse --------------------- */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">TLS Certificate Reuse</h2>
        <p className="text-gray-400 mb-4 max-w-2xl">
          Graph showing certificate reuse, shared fingerprints, and infrastructure clusters.
        </p>

        <div className="border border-white/10 bg-white/5 rounded-xl p-4 h-fit w-fit flex items-center justify-center">
          <SiteImage
            src="/results/certificate_clusters.png"
            alt="TLS certificate reuse graph"
            width={900}
            height={500}
            className="rounded-lg border border-white/10"
          />
        </div>
      </section>

      {/* --------------------- 3. Latency --------------------- */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Latency</h2>
        <p className="text-gray-400 mb-4 max-w-2xl">
          Analysis of server response times
        </p>

        <div className="border border-white/10 bg-white/5 rounded-xl p-4 h-fit w-fit flex items-center justify-center">
          <SiteImage
            src="/results/latency_graph.png"
            alt="Latency heatmap"
            width={900}
            height={500}
            className="rounded-lg border border-white/10"
          />
        </div>
      </section>
    </main>
  );
}