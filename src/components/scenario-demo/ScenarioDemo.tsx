import { useEffect, useMemo, useState } from "react";
import { Globe2 } from "lucide-react";
import { scenarios, getScenarioById } from "../../data/scenarios";
import type {
  CameraMode,
  Scenario,
  ScenarioId,
  ScenarioLayerKey,
  ScenarioLayers,
  ScenarioObject,
  ScenarioRoute,
  ScenarioZone,
} from "../../types/scenario";
import { HeroEarthCanvas } from "../earth/HeroEarthCanvas";
import { ScenarioPanel } from "./ScenarioPanel";
import { ScenarioInspector } from "./ScenarioInspector";
import { ScenarioTimeline } from "./ScenarioTimeline";

const PLAY_DURATION_MS = 14000;

const emergencyStoryObjects: ScenarioObject[] = [
  {
    id: "city-entry-signal",
    name: "01 Unknown Signal",
    type: "model",
    lat: 35.61,
    lon: 51.53,
    color: "#fbbf24",
    status: "Inbound",
    properties: {
      Type: "Unidentified moving object",
      Direction: "Entering city grid",
      Speed: "42 km/h",
      Risk: "Unconfirmed",
    },
  },
  {
    id: "sensor-gate-east",
    name: "02 Sensor Gate East",
    type: "pin",
    lat: 35.66,
    lon: 51.48,
    color: "#22d3ee",
    status: "Triggered",
    properties: {
      Type: "Urban sensor gate",
      Detection: "Thermal + motion",
      Confidence: "87%",
      Status: "Triggered",
    },
  },
  {
    id: "incident-core",
    name: "03 Hazard Source",
    type: "zone",
    lat: 35.75,
    lon: 51.42,
    color: "#f87171",
    status: "Critical",
    properties: {
      Type: "Confirmed emergency",
      Severity: "High",
      Radius: "8 km",
      Status: "Expanding",
    },
  },
  {
    id: "command-center",
    name: "04 Command Center",
    type: "pin",
    lat: 35.69,
    lon: 51.31,
    color: "#22d3ee",
    status: "Online",
    properties: {
      Type: "Command node",
      Role: "Coordination",
      Units: "2 active",
      Status: "Dispatching",
    },
  },
  {
    id: "response-unit-a",
    name: "05 Response Unit A",
    type: "model",
    lat: 35.65,
    lon: 51.5,
    color: "#fbbf24",
    status: "Moving",
    properties: {
      Type: "Response unit",
      ETA: "12 min",
      Route: "Primary",
      Status: "Moving",
    },
  },
  {
    id: "medical-point",
    name: "06 Medical Point",
    type: "pin",
    lat: 35.71,
    lon: 51.25,
    color: "#34d399",
    status: "Ready",
    properties: {
      Type: "Medical support",
      Capacity: "Available",
      Role: "Triage",
      Status: "Ready",
    },
  },
  {
    id: "evacuation-node",
    name: "07 Evacuation Node",
    type: "pin",
    lat: 35.79,
    lon: 51.35,
    color: "#a78bfa",
    status: "Prepared",
    properties: {
      Type: "Evacuation node",
      Capacity: "Medium",
      Role: "Civilian movement",
      Status: "Prepared",
    },
  },
];

const emergencyStoryRoutes: ScenarioRoute[] = [
  {
    id: "signal-track-route",
    name: "Unknown Signal → Hazard Source",
    fromObjectId: "city-entry-signal",
    toObjectId: "incident-core",
    color: "#fbbf24",
  },
  {
    id: "sensor-alert-route",
    name: "Sensor Gate → Command Center",
    fromObjectId: "sensor-gate-east",
    toObjectId: "command-center",
    color: "#22d3ee",
  },
  {
    id: "dispatch-route",
    name: "Command → Hazard Source",
    fromObjectId: "command-center",
    toObjectId: "incident-core",
    color: "#22d3ee",
  },
  {
    id: "unit-response-route",
    name: "Response Unit → Hazard Source",
    fromObjectId: "response-unit-a",
    toObjectId: "incident-core",
    color: "#fbbf24",
  },
  {
    id: "medical-support-route",
    name: "Medical Point → Hazard Source",
    fromObjectId: "medical-point",
    toObjectId: "incident-core",
    color: "#34d399",
  },
];

const emergencyStoryZones: ScenarioZone[] = [
  {
    id: "danger-zone",
    name: "Danger Zone · 8 km",
    lat: 35.75,
    lon: 51.42,
    radiusKm: 8,
    color: "#f87171",
  },
  {
    id: "warning-zone",
    name: "Warning Zone · 16 km",
    lat: 35.75,
    lon: 51.42,
    radiusKm: 16,
    color: "#fbbf24",
  },
];

const emergencyStorySteps = [
  {
    name: "01 · Object Enters City",
    description:
      "An unidentified moving signal enters the Tehran urban grid. Only one marker is shown so the viewer understands the story starts with a single suspicious movement.",
    cameraMode: "focus" as CameraMode,
    cameraTargetId: "city-entry-signal",
    selectObjectId: "city-entry-signal",
    routeReveal: 0.12,
    objects: ["city-entry-signal"],
    routes: [],
    zones: [],
  },
  {
    name: "02 · Sensors Detect Threat",
    description:
      "The signal crosses an urban sensor gate. The sensor appears, the track is drawn, and the hazard source is identified.",
    cameraMode: "report" as CameraMode,
    cameraTargetId: "signal-track-route",
    selectObjectId: "sensor-gate-east",
    routeReveal: 0.42,
    objects: ["city-entry-signal", "sensor-gate-east", "incident-core"],
    routes: ["signal-track-route"],
    zones: [],
  },
  {
    name: "03 · Risk Area Created",
    description:
      "The system creates danger and warning zones around the confirmed hazard. Command has not dispatched units yet, so the map remains focused on risk definition.",
    cameraMode: "report" as CameraMode,
    cameraTargetId: "incident-core",
    selectObjectId: "danger-zone",
    routeReveal: 0.55,
    objects: ["city-entry-signal", "sensor-gate-east", "incident-core"],
    routes: ["signal-track-route"],
    zones: ["danger-zone", "warning-zone"],
  },
  {
    name: "04 · Command Dispatch",
    description:
      "The command center comes online after confirmation. The alert route is drawn from the sensor gate to command, then command starts the response.",
    cameraMode: "focus" as CameraMode,
    cameraTargetId: "command-center",
    selectObjectId: "command-center",
    routeReveal: 0.68,
    objects: [
      "sensor-gate-east",
      "incident-core",
      "command-center",
      "response-unit-a",
    ],
    routes: ["sensor-alert-route", "dispatch-route"],
    zones: ["danger-zone", "warning-zone"],
  },
  {
    name: "05 · Unit Approaches Incident",
    description:
      "Response Unit A moves toward the hazard source. The camera follows the response path instead of showing unrelated pins.",
    cameraMode: "follow" as CameraMode,
    cameraTargetId: "unit-response-route",
    selectObjectId: "response-unit-a",
    routeReveal: 0.9,
    objects: ["incident-core", "command-center", "response-unit-a"],
    routes: ["dispatch-route", "unit-response-route"],
    zones: ["danger-zone", "warning-zone"],
  },
  {
    name: "06 · Full Response Report",
    description:
      "The final report reveals the complete operation: hazard, sensor, command, response unit, medical point, evacuation node, risk rings, and all support routes.",
    cameraMode: "report" as CameraMode,
    cameraTargetId: "incident-core",
    selectObjectId: "incident-core",
    routeReveal: 1,
    objects: [
      "city-entry-signal",
      "sensor-gate-east",
      "incident-core",
      "command-center",
      "response-unit-a",
      "medical-point",
      "evacuation-node",
    ],
    routes: [
      "signal-track-route",
      "sensor-alert-route",
      "dispatch-route",
      "unit-response-route",
      "medical-support-route",
    ],
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
    description:
      "A progressive incident-response story: suspicious city entry, sensor detection, risk-zone creation, command dispatch, response movement, and final operational report.",
    defaultSelectedObjectId: "city-entry-signal",
    phases: emergencyStorySteps.map((storyStep) => storyStep.name),
    phaseScripts: emergencyStorySteps.map((storyStep) => ({
      name: storyStep.name,
      description: storyStep.description,
      cameraMode: storyStep.cameraMode,
      cameraTargetId: storyStep.cameraTargetId,
      selectObjectId: storyStep.selectObjectId,
      routeReveal: storyStep.routeReveal,
    })),
    objects: emergencyStoryObjects.filter((object) => visibleObjects.has(object.id)),
    routes: emergencyStoryRoutes.filter((route) => visibleRoutes.has(route.id)),
    zones: emergencyStoryZones.filter((zone) => visibleZones.has(zone.id)),
    cameraTargets: {
      global: { lat: 35.7, lon: 51.4, distance: 820000 },
      focus: { lat: 35.7, lon: 51.43, distance: 135000 },
      follow: { lat: 35.69, lon: 51.46, distance: 115000 },
      report: { lat: 35.71, lon: 51.4, distance: 260000 },
    },
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
    const firstPhase =
      scenario.id === "emergency-response"
        ? emergencyStorySteps[0]
        : scenario.phaseScripts[0];

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
    const firstPhase =
      activeScenario.id === "emergency-response"
        ? emergencyStorySteps[0]
        : activeScenario.phaseScripts[0];

    setLayers(activeScenario.defaultLayers);
    setSelectedObjectId(firstPhase?.selectObjectId || activeScenario.defaultSelectedObjectId);
    setCameraMode(firstPhase?.cameraMode || "focus");
    setProgress(0);
    setIsPlaying(false);
  }

  function jumpToPhase(index: number) {
    const denominator = Math.max(1, activeScenario.phaseScripts.length - 1);
    const phase =
      activeScenario.id === "emergency-response"
        ? emergencyStorySteps[index]
        : activeScenario.phaseScripts[index];

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
