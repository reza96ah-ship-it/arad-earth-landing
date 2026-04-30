import { useEffect, useMemo, useState } from "react";
import { Globe2 } from "lucide-react";
import { scenarios, getScenarioById } from "../../data/scenarios";
import type {
  CameraMode,
  ScenarioId,
  ScenarioLayerKey,
  ScenarioLayers,
} from "../../types/scenario";
import { HeroEarthCanvas } from "../earth/HeroEarthCanvas";
import { ScenarioPanel } from "./ScenarioPanel";
import { ScenarioInspector } from "./ScenarioInspector";
import { ScenarioTimeline } from "./ScenarioTimeline";

const PLAY_DURATION_MS = 14000;

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

  const [cameraMode, setCameraMode] = useState<CameraMode>("focus");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const activePhaseIndex = Math.min(
    activeScenario.phases.length - 1,
    Math.floor(progress * activeScenario.phases.length)
  );

  const selectedObject =
    activeScenario.objects.find((object) => object.id === selectedObjectId) ||
    activeScenario.objects[0];

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

    setActiveScenarioId(id);
    setLayers(scenario.defaultLayers);
    setSelectedObjectId(scenario.defaultSelectedObjectId);
    setCameraMode("focus");
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
    setLayers(activeScenario.defaultLayers);
    setSelectedObjectId(activeScenario.defaultSelectedObjectId);
    setCameraMode("focus");
    setProgress(0);
    setIsPlaying(false);
  }

  function jumpToPhase(index: number) {
    const denominator = Math.max(1, activeScenario.phases.length - 1);
    setProgress(index / denominator);
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
              scenario={activeScenario}
              layers={layers}
              cameraMode={cameraMode}
              selectedObjectId={selectedObjectId}
              onSelectObject={setSelectedObjectId}
              progress={progress}
            />
          </div>

          <ScenarioInspector
            scenario={activeScenario}
            selectedObject={selectedObject}
            activePhase={activeScenario.phases[activePhaseIndex]}
            progress={progress}
          />
        </div>

        <ScenarioTimeline
          scenario={activeScenario}
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
