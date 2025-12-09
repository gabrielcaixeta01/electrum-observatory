export default function ServerMetadataPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      <h1 className="text-4xl font-bold mb-4">Server Metadata Fields</h1>

      <p className="text-gray-300 max-w-3xl leading-relaxed">
        The Electrum Observatory scanner records a structured set of fields for every
        reachable Electrum server. These fields describe network reachability, protocol
        behavior, TLS identity, infrastructure, and internal analysis flags.
        This page documents the schema used in the exported datasets.
      </p>

      {/* ------------------------------------------------------------------ */}
      {/* 1. Basic Metadata */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">1. Basic Metadata</h2>
        <p className="text-gray-400 mb-3 max-w-3xl">
          Low-level connection and reachability information for each server.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
          <table className="min-w-full text-sm">
            <thead className="bg-white/10 text-left">
              <tr>
                <th className="px-4 py-2 font-semibold">Field</th>
                <th className="px-4 py-2 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-2 font-mono">ip</td>
                <td className="px-4 py-2">Server IP address.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">port</td>
                <td className="px-4 py-2">Port used (TCP or SSL).</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">ssl</td>
                <td className="px-4 py-2">Boolean flag indicating SSL/TLS usage.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">reachable</td>
                <td className="px-4 py-2">Whether the connection handshake succeeded.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">latency_ms</td>
                <td className="px-4 py-2">Round-trip time for basic queries, in milliseconds.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Protocol Metadata */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">2. Protocol Metadata</h2>
        <p className="text-gray-400 mb-3 max-w-3xl">
          Fields describing the Electrum protocol-level behavior and reported versions.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
          <table className="min-w-full text-sm">
            <thead className="bg-white/10 text-left">
              <tr>
                <th className="px-4 py-2 font-semibold">Field</th>
                <th className="px-4 py-2 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-2 font-mono">banner</td>
                <td className="px-4 py-2">Reported server banner string.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">protocol_version</td>
                <td className="px-4 py-2">Electrum protocol version negotiated.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">server_version</td>
                <td className="px-4 py-2">Implementation version (e.g., ElectrumX, Electrs, Fulcrum).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. TLS Metadata */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">3. TLS Metadata</h2>
        <p className="text-gray-400 mb-3 max-w-3xl">
          TLS certificate information used for identity, reuse, and honeypot analysis.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
          <table className="min-w-full text-sm">
            <thead className="bg-white/10 text-left">
              <tr>
                <th className="px-4 py-2 font-semibold">Field</th>
                <th className="px-4 py-2 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-2 font-mono">certificate_sha256</td>
                <td className="px-4 py-2">SHA-256 fingerprint of the TLS certificate.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">issuer</td>
                <td className="px-4 py-2">Certificate issuer (CA or internal authority).</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">valid_from</td>
                <td className="px-4 py-2">Certificate validity start timestamp.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">valid_to</td>
                <td className="px-4 py-2">Certificate expiration timestamp.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">san_dns</td>
                <td className="px-4 py-2">DNS names contained in the Subject Alternative Name extension.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. Behavioral Metadata */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">4. Behavioral Metadata</h2>
        <p className="text-gray-400 mb-3 max-w-3xl">
          Fields that summarize how the server responds to different queries, including
          timing behavior and error handling.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
          <table className="min-w-full text-sm">
            <thead className="bg-white/10 text-left">
              <tr>
                <th className="px-4 py-2 font-semibold">Field</th>
                <th className="px-4 py-2 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-2 font-mono">balance_response</td>
                <td className="px-4 py-2">Structured result of the balance probe.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">history_response</td>
                <td className="px-4 py-2">Structured result of the history probe.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">rate_limit_triggered</td>
                <td className="px-4 py-2">Whether rate limiting was triggered during tests.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">malformed_response</td>
                <td className="px-4 py-2">How the server responds to malformed or invalid queries.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">timing_variance</td>
                <td className="px-4 py-2">Standard deviation of response latency across repeated probes.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">fingerprint_hash</td>
                <td className="px-4 py-2">Hash summarizing the server&apos;s behavioral profile.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. Geo & Infrastructure */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">5. Geo & Infrastructure</h2>
        <p className="text-gray-400 mb-3 max-w-3xl">
          GeoIP and hosting-related metadata used to detect concentration in providers or ASNs.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
          <table className="min-w-full text-sm">
            <thead className="bg-white/10 text-left">
              <tr>
                <th className="px-4 py-2 font-semibold">Field</th>
                <th className="px-4 py-2 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-2 font-mono">country</td>
                <td className="px-4 py-2">GeoIP country associated with the server IP.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">city</td>
                <td className="px-4 py-2">GeoIP city (when available).</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">asn</td>
                <td className="px-4 py-2">Autonomous System Number.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">org</td>
                <td className="px-4 py-2">Organization or ISP name from GeoIP.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">cloud_provider</td>
                <td className="px-4 py-2">Cloud provider classification (AWS, GCP, Hetzner, OVH, etc.).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. Internal Flags */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">6. Internal Flags</h2>
        <p className="text-gray-400 mb-3 max-w-3xl">
          Fields derived from internal analysis and scoring. These are not direct protocol
          values but higher-level interpretations.
        </p>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
          <table className="min-w-full text-sm">
            <thead className="bg-white/10 text-left">
              <tr>
                <th className="px-4 py-2 font-semibold">Field</th>
                <th className="px-4 py-2 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-2 font-mono">honeypot_score</td>
                <td className="px-4 py-2">Aggregate suspicion score derived from multiple indicators.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">cluster_id</td>
                <td className="px-4 py-2">Label of the behavioral or infrastructure cluster.</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">notes</td>
                <td className="px-4 py-2">Free-text notes for manual observations and annotations.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}