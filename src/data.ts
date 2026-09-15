export const profile = {
  name: "Moe Kyaw Aung",
  nameMM: "မိုးကျော်အောင်",
  yearMark: "ARCHITECT · 2026",
  role: "Senior Android Architect",
  role2: "Full-Stack Developer · Technical Founder",
  location: "Tachileik, MM ↔ Bangkok, TH",
  email: "moekyawaung@programmer.net",
  phones: ["+95 9 889 000 889", "+95 9 666 000 050"],
  github: "https://github.com/Dev-moe-kyawaung",
  gravatar: "https://gravatar.com/moekyawaung2026",
  avatar: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778527878/IMG_20260430_053105_uef0yr.png",
  portrait: "https://res.cloudinary.com/dye5qpwii/image/upload/v1778763535/MKA_25_lbx6fb.webp",
  building: "MoekyawTranslator — on-device AI translation",
  mantra: "Code with culture. Build with purpose.",
};

export type Build = {
  id: string;
  num: string;
  name: string;
  domain: string;
  status: "PUBLISHED" | "IN FLIGHT" | "LAB";
  impact: string;
  stack: string[];
  diffs: string[];
  problem: string;
  approach: string[];
  outcome: string[];
  code: string;
  accent: string;
};

export const builds: Build[] = [
  {
    id: "kmp-design-system",
    num: "01",
    name: "KMP Design System Library",
    domain: "KMP · Publishable Library",
    status: "PUBLISHED",
    impact: "3,400+ weekly consumers",
    stack: ["Kotlin", "Compose Multiplatform", "Gradle", "klibs.io", "Figma API"],
    diffs: ["Publishable library across Android, iOS and Desktop", "Design tokens synced straight from Figma nightly runs", "Adaptive components that react to window class", "Accessibility-first contrast and traversal semantics"],
    problem: "Every product team rebuilt the same buttons, spacing rules and dark-mode palettes. Each rewrite drifted from the Figma source of truth within weeks.",
    approach: [
      "Token pipeline reads Figma variables nightly and compiles them into generated Kotlin/Tigris constants via Gradle tasks.",
      "A shared component catalogue built with Compose Multiplatform — one implementation, three targets.",
      "Adaptive logic uses WindowSizeClasses so lists become grids and rails become panels without app code changes.",
      "Accessibility baked in: contrast validators in unit tests, semantic roles required by the component API itself.",
    ],
    outcome: [
      "Single source of truth for Figma → code across three platforms",
      "3,400+ weekly library consumers from external teams",
      "0 manual token updates in 6 months of releases",
      "A11y lint catches 120+ violations before merge",
    ],
    code: `val LightTokens = TokenSet(
  primary = Color(0xFF7C6AFF),
  surface = Color(0xFF0B0D10),
  onPrimary = Color.White,
  corner8 = Dp(8f)
)

sealed class WindowClass(val isCompact: Boolean)
object Compact : WindowClass(true)

@Composable
fun AppScaffold(content: AppContent) =
  if (windowClass.isCompact) CompactShell(content)
  else LargeShell(content)`,
    accent: "#7c6aff",
  },
  {
    id: "od-ai-code-assistant",
    num: "02",
    name: "On-Device AI Code Assistant",
    domain: "On-Device LLM · Privacy-First",
    status: "IN FLIGHT",
    impact: "0 bytes leave the device",
    stack: ["Kotlin", "LiteRT-LM", "Compose", "KMP", "Android/Desktop"],
    diffs: ["Local code generation and explanation offline", "Zero network permissions by design", "Model swap UI across quantized LiteRT profiles", "Cross-platform via KMP to Android and Desktop"],
    problem: "Engineers pasting proprietary code into cloud AI tools leak IP. Cloud assistants also need connectivity and cost per token — two hard blockers for offline founders.",
    approach: [
      "Quantized LiteRT-Gemma variants shipped as downloadable bundles, loaded through a ModelManager that hot-swaps without restart.",
      "Streaming tokenizer pipeline renders partial tokens as they emerge, keeping perceived latency under control.",
      "Privacy by architecture: the app literally declares zero INTERNET permission — the audit is the manifest.",
      "Same assistant compiled to Android and macOS through KMP with shared inference adapters.",
    ],
    outcome: [
      "100% local inference with 0 bytes leaving the device",
      "3 quantized models ranging 1.7B–3.4B params, swappable in-app",
      "Sub-2s first token on a mid-range handset",
      "Shipped as the reference KMP on-device AI sample",
    ],
    code: `@Singleton
class ModelManager @Inject constructor(
  private val liteRt: LiteRtSession
) {
  suspend fun generate(prompt: String) =
    liteRt.stream(prompt)
      .map(::decodeToken)
      .asFlow()
      .shareIn(scope, SharingStarted.Lazily)
}`,
    accent: "#3dd6bd",
  },
  {
    id: "agentic-task-manager",
    num: "03",
    name: "Agentic Task Manager",
    domain: "Agentic AI · Visible Reasoning",
    status: "LAB",
    impact: "multi-step plans in one tap",
    stack: ["KMP", "Compose", "Gemini Nano", "ML Kit", "WorkManager"],
    diffs: ["AI plans and executes multi-step tasks", "Visible, edit-as-you-go reasoning chain", "User veto at every plan step", "On-device planning, cloud fallback"],
    problem: "Task apps force humans to decompose goals into ordered actions. Real work is a chain: draft → summarize → schedule → follow-up. That choreography shouldn't be manual.",
    approach: [
      "Gemini Nano decomposes a goal into a deterministic PlanGraph: nodes are actions, edges are dependencies.",
      "Each plan node is rendered live — the user edits, re-orders, or vetoes before execution commits.",
      "WorkManager executes the graph with retry policy per node; failures surface as visual rollback states.",
      "Cloud fallback when Nano misses context, routed through the same graph contract.",
    ],
    outcome: [
      "Average 4.2 actions automated per plan",
      "Reasoning chain visible and editable before execution",
      "User override rate 18%, feeding preference learning",
      "Rollback-safe execution across connectivity dropouts",
    ],
    code: `data class PlanNode(
  val action: Action,
  val dependsOn: List<Int>,
  var approved: Boolean = false
)

fun execute(plan: PlanGraph) = scope.launch {
  plan.nodes.forEach { node ->
    if (!node.approved) veto()
    WorkManager.enqueue(node.toWorkRequest())
  }
}`,
    accent: "#ffb84d",
  },
  {
    id: "three-d-portfolio",
    num: "04",
    name: "3D Interactive Portfolio",
    domain: "WebGPU · Scroll Narrative",
    status: "PUBLISHED",
    impact: "98 Lighthouse on heavy 3D",
    stack: ["React", "Vite", "Three.js / R3F", "GSAP", "Tailwind", "PWA"],
    diffs: ["Liquid-glass shaders with real refraction", "Scroll-driven cinematic narratives", "AI chat agent answering from your docs", "Offline-first PWA with precached scenes"],
    problem: "Static portfolios say 'I have taste' without proving it. Proof is rendering performance, physics, and narrative under the recruiter's thumb.",
    approach: [
      "R3F scene graph with WebGPU path; system picks FPS adaptive shader quality per frame budget.",
      "GSAP scroll timelines choreograph camera, shader uniforms and reveal choreography.",
      "On-device AI agent answers project queries from a static knowledge index — no backend required.",
      "PWA precaches all scenes and assets for offline 3D experience after first load.",
    ],
    outcome: [
      "98 Lighthouse score on the full 3D build",
      "0 jank frames under 60fps budget on mid-tier",
      "AI agent answers 90% of portfolio queries offline",
      "SEO-equivalent to static content despite WebGL",
    ],
    code: `useFrame((_, dt) => {
  const fps = 1 / dt
  if (fps < 45) degradeShader()
  camera.position.lerp(scrollTarget, 0.08)
})`,
    accent: "#7c6aff",
  },
  {
    id: "foldable-media-app",
    num: "05",
    name: "Foldable-First Media App",
    domain: "Adaptive UX · Foldables",
    status: "IN FLIGHT",
    impact: "canonical layouts shipped day one",
    stack: ["Compose", "WindowSizeClasses", "Media3", "KMP", "Predictive Back"],
    diffs: ["Canonical large-screen layouts as a library", "Posture-aware dual-pane and tabletop modes", "Predictive back built into the navigation contract", "Large-screen optimization score 100 across devices"],
    problem: "Big screens in apps are still an afterthought: stretched single-column or broken two-pane. Foldables demand UI built around physical postures, not just sizes.",
    approach: [
      "App ships five canonical layouts from the Jetpack recommendations: list-detail, feed, support pane, hero, and multi-column.",
      "Posture sensor API maps hinge angle into posture state — phone, book, tabletop — each maps to a specific layout family.",
      "Navigation contract requires Predictive Back: every route declares what its back-transition looks like before merge.",
      "Media3 player adapts itself: watch mode → tabletop companion mode → fullscreen, without relaunch.",
    ],
    outcome: [
      "100% large-screen optimization score across 60 device configs",
      "Predictive Back coverage on 100% of navigation routes",
      "Posture changes render a new layout within one frame",
      "Foldable conversion rate 2.1× phone baseline",
    ],
    code: `val posture by postureState().collectAsState()

when (posture) {
  GESTURE -> TabletopLayout()
  OPEN    -> TwoPane()
  else    -> CompactLayout()
}`,
    accent: "#3dd6bd",
  },
  {
    id: "carbon-aware-template",
    num: "06",
    name: "Carbon-Aware App Template",
    domain: "Sustainability · Performance",
    status: "LAB",
    impact: "~35% less energy per session",
    stack: ["KMP", "Compose", "Jetpack Benchmark", "Lighthouse CI", "Vector assets"],
    diffs: ["Dark mode default cuts OLED draw power", "Vector-first assets slash decode and bundle weight", "Background-work budgets enforced by build rule", "CO₂ dashboard generated from real telemetry"],
    problem: "Apps consume energy nobody gauges. Users feel heat and drain; teams rarely measure. Sustainability needs to become an engineering budget, not a marketing slide.",
    approach: [
      "Template ships dark-mode-first palettes and forces vector assets by lint — PNGs fail the build.",
      "Background work is budgeted: WorkManager jobs declare execution windows and deferrable signal thresholds.",
      "Macrobenchmark runs per commit; Lighthouse CI fails any regression above the declared budget.",
      "Telemetry estimates session energy and renders an in-app CO₂ dashboard users can actually see.",
    ],
    outcome: [
      "~35% lower measured energy per session vs. baseline theme",
      "Build fails on jank, battery, and carbon budget violations",
      "User-visible CO₂ report drives 23% behavior opt-ins",
      "Adopted as the green baseline for 3 production apps",
    ],
    code: `@BudgetedWork(
  window = WorkWindow.NIGHT,
  deferrable = true,
  energyClass = EnergyClass.LOW
)
class SyncWorker(ctx: Context, params: Params) :
  CoroutineWorker(ctx, params)`,
    accent: "#ffb84d",
  },
];

export const stats = [
  { value: "10M+", label: "USERS REACHED", sub: "across shipped apps" },
  { value: "43", label: "APPS SHIPPED", sub: "Android · PWA · Web" },
  { value: "82+", label: "CERTIFICATIONS", sub: "9 technical domains" },
  { value: "99.98%", label: "CRASH-FREE", sub: "rolling 90 days" },
];

export const skills = [
  { group: "ANDROID", items: ["Kotlin", "Jetpack Compose", "KMP", "Material 3", "WindowSizeClasses", "Media3"] },
  { group: "ARCHITECTURE", items: ["Clean Architecture", "MVI / MVVM", "Multi-module (42)", "Hilt / Dagger", "Konsist"] },
  { group: "AI / AGENTIC", items: ["Gemini Nano", "LiteRT-LM", "ML Kit", "Claude API", "PlanGraph executor"] },
  { group: "BACKEND & DATA", items: ["Firebase", "Room / SQLCipher", "Retrofit / Ktor", "REST APIs", "Python"] },
  { group: "WEB & 3D", items: ["React / Vite", "Three.js / R3F", "GSAP", "TypeScript", "PWA / Workbox"] },
  { group: "DELIVERY & GREEN", items: ["GitHub Actions", "Fastlane", "Macrobenchmark", "Lighthouse CI", "Figma pipeline"] },
];

export const experience = [
  { period: "2025 — NOW", role: "Senior Architect · KMP Ecosystem", org: "Tachileik / Bangkok", points: ["Own the publishable KMP design system used by external teams", "Ship on-device AI and agentic products with zero-cloud guarantees", "Drive foldable, sustainable and 3D initiatives across platforms"] },
  { period: "2024 — 2025", role: "Founding Engineer · POS Ultimate", org: "Tachileik / Bangkok", points: ["Own 42-module merchant OS end-to-end", "1,200 stores · 99.98% crash-free · −68% build time", "Mentor 2 junior engineers; run architecture reviews"] },
  { period: "2022 — 2024", role: "Senior Android Engineer", org: "Independent / Contract", points: ["Shipped 12 production apps incl. PulseSync", "Standardized Clean Arch + MVI + Hilt", "Cut cold start to 620ms P90"] },
  { period: "2020 — 2022", role: "Android Engineer", org: "Remote — SEA startups", points: ["Migrated 3 Java apps to Kotlin-first", "Built offline-first Room sync standard", "Set up first GitHub Actions pipelines"] },
  { period: "2019 — 2020", role: "Junior Developer", org: "Tachileik, Myanmar", points: ["First Play Store release in Java + XML", "Self-taught Kotlin through side projects"] },
];

export const githubPages = [
  "moekyawaung-tech.github.io", "moekyawaung.github.io", "moekyawaung-senior.github.io", "moekyawaung-cyber.github.io",
  "moekyawaung-bangkok.github.io", "moekyawaung-google.github.io", "moekyawaung-microsoft.github.io", "moekyawaung-linux.github.io",
];

export const lovableApps = [
  "happy-cv-creator.lovable.app", "moekyawaung.lovable.app", "the-cv-palette.lovable.app", "moekyawaung-dev.lovable.app",
  "dev-moekyawaung.lovable.app", "moekyawaungmybio.lovable.app", "joy-codify-life.lovable.app", "app-skill-gallery.lovable.app",
];

export const axiomDocs = {
  greeting: "AXIOM online. I can brief you on any of the six 2026 signature builds, the architecture choices inside them, their measured impact, or how to contact Moe.",
  answer(q: string): string {
    const s = q.toLowerCase();
    if (s.includes("kmp") || s.includes("design system") || s.includes("figma") || s.includes("publish")) return "The KMP Design System Library publishes across Android, iOS and Desktop from one Compose Multiplatform catalogue. Its token pipeline reads Figma variables nightly and compiles them into Kotlin constants — 0 manual updates in 6 months, 3,400+ weekly consumers.";
    if (s.includes("on-device") || s.includes("litemt") || s.includes("privacy")) return "The On-Device AI Code Assistant runs LiteRT-Gemma entirely offline. Same code compiled to Android and macOS via KMP, with a model swap UI across 3 quantized variants — 0 bytes leave the device, first token under 2 seconds on mid-range.";
    if (s.includes("agentic") || s.includes("task") || s.includes("plan") || s.includes("gemini")) return "The Agentic Task Manager uses Gemini Nano to decompose a goal into a PlanGraph — nodes are actions, edges are dependencies. The user edits and vetoes steps before WorkManager executes. Average 4.2 automated actions per plan, rollback-safe.";
    if (s.includes("3d") || s.includes("three") || s.includes("webgl") || s.includes("gsap")) return "The 3D Interactive Portfolio uses React + Three.js with liquid-glass shaders, GSAP scroll choreography, and an offline AI chat agent — 98 Lighthouse with adaptive shader quality, precached PWA scenes.";
    if (s.includes("fold") || s.includes("posture") || s.includes("window") || s.includes("large screen")) return "The Foldable-First Media App ships all 5 canonical layouts as a library. PostureState drives Compact / TwoPane / Tabletop live; Predictive Back is mandatory in the navigation contract. 100% large-screen optimization score.";
    if (s.includes("carbon") || s.includes("sustainab") || s.includes("green") || s.includes("energy")) return "The Carbon-Aware Template makes sustainability an enforced budget: dark mode default, vector-only assets via lint, WorkManager energy windows, Macrobenchmark budgets in CI, and a user-visible CO₂ dashboard. ~35% less energy per session.";
    if (s.includes("contact") || s.includes("hire") || s.includes("email")) return `Moe answers within 24h at ${profile.email}. Open to senior mobile architect, founding engineer, and focused MVP engagements.`;
    if (s.includes("who") || s.includes("about") || s.includes("moe")) return "Moe Kyaw Aung is a Senior Android Architect & technical founder from Tachileik ↔ Bangkok. 43 shipped apps, 10M+ users, 82+ certifications, and the current 2026 focus: KMP systems, on-device AI, agentic workflows, 3D web, foldables, and sustainable engineering.";
    return "I can brief you on any of the six 2026 signature builds: KMP Design System, On-Device AI Code Assistant, Agentic Task Manager, 3D Portfolio, Foldable-First Media App, Carbon-Aware Template. Ask about stack, differentiators, impact, or how to contact Moe.";
  },
  quick: ["KMP Design System", "On-Device AI", "Agentic Task Manager", "3D Portfolio", "Foldable Media", "Carbon-Aware", "Contact"],
};
