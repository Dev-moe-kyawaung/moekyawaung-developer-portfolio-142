import { useCallback, useState } from "react";
import { FiChevronDown, FiExternalLink, FiMenu, FiX } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { profile, stats, builds, skills, experience, githubPages, lovableApps, type Build } from "./data";
import { Code, Magnetic, ProgressBar, Reveal, SectionHead, Ticker } from "./components/ui";
import Axiom from "./components/Axiom";

const DOCTRINES = [
  { t: "Modularize by feature", d: "42 Gradle modules. Feature-first boundaries, downward deps only, enforced by Konsist in CI." },
  { t: "Offline is a contract", d: "Room is the truth. Network is a sync detail. Every write lands locally first." },
  { t: "AI at the edge", d: "Gemini Nano and LiteRT-LM make intelligence private by default. Cloud is a fallback, not a foundation." },
  { t: "Large screens are products", d: "Canonical layouts, predictive back, posture-aware UX. Foldables ship day one, not as patches." },
  { t: "Measure what you ship", d: "Baseline profiles, Macrobenchmark gates, screenshot goldens. Performance is an admission ticket." },
  { t: "Sustainability is engineering", d: "Dark mode default, vector assets, budgeted work, visible CO₂ dashboards. Green is a requirement." },
];

export default function AppShell() {
  const [menu, setMenu] = useState(false);
  const [openCase, setOpenCase] = useState<string | null>(builds[0].id);
  const [openDossier, setOpenDossier] = useState<Build | null>(null);
  const [filter, setFilter] = useState("ALL");

  const go = useCallback((id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const visible = filter === "ALL" ? builds : builds.filter((b) => b.status === filter);

  return (
    <div className="relative min-h-screen bg-[#0b0d10] blueprint-grid">
      <ProgressBar />
      <Axiom />

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-[#232a35] bg-[#0b0d10]/88 backdrop-blur-xl">
        <div className="max-w-[1360px] mx-auto px-5 h-16 flex items-center justify-between gap-4">
          <button onClick={() => go("top")} className="flex items-center gap-3">
            <span className="w-9 h-9 grid place-items-center border border-[#7c6aff] text-[#c9c2ff] f-display font-bold text-xs" style={{ clipPath: "polygon(30% 0,70% 0,100% 30%,100% 70%,70% 100%,30% 100%,0 70%,0 30%)" }}>MK</span>
            <span className="text-left leading-none">
              <span className="block f-display font-bold text-[12px] tracking-[.2em] text-white">MOE KYAW AUNG</span>
              <span className="block f-mono text-[9px] text-[#7c6aff] tracking-[.2em] mt-0.5">SENIOR ARCHITECT · 2026</span>
            </span>
          </button>
          <nav className="hidden lg:flex items-center gap-6 f-mono text-[10px] tracking-[.2em] text-[#8d99a8]">
            {[["builds","BUILDS"],["doctrine","DOCTRINE"],["stack","STACK"],["record","RECORD"],["archive","ARCHIVE"],["contact","CONTACT"]].map(([id,l]) => (
              <button key={id} onClick={() => go(id)} className="hover:text-white transition">{l}</button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-2 f-mono text-[10px] text-[#3dd6bd]"><i className="w-1.5 h-1.5 rounded-full bg-[#3dd6bd] pulse-dot" /> OPEN</span>
            <Magnetic><button onClick={() => go("contact")} className="ax-btn hidden sm:block">HIRE</button></Magnetic>
            <button onClick={() => setMenu(!menu)} className="lg:hidden w-9 h-9 grid place-items-center border border-[#2d3644] text-[#8d99a8]" aria-label="Menu">{menu ? <FiX /> : <FiMenu />}</button>
          </div>
        </div>
        {menu && (
          <div className="lg:hidden border-t border-[#232a35] bg-[#0b0d10] p-4 grid grid-cols-2 gap-2">
            {[["builds","BUILDS"],["doctrine","DOCTRINE"],["stack","STACK"],["record","RECORD"],["archive","ARCHIVE"],["contact","CONTACT"]].map(([id,l]) => (
              <button key={id} onClick={() => go(id)} className="text-left f-display font-bold text-sm py-3 border-b border-[#232a35]">{l}</button>
            ))}
          </div>
        )}
      </header>

      <main id="top" className="relative z-10">
        {/* HERO */}
        <section className="relative min-h-screen pt-28 pb-16 px-5 overflow-hidden">
          <div className="max-w-[1360px] mx-auto">
            <div className="flex items-center gap-3 f-mono text-[10px] tracking-[.28em] text-[#7c6aff] uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-[#7c6aff] pulse-dot" />
              Senior Android Architect / Full-Stack Developer / 2026 Edition
            </div>
            <Reveal>
              <h1 className="f-display font-black uppercase leading-[.82] text-white select-none" style={{ fontSize: "clamp(3.4rem,11.5vw,11rem)" }}>
                The Architect<br />
                <span className="text-[#c9c2ff]">of 2026</span>
                <span className="text-[#ffb84d]">.</span>
              </h1>
            </Reveal>

            <div className="grid lg:grid-cols-12 gap-8 mt-10 items-end">
              <div className="lg:col-span-5">
                <Reveal delay="rv-d1">
                  <p className="text-lg leading-[1.75] text-[#a7b3c4] max-w-xl text-balance">
                    <strong className="text-white">{profile.nameMM} —</strong> I design production systems where
                    <span className="text-[#c9c2ff]"> Kotlin, Compose, and on-device AI</span> become
                    measurable wins: tens of millions of users, modules that scale, and builds that ship weekly
                    without fear.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Magnetic><button onClick={() => go("builds")} className="ax-btn">▶ 2026 Signature Builds</button></Magnetic>
                    <Magnetic><button onClick={() => go("contact")} className="ax-btn ax-btn-amber">✦ Contact</button></Magnetic>
                  </div>
                  <div className="mt-6 f-mono text-[11px] text-[#586472]">{profile.location} · replies within 24h</div>
                </Reveal>
              </div>
              <div className="lg:col-span-4">
                <Reveal delay="rv-d2">
                  <div className="ax-panel p-2">
                    <div className="relative overflow-hidden aspect-[4/5]">
                      <img src={profile.portrait} alt={profile.name} className="w-full h-full object-cover grayscale-[18%] contrast-125" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-transparent to-[#7c6aff]/10" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="f-mono text-[9px] text-[#3dd6bd] tracking-widest">NOW BUILDING</p>
                        <p className="f-display font-bold text-sm text-white mt-1">{profile.building}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
              <div className="lg:col-span-3 space-y-3">
                <Reveal delay="rv-d1">
                  <div className="ax-panel p-5">
                    <p className="f-mono text-[10px] tracking-[.2em] text-[#ffb84d]">2026 FOCUS</p>
                    <p className="f-display font-bold text-base text-white mt-2 leading-tight">KMP systems, on-device AI, and apps that respect the planet.</p>
                    <p className="f-mono text-[10px] text-[#8d99a8] mt-3">{profile.mantra}</p>
                  </div>
                </Reveal>
                <Reveal delay="rv-d3">
                  <div className="ax-panel ax-panel-teal p-5">
                    <p className="f-mono text-[10px] tracking-[.2em] text-[#3dd6bd]">CURRENT RELEASE</p>
                    <p className="f-display font-bold text-2xl text-white mt-1">POS Ultimate v5</p>
                    <p className="f-mono text-[10px] text-[#8d99a8] mt-2">1,200 stores · 99.98% crash-free</p>
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-14">
              {stats.map((s) => (
                <div key={s.label} className="ax-panel p-4">
                  <p className="f-display font-black text-2xl text-white">{s.value}</p>
                  <p className="f-mono text-[9px] tracking-[.16em] text-[#8d99a8] mt-1">{s.label}</p>
                  <p className="f-mono text-[9px] text-[#586472] mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Ticker items={["KMP", "GEMINI NANO", "GLOBAL VIEW", "PREDICTIVE BACK", "LITERT-LM", "THREE.JS", "VECTOR ASSETS", "ROOM-FIRST", "PLANGRAPH", "ZERO DNS", "BASELINE PROFILES", "CI/CD", "FOLDABLES"]} />

        {/* SIX BUILDS */}
        <section id="builds" className="px-5 py-20 border-y border-[#232a35]">
          <div className="max-w-[1360px] mx-auto">
            <SectionHead num="01" tag="2026 Signal Builds" title={<>Six flagship<br />architectures.</>}
              sub="Not portfolio tiles. Each is a shipped system with its own tradeoffs, source code and measurable outcome." />
            <div className="flex flex-wrap gap-2 mb-8">
              {(["ALL", "PUBLISHED", "IN FLIGHT", "LAB"] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`f-mono text-[10px] tracking-[.16em] px-3 py-1.5 border transition ${filter === f ? "bg-[#7c6aff] text-white border-[#7c6aff]" : "border-[#2d3644] text-[#8d99a8] hover:text-white"}`}>
                  [{f}]
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {visible.map((b, i) => (
                <Reveal key={b.id} delay={i % 3 === 1 ? "rv-d1" : i % 3 === 2 ? "rv-d2" : ""}>
                  <BuildCard build={b} onOpen={() => setOpenDossier(b)} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CASE STUDIES */}
        <section id="cases" className="px-5 py-20 border-b border-[#232a35]">
          <div className="max-w-[1360px] mx-auto">
            <SectionHead num="02" tag="Deep Teardowns" title={<>Inside the<br />winning builds.</>}
              sub="Expandable mission reports: problem, approach, key decisions, measured outcome, and the real code." />
            <div className="space-y-4">
              {builds.slice(0, 4).map((b) => (
                <CasePanel key={b.id} build={b} open={openCase === b.id} onToggle={() => setOpenCase(openCase === b.id ? null : b.id)} onDossier={() => setOpenDossier(b)} />
              ))}
            </div>
          </div>
        </section>

        {/* DOCTRINE */}
        <section id="doctrine" className="px-5 py-20 bg-[#0f1216]/70 border-b border-[#232a35]">
          <div className="max-w-[1360px] mx-auto">
            <SectionHead num="03" tag="Doctrine" title={<>Six rules I<br />won't negotiate.</>}
              sub="A studio is a set of refusals. These are mine — all enforced in CI, not on slides." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DOCTRINES.map((d, i) => (
                <Reveal key={d.t} delay={i % 3 === 1 ? "rv-d1" : i % 3 === 2 ? "rv-d2" : ""}>
                  <div className="perforate p-6 h-full bg-[#13171d]/70">
                    <div className="f-display font-black text-3xl text-[#7c6aff]">{String(i + 1).padStart(2, "0")}</div>
                    <h3 className="f-display font-bold text-base text-white mt-3">{d.t}</h3>
                    <p className="text-sm text-[#8d99a8] leading-relaxed mt-2">{d.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* STACK */}
        <section id="stack" className="px-5 py-20 border-b border-[#232a35]">
          <div className="max-w-[1360px] mx-auto">
            <SectionHead num="04" tag="Toolchain" title={<>Loaded for<br />Production.</>}
              sub="Every tool has a job. Every job has a check. Most of the checks run in CI before you ever see them." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((s, i) => (
                <Reveal key={s.group} delay={i % 3 === 1 ? "rv-d1" : i % 3 === 2 ? "rv-d2" : ""}>
                  <div className="ax-panel p-6 h-full">
                    <span className="corner"> </span>
                    <p className="f-mono text-[10px] tracking-[.2em] text-[#ffb84d]">{String(i + 1).padStart(2, "0")} / {s.group}</p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {s.items.map((x) => <span key={x} className="f-mono text-[10.5px] text-[#8d99a8] border border-[#2d3644] px-2.5 py-1 hover:text-white hover:border-[#7c6aff] transition">{x}</span>)}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <div className="mt-6 ax-panel overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#232a35] bg-[#0f1216]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" /><span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" /><span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 f-mono text-[11px] text-[#8d99a8]">TokenSync.gradle.kts</span>
                  <span className="ml-auto f-mono text-[9px] text-[#7c6aff]">FIGMA → KOTLIN</span>
                </div>
                <div className="p-4 overflow-x-auto">
                  <Code code={`tasks.register<GenerateFigmaTokens>("syncFigmaTokens") {
  nightly()
  source = figma.variables(projectId)
  emitTo = buildDir.resolve("generated/figma/Tokens.kt")
}

// Read once in app:
val accent = Tokens.accent     // 0xFF7C6AFF
val spacing = Tokens.spacing.xl // Dp(24f)`} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* RECORD */}
        <section id="record" className="px-5 py-20 border-b border-[#232a35]">
          <div className="max-w-[1360px] mx-auto">
            <SectionHead num="05" tag="Flight Record" title={<>Seven ages<br />of shipping.</>}
              sub="Concise chronological proof, from first Play Store release to the current founder-engineer orbit." />
            <div className="relative space-y-0 max-w-3xl">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-[#7c6aff] via-[#3dd6bd] to-transparent" />
              {experience.map((e, i) => (
                <Reveal key={e.period} delay={i % 2 === 1 ? "rv-d1" : ""}>
                  <div className="relative pl-10 pb-8 last:pb-0">
                    <span className="absolute left-[7.5px] top-4 w-1.5 h-1.5 rounded-full bg-[#ffb84d]" style={{ boxShadow: "0 0 8px #ffb84d" }} />
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <p className="f-display font-bold text-xl text-white">{e.period}</p>
                      <span className="f-mono text-[10px] text-[#3dd6bd]">{e.org}</span>
                    </div>
                    <h3 className="f-display font-bold text-lg text-white mt-1 uppercase">{e.role}</h3>
                    <ul className="mt-3 space-y-1.5">
                      {e.points.map((pt) => <li key={pt} className="text-sm text-[#a7b3c4] flex gap-2"><span className="text-[#7c6aff]">▸</span>{pt}</li>)}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ARCHIVE */}
        <section id="archive" className="px-5 py-20 border-b border-[#232a35] bg-[#0f1216]/70">
          <div className="max-w-[1360px] mx-auto">
            <SectionHead num="06" tag="Network Archive" title={<>Nodes,<br />enclaves, proofs.</>}
              sub="GitHub pages, Lovable experiments and verified public surfaces." />
            <div className="grid md:grid-cols-2 gap-4">
              <div className="ax-panel p-6">
                <p className="f-mono text-[10px] tracking-[.2em] text-[#7c6aff] flex items-center gap-2 mb-3"><FaGithub /> 43 GITHUB NODES</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {githubPages.map((g) => (
                    <a key={g} href={`https://${g}`} target="_blank" rel="noreferrer" className="f-mono text-[10.5px] text-[#8d99a8] hover:text-white truncate transition">{g.replace(".github.io","")}</a>
                  ))}
                </div>
              </div>
              <div className="ax-panel p-6">
                <p className="f-mono text-[10px] tracking-[.2em] text-[#ffb84d] mb-3">38 LOVABLE SURFACES</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {lovableApps.map((l) => (
                    <a key={l} href={`https://${l}`} target="_blank" rel="noreferrer" className="f-mono text-[10.5px] text-[#8d99a8] hover:text-white truncate transition">{l.replace(".lovable.app","")}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="px-5 py-24">
          <div className="max-w-[1360px] mx-auto text-center">
            <Reveal>
              <h2 className="f-display font-black uppercase leading-[.85] text-white" style={{ fontSize: "clamp(2.6rem,9vw,8rem)" }}>
                Build with<br />
                <span className="text-[#ffb84d]">Purpose.</span>
              </h2>
              <p className="f-mono text-[#8d99a8] max-w-xl mx-auto mt-6">Senior architecture audit · founding engineer · focused MVP · KMP & AI specialists. Response within 24h.</p>
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <a href={`mailto:${profile.email}`} className="ax-btn ax-btn-amber">✉ {profile.email}</a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="ax-btn">⌘ GITHUB</a>
                <a href="https://www.linkedin.com/in/moe-kyaw-aung-2653093a1" target="_blank" rel="noreferrer" className="ax-btn">in LINKEDIN</a>
              </div>
              <div className="mt-12 f-mono text-[11px] text-[#586472]">{profile.phones.join(" · ")} · {profile.location}</div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="px-5 py-10 border-t border-[#232a35] bg-[#0b0d10]">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 grid place-items-center border border-[#7c6aff] text-[#c9c2ff] f-display text-xs font-bold">MK</span>
            <div>
              <p className="f-display font-bold text-[12px] text-white">{profile.name} · {profile.nameMM}</p>
              <p className="f-mono text-[9px] text-[#586472] tracking-widest">{profile.mantra.toUpperCase()}</p>
            </div>
          </div>
          <p className="f-mono text-[10px] text-[#586472]">© 2026 · MKA ARCHITECTS · TACHILEIK ↔ BANGKOK</p>
        </div>
      </footer>

      {openDossier && <Dossier build={openDossier} onClose={() => setOpenDossier(null)} />}
    </div>
  );
}

function BuildCard({ build, onOpen }: { build: Build; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="group text-left ax-card build-card in p-6 relative overflow-hidden">
      <span className="absolute -top-5 -right-2 f-display font-black text-[110px] leading-none opacity-[0.045] select-none">{build.num}</span>
      <div className="flex items-center justify-between f-mono text-[9px] tracking-[.18em] mb-4">
        <span className="text-[#7c6aff]">{build.domain.toUpperCase()}</span>
        <span className={`px-2 py-0.5 border ${build.status === "PUBLISHED" ? "text-[#3dd6bd] border-[#3dd6bd]/40" : build.status === "IN FLIGHT" ? "text-[#ffb84d] border-[#ffb84d]/40" : "text-[#c9c2ff] border-[#7c6aff]/40"}`}>{build.status}</span>
      </div>
      <div className="f-display font-black text-[60px] leading-none text-white mb-1">{build.num}</div>
      <h3 className="f-display font-bold text-xl text-white group-hover:text-[#c9c2ff] transition">{build.name}</h3>
      <p className="f-mono text-[10.5px] text-[#8d99a8] mt-2">{build.impact}</p>
      <p className="text-sm text-[#a7b3c4] mt-4 leading-relaxed">{build.diffs[0]} · {build.diffs[1]}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {build.stack.slice(0, 4).map((s) => <span key={s} className="f-mono text-[9px] px-2 py-1 border border-[#2d3644] text-[#8d99a8]">{s}</span>)}
      </div>
      <div className="mt-5 pt-4 border-t border-[#232a35] flex items-center justify-between">
        <span className="f-mono text-[10px] tracking-[.16em] text-[#7c6aff] uppercase">Open dossier</span>
        <span className="text-[#ffb84d] transition-transform group-hover:translate-x-1">→</span>
      </div>
    </button>
  );
}

function CasePanel({ build, open, onToggle, onDossier }: { build: Build; open: boolean; onToggle: () => void; onDossier: () => void }) {
  return (
    <div className={`ax-panel ${open ? "!border-[#7c6aff]" : ""}`}>
      <button onClick={onToggle} className="w-full p-6 flex items-center gap-5 text-left">
        <span className="f-display font-black text-3xl shrink-0" style={{ color: open ? build.accent ?? "#7c6aff" : "transparent", WebkitTextStroke: open ? "0" : "1px #8d99a8" }}>{build.num}</span>
        <div className="min-w-0 flex-1">
          <span className="f-mono text-[10px] tracking-[.16em] text-[#3dd6bd] uppercase">{build.domain}</span>
          <h3 className="f-display font-bold text-lg text-white mt-0.5 truncate">{build.name}</h3>
          <p className="f-mono text-[11px] text-[#8d99a8] mt-0.5">{build.impact}</p>
        </div>
        <span className={`w-11 h-11 grid place-items-center border transition-all ${open ? "bg-[#7c6aff] text-white border-[#7c6aff] rotate-180" : "border-[#2d3644] text-[#8d99a8]"}`}><FiChevronDown /></span>
      </button>
      <div className={`grid transition-all duration-500 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`} style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}>
        <div className="overflow-hidden">
          <div className="px-6 pb-7 border-t border-[#232a35] pt-7">
            <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-8">
              <div>
                <K label="THE PROBLEM" color="#ff5f6e" />
                <p className="text-sm text-[#d6e0ee] leading-relaxed">{build.problem}</p>
                <K label="KEY DIFFERENTIATORS" color="#ffb84d" />
                <ul className="space-y-1.5">{build.diffs.map((d) => <li key={d} className="text-xs text-[#a7b3c4] flex gap-2"><span className="text-[#3dd6bd]">▸</span>{d}</li>)}</ul>
                <K label="MEASURED OUTCOME" color="#3dd6bd" />
                <ul className="space-y-1.5">{build.outcome.map((o) => <li key={o} className="text-xs text-[#d6e0ee] flex gap-2"><span className="text-[#3dd6bd]">✓</span>{o}</li>)}</ul>
              </div>
              <div>
                <K label="ARCHITECTURE" color="#7c6aff" />
                <ul className="space-y-2">{build.approach.map((a) => <li key={a} className="text-xs text-[#d6e0ee] flex gap-2"><span className="text-[#7c6aff]">→</span>{a}</li>)}</ul>
                <div className="mt-5 bg-[#0b0d10] border border-[#232a35]">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-[#232a35]">
                    <span className="w-2 h-2 rounded-full bg-[#ff5f57]" /><span className="w-2 h-2 rounded-full bg-[#febc2e]" /><span className="w-2 h-2 rounded-full bg-[#28c840]" />
                    <span className="ml-2 f-mono text-[9px] text-[#8d99a8]">{build.name.replace(/\s/g, "")}.kt</span>
                    <span className="ml-auto f-mono text-[8px] text-[#7c6aff]">KOTLIN</span>
                  </div>
                  <div className="p-3.5 overflow-x-auto"><Code code={build.code} /></div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">{build.stack.map((s) => <span key={s} className="f-mono text-[9.5px] px-2 py-1 border border-[#2d3644] text-[#8d99a8]">{s}</span>)}</div>
                <div className="mt-4 flex gap-3">
                  <button onClick={onDossier} className="ax-btn !text-[9px]">FULL DOSSIER</button>
                  <a href={build.id === "three-d-portfolio" ? "https://moekyawaung-free.lovable.app/" : `https://github.com/${build.id}`} target="_blank" rel="noreferrer" className="ax-btn ax-btn-amber !text-[9px]">SOURCE ↗</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function K({ label, color }: { label: string; color: string }) {
  return <p className="f-mono text-[10px] tracking-[.2em] mt-5 mb-2 font-semibold" style={{ color }}>▸ {label}</p>;
}

function Dossier({ build, onClose }: { build: Build; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-[#05060a]/94 backdrop-blur-md" onClick={onClose}>
      <div className="dossier ax-panel ax-panel-teal w-full max-w-4xl max-h-[92vh] overflow-y-auto !bg-[#0f1216]" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex items-center justify-between gap-4 p-6 border-b border-[#232a35] bg-[#0f1216]/95 backdrop-blur-xl z-10">
          <div className="flex items-center gap-4">
            <span className="f-display font-black text-2xl" style={{ color: build.accent ?? "#7c6aff" }}>{build.num}</span>
            <div>
              <p className="f-mono text-[9px] tracking-[.18em] text-[#3dd6bd] uppercase">{build.domain}</p>
              <h3 className="f-display font-bold text-xl text-white">{build.name}</h3>
              <p className="f-mono text-[10px] text-[#8d99a8] mt-0.5">{build.status} · {build.impact}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 grid place-items-center border border-[#2d3644] text-[#8d99a8] hover:border-[#ffb84d] hover:text-[#ffb84d]"><FiX /></button>
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-[15px] text-[#d6e0ee] leading-relaxed max-w-3xl">{build.problem}</p>
          <div className="mt-7 grid md:grid-cols-2 gap-5">
            <div>
              <h4 className="f-mono text-[10px] tracking-[.2em] text-[#ff5f6e] mb-2">DIFFERENTIATORS</h4>
              <ul className="space-y-2">{build.diffs.map((d) => <li key={d} className="text-sm text-[#a7b3c4] flex gap-2"><span className="text-[#ffb84d]">▸</span>{d}</li>)}</ul>
              <h4 className="f-mono text-[10px] tracking-[.2em] text-[#3dd6bd] mt-6 mb-2">APPROACH</h4>
              <ul className="space-y-2">{build.approach.map((a) => <li key={a} className="text-sm text-[#d6e0ee] flex gap-2"><span className="text-[#7c6aff]">→</span>{a}</li>)}</ul>
            </div>
            <div>
              <h4 className="f-mono text-[10px] tracking-[.2em] text-[#3dd6bd] mb-3">MEASURED OUTCOME</h4>
              <ul className="space-y-2">{build.outcome.map((o) => <li key={o} className="text-sm text-[#d6e0ee] flex gap-2"><span className="text-[#3dd6bd]">✓</span>{o}</li>)}</ul>
              <div className="mt-6 bg-[#0b0d10] border border-[#232a35]">
                <div className="px-3 py-2 border-b border-[#232a35] f-mono text-[9px] text-[#8d99a8]">{build.name.replace(/\s/g, "")}.kt</div>
                <div className="p-3 overflow-x-auto"><Code code={build.code} /></div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[#232a35]">
            <div className="flex flex-wrap gap-1.5">{build.stack.map((s) => <span key={s} className="f-mono text-[9.5px] px-2 py-1 border border-[#2d3644] text-[#8d99a8]">{s}</span>)}</div>
            <a href={profile.github} target="_blank" rel="noreferrer" className="ax-btn ax-btn-amber flex items-center gap-1.5"><FiExternalLink /> OPEN NETWORK</a>
          </div>
        </div>
      </div>
    </div>
  );
}
