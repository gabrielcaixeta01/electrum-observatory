import SiteImage from "@/components/SiteImage";

export default function NetworkTopologyPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      <h1 className="text-4xl font-bold mb-4">Electrum Network Topology</h1>

      <p className="text-gray-300 max-w-3xl leading-relaxed">
        The Electrum network does not operate like a traditional peer-to-peer
        system. Instead, it forms a global collection of independent servers,
        each backed by a Bitcoin full node, providing data to lightweight
        clients. This page describes the structural characteristics of the
        network and the topology metrics measured by the Electrum Observatory.
      </p>

      {/* ------------------------------------------------------------------ */}
      {/* 1. Electrum Network Structure */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">1. Electrum Network Structure</h2>

        <p className="text-gray-400 max-w-3xl mb-4">
          Unlike Bitcoin Core nodes, which participate in a decentralized P2P
          mesh, Electrum clients follow a simpler <strong>client → server</strong>
          relationship. Servers are not required to talk to each other.
        </p>

        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          <li>Servers do <strong>not</strong> form a peer graph.</li>
          <li>Clients connect directly to a chosen server via TCP/SSL.</li>
          <li>Each server runs independently, without coordination.</li>
          <li>Server discovery relies on external lists and DNS seeds.</li>
        </ul>

        <div className="mt-6 p-6 border border-white/10 w-fit mx-auto md:mx-0 rounded-xl bg-white/5 text-gray-400 text-sm italic">
          <SiteImage
            src="/diagrams/client-to-independent-servers.svg"
            alt="Client to Independent Servers"
            width={500}
            height={500}
            className="mx-auto"
            unoptimized
          />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Server Components */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">2. Server Components</h2>

        <p className="text-gray-400 max-w-3xl mb-4">
          An Electrum server is effectively a gateway to blockchain data,
          powered by a full Bitcoin node and a protocol-specific backend.
        </p>

        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          <li>A full Bitcoin node (Bitcoin Core)</li>
          <li>ElectrumX / Electrs / ElectrumServer implementation</li>
          <li>Network interface for TCP or SSL connections</li>
        </ul>

        <div className="mt-6 p-6 border border-white/10 w-fit mx-auto md:mx-0 rounded-xl bg-white/5 text-gray-400 text-sm italic">
          <SiteImage
            src="/diagrams/node-backend-interface.svg"
            alt="Node Backend Interface"
            width={500}
            height={500}
            className="mx-auto"
            unoptimized
          />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. Public Topology Characteristics */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">3. Public Topology Characteristics</h2>

        <p className="text-gray-400 mb-4 max-w-3xl">
          Since servers do not connect to each other, the network resembles a
          large directory of independent endpoints rather than a distributed
          overlay network.
        </p>

        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          <li>No global peer-to-peer graph.</li>
          <li>Server lists act as discovery points.</li>
          <li>No built-in cryptographic trust model.</li>
          <li>Clients often remain attached to the same server for long periods.</li>
          <li>Anyone can deploy a server instantly — lowering the barrier for surveillance.</li>
        </ul>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. Topology Metrics Measured */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">4. Topology Metrics Measured</h2>

        <p className="text-gray-400 max-w-3xl mb-6">
          The Electrum Observatory measures several dimensions of network
          structure to assess decentralization, operator diversity, and
          surveillance risks.
        </p>

        {/* ---------------- 4.1 Reachability ---------------- */}
        <h3 className="text-2xl font-semibold mt-8 mb-3">4.1 Server Count & Reachability</h3>
        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          <li>Number of reachable TCP servers</li>
          <li>Number of reachable SSL servers</li>
          <li>Success/failure connection ratios</li>
        </ul>

        <div className="mt-4 p-6 border border-white/10 w-fit bg-white/5 rounded-xl text-sm text-gray-400 italic">
          <SiteImage
            src="/results/reachability_distribution.png"
            alt="Reachability Distribution"
            width={500}
            height={500}
            className="mx-auto"
            unoptimized
          />
        </div>
        <div className="mt-4 p-6 border border-white/10 w-fit bg-white/5 rounded-xl text-sm text-gray-400 italic">
          <SiteImage
            src="/results/protocol_availability.png"
            alt="Protocol Availability"
            width={500}
            height={500}
            className="mx-auto"
            unoptimized
          />
        </div>

        {/* ---------------- 4.2 Geographic Distribution ---------------- */}
        <h3 className="text-2xl font-semibold mt-10 mb-3">4.2 Geographic Distribution</h3>
        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          <li>GeoIP country-level mapping</li>
          <li>City-level clustering (when available)</li>
          <li>ISP/ASN distribution</li>
        </ul>

        <div className="mt-4 p-6 border border-white/10 w-fit bg-white/5 rounded-xl text-sm text-gray-400 italic">
          <SiteImage
            src="/results/global_network_map.png"
            alt="Global Network Map"
            width={500}
            height={500}
            className="mx-auto"
            unoptimized
          />
        </div>

        {/* ---------------- 4.3 Infrastructure Concentration ---------------- */}
        <h3 className="text-2xl font-semibold mt-10 mb-3">4.3 Infrastructure Concentration</h3>
        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          <li>Fraction of nodes on cloud providers</li>
          <li>Grouping by hosting provider</li>
          <li>Clusters inferred from certificate reuse</li>
        </ul>

        <div className="mt-4 p-6 border border-white/10 bg-white/5 rounded-xl text-sm text-gray-400 italic">
          {/* <Image src="/results/infra-concentration.png" ... /> */}
          (Chart placeholder: Hosting provider breakdown)
        </div>

        {/* ---------------- 4.4 Software Diversity ---------------- */}
        <h3 className="text-2xl font-semibold mt-10 mb-3">4.4 Software Diversity</h3>
        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          <li>ElectrumX version distribution</li>
          <li>Electrs version distribution</li>
          <li>Presence of modified or unknown implementations</li>
        </ul>

        {/* ---------------- 4.5 Latency Graph ---------------- */}
        <h3 className="text-2xl font-semibold mt-10 mb-3">4.5 Latency Graph</h3>
        <p className="text-gray-400 max-w-3xl">
          Latency patterns help infer geographic proximity, server clustering,
          and whether servers sit behind load balancers or monitoring layers.
        </p>

        <div className="mt-4 p-6 border border-white/10 bg-white/5 rounded-xl text-sm text-gray-400 italic">
          {/* <Image src="/results/latency-graph.png" ... /> */}
          (Graph placeholder: Latency distribution)
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. Topology Risks */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">5. Topology Risks</h2>

        <p className="text-gray-400 max-w-3xl mb-4">
          The structural properties of the Electrum network create meaningful
          privacy and security risks for end users.
        </p>

        <ul className="list-disc ml-6 text-gray-300 space-y-2">
          <li>High concentration in major cloud providers.</li>
          <li>Minimal transparency about server operators.</li>
          <li>Lack of cryptographic authentication of server identity.</li>
          <li>No peer validation or DHT-based mitigation.</li>
          <li>Single-server compromise directly impacts connected clients.</li>
        </ul>
      </section>
    </main>
  );
}