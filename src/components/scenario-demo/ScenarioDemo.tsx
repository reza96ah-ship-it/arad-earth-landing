import { useEffect, useMemo, useState } from "react";
import { Globe2 } from "lucide-react";
import { scenarios, getScenarioById } from "../../data/scenarios";
import type {
  CameraMode,
  Scenario,
  ScenarioId,
  ScenarioLayerKey,
  ScenarioLayers,
} from "../../types/scenario";
import { HeroEarthCanvas } from "../earth/HeroEarthCanvas";
import { ScenarioPanel } from "./ScenarioPanel";
import { ScenarioInspector } from "./ScenarioInspector";
import { ScenarioTimeline } from "./ScenarioTimeline";

const PLAY_DURATION_MS = 14000;

const emergencyStorySteps = [
  {
    name: "01 · City Anomaly",
    description:
      "A new heat signature appears inside the city. The map starts clean so the user first understands where the emergency begins.",
    objects: ["incident-core"],
    routes: [],
    zones: [],
  },
  {
    name: "02 · Sensor Confirmation",
    description:
      "The detection is confirmed. Danger and warning rings are created around the incident before response assets appear.",
    objects: ["incident-core"],
    routes: [],
    zones: ["danger-zone", "warning-zone"],
  },
  {
    name: "03 · Command Dispatch",
    description:
      "The command center comes online and receives the alert. The first dispatch connection is drawn from command to the incident.",
    objects: ["incident-core", "command-center"],
    routes: ["dispatch-route"],
    zones: ["danger-zone", "warning-zone"],
  },
  {
    name: "04 · Response Unit Moving",
    description:
      "Response Unit A is activated and moves along the primary response route toward the incident core.",
    objects: ["incident-core", "command-center", "response-unit-a"],
    routes: ["dispatch-route", "unit-response-route"],
    zones: ["danger-zone", "warning-zone"],
  },
  {
    name: "05 · Support Arrives",
    description:
      "Medical and evacuation support nodes appear after the response route is established, showing the operation expanding step by step.",
    objects: [
      "incident-core",
      "command-center",
      "response-unit-a",
      "medical-point",
      "evacuation-node",
    ],
    routes: ["dispatch-route", "unit-response-route", "medical-support-route"],
    zones: ["danger-zone", "warning-zone"],
  },
  {
    name: "06 · Operational Report",
    description:
      "The final view shows the complete response picture: incident, risk rings, command, unit, medical support, evacuation node, and all routes.",
    objects: [
      "incident-core",
      "command-center",
      "response-unit-a",
      "medical-point",
      "evacuation-node",
    ],
    routes: ["dispatch-route", "unit-response-route", "medical-support-route"],
    zones: ["danger-zone", "warning-zone"],
  },
];

function phaseIndexForProgress(phaseCount: number, progress: number) {
  return Math.min(
    phaseCount - 1,
    Math.floor(Math.min(progress, 0.999) * phaseCount)
  );
}

function createStoryScenario(scenario: Scenario, phaseIndex: number): Scenario {
  if (scenario.id !== "emergency-response") return scenario;

  const step = emergencyStorySteps[phaseIndex] || emergencyStorySteps[0];
  const visibleObjects = new Set(step.objects);
  const visibleRoutes = new Set(step.routes);
  const visibleZones = new Set(step.zones);

  return {
    ...scenario,
    phaseScripts: scenario.phaseScripts.map((phase, index) => ({
      ...phase,
      name: emergencyStorySteps[index]?.name || phase.name,
      description: emergencyStorySteps[index]?.description || phase.description,
    })),
    objects: scenario.objects.filter((object) => visibleObjects.has(object.id)),
    routes: scenario.routes.filter((route) => visibleRoutes.has(route.id)),
    zones: scenario.zones.filter((zone) => visibleZones.has(zone.id)),
  };
}

export function ScenarioDemo() {
  const [activeScenarioId, setActiveScenarioId] =
    useState<ScenarioId>("strategic-route");

  const activeScenario = useMemo(
    () => getScenarioById(activeScenarioId),
    [activeScenarioId]
  );

  const [layers, setLayers] = useState<ScenarioLayers>(
    scenarios[0].defaultLayers
  );

  const [selectedObjectId, setSelectedObjectId] = useState(
    scenarios[0].defaultSelectedObjectId
  );

  const [cameraMode, setCameraMode] = useState<CameraMode>(
    scenarios[0].phaseScripts[0]?.cameraMode ?? "focus"
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const activePhaseIndex = phaseIndexForProgress(
    activeScenario.phaseScripts.length,
    progress
  );

  const storyScenario = useMemo(
    () => createStoryScenario(activeScenario, activePhaseIndex),
    [activeScenario, activePhaseIndex]
  );

  const activePhaseScript =
    storyScenario.phaseScripts[activePhaseIndex] || storyScenario.phaseScripts[0];

  const selectedObject =
    storyScenario.objects.find((object) => object.id === selectedObjectId) ||
    activeScenario.objects.find((object) => object.id === selectedObjectId) ||
    storyScenario.objects[0] ||
    activeScenario.objects[0];

  useEffect(() => {
    if (!isPlaying || !activePhaseScript) return;

    setSelectedObjectId(activePhaseScript.selectObjectId);
    setCameraMode(activePhaseScript.cameraMode);
  }, [isPlaying, activePhaseIndex, activePhaseScript]);

  useEffect(() => {
    if (!isPlaying) return;

    let frame = 0;
    const startedAt = performance.now();
    const startProgress = progress;

    function tick(now: number) {
      const elapsed = now - startedAt;
      const next = Math.min(
        1,
        startProgress + elapsed / PLAY_DURATION_MS
      );

      setProgress(next);

      if (next >= 1) {
        setIsPlaying(false);
        return;
      }

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [isPlaying, progress]);

  function selectScenario(id: ScenarioId) {
    const scenario = getScenarioById(id);
    const firstPhase = scenario.phaseScripts[0];

    setActiveScenarioId(id);
    setLayers(scenario.defaultLayers);
    setSelectedObjectId(firstPhase?.selectObjectId || scenario.defaultSelectedObjectId);
    setCameraMode(firstPhase?.cameraMode || "focus");
    setProgress(0);
    setIsPlaying(false);
  }

  function toggleLayer(key: ScenarioLayerKey) {
    setLayers((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function resetScenario() {
    const firstPhase = activeScenario.phaseScripts[0];

    setLayers(activeScenario.defaultLayers);
    setSelectedObjectId(firstPhase?.selectObjectId || activeScenario.defaultSelectedObjectId);
    setCameraMode(firstPhase?.cameraMode || "focus");
    setProgress(0);
    setIsPlaying(false);
  }

  function jumpToPhase(index: number) {
    const denominator = Math.max(1, activeScenario.phaseScripts.length - 1);
    const phase = activeScenario.phaseScripts[index];

    setProgress(index / denominator);
    setSelectedObjectId(phase?.selectObjectId || activeScenario.defaultSelectedObjectId);
    setCameraMode(phase?.cameraMode || "focus");
    setIsPlaying(false);
  }

  return (
    <div className="hero-visual-card">
      <div className="absolute inset-0 page-grid opacity-60" />
      <div className="hero-visual-glow absolute inset-0" />

      <div className="relative z-10 flex h-full min-h-[780px] flex-col">
        <div className="flex h-14 items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-300/10">
              <Globe2 className="h-4 w-4 text-cyan-200" />
            </div>

            <div>
              <div className="text-sm font-semibold text-white">
                ARAD Earth Studio Preview
              </div>
              <div className="text-[11px] text-slate-500">
                Scenario demo mode · {activeScenario.region}
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-4 text-[11px] text-slate-500 sm:flex">
            <span>File</span>
            <span>Drawing</span>
            <span>Tools</span>
            <span>Map</span>
            <span>Animation</span>
          </div>

          <div className="hidden rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[10px] font-semibold text-emerald-200 md:block">
            Live Preview
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-4 p-4 xl:grid-cols-[250px_minmax(620px,1fr)_280px]">
          <ScenarioPanel
            activeScenario={activeScenario}
            layers={layers}
            isPlaying={isPlaying}
            onSelectScenario={selectScenario}
            onToggleLayer={toggleLayer}
            onTogglePlay={() => setIsPlaying((value) => !value)}
            onReset={resetScenario}
          />

          <div className="min-h-[560px]">
            <HeroEarthCanvas
              scenario={storyScenario}
              layers={layers}
              cameraMode={cameraMode}
              selectedObjectId={selectedObjectId}
              onSelectObject={setSelectedObjectId}
              progress={progress}
              isPlaying={isPlaying}
            />
          </div>

          <ScenarioInspector
            scenario={storyScenario}
            selectedObject={selectedObject}
            activePhase={activePhaseScript.name}
            progress={progress}
          />
        </div>

        <ScenarioTimeline
          scenario={storyScenario}
          isPlaying={isPlaying}
          progress={progress}
          activePhaseIndex={activePhaseIndex}
          cameraMode={cameraMode}
          onTogglePlay={() => setIsPlaying((value) => !value)}
          onReset={resetScenario}
          onCameraModeChange={setCameraMode}
          onJumpToPhase={jumpToPhase}
        />
      </div>
    </div>
  );
}
