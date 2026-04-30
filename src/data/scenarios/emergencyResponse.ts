import type { DemoScenario } from "../../types/demo";

export const emergencyResponseScenario: DemoScenario = {
  id: "emergency-response",
  title: "Emergency Response",
  shortTitle: "Response",
  category: "Operations",
  region: "Tehran urban grid",
  summary:
    "A guided incident-response story from suspicious movement to final operational report.",
  businessValue:
    "Helps command teams explain detection, classification, dispatch, support, and evacuation decisions in one shared 3D view.",
  objects: [],
  routes: [],
  zones: [],
  cameraTargets: [],
  chapters: [
    {
      id: "suspicious-movement",
      title: "Suspicious Movement",
      shortTitle: "Movement",
      description: "A single unknown object enters the city perimeter.",
      businessInsight: "Start with one signal so the incident story is immediately understandable.",
      visibleObjects: [],
      visibleRoutes: [],
      visibleZones: [],
      selectedObjectId: "",
      cameraMode: "focus",
      cameraTargetId: "",
      actions: [],
    },
    {
      id: "operational-report",
      title: "Operational Report",
      shortTitle: "Report",
      description: "The final view shows the full incident response map.",
      businessInsight: "The final chapter should summarize risk, units, support, and recommended action.",
      visibleObjects: [],
      visibleRoutes: [],
      visibleZones: [],
      selectedObjectId: "",
      cameraMode: "report",
      cameraTargetId: "",
      actions: [],
    },
  ],
  report: {
    title: "Incident response report",
    summary: "Progressive emergency scenario report placeholder.",
    metrics: [],
    recommendation: "Replace this skeleton with the full authored emergency scenario in Milestone 5.",
  },
};
