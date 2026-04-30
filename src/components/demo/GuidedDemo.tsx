import { demoCopy } from "../../content/demoCopy";
import { demoScenarios } from "../../data/scenarios";
import { DemoActions } from "./DemoActions";
import { DemoInspector } from "./DemoInspector";
import { DemoReportCard } from "./DemoReportCard";
import { DemoShell } from "./DemoShell";
import { DemoTimeline } from "./DemoTimeline";
import { ScenarioChooser } from "./ScenarioChooser";
import { ScenarioViewport } from "./ScenarioViewport";
import { ChapterNarrator } from "./ChapterNarrator";

export function GuidedDemo() {
  const activeScenario = demoScenarios[0];
  const activeChapter = activeScenario.chapters[0];

  return (
    <DemoShell>
      <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
        <ScenarioChooser scenarios={demoScenarios} activeScenarioId={activeScenario.id} />

        <div className="space-y-5">
          <ScenarioViewport scenario={activeScenario} />
          <ChapterNarrator chapter={activeChapter} />
          <DemoTimeline chapters={activeScenario.chapters} activeChapterId={activeChapter?.id} />
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
