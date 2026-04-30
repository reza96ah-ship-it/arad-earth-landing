import type { DemoScenario } from "../../types/demo";

export const coverageAnalysisScenario: DemoScenario = {
  id: "coverage-analysis",
  title: "Coverage Analysis",
  shortTitle: "Coverage",
  category: "Analysis",
  region: "Observation area",
  summary: "A guided coverage story from area definition to relay-backed report.",
  businessValue:
    "Helps technical and executive teams understand visibility, coverage, and relay decisions through a staged 3D analysis.",
  objects: [
    { id: "area-center", name: "Area of Interest", type: "zone", lat: 35.72, lon: 51.39, color: "#22d3ee", status: "Defined" },
    { id: "tower", name: "Observation Tower", type: "asset", lat: 35.69, lon: 51.35, color: "#22d3ee", status: "Placed" },
    { id: "target-ridge", name: "Target Ridge", type: "pin", lat: 35.79, lon: 51.48, color: "#fbbf24", status: "Selected" },
    { id: "relay-node", name: "Relay Node", type: "asset", lat: 35.75, lon: 51.43, color: "#34d399", status: "Proposed" }
  ],
  routes: [
    { id: "line-of-sight", name: "Line of Sight", fromObjectId: "tower", toObjectId: "target-ridge", color: "#fbbf24" },
    { id: "relay-link", name: "Relay Link", fromObjectId: "tower", toObjectId: "relay-node", color: "#34d399" }
  ],
  zones: [
    { id: "aoi-zone", name: "Area of Interest", lat: 35.72, lon: 51.39, radiusKm: 14, color: "#22d3ee" },
    { id: "coverage-ring", name: "Coverage Ring", lat: 35.69, lon: 51.35, radiusKm: 18, color: "#34d399" }
  ],
  cameraTargets: [
    { id: "coverage-global", lat: 35.73, lon: 51.42, distance: 260000 },
    { id: "tower-focus", lat: 35.69, lon: 51.35, distance: 90000 }
  ],
  chapters: [
    {
      id: "area-of-interest",
      title: "Define Area of Interest",
      shortTitle: "Area",
      description: "Start with a clean area before showing tower, target, beam, or relay elements.",
      businessInsight: "Coverage analysis is easier to trust when the system builds the evidence step by step.",
      visibleObjects: ["area-center"], visibleRoutes: [], visibleZones: ["aoi-zone"], selectedObjectId: "area-center", cameraMode: "global", cameraTargetId: "coverage-global", actions: []
    },
    {
      id: "place-tower",
      title: "Place Observation Tower",
      shortTitle: "Tower",
      description: "Place the observation tower and establish the first analysis point.",
      businessInsight: "A visible source point makes coverage analysis feel grounded and auditable.",
      visibleObjects: ["area-center", "tower"], visibleRoutes: [], visibleZones: ["aoi-zone"], selectedObjectId: "tower", cameraMode: "focus", cameraTargetId: "tower-focus", actions: []
    },
    {
      id: "target-ridge",
      title: "Select Target Ridge",
      shortTitle: "Target",
      description: "Select the ridge or target point that must be observed.",
      businessInsight: "The target explains what the analysis is trying to prove.",
      visibleObjects: ["tower", "target-ridge"], visibleRoutes: [], visibleZones: ["aoi-zone"], selectedObjectId: "target-ridge", cameraMode: "focus", cameraTargetId: "coverage-global", actions: []
    },
    {
      id: "line-of-sight",
      title: "Test Line of Sight",
      shortTitle: "LOS",
      description: "Draw the line-of-sight beam from tower to ridge.",
      businessInsight: "The beam makes a technical visibility check understandable in one glance.",
      visibleObjects: ["tower", "target-ridge"], visibleRoutes: ["line-of-sight"], visibleZones: ["aoi-zone"], selectedObjectId: "tower", cameraMode: "report", cameraTargetId: "coverage-global", actions: []
    },
    {
      id: "coverage-ring",
      title: "Show Coverage Ring",
      shortTitle: "Coverage",
      description: "Reveal the serviceable area around the observation tower.",
      businessInsight: "Coverage rings show impact area without overwhelming the first frame.",
      visibleObjects: ["tower", "target-ridge"], visibleRoutes: ["line-of-sight"], visibleZones: ["aoi-zone", "coverage-ring"], selectedObjectId: "tower", cameraMode: "report", cameraTargetId: "coverage-global", actions: []
    },
    {
      id: "relay-node",
      title: "Add Relay Node",
      shortTitle: "Relay",
      description: "Add a relay node to improve coverage continuity.",
      businessInsight: "The relay chapter turns analysis into a design recommendation.",
      visibleObjects: ["tower", "target-ridge", "relay-node"], visibleRoutes: ["line-of-sight", "relay-link"], visibleZones: ["coverage-ring"], selectedObjectId: "relay-node", cameraMode: "focus", cameraTargetId: "coverage-global", actions: []
    },
    {
      id: "coverage-report",
      title: "Generate Coverage Report",
      shortTitle: "Report",
      description: "Summarize tower placement, target ridge, line of sight, coverage ring, and relay support.",
      businessInsight: "The final view explains what is visible, what is constrained, and where a relay helps.",
      visibleObjects: ["area-center", "tower", "target-ridge", "relay-node"], visibleRoutes: ["line-of-sight", "relay-link"], visibleZones: ["aoi-zone", "coverage-ring"], selectedObjectId: "tower", cameraMode: "report", cameraTargetId: "coverage-global", actions: []
    }
  ],
  report: {
    title: "Coverage analysis report",
    summary: "Observation tower provides partial coverage. Relay node improves continuity toward the target ridge.",
    metrics: [
      { label: "Tower height", value: "Planned" },
      { label: "Coverage radius", value: "18 km" },
      { label: "Relay needed", value: "Yes" }
    ],
    recommendation: "Add the relay node before operational deployment to improve coverage confidence.",
  },
};
