import SiteImage from "@/components/SiteImage";
import Link from "next/link";

export default function MethodologyPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      <h1 className="text-4xl font-bold mb-6">Methodology</h1>

      <p className="text-gray-300 max-w-3xl leading-relaxed">
        The Electrum Observatory uses an active-measurement approach to analyze the
        structure, behavior, and privacy properties of the Electrum server ecosystem.
        All scanning and data collection interact only with publicly reachable servers,
        and no user data is generated or accessed at any point.
      </p>

      {/* ------------------------------------------------------------------ */}
      {/* 1. Overview */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">1. Overview</h2>

        <p className="text-gray-400 max-w-3xl leading-relaxed">
          The methodology combines network discovery, metadata extraction, behavioral
          fingerprinting, certificate analysis, and clustering techniques. The goal is
          to detect centralization patterns, unusual server behavior, and potential
          surveillance or honeypot indicators across the Electrum ecosystem.
        </p>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 1.5 Seed Server Selection */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">Seed Server Selection</h2>

        <p className="text-gray-400 max-w-4xl leading-relaxed mb-4">
          Electrum servers do not maintain a peer-to-peer structure among themselves.
          Instead, each server publishes a list of recommended peers through the
          <code className="px-2 py-1 bg-white/10 rounded mx-1">server.peers.subscribe</code>
          RPC method. Network discovery therefore begins by querying a
          <strong> single seed server</strong>, which returns the initial set of peers.
        </p>

        <p className="text-gray-400 max-w-4xl leading-relaxed mb-4">
          The Electrum Observatory uses a recursive discovery crawler that starts from
          one seed server, connects to each returned peer, and continues the process up
          to a predetermined depth. The seed host acts as the entrypoint into the public
          Electrum network.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Seeds Used in This Study</h3>
        <ul className="list-disc ml-6 text-gray-300 space-y-1">
          <li>
            <strong>Primary Seed:</strong> <code>electrum3.bluewallet.io:50002</code>
          </li>
          <li>
            <strong>Fallback Seed:</strong> <code>electrum.blockstream.info:50002</code>
          </li>
        </ul>

        <p className="text-gray-400 max-w-3xl leading-relaxed mt-4">
          Choosing well-maintained and stable seed servers ensures consistent discovery
          and avoids topological bias caused by unreliable or misconfigured nodes.
        </p>

        <div className="mt-5 mx-auto md:mx-0 p-5 bg-white/5 border w-fit border-white/10 rounded-xl text-gray-400 italic">
          <SiteImage
            src="/diagrams/electrum-discovery-flow.svg"
            alt="Electrum network discovery flow diagram"
            width={400}
            height={400}
            className="rounded-xl border border-white/10"
          />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Network Discovery */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">2. Network Discovery</h2>

        <p className="text-gray-400 max-w-4xl leading-relaxed mb-6">
          Once the seed server is selected, the crawler retrieves its peer list and
          recursively connects to each peer. This process yields the widest reachable
          view of the Electrum network without relying on external or crowdsourced
          server lists.
        </p>

        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          <li>Retrieve peers via <code>server.peers.subscribe</code></li>
          <li>Connect using SSL first; fallback to TCP if necessary</li>
          <li>Extract basic metadata on connection</li>
          <li>Queue each discovered peer until depth limit is reached</li>
        </ul>

        <div className="mt-6 p-5 bg-white/5 border border-white/10 rounded-xl text-gray-400 italic">
          {/* <Image src="/results/network-map.png" ... /> */}
          (Placeholder: Global Electrum network map)
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. Metadata Scanning */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">3. Metadata Scanning</h2>

        <p className="text-gray-400 max-w-4xl leading-relaxed mb-4">
          Once connected to a server, the scanner records protocol information,
          TLS certificate details, latency, feature flags, and capabilities. All
          metadata is stored with timestamps for longitudinal analysis.
        </p>

        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          <li>Banner string & server software version</li>
          <li>Protocol negotiation level</li>
          <li>SSL certificate fingerprint & issuer</li>
          <li>Supported features (e.g., mempool status)</li>
          <li>Latency and timing characteristics</li>
        </ul>

        <div className="mt-6 p-5 bg-white/5 border mx-auto md:mx-0 w-fit border-white/10 rounded-xl text-gray-400 italic">
          <SiteImage
            src="/diagrams/methodology-cycle.svg"
            alt="Methodology cycle"
            width={500}
            height={500}
            className="mx-auto"
            unoptimized
          />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. Behavioral Fingerprinting */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">4. Behavioral Fingerprinting</h2>

        <p className="text-gray-400 max-w-4xl leading-relaxed mb-4">
          The crawler performs controlled probes to evaluate how each server responds to
          various address formats, malformed queries, and repetitive requests. Deviations
          from standard Electrum behavior may indicate modified implementations,
          analytics filters, or honeypot-like behavior.
        </p>

        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          <li>Standard queries (balance, history, headers)</li>
          <li>Address type variation (P2PKH, P2WPKH, Taproot)</li>
          <li>Malformed RPC injection</li>
          <li>Xpub-derived scripthash queries</li>
          <li>Timing variance and latency fingerprinting</li>
        </ul>

        <div className="mt-6 p-5 bg-white/5 border border-white/10 rounded-xl text-gray-400 italic">
          {/* <Image src="/results/fingerprint-matrix.png" ... /> */}
          (Placeholder: behavioral fingerprint matrix)
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. Data Normalization & Storage */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">5. Data Normalization & Storage</h2>

        <p className="text-gray-400 max-w-4xl leading-relaxed mb-4">
          Raw server responses are merged, standardized, and converted into structured
          datasets for reproducible analysis. TLS fields, behavioral measurements, and
          GeoIP attributes are normalized across all runs.
        </p>

        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          <li>Deduplication of multiple scan passes</li>
          <li>Certificate field canonicalization</li>
          <li>Behavioral hash computation</li>
          <li>GeoIP attribution</li>
        </ul>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. Clustering & Analysis */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">6. Clustering & Analysis</h2>

        <p className="text-gray-400 max-w-4xl leading-relaxed mb-4">
          Machine-learning techniques are used to detect clusters of servers that share
          similar behavior, certificates, infrastructure, or latency patterns. These
          clusters often reveal common operators or potential surveillance infrastructure.
        </p>

        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          <li>DBSCAN for identifying identical behavior clusters</li>
          <li>K-Means for protocol-level grouping</li>
          <li>PCA for reducing behavioral dimensionality</li>
          <li>Hierarchical clustering for operator inference</li>
        </ul>

        <div className="mt-6 p-5 bg-white/5 border border-white/10 rounded-xl text-gray-400 italic">
          {/* <Image src="/results/cluster-dendrogram.png" ... /> */}
          (Placeholder: clustering dendrogram)
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. Honeypot Indicators */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">7. Honeypot Indicators</h2>

        <p className="text-gray-400 max-w-4xl leading-relaxed mb-4">
          Servers exhibiting suspicious patterns — such as certificate reuse,
          malformed JSON signatures, unusual timing behavior, or selective failure
          cases — are flagged for deeper analysis. The goal is not to accuse operators,
          but to identify anomalous infrastructure that warrants investigation.
        </p>

        <Link
          href="/honeypots"
          className="inline-block px-5 py-2 rounded-lg bg-white/10 border border-white/20 
                      text-gray-200 hover:bg-white/20 transition"
        >
          Honeypot Indicators
        </Link>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 8. Output & Reporting */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">8. Output & Reporting</h2>

        <p className="text-gray-400 max-w-3xl">
          Final outputs include the global server dataset, behavioral fingerprints,
          certificate analysis, clustering results, and privacy-risk assessments.
          All reports are available as Jupyter notebooks and visual summaries.
        </p>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 9. Ethical Standards */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">9. Ethical Standards</h2>

        <p className="text-gray-400 max-w-3xl">
          All scanning adheres to strict ethical guidelines. Only publicly reachable
          Electrum servers are queried. No deanonymization techniques are used, and no
          wallet or user data is collected. The objective is transparency — not
          exploitation.
        </p>
      </section>
    </main>
  );
}