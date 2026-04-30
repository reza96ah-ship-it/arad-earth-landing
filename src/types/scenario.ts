import type { LucideIcon } from "lucide-react";

export type ScenarioId =
  | "strategic-route"
  | "observation-coverage"
  | "emergency-response"
  | "infrastructure-planning";

export type CameraMode = "global" | "focus" | "follow" | "report";

export type ScenarioLayerKey =
  | "pins"
  | "routes"
  | "zones"
  | "models"
  | "labels";

export type ScenarioLayers = Record<ScenarioLayerKey, boolean>;

export type ScenarioObjectType =
  | "pin"
  | "route"
  | "zone"
  | "model"
  | "beam"
  | "drawing"
  | "measurement";

export type ScenarioObject = {
  id: string;
  name: string;
  type: ScenarioObjectType;
  lat: number;
  lon: number;
  color: string;
  status: string;
  properties: Record<string, string>;
};

export type ScenarioRoute = {
  id: string;
  name: string;
  fromObjectId: string;
  toObjectId: string;
  color: string;
};

export type ScenarioZone = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  radiusKm: number;
  color: string;
};

export type ScenarioCameraTarget = {
  lat: number;
  lon: number;
  distance: number;
};

export type ScenarioPhaseScript = {
  name: string;
  description: string;
  cameraMode: CameraMode;
  cameraTargetId?: string;
  selectObjectId: string;
  routeReveal?: number;
};

export type Scenario = {
  id: ScenarioId;
  title: string;
  shortTitle: string;
  description: string;
  region: string;
  icon: LucideIcon;
  tags: string[];
  accentColor: string;
  defaultSelectedObjectId: string;
  defaultLayers: ScenarioLayers;
  phases: string[];
  phaseScripts: ScenarioPhaseScript[];
  objects: ScenarioObject[];
  routes: ScenarioRoute[];
  zones: ScenarioZone[];
  cameraTargets: Record<CameraMode, ScenarioCameraTarget>;
};
