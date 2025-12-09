import Image from "next/image";

export default function ResultsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      <h1 className="text-4xl font-bold mb-6">Results</h1>

      <p className="text-gray-300 max-w-3xl leading-relaxed">
        This section contains visual outputs produced by the Electrum Observatory.
        Each block already includes a prepared placeholder for inserting notebook-generated
        images once analysis is complete.
      </p>

      {/* --------------------- 1. Global Network Map --------------------- */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Global Electrum Server Distribution</h2>
        <p className="text-gray-400 mb-4 max-w-2xl">
          Geolocation map showing density and distribution of reachable Electrum servers.
        </p>

        {/* 
        <Image
          src="/results/world_map.png"
          alt="Electrum network world map"
          width={900}
          height={500}
          className="rounded-lg border border-white/10"
        />
        */}

        <div className="border border-white/10 bg-white/5 rounded-xl p-4 h-[380px] flex items-center justify-center">
          <span className="text-gray-500 italic">Insert world_map.png here</span>
        </div>
      </section>

      {/* --------------------- 2. Behavioral Clustering --------------------- */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Behavioral Clustering</h2>
        <p className="text-gray-400 mb-4 max-w-2xl">
          Clusters derived from timing profiles, response formats, and behavioral signatures.
        </p>

        {/* 
        <Image
          src="/results/behavior_clusters.png"
          alt="Behavior clustering diagram"
          width={900}
          height={500}
          className="rounded-lg border border-white/10"
        />
        */}

        <div className="border border-white/10 bg-white/5 rounded-xl p-4 h-[380px] flex items-center justify-center">
          <span className="text-gray-500 italic">Insert behavior_clusters.png here</span>
        </div>
      </section>

      {/* --------------------- 3. TLS Certificate Reuse --------------------- */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">TLS Certificate Reuse</h2>
        <p className="text-gray-400 mb-4 max-w-2xl">
          Graph showing certificate reuse, shared fingerprints, and infrastructure clusters.
        </p>

        {/* 
        <Image
          src="/results/cert_reuse.png"
          alt="TLS certificate reuse graph"
          width={900}
          height={500}
          className="rounded-lg border border-white/10"
        />
        */}

        <div className="border border-white/10 bg-white/5 rounded-xl p-4 h-[380px] flex items-center justify-center">
          <span className="text-gray-500 italic">Insert cert_reuse.png here</span>
        </div>
      </section>

      {/* --------------------- 4. Latency Heatmap --------------------- */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Latency Heatmaps</h2>
        <p className="text-gray-400 mb-4 max-w-2xl">
          Heatmaps of latency measurements across regions and repeated probes.
        </p>

        {/* 
        <Image
          src="/results/latency_heatmap.png"
          alt="Latency heatmap"
          width={900}
          height={500}
          className="rounded-lg border border-white/10"
        />
        */}

        <div className="border border-white/10 bg-white/5 rounded-xl p-4 h-[380px] flex items-center justify-center">
          <span className="text-gray-500 italic">Insert latency_heatmap.png here</span>
        </div>
      </section>

      {/* --------------------- 5. Suspicious Outliers --------------------- */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Suspicious Outliers</h2>
        <p className="text-gray-400 mb-4 max-w-2xl">
          Servers that deviate significantly from expected Electrum protocol behavior.
        </p>

        {/* 
        <Image
          src="/results/anomalies.png"
          alt="Outlier analysis"
          width={900}
          height={500}
          className="rounded-lg border border-white/10"
        />
        */}

        <div className="border border-white/10 bg-white/5 rounded-xl p-4 h-[380px] flex items-center justify-center">
          <span className="text-gray-500 italic">Insert anomalies.png here</span>
        </div>
      </section>
    </main>
  );
}