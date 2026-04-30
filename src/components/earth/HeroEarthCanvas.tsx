import { useEffect, useMemo, useRef, useState } from "react";
import {
  Cartesian2,
  Cartesian3,
  Color,
  EllipsoidTerrainProvider,
  Entity,
  HeightReference,
  HorizontalOrigin,
  LabelStyle,
  Math as CesiumMath,
  OpenStreetMapImageryProvider,
  PolylineGlowMaterialProperty,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  VerticalOrigin,
  Viewer,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import type {
  CameraMode,
  Scenario,
  ScenarioLayers,
  ScenarioObject,
  ScenarioRoute,
  ScenarioZone,
} from "../../types/scenario";

type MapMode = "osm" | "dark";

type HeroEarthCanvasProps = {
  scenario: Scenario;
  layers: ScenarioLayers;
  cameraMode: CameraMode;
  selectedObjectId: string;
  onSelectObject: (id: string) => void;
  progress: number;
};

function c(hex: string, alpha = 1) {
  return Color.fromCssColorString(hex).withAlpha(alpha);
}

function findObject(scenario: Scenario, id: string) {
  return scenario.objects.find((object) => object.id === id);
}

function findRoute(scenario: Scenario, id: string) {
  return scenario.routes.find((route) => route.id === id);
}

function findZone(scenario: Scenario, id: string) {
  return scenario.zones.find((zone) => zone.id === id);
}

function objectPosition(object: ScenarioObject, height = 0) {
  return Cartesian3.fromDegrees(object.lon, object.lat, height);
}

function zonePosition(zone: ScenarioZone, height = 0) {
  return Cartesian3.fromDegrees(zone.lon, zone.lat, height);
}

function phaseIndexForProgress(scenario: Scenario, progress: number) {
  return Math.min(
    scenario.phaseScripts.length - 1,
    Math.floor(Math.min(progress, 0.999) * scenario.phaseScripts.length)
  );
}

function phaseLocalProgress(scenario: Scenario, progress: number) {
  const count = scenario.phaseScripts.length;
  const raw = Math.min(progress, 0.999) * count;
  return raw - Math.floor(raw);
}

function routeHeight(scenario: Scenario) {
  switch (scenario.id) {
    case "strategic-route":
      return 260000;
    case "observation-coverage":
      return 52000;
    case "emergency-response":
      return 16000;
    case "infrastructure-planning":
      return 10000;
    default:
      return 100000;
  }
}

function routeWidth(scenario: Scenario, selected: boolean) {
  if (scenario.id === "strategic-route") return selected ? 9 : 6;
  if (scenario.id === "observation-coverage") return selected ? 7 : 5;
  if (scenario.id === "emergency-response") return selected ? 7 : 5;
  return selected ? 7 : 5;
}

function createArcPositions(
  from: ScenarioObject,
  to: ScenarioObject,
  maxHeight: number,
  steps = 128
) {
  const positions: Cartesian3[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const lat = from.lat + (to.lat - from.lat) * t;
    const lon = from.lon + (to.lon - from.lon) * t;
    const height = Math.sin(Math.PI * t) * maxHeight + 900;
    positions.push(Cartesian3.fromDegrees(lon, lat, height));
  }

  return positions;
}

function centerOfRoute(scenario: Scenario, route: ScenarioRoute) {
  const from = findObject(scenario, route.fromObjectId);
  const to = findObject(scenario, route.toObjectId);

  if (!from || !to) return undefined;

  return {
    lat: (from.lat + to.lat) / 2,
    lon: (from.lon + to.lon) / 2,
  };
}

function getPositionById(scenario: Scenario, id: string) {
  const object = findObject(scenario, id);
  if (object) return { lat: object.lat, lon: object.lon };

  const zone = findZone(scenario, id);
  if (zone) return { lat: zone.lat, lon: zone.lon };

  const route = findRoute(scenario, id);
  if (route) return centerOfRoute(scenario, route);

  return undefined;
}

function addLabelOnly(
  viewer: Viewer,
  id: string,
  name: string,
  lat: number,
  lon: number,
  height: number,
  selected: boolean
) {
  viewer.entities.add({
    id: `${id}-label`,
    name: `${name} Label`,
    position: Cartesian3.fromDegrees(lon, lat, height),
    label: {
      text: name,
      font: selected ? "700 14px sans-serif" : "600 12px sans-serif",
      fillColor: Color.WHITE,
      outlineColor: Color.BLACK,
      outlineWidth: 4,
      style: LabelStyle.FILL_AND_OUTLINE,
      verticalOrigin: VerticalOrigin.BOTTOM,
      horizontalOrigin: HorizontalOrigin.CENTER,
      showBackground: true,
      backgroundColor: c("#020617", selected ? 0.94 : 0.78),
      backgroundPadding: new Cartesian2(10, 7),
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
    },
    properties: {
      aradId: id,
    },
  });
}

function addObjectEntity(
  viewer: Viewer,
  object: ScenarioObject,
  scenario: Scenario,
  selected: boolean,
  showLabel: boolean
) {
  const accent = object.color;
  const baseHeight = selected ? 2200 : 1200;
  const isModel = object.type === "model";
  const isBoundary = object.type === "drawing" || object.type === "zone";
  const isMeasurement = object.type === "measurement";

  viewer.entities.add({
    id: object.id,
    name: object.name,
    position: objectPosition(object, baseHeight),
    point: {
      pixelSize: selected ? 22 : isModel ? 17 : isBoundary ? 16 : 13,
      color: selected ? Color.WHITE : c(accent, 0.96),
      outlineColor: c(accent),
      outlineWidth: selected ? 5 : 3,
      heightReference: HeightReference.NONE,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
    },
    label: showLabel
      ? {
          text: object.name,
          font: selected ? "700 14px sans-serif" : "600 12px sans-serif",
          fillColor: Color.WHITE,
          outlineColor: Color.BLACK,
          outlineWidth: 4,
          style: LabelStyle.FILL_AND_OUTLINE,
          pixelOffset: new Cartesian2(0, selected ? -42 : -32),
          verticalOrigin: VerticalOrigin.BOTTOM,
          horizontalOrigin: HorizontalOrigin.CENTER,
          showBackground: true,
          backgroundColor: c("#020617", selected ? 0.94 : 0.76),
          backgroundPadding: new Cartesian2(10, 7),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        }
      : undefined,
    properties: {
      aradType: object.type,
      aradId: object.id,
      scenarioId: scenario.id,
    },
  });

  if (isModel) {
    viewer.entities.add({
      id: `${object.id}-body`,
      name: `${object.name} Vertical Asset`,
      position: objectPosition(object, 9000),
      cylinder: {
        length: scenario.id === "emergency-response" ? 14000 : 22000,
        topRadius: selected ? 2400 : 1600,
        bottomRadius: selected ? 4600 : 3200,
        material: c(accent, selected ? 0.42 : 0.28),
        outline: true,
        outlineColor: selected ? Color.WHITE : c(accent, 0.9),
      },
      properties: {
        aradId: object.id,
      },
    });
  }

  if (isBoundary || isMeasurement || selected) {
    const radius =
      scenario.id === "strategic-route"
        ? 45000
        : scenario.id === "observation-coverage"
          ? 7000
          : scenario.id === "emergency-response"
            ? 3500
            : 2500;

    viewer.entities.add({
      id: `${object.id}-halo`,
      name: `${object.name} Highlight`,
      position: objectPosition(object, 600),
      ellipse: {
        semiMajorAxis: radius,
        semiMinorAxis: radius,
        material: c(accent, selected ? 0.18 : 0.08),
        outline: true,
        outlineColor: selected ? Color.WHITE : c(accent, 0.75),
        height: 600,
      },
      properties: {
        aradId: object.id,
      },
    });
  }
}

function addZoneEntity(
  viewer: Viewer,
  zone: ScenarioZone,
  selected: boolean,
  showLabel: boolean
) {
  viewer.entities.add({
    id: zone.id,
    name: zone.name,
    position: zonePosition(zone, 500),
    ellipse: {
      semiMajorAxis: zone.radiusKm * 1000,
      semiMinorAxis: zone.radiusKm * 1000,
      material: c(zone.color, selected ? 0.34 : 0.16),
      outline: true,
      outlineColor: selected ? Color.WHITE : c(zone.color, 0.9),
      height: 500,
    },
    properties: {
      aradType: "zone",
      aradId: zone.id,
    },
  });

  if (showLabel) {
    addLabelOnly(
      viewer,
      zone.id,
      zone.name,
      zone.lat,
      zone.lon,
      1800,
      selected
    );
  }
}

function routeRevealForScenario(
  scenario: Scenario,
  route: ScenarioRoute,
  progress: number
) {
  const phaseIndex = phaseIndexForProgress(scenario, progress);
  const phase = scenario.phaseScripts[phaseIndex];
  const local = phaseLocalProgress(scenario, progress);

  const phaseReveal = phase.routeReveal ?? progress;

  if (scenario.id === "strategic-route") {
    if (route.id === "route-main") return Math.max(0.28, phaseReveal);
    if (route.id === "route-leg-1") return Math.max(0.35, phaseReveal);
    if (route.id === "route-leg-2") return Math.max(0.25, phaseReveal - 0.12);
    if (route.id === "route-alternate") return phaseIndex >= 2 ? 0.85 : 0.25;
  }

  if (scenario.id === "observation-coverage") {
    if (route.id === "coverage-beam") return Math.max(0.3, phaseReveal);
    return phaseIndex >= 3 ? 0.9 : 0.35;
  }

  if (scenario.id === "emergency-response") {
    if (phaseIndex < 2) return 0.25;
    if (phaseIndex === 3) return Math.max(0.35, local);
    return Math.max(0.45, phaseReveal);
  }

  if (scenario.id === "infrastructure-planning") {
    if (phaseIndex < 2) return 0.35;
    if (phaseIndex === 2) return Math.max(0.35, local);
    return Math.max(0.55, phaseReveal);
  }

  return Math.max(0.3, phaseReveal);
}

function addRouteEntity(
  viewer: Viewer,
  scenario: Scenario,
  route: ScenarioRoute,
  selectedObjectId: string,
  showLabel: boolean,
  progress: number
) {
  const from = findObject(scenario, route.fromObjectId);
  const to = findObject(scenario, route.toObjectId);
  if (!from || !to) return;

  const selected =
    selectedObjectId === route.id ||
    selectedObjectId === from.id ||
    selectedObjectId === to.id;

  const maxHeight = routeHeight(scenario);
  const positions = createArcPositions(from, to, maxHeight);
  const reveal = routeRevealForScenario(scenario, route, progress);
  const count = Math.max(3, Math.floor(positions.length * reveal));
  const activePositions = positions.slice(0, count);

  viewer.entities.add({
    id: `${route.id}-base`,
    name: `${route.name} Base`,
    polyline: {
      positions,
      width: routeWidth(scenario, selected) + 3,
      material: c(route.color, 0.2),
      clampToGround: false,
    },
    properties: {
      aradId: route.id,
    },
  });

  viewer.entities.add({
    id: route.id,
    name: route.name,
    polyline: {
      positions: activePositions,
      width: routeWidth(scenario, selected),
      material: new PolylineGlowMaterialProperty({
        glowPower: selected ? 0.28 : 0.18,
        color: selected ? Color.WHITE : c(route.color, 0.95),
      }),
      clampToGround: false,
    },
    properties: {
      aradType: "route",
      aradId: route.id,
    },
  });

  if (scenario.id === "infrastructure-planning") {
    viewer.entities.add({
      id: `${route.id}-corridor`,
      name: `${route.name} Corridor`,
      corridor: {
        positions: [objectPosition(from, 100), objectPosition(to, 100)],
        width: selected ? 1800 : 1100,
        material: c(route.color, selected ? 0.24 : 0.14),
        outline: true,
        outlineColor: selected ? Color.WHITE : c(route.color, 0.75),
      },
      properties: {
        aradId: route.id,
      },
    });
  }

  if (showLabel) {
    const center = centerOfRoute(scenario, route);
    if (center) {
      addLabelOnly(
        viewer,
        route.id,
        route.name,
        center.lat,
        center.lon,
        maxHeight * 0.68,
        selected
      );
    }
  }
}

function movingMarkerPosition(scenario: Scenario, progress: number) {
  const route = scenario.routes[0];
  if (!route) return undefined;

  const from = findObject(scenario, route.fromObjectId);
  const to = findObject(scenario, route.toObjectId);
  if (!from || !to) return undefined;

  const phaseIndex = phaseIndexForProgress(scenario, progress);
  const local = phaseLocalProgress(scenario, progress);
  const phase = scenario.phaseScripts[phaseIndex];

  const t =
    phase.cameraMode === "follow"
      ? Math.max(0.05, Math.min(0.95, local))
      : routeRevealForScenario(scenario, route, progress);

  const lat = from.lat + (to.lat - from.lat) * t;
  const lon = from.lon + (to.lon - from.lon) * t;
  const height = Math.sin(Math.PI * t) * routeHeight(scenario) + 14000;

  return { lat, lon, height };
}

function addMovingMarker(
  viewer: Viewer,
  scenario: Scenario,
  progress: number,
  showLabel: boolean
) {
  const position = movingMarkerPosition(scenario, progress);
  if (!position) return;

  const label =
    scenario.id === "strategic-route"
      ? "Moving Unit"
      : scenario.id === "observation-coverage"
        ? "Signal Trace"
        : scenario.id === "emergency-response"
          ? "Response Unit"
          : "Corridor Review";

  viewer.entities.add({
    id: "active-moving-marker",
    name: label,
    position: Cartesian3.fromDegrees(position.lon, position.lat, position.height),
    point: {
      pixelSize: 20,
      color: c("#fbbf24"),
      outlineColor: Color.WHITE,
      outlineWidth: 4,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
    },
    label: showLabel
      ? {
          text: label,
          font: "700 12px sans-serif",
          fillColor: Color.WHITE,
          outlineColor: Color.BLACK,
          outlineWidth: 4,
          style: LabelStyle.FILL_AND_OUTLINE,
          pixelOffset: new Cartesian2(0, -34),
          verticalOrigin: VerticalOrigin.BOTTOM,
          showBackground: true,
          backgroundColor: c("#020617", 0.88),
          backgroundPadding: new Cartesian2(9, 6),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        }
      : undefined,
  });
}

function currentCameraTarget(
  scenario: Scenario,
  cameraMode: CameraMode,
  selectedObjectId: string,
  progress: number
) {
  const phaseIndex = phaseIndexForProgress(scenario, progress);
  const phase = scenario.phaseScripts[phaseIndex];

  if (phase.cameraMode === "follow" || cameraMode === "follow") {
    const moving = movingMarkerPosition(scenario, progress);
    if (moving) return { lat: moving.lat, lon: moving.lon };
  }

  const explicitTarget = getPositionById(
    scenario,
    phase.cameraTargetId || selectedObjectId
  );

  if (explicitTarget) return explicitTarget;

  return scenario.cameraTargets[cameraMode];
}

function activeCameraMode(
  scenario: Scenario,
  requestedMode: CameraMode,
  progress: number
): CameraMode {
  const phase = scenario.phaseScripts[phaseIndexForProgress(scenario, progress)];
  return requestedMode === "focus" ? phase.cameraMode : requestedMode;
}

function cameraDistance(scenario: Scenario, mode: CameraMode) {
  return scenario.cameraTargets[mode].distance;
}

function pitchFor(mode: CameraMode) {
  if (mode === "global") return CesiumMath.toRadians(-82);
  if (mode === "report") return CesiumMath.toRadians(-88);
  if (mode === "follow") return CesiumMath.toRadians(-43);
  return CesiumMath.toRadians(-52);
}

export function HeroEarthCanvas({
  scenario,
  layers,
  cameraMode,
  selectedObjectId,
  onSelectObject,
  progress,
}: HeroEarthCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const handlerRef = useRef<ScreenSpaceEventHandler | null>(null);
  const lastPhaseRef = useRef<number>(-1);

  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("Starting Cesium without ion token...");
  const [mapMode, setMapMode] = useState<MapMode>("osm");
  const [sunEnabled, setSunEnabled] = useState(true);

  const phaseIndex = useMemo(
    () => phaseIndexForProgress(scenario, progress),
    [scenario, progress]
  );

  const phase = scenario.phaseScripts[phaseIndex];

  useEffect(() => {
    if (!containerRef.current || viewerRef.current) return;

    const viewer = new Viewer(containerRef.current, {
      baseLayer: false,
      terrainProvider: new EllipsoidTerrainProvider(),
      animation: false,
      timeline: false,
      baseLayerPicker: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      fullscreenButton: false,
      infoBox: false,
      selectionIndicator: false,
      shouldAnimate: true,
      requestRenderMode: false,
    });

    viewerRef.current = viewer;

    viewer.imageryLayers.addImageryProvider(
      new OpenStreetMapImageryProvider({
        url: "https://tile.openstreetmap.org/",
      })
    );

    viewer.scene.backgroundColor = c("#020617");
    viewer.scene.globe.baseColor = c("#020617");
    viewer.scene.globe.enableLighting = true;

    if (viewer.scene.skyAtmosphere) viewer.scene.skyAtmosphere.show = true;
    if (viewer.scene.sun) viewer.scene.sun.show = true;
    if (viewer.scene.moon) viewer.scene.moon.show = true;

    viewer.camera.setView({
      destination: Cartesian3.fromDegrees(45, 28, 18500000),
      orientation: {
        heading: CesiumMath.toRadians(0),
        pitch: CesiumMath.toRadians(-90),
        roll: 0,
      },
    });

    setTimeout(() => {
      viewer.resize();
    }, 250);

    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    handlerRef.current = handler;

    handler.setInputAction((movement: { position: Cartesian2 }) => {
      const picked = viewer.scene.pick(movement.position);
      if (!picked || !picked.id) return;

      const entity = picked.id as Entity;
      if (typeof entity.id !== "string") return;

      const id = entity.id
        .replace("-label", "")
        .replace("-base", "")
        .replace("-halo", "")
        .replace("-body", "")
        .replace("-corridor", "");

      onSelectObject(id);
      setStatus(`Selected: ${entity.name || id}`);
    }, ScreenSpaceEventType.LEFT_CLICK);

    setReady(true);

    return () => {
      if (handlerRef.current && !handlerRef.current.isDestroyed()) {
        handlerRef.current.destroy();
      }

      handlerRef.current = null;

      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy();
      }

      viewerRef.current = null;
    };
  }, [onSelectObject]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    viewer.entities.removeAll();

    if (layers.zones) {
      scenario.zones.forEach((zone) => {
        addZoneEntity(viewer, zone, selectedObjectId === zone.id, layers.labels);
      });
    }

    if (layers.routes) {
      scenario.routes.forEach((route) => {
        addRouteEntity(
          viewer,
          scenario,
          route,
          selectedObjectId,
          layers.labels,
          progress
        );
      });
    }

    scenario.objects.forEach((object) => {
      const routeLike = object.type === "route" || object.type === "beam";
      const pinLike =
        object.type === "pin" ||
        object.type === "drawing" ||
        object.type === "measurement";
      const modelLike = object.type === "model";
      const zoneLike = object.type === "zone";

      if (routeLike) return;
      if (pinLike && !layers.pins) return;
      if (modelLike && !layers.models) return;
      if (zoneLike && !layers.zones) return;

      addObjectEntity(
        viewer,
        object,
        scenario,
        selectedObjectId === object.id || phase.selectObjectId === object.id,
        layers.labels
      );
    });

    if (layers.routes) {
      addMovingMarker(viewer, scenario, progress, layers.labels);
    }

    viewer.scene.requestRender();
  }, [scenario, layers, selectedObjectId, progress, phase.selectObjectId]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !ready) return;

    const mode = activeCameraMode(scenario, cameraMode, progress);
    const target = currentCameraTarget(scenario, cameraMode, selectedObjectId, progress);
    const distance = cameraDistance(scenario, mode);

    const phaseChanged = lastPhaseRef.current !== phaseIndex;
    lastPhaseRef.current = phaseIndex;

    if (mode === "follow" && !phaseChanged) {
      viewer.camera.setView({
        destination: Cartesian3.fromDegrees(target.lon, target.lat, distance),
        orientation: {
          heading: CesiumMath.toRadians(25),
          pitch: pitchFor(mode),
          roll: 0,
        },
      });
      return;
    }

    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(target.lon, target.lat, distance),
      orientation: {
        heading: mode === "report" ? CesiumMath.toRadians(0) : CesiumMath.toRadians(25),
        pitch: pitchFor(mode),
        roll: 0,
      },
      duration: phaseChanged ? 1.1 : 1.4,
    });

    setStatus(`${scenario.shortTitle} · ${phase.name}: ${phase.description}`);
  }, [
    scenario,
    cameraMode,
    selectedObjectId,
    progress,
    ready,
    phaseIndex,
    phase.name,
    phase.description,
  ]);

  function setOSM() {
    const viewer = viewerRef.current;
    if (!viewer) return;

    viewer.imageryLayers.removeAll();
    viewer.imageryLayers.addImageryProvider(
      new OpenStreetMapImageryProvider({
        url: "https://tile.openstreetmap.org/",
      })
    );

    viewer.scene.globe.baseColor = c("#020617");
    setMapMode("osm");
    setStatus("OpenStreetMap imagery enabled");
  }

  function setDarkPreview() {
    const viewer = viewerRef.current;
    if (!viewer) return;

    viewer.imageryLayers.removeAll();
    viewer.scene.globe.baseColor = c("#0f172a");
    setMapMode("dark");
    setStatus("Dark globe preview enabled");
  }

  function toggleSun() {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const next = !sunEnabled;
    viewer.scene.globe.enableLighting = next;

    if (viewer.scene.sun) viewer.scene.sun.show = next;
    if (viewer.scene.moon) viewer.scene.moon.show = next;

    setSunEnabled(next);
    setStatus(next ? "Sun lighting enabled" : "Sun lighting disabled");
  }

  function flyToGlobal() {
    const viewer = viewerRef.current;
    if (!viewer) return;

    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(45, 28, 18500000),
      orientation: {
        heading: CesiumMath.toRadians(0),
        pitch: CesiumMath.toRadians(-90),
        roll: 0,
      },
      duration: 2,
    });

    setStatus("Global Earth view");
  }

  function flyToScenarioRegion() {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const target = currentCameraTarget(scenario, "report", selectedObjectId, progress);

    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(target.lon, target.lat, scenario.cameraTargets.report.distance),
      orientation: {
        heading: CesiumMath.toRadians(0),
        pitch: pitchFor("report"),
        roll: 0,
      },
      duration: 1.4,
    });

    setStatus(`Scenario overview: ${scenario.title}`);
  }

  function flyToSelectedObject() {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const target = getPositionById(scenario, selectedObjectId);
    if (!target) return;

    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(target.lon, target.lat, scenario.cameraTargets.focus.distance * 0.75),
      orientation: {
        heading: CesiumMath.toRadians(25),
        pitch: pitchFor("focus"),
        roll: 0,
      },
      duration: 1.4,
    });

    setStatus(`Zoom: ${selectedObjectId}`);
  }

  return (
    <div className="relative h-full min-h-[560px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70">
      <div ref={containerRef} className="absolute inset-0" />

      <div
        className="pointer-events-none absolute left-4 top-4 max-w-xs rounded-xl border bg-slate-950/80 px-3 py-2 text-xs backdrop-blur"
        style={{ borderColor: `${scenario.accentColor}66`, color: scenario.accentColor }}
      >
        <div className="font-semibold">{scenario.shortTitle} · {phase.name}</div>
        <div className="mt-1 text-[10px] leading-4 text-slate-300">{phase.description}</div>
      </div>

      <div className="absolute right-4 top-4 w-60 rounded-xl border border-white/10 bg-slate-950/85 p-3 text-xs backdrop-blur">
        <div className="mb-3 font-semibold text-cyan-100">Earth Engine</div>

        <div className="grid gap-2">
          <button
            onClick={setOSM}
            className={`rounded-lg border px-3 py-2 text-left text-[11px] ${
              mapMode === "osm"
                ? "border-cyan-300/40 bg-cyan-300/15 text-cyan-100"
                : "border-white/10 bg-white/5 text-slate-400"
            }`}
          >
            OpenStreetMap Tiles
          </button>

          <button
            onClick={setDarkPreview}
            className={`rounded-lg border px-3 py-2 text-left text-[11px] ${
              mapMode === "dark"
                ? "border-cyan-300/40 bg-cyan-300/15 text-cyan-100"
                : "border-white/10 bg-white/5 text-slate-400"
            }`}
          >
            Dark Globe Preview
          </button>

          <button
            onClick={toggleSun}
            className={`rounded-lg border px-3 py-2 text-left text-[11px] ${
              sunEnabled
                ? "border-yellow-300/40 bg-yellow-300/15 text-yellow-100"
                : "border-white/10 bg-white/5 text-slate-400"
            }`}
          >
            Sun Lighting: {sunEnabled ? "ON" : "OFF"}
          </button>

          <button
            onClick={flyToGlobal}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-[11px] text-slate-300 hover:bg-white/10"
          >
            Global View
          </button>

          <button
            onClick={flyToScenarioRegion}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-[11px] text-slate-300 hover:bg-white/10"
          >
            Scenario Overview
          </button>

          <button
            onClick={flyToSelectedObject}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-[11px] text-slate-300 hover:bg-white/10"
          >
            Selected Object Zoom
          </button>
        </div>

        <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-2 text-[10px] leading-4 text-slate-400">
          {ready ? status : "Loading Cesium..."}
        </div>

        <div className="mt-2 rounded-lg border border-amber-300/20 bg-amber-300/10 p-2 text-[10px] leading-4 text-amber-100">
          Terrain is flat now. Self-hosted 30m terrain can be added later.
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-4 right-4 rounded-xl border border-white/10 bg-slate-950/75 px-3 py-2 text-xs text-slate-300 backdrop-blur">
        Drag · Zoom · Play timeline · Scenario camera
      </div>
    </div>
  );
}
