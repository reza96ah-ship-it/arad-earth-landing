import type { DemoScenario } from "../../types/demo";

export const infrastructurePlanningScenario: DemoScenario = {
  id: "infrastructure-planning",
  title: "Infrastructure Planning",
  shortTitle: "Planning",
  category: "Presentation",
  region: "Development site",
  summary: "A guided infrastructure story from site selection to stakeholder-ready report.",
  businessValue:
    "Helps planning teams present project boundaries, constraints, access corridors, and assets in one 3D briefing.",
  objects: [
    { id: "site", name: "Development Site", type: "zone", lat: 35.73, lon: 51.37, color: "#22d3ee", status: "Selected" },
    { id: "constraint-north", name: "Northern Constraint", type: "zone", lat: 35.79, lon: 51.38, color: "#f87171", status: "Restricted" },
    { id: "access-gate", name: "Access Gate", type: "pin", lat: 35.66, lon: 51.32, color: "#34d399", status: "Proposed" },
    { id: "station", name: "Proposed Station", type: "asset", lat: 35.72, lon: 51.4, color: "#a78bfa", status: "Concept" }
  ],
  routes: [
    { id: "access-corridor", name: "Access Corridor", fromObjectId: "access-gate", toObjectId: "station", color: "#34d399", distanceKm: 11, etaMinutes: 18 }
  ],
  zones: [
    { id: "project-boundary", name: "Project Boundary", lat: 35.73, lon: 51.37, radiusKm: 10, color: "#22d3ee" },
    { id: "constraint-zone", name: "Constraint Zone", lat: 35.79, lon: 51.38, radiusKm: 5, color: "#f87171" }
  ],
  cameraTargets: [
    { id: "site-global", lat: 35.73, lon: 51.37, distance: 220000 },
    { id: "station-focus", lat: 35.72, lon: 51.4, distance: 90000 }
  ],
  chapters: [
    {
      id: "development-site",
      title: "Show Development Site",
      shortTitle: "Site",
      description: "Introduce the project location before adding constraints or assets.",
      businessInsight: "Stakeholder presentations need a clean spatial starting point.",
      visibleObjects: ["site"], visibleRoutes: [], visibleZones: [], selectedObjectId: "site", cameraMode: "global", cameraTargetId: "site-global", actions: []
    },
    {
      id: "project-boundary",
      title: "Draw Project Boundary",
      shortTitle: "Boundary",
      description: "Reveal the project boundary around the selected development site.",
      businessInsight: "A boundary turns a location into a project area that stakeholders can discuss.",
      visibleObjects: ["site"], visibleRoutes: [], visibleZones: ["project-boundary"], selectedObjectId: "site", cameraMode: "report", cameraTargetId: "site-global", actions: []
    },
    {
      id: "constraints",
      title: "Reveal Constraints",
      shortTitle: "Constraints",
      description: "Show nearby restrictions that affect design and access decisions.",
      businessInsight: "Constraints make tradeoffs visible before the project reaches implementation.",
      visibleObjects: ["site", "constraint-north"], visibleRoutes: [], visibleZones: ["project-boundary", "constraint-zone"], selectedObjectId: "constraint-north", cameraMode: "focus", cameraTargetId: "site-global", actions: []
    },
    {
      id: "access-corridor",
      title: "Trace Access Corridor",
      shortTitle: "Access",
      description: "Draw the route that connects the project to the proposed access gate.",
      businessInsight: "Access corridors help planners explain logistics, cost, and construction flow.",
      visibleObjects: ["site", "access-gate", "constraint-north"], visibleRoutes: ["access-corridor"], visibleZones: ["project-boundary", "constraint-zone"], selectedObjectId: "access-gate", cameraMode: "report", cameraTargetId: "site-global", actions: []
    },
    {
      id: "place-asset",
      title: "Place 3D Asset",
      shortTitle: "Asset",
      description: "Place a proposed station/tower asset inside the project boundary.",
      businessInsight: "A model-like asset makes the scenario feel like an infrastructure presentation, not just pins.",
      visibleObjects: ["site", "access-gate", "station", "constraint-north"], visibleRoutes: ["access-corridor"], visibleZones: ["project-boundary", "constraint-zone"], selectedObjectId: "station", cameraMode: "focus", cameraTargetId: "station-focus", actions: []
    },
    {
      id: "stakeholder-report",
      title: "Generate Stakeholder Report",
      shortTitle: "Report",
      description: "Summarize boundaries, constraints, access, and proposed infrastructure assets.",
      businessInsight: "The final chapter translates planning complexity into an executive-ready view.",
      visibleObjects: ["site", "access-gate", "station", "constraint-north"], visibleRoutes: ["access-corridor"], visibleZones: ["project-boundary", "constraint-zone"], selectedObjectId: "station", cameraMode: "report", cameraTargetId: "site-global", actions: []
    }
  ],
  report: {
    title: "Infrastructure planning report",
    summary: "Project boundary, constraints, access corridor, and proposed station are ready for stakeholder review.",
    metrics: [
      { label: "Boundary", value: "Defined" },
      { label: "Access corridor", value: "11 km" },
      { label: "Constraint zones", value: "1 active" }
    ],
    recommendation: "Proceed to detailed design after validating the northern constraint and access corridor alignment.",
  },
};
