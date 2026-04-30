import { useMemo, useState } from "react";
import { demoCopy } from "../../content/demoCopy";
import { demoScenarios } from "../../data/scenarios/index";
import { DemoActions } from "./DemoActions";
import { DemoInspector } from "./DemoInspector";
import { DemoReportCard } from "./DemoReportCard";
import { DemoShell } from "./DemoShell";
import { DemoTimeline } from "./DemoTimeline";
import { ScenarioChooser } from "./ScenarioChooser";
import { ScenarioViewport } from "./ScenarioViewport";
import { ChapterNarrator } from "./ChapterNarrator";

export function GuidedDemo() {
  const [activeScenarioId, setActiveScenarioId] = useState(demoScenarios[0].id);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const activeScenario = useMemo(
    () => demoScenarios.find((scenario) => scenario.id === activeScenarioId) || demoScenarios[0],
    [activeScenarioId]
  );

  const activeChapter = activeScenario.chapters[activeChapterIndex] || activeScenario.chapters[0];

  function selectScenario(id: string) {
    setActiveScenarioId(id);
    setActiveChapterIndex(0);
  }

  return (
    <DemoShell>
      <div className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)_320px]">
        <ScenarioChooser
          scenarios={demoScenarios}
          activeScenarioId={activeScenario.id}
          onSelectScenario={selectScenario}
        />

        <div className="space-y-5">
          <ScenarioViewport scenario={activeScenario} chapter={activeChapter} />
          <ChapterNarrator chapter={activeChapter} />
          <DemoTimeline
            chapters={activeScenario.chapters}
            activeChapterId={activeChapter?.id}
            onSelectChapter={setActiveChapterIndex}
          />
        </div>

        <div className="space-y-5">
          <DemoInspector scenario={activeScenario} chapter={activeChapter} />
          <DemoActions modes={demoCopy.modes} />
          <DemoReportCard report={activeScenario.report} />
        </div>
      </div>
    </DemoShell>
  );
}
