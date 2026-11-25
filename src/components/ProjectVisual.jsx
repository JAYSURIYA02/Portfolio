/**
 * ProjectVisual renders authentic project output screenshots where available,
 * or original dark-mode architectural / telemetry diagrams tailored to each system.
 */
export default function ProjectVisual({ project }) {
  if (project.visualType === 'image' && project.image) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#0E0E0E]">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-[#080808]/20" />
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] tracking-[0.16em] text-white/85">
          <span className="border border-lime/40 bg-[#080808]/85 px-2.5 py-1 text-lime">
            VERIFIED OUTPUT
          </span>
          <span className="bg-[#080808]/80 px-2.5 py-1 text-white/70">
            {project.status.toUpperCase()}
          </span>
        </div>
      </div>
    );
  }

  if (project.visualType === 'swifttrack') {
    const actors = [
      { name: 'MERCHANT', detail: 'Rate calc · Barcode labels' },
      { name: 'HUB MANAGER', detail: 'Warehouse queue · Transit' },
      { name: 'DELIVERY AGENT', detail: 'Dispatch · Status updates' },
      { name: 'CUSTOMER', detail: 'Live tracking · Orders' },
      { name: 'ADMIN', detail: 'Pricing · Revenue reports' },
    ];
    return (
      <div className="tech-grid-bg relative flex h-full w-full flex-col justify-between bg-[#0B0B0B] p-6 sm:p-8">
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-muted">
          <span>SYSTEM TOPOLOGY // NESTJS + SQLITE</span>
          <span className="text-lime">5 ACTORS</span>
        </div>

        <div className="my-auto grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {actors.map((actor, idx) => (
            <div
              key={actor.name}
              className={`border border-white/12 bg-[#111111]/90 p-3 transition-colors group-hover:border-lime/35 ${
                idx === 4 ? 'sm:col-span-2' : ''
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[11px] text-lime">
                <span>{actor.name}</span>
                <span className="text-white/30">0{idx + 1}</span>
              </div>
              <div className="mt-1 text-xs text-white/75">{actor.detail}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px] text-white/60">
          <span>REST API · AUTH · PAYMENTS</span>
          <span className="text-lime">TEAM 38_TRANSITCODERS</span>
        </div>
      </div>
    );
  }

  if (project.visualType === 'anomaly') {
    return (
      <div className="tech-grid-bg relative flex h-full w-full flex-col justify-between bg-[#0B0B0B] p-6 sm:p-8">
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-muted">
          <span>CONV AUTOENCODER // MVTEC AD</span>
          <span className="text-lime">256×256 RECONSTRUCTION</span>
        </div>

        <div className="my-auto py-4">
          <svg
            viewBox="0 0 420 170"
            className="w-full overflow-visible"
            role="img"
            aria-label="Validation reconstruction error distribution with verified anomaly thresholds"
          >
            {/* Grid baseline */}
            <line x1="20" y1="140" x2="400" y2="140" stroke="rgba(255,255,255,0.2)" />
            {/* Histogram bars mirroring Threshold.png validation error profile */}
            {[
              { x: 35, h: 25 },
              { x: 60, h: 98 },
              { x: 76, h: 52 },
              { x: 92, h: 98 },
              { x: 108, h: 98 },
              { x: 124, h: 52 },
              { x: 140, h: 98 },
              { x: 156, h: 52 },
              { x: 172, h: 98 },
              { x: 188, h: 25 },
              { x: 204, h: 25 },
              { x: 220, h: 52 },
              { x: 236, h: 25 },
              { x: 268, h: 25 },
              { x: 288, h: 74 },
              { x: 312, h: 74 },
              { x: 328, h: 25 },
              { x: 358, h: 25 },
              { x: 382, h: 25 },
            ].map((bar, i) => (
              <rect
                key={i}
                x={bar.x}
                y={140 - bar.h}
                width="13"
                height={bar.h}
                fill="rgba(255,255,255,0.22)"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="0.5"
              />
            ))}
            {/* Mean + 2σ = 0.002792 */}
            <line x1="336" y1="18" x2="336" y2="140" stroke="#f59e0b" strokeDasharray="4 4" strokeWidth="1.5" />
            <text x="336" y="12" fill="#f59e0b" fontSize="9" fontFamily="monospace" textAnchor="middle">
              μ+2σ 0.00279
            </text>
            {/* 99th Percentile = 0.002958 */}
            <line x1="370" y1="28" x2="370" y2="140" stroke="#B8FF35" strokeDasharray="4 4" strokeWidth="1.8" />
            <text x="370" y="24" fill="#B8FF35" fontSize="9" fontFamily="monospace" textAnchor="middle">
              99% 0.00296
            </text>
            {/* Mean + 3σ = 0.003112 */}
            <line x1="402" y1="18" x2="402" y2="140" stroke="#ffffff" strokeDasharray="4 4" strokeWidth="1.5" />
            <text x="402" y="12" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="end">
              μ+3σ 0.00311
            </text>
          </svg>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px] text-white/60">
          <span>PIXEL SEGMENTATION · MSE LOSS</span>
          <span className="text-lime">ONGOING FACULTY RESEARCH</span>
        </div>
      </div>
    );
  }

  if (project.visualType === 'collegenator') {
    return (
      <div className="tech-grid-bg relative flex h-full w-full flex-col justify-between bg-[#0B0B0B] p-6 sm:p-8">
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-muted">
          <span>ADAPTIVE M-WAY DECISION ENGINE</span>
          <span className="text-lime">FASTAPI // LIVE</span>
        </div>

        <div className="my-auto py-3">
          <svg
            viewBox="0 0 420 180"
            className="w-full"
            role="img"
            aria-label="M-Way decision tree traversal schematic"
          >
            {/* Edges */}
            <line x1="210" y1="30" x2="90" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <line x1="210" y1="30" x2="210" y2="90" stroke="#B8FF35" strokeWidth="2" />
            <line x1="210" y1="30" x2="330" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <line x1="210" y1="90" x2="155" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <line x1="210" y1="90" x2="265" y2="150" stroke="#B8FF35" strokeWidth="2" />

            {/* Root */}
            <rect x="145" y="12" width="130" height="30" fill="#111111" stroke="#B8FF35" strokeWidth="1.5" />
            <text x="210" y="31" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">
              ROOT ATTRIBUTE SPLIT
            </text>

            {/* Level 1 */}
            <rect x="42" y="75" width="96" height="28" fill="#111111" stroke="rgba(255,255,255,0.25)" />
            <text x="90" y="93" fill="#a0a0a0" fontSize="9.5" fontFamily="monospace" textAnchor="middle">
              BRANCH A
            </text>

            <rect x="155" y="75" width="110" height="28" fill="#161616" stroke="#B8FF35" strokeWidth="1.5" />
            <text x="210" y="93" fill="#B8FF35" fontSize="9.5" fontFamily="monospace" textAnchor="middle">
              PRUNED SUBSET
            </text>

            <rect x="282" y="75" width="96" height="28" fill="#111111" stroke="rgba(255,255,255,0.25)" />
            <text x="330" y="93" fill="#a0a0a0" fontSize="9.5" fontFamily="monospace" textAnchor="middle">
              BRANCH C
            </text>

            {/* Leaf */}
            <rect x="108" y="136" width="94" height="26" fill="#111111" stroke="rgba(255,255,255,0.25)" />
            <text x="155" y="153" fill="#a0a0a0" fontSize="9" fontFamily="monospace" textAnchor="middle">
              CANDIDATE N
            </text>

            <rect x="218" y="136" width="98" height="26" fill="#B8FF35" />
            <text x="267" y="153" fill="#080808" fontSize="9.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              MATCH FOUND
            </text>
          </svg>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px] text-white/60">
          <span>PANDAS · NORMALIZATION · TRAVERSAL</span>
          <span className="text-lime">UG-2 BATCH 2028</span>
        </div>
      </div>
    );
  }

  // vision-suite (Face to Place + GestureControl)
  return (
    <div className="tech-grid-bg relative flex h-full w-full flex-col justify-between bg-[#0B0B0B] p-6 sm:p-8">
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-muted">
        <span>REAL-TIME CV SUITE // EPOCH CLUB</span>
        <span className="text-lime">OPENCV · DEEPFACE · MEDIAPIPE</span>
      </div>

      <div className="my-auto grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="border border-white/15 bg-[#111111] p-4 transition-colors group-hover:border-lime/40">
          <div className="font-mono text-[11px] tracking-widest text-lime">01 // FACE TO PLACE</div>
          <div className="mt-2 font-display text-lg font-bold text-white">Biometric + QR Lock</div>
          <p className="mt-2 text-xs leading-relaxed text-white/70">
            Real-time facial recognition via DeepFace paired with Pyzbar QR decoding and CSV attendance verification.
          </p>
        </div>

        <div className="border border-white/15 bg-[#111111] p-4 transition-colors group-hover:border-lime/40">
          <div className="font-mono text-[11px] tracking-widest text-lime">02 // GESTURE CONTROL</div>
          <div className="mt-2 font-display text-lg font-bold text-white">21-Point Hand Tracking</div>
          <p className="mt-2 text-xs leading-relaxed text-white/70">
            MediaPipe landmark capture and gesture dataset augmentation driving live Subway Surfers inputs.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px] text-white/60">
        <span>PYZBAR · LANDMARKS.NPY · ATTENDANCE.CSV</span>
        <span className="text-lime">IIIT SRI CITY</span>
      </div>
    </div>
  );
}
