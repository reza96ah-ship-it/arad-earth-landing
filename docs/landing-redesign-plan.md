# ARAD Earth Studio Landing Redesign Plan

## Purpose

This document defines the Product, UX, visual, data, and technical redesign direction before rewriting the landing page. The current project already has a full landing-page structure and a working scenario demo. The next step is not another isolated UI patch. The next step is to reposition the experience so it feels like the official website of a premium 3D geospatial engine.

Current problem statement:

> The page is still designed like a SaaS template with a 3D demo inside it. It should feel like the official website of a premium 3D geospatial engine.

## 1. Product positioning

### One-sentence definition

ARAD Earth Studio is a 3D geospatial scenario engine for planning, response, infrastructure, and operational storytelling.

### Recommended hero positioning

Headline:

> Turn geography into decisions.

Subheadline:

> Create guided 3D Earth scenarios for route planning, terrain visibility, emergency response, and infrastructure presentation.

Alternative headline options:

- A 3D geospatial engine for operational storytelling.
- Build decision-ready 3D scenarios on a real Earth engine.
- Plan, analyze, and present operations on a cinematic 3D Earth.

### Positioning rule

The landing page should sell outcomes before tools.

Current direction:

> Build, animate, analyze, and present Earth-based scenarios in 3D.

Improved direction:

> Help teams make operational decisions from geography.

## 2. Target buyers and users

The page should speak to both decision makers and technical evaluators.

Primary audiences:

1. Emergency response and command-center teams
2. Defense, mission-planning, and simulation teams
3. Infrastructure and urban-planning organizations
4. Telecom, coverage, and visibility-analysis teams
5. GIS, mapping, and geospatial software buyers
6. Executives who need presentation-ready scenario briefings

The page should quickly communicate:

- This is not just a template or map viewer.
- This is a scenario engine for operational planning and presentation.
- It can support cloud, private server, offline, or local-network deployment.
- The demo proves the product story visually, not only through text.

## 3. First five-second understanding

Within the first five seconds, the visitor should understand:

1. ARAD Earth Studio turns maps and terrain into guided operational scenarios.
2. It is built for serious planning, response, infrastructure, and presentation workflows.
3. The product is interactive, 3D, and scenario-based.
4. The key action is to launch the interactive demo or book a walkthrough.

Hero CTAs:

- Primary: Launch Interactive Demo
- Secondary: Book a Walkthrough

Important change:

> Remove Add to Cart from the hero.

Reason:

For a premium 3D geospatial engine, an ecommerce-first CTA makes the product feel like a small downloadable template. Purchase or pricing can remain later, but the hero should feel enterprise-grade.

## 4. New page structure

Recommended landing-page order:

1. Hero: premium promise plus cinematic demo preview
2. Guided Demo: the main interactive product proof
3. What ARAD Earth Does: four core workflows
4. Scenario Engine: how the product works
5. Use Cases: defense, emergency, planning, infrastructure, telecom, training, executive briefing
6. Technical Foundation: Cesium, 3D Tiles, terrain, camera choreography, layer orchestration
7. Deployment and Trust: cloud, private server, offline/local network, custom data integration
8. Product Modules: only after the user understands value
9. Pricing / Request Demo: not ecommerce-first
10. Final CTA

## 5. Section-level UX plan

### Section 1: Hero

Purpose:

Instantly explain the product and create a cinematic, engine-grade first impression.

Content:

- Badge: 3D Geospatial Scenario Engine
- Headline: Turn geography into decisions.
- Subheadline: Create guided 3D Earth scenarios for route planning, terrain visibility, emergency response, and infrastructure presentation.
- Primary CTA: Launch Interactive Demo
- Secondary CTA: Book a Walkthrough
- Trust chips:
  - Scenario timelines
  - Terrain-ready analysis
  - Cloud or self-hosted deployment

Hero visual rule:

The hero visual should not show every control at once. It should start as a premium engine preview:

- Large globe or map viewport
- Small floating scenario card
- Minimal timeline strip
- One current phase caption

The full inspector, layer toggles, and controls should appear inside the guided demo section, not immediately in the hero.

### Section 2: Guided Demo

Purpose:

Let the visitor experience the product story.

Required elements:

- Scenario chooser
- Large viewport
- Chapter narration
- Inspector
- Action buttons
- Final report card
- Guided Mode / Explore Mode switch

Default mode:

> Guided Mode

Explore Mode should unlock advanced controls only after the product story is clear.

### Section 3: Four workflows

Cards:

1. Plan Routes
2. Validate Coverage
3. Coordinate Response
4. Present Infrastructure

Each card should show:

- Problem
- What ARAD does
- Result

### Section 4: Engine capabilities

Use engine language, not generic SaaS feature language.

Capabilities:

- Scenario timeline
- 3D Earth viewport
- Camera choreography
- Layer orchestration
- Route and object animation
- Terrain-ready analysis
- Presentation export
- Report generation

### Section 5: Deployment and trust

This is a major product differentiator.

Show:

- Cloud deployment
- Private server deployment
- Offline/local-network deployment
- Custom data integration
- Self-hosted terrain path
- Secure organizational deployment

### Section 6: Use cases

Use stronger vertical cards:

- Defense and Mission Planning
- Emergency Response
- Infrastructure and Urban Planning
- Telecom / Coverage Analysis
- Training and Simulation
- Executive Briefing

### Section 7: Final CTA

Copy:

> See ARAD Earth Studio on your geography.

Supporting copy:

> Book a guided walkthrough with your own scenario, data, and deployment requirements.

CTA:

> Book a Product Walkthrough

## 6. Guided demo strategy

The demo is the most important proof of the product. It should become a guided product story system.

### Demo modes

#### Guided Mode

Default first-time visitor mode. The user chooses one scenario and watches the story unfold in chapters.

Scenarios:

1. Route Planning
2. Coverage Analysis
3. Emergency Response
4. Infrastructure Planning

Generic chapter sequence:

1. Context
2. Detection / Setup
3. Analysis
4. Action
5. Report

#### Explore Mode

Unlocks advanced controls:

- Layer toggles
- Object selection
- Manual camera
- Inspector controls
- Timeline jumping

Explore Mode should be secondary. New visitors should not start inside a dense control panel.

## 7. Scenario story data model

Create a new shared demo model in:

```text
src/types/demo.ts
```

Recommended model:

```ts
export type DemoCameraMode = "global" | "focus" | "follow" | "report";

export type DemoAction = {
  id: string;
  label: string;
  description?: string;
  actionType: "reveal" | "select" | "camera" | "play" | "report";
  targetId?: string;
};

export type DemoChapter = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  businessInsight: string;
  visibleObjects: string[];
  visibleRoutes: string[];
  visibleZones: string[];
  selectedObjectId: string;
  cameraMode: DemoCameraMode;
  cameraTargetId: string;
  actions: DemoAction[];
};

export type DemoScenario = {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  region: string;
  summary: string;
  businessValue: string;
  chapters: DemoChapter[];
  objects: DemoObject[];
  routes: DemoRoute[];
  zones: DemoZone[];
  cameraTargets: DemoCameraTarget[];
  report: DemoReport;
};
```

Each chapter must answer:

1. What appears?
2. Why does it matter?
3. What should the user look at?
4. What action can the user take?
5. What changes on the map?

## 8. Scenario file architecture

Move scenario content out of large component files.

Recommended structure:

```text
src/data/scenarios/
  index.ts
  routePlanning.ts
  coverageAnalysis.ts
  emergencyResponse.ts
  infrastructurePlanning.ts
```

Each scenario file should contain:

- Scenario metadata
- Objects
- Routes
- Zones
- Chapters
- Actions
- Camera targets
- Final report data

Reason:

Scenario stories should feel authored and scalable, not patched inside UI components.

## 9. Scenario rewrite plans

### Emergency Response

Goal:

Make the incident feel like a real operational response, not a map with all pins visible from the beginning.

New story:

1. Suspicious Movement
   - A single unknown object enters the city perimeter.
2. Sensor Detection
   - A sensor gate detects the object and confirms abnormal behavior.
3. Threat Classification
   - The system creates a hazard core, danger ring, and warning ring.
4. Command Activation
   - The command center appears and receives the alert.
5. Dispatch Response
   - A response-unit route is created and the unit starts moving.
6. Medical and Evacuation Support
   - Medical and evacuation nodes appear only after response begins.
7. Operational Report
   - The final view shows the complete incident response map.

Captions to surface during the story:

- Sensor confidence: 87%
- Threat status: Confirmed
- Primary unit ETA: 12 min
- Medical support: Ready
- Evacuation node: Prepared

### Coverage Analysis

Goal:

Make line-of-sight and coverage feel credible and terrain-aware.

Story:

1. Define Area of Interest
2. Place Observation Tower
3. Select Target Ridge
4. Test Line of Sight
5. Show Coverage Ring
6. Add Relay Node
7. Generate Coverage Report

UX rule:

Do not show target, relay, beam, and coverage rings from frame one. The analysis should be built step by step.

### Route Planning

Goal:

Make route planning feel like mission/corridor planning, not just lines.

Story:

1. Select Origin and Destination
2. Build Primary Corridor
3. Detect Risk Zone
4. Generate Alternate Route
5. Follow Moving Asset
6. Compare Route Summary

Final report should show:

- Primary route distance
- Alternate route distance
- Risk avoided
- ETA
- Recommended route

### Infrastructure Planning

Goal:

Make planning feel like infrastructure and stakeholder presentation.

Story:

1. Show Development Site
2. Draw Project Boundary
3. Reveal Constraints
4. Trace Access Corridor
5. Place 3D Asset / Tower / Station
6. Generate Stakeholder Report

Requirement:

The scenario needs at least one simple 3D model-like asset, even if it is initially created from primitive geometry.

## 10. Component architecture

### New demo components

```text
src/components/demo/
  GuidedDemo.tsx
  DemoShell.tsx
  ScenarioChooser.tsx
  ScenarioViewport.tsx
  ChapterNarrator.tsx
  DemoInspector.tsx
  DemoTimeline.tsx
  DemoActions.tsx
  DemoReportCard.tsx
  CameraModeControl.tsx
```

### Earth/Cesium components

```text
src/components/earth/
  EarthViewport.tsx
  EarthEntityLayer.tsx
  EarthRouteLayer.tsx
  EarthZoneLayer.tsx
  EarthCameraController.tsx
  EarthLighting.tsx
```

### Responsibility split

- `GuidedDemo` controls story state.
- `DemoShell` controls layout.
- `ScenarioChooser` changes scenario.
- `ChapterNarrator` explains the current chapter.
- `DemoInspector` explains selected object or chapter details.
- `DemoTimeline` controls chapter progress.
- `DemoReportCard` summarizes final result.
- `EarthViewport` renders the scene.
- `EarthCameraController` handles camera motion.
- `EarthEntityLayer`, `EarthRouteLayer`, and `EarthZoneLayer` render scenario elements.

Goal:

`ScenarioDemo` should no longer contain emergency-specific story override logic. Scenario behavior should come from scenario data.

## 11. Landing component architecture

Create:

```text
src/content/landing.ts
src/content/demoCopy.ts
src/components/landing-redesign/
  NewHeroSection.tsx
  GuidedDemoSection.tsx
  WorkflowCardsSection.tsx
  EngineCapabilitiesSection.tsx
  DeploymentSection.tsx
  UseCasesSection.tsx
  FinalCTASection.tsx
```

Temporary migration rule:

Keep old components during the transition under:

```text
src/components/landing-old/
```

This prevents losing working code while the redesign is being built.

Future `App.tsx` target:

```tsx
<Header />
<NewHeroSection />
<GuidedDemoSection />
<WorkflowCardsSection />
<EngineCapabilitiesSection />
<DeploymentSection />
<UseCasesSection />
<FinalCTASection />
<Footer />
```

## 12. Visual design system

### Brand feeling

- Premium
- Cinematic
- Technical
- Calm
- Mission-grade
- Modern 3D engine

### Color system

- Background: deep graphite / navy black
- Primary accent: cyan
- Success: emerald
- Warning: amber
- Danger: red
- Planning: violet
- Text: white / slate
- Panels: translucent dark glass

### Typography

Recommended:

- UI: Inter or Geist
- Headings: Space Grotesk or Sora

### UI rules

- No crowded panels in the hero.
- No generic cards without visual hierarchy.
- No repeated sections with the same visual rhythm.
- No Add to Cart in the top hero.
- No tiny unreadable controls over the map.
- Product proof should be visual first, text second.
- The demo should teach the value step by step.

## 13. Implementation milestones

### Milestone 1: Redesign skeleton only

Do not rebuild Cesium first.

Create files and architecture:

```text
src/content/landing.ts
src/content/demoCopy.ts
src/types/demo.ts
src/data/scenarios/
src/components/demo/
src/components/landing-redesign/
```

Replace `App.tsx` structure with the new flow after the new components exist.

### Milestone 2: New hero section

Build the premium hero with:

- Badge
- Strong headline
- Outcome-focused subheadline
- Launch Interactive Demo CTA
- Book a Walkthrough CTA
- Trust chips
- Cinematic engine preview

### Milestone 3: Guided demo shell

Build the layout without deep Cesium refactor first:

- Scenario chooser
- Big viewport container
- Chapter narrator
- Inspector placeholder
- Timeline placeholder
- Report placeholder

### Milestone 4: New scenario data model

Create `src/types/demo.ts` and scenario files.

### Milestone 5: Rebuild one scenario completely

Start with Emergency Response because it has the strongest story potential.

### Milestone 6: Rebuild remaining scenarios

Apply the same chapter model to:

- Route Planning
- Coverage Analysis
- Infrastructure Planning

### Milestone 7: Improve Cesium rendering and camera

Only after the story and data model are stable:

- Split Earth components
- Improve camera modes
- Improve object visibility transitions
- Improve route animation
- Improve zone rendering

### Milestone 8: Add report and CTA flow

At the end of each scenario:

- Show final report
- Show business insight
- Offer walkthrough CTA

### Milestone 9: Deployment and trust sections

Build the sections that prove enterprise readiness.

### Milestone 10: Polish animation and responsive design

Final polish:

- Scroll transitions
- Responsive layout
- Accessibility
- Loading states
- Performance pass

## 14. What not to do first

Do not start with:

- More camera fixes
- More emergency scenario patches
- More random UI changes
- Text-only changes
- More pins/routes inside the current component
- More ecommerce hero changes

Correct first coding step:

> Create a new landing architecture and move the demo into a proper guided story system.

## 15. Step 1 acceptance criteria

Step 1 is complete when:

- The new branch exists: `redesign-premium-3d-engine-landing`.
- This planning document exists at `docs/landing-redesign-plan.md`.
- The product positioning is clear.
- The page structure is defined.
- The hero copy is defined.
- The demo story model is defined.
- Scenario chapter structure is defined.
- Required files and components are listed.
- Implementation milestones are scoped.
- The first coding milestone is small and safe.

## 16. Immediate next coding task

After this document is approved, implement Milestone 1 only:

1. Add `src/content/landing.ts`.
2. Add `src/content/demoCopy.ts`.
3. Add `src/types/demo.ts`.
4. Add empty scenario modules under `src/data/scenarios/`.
5. Add placeholder components under `src/components/demo/` and `src/components/landing-redesign/`.
6. Update `App.tsx` to the new section order only after the new skeleton compiles.

No Cesium rewrite should happen until the page and demo architecture are clean.
