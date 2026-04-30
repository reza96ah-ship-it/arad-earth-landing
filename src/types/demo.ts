export type DemoCameraMode = "global" | "focus" | "follow" | "report";

export type DemoAction = {
  id: string;
  label: string;
  description?: string;
  actionType: "reveal" | "select" | "camera" | "play" | "report";
  targetId?: string;
};

export type DemoObject = {
  id: string;
  name: string;
  type: "pin" | "model" | "zone" | "sensor" | "asset";
  lat: number;
  lon: number;
  color: string;
  status?: string;
  properties?: Record<string, string>;
};

export type DemoRoute = {
  id: string;
  name: string;
  fromObjectId: string;
  toObjectId: string;
  color: string;
  distanceKm?: number;
  etaMinutes?: number;
};

export type DemoZone = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  radiusKm: number;
  color: string;
};

export type DemoCameraTarget = {
  id: string;
  lat: number;
  lon: number;
  distance: number;
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

export type DemoReport = {
  title: string;
  summary: string;
  metrics: Array<{
    label: string;
    value: string;
  }>;
  recommendation?: string;
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
