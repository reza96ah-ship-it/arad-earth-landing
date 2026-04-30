import {
  Box,
  Clock3,
  Eye,
  Globe2,
  Layers3,
  Map,
  PanelRight,
  Presentation,
  RadioTower,
  Route,
  Ruler,
  Shapes,
} from "lucide-react";

export const coreFeatures = [
  {
    icon: Globe2,
    title: "3D Earth Workspace",
    description:
      "A globe-based environment for building, viewing, and presenting Earth-centered scenarios.",
  },
  {
    icon: Layers3,
    title: "Entities & Layer Management",
    description:
      "Manage maps, drawings, models, routes, analysis objects, media, and scenario elements.",
  },
  {
    icon: PanelRight,
    title: "Inspector Panel",
    description:
      "Edit selected object properties such as location, color, opacity, dimensions, transform, and animation.",
  },
  {
    icon: Shapes,
    title: "2D & 3D Drawing Tools",
    description:
      "Create circles, polygons, rectangles, polylines, cylinders, spheres, prisms, and annotations.",
  },
  {
    icon: Map,
    title: "Map Reading Tools",
    description:
      "Use compass, location tools, graticule, coordinate readout, and map layer controls.",
  },
  {
    icon: Ruler,
    title: "Analysis Tools",
    description:
      "Measure distance, line of sight, viewshed, elevation profile, and terrain hit conditions.",
  },
  {
    icon: Clock3,
    title: "Scenario Timeline",
    description:
      "Animate objects, camera movement, routes, effects, and presentations using timeline controls.",
  },
  {
    icon: Box,
    title: "3D Model Workflow",
    description:
      "Place, transform, inspect, and animate model-like assets inside Earth-based scenarios.",
  },
  {
    icon: RadioTower,
    title: "Beam Visualization",
    description:
      "Visualize communication links, signal beams, sensor ranges, and animated connection paths.",
  },
  {
    icon: Presentation,
    title: "Presentation Output",
    description:
      "Prepare professional map animations, scenario previews, and visual reporting outputs.",
  },
  {
    icon: Route,
    title: "Routes & Paths",
    description:
      "Create scenario routes, movement paths, and visual connections between locations.",
  },
  {
    icon: Eye,
    title: "Viewshed Preview",
    description:
      "Represent coverage, visibility zones, and spatial awareness in a clear visual workflow.",
  },
];

export const workflowSteps = [
  "Create Project",
  "Load Map / Spatial Data",
  "Add Layers & Entities",
  "Draw 2D / 3D Objects",
  "Inspect Properties",
  "Add Analysis Tools",
  "Animate Timeline",
  "Present or Render",
];

export const useCases = [
  {
    title: "Defense & Mission Planning",
    description:
      "Plan and present routes, coverage zones, communication links, and operational scenarios.",
  },
  {
    title: "Urban Planning",
    description:
      "Visualize terrain, infrastructure, city layers, zones, and development scenarios.",
  },
  {
    title: "Training & Education",
    description:
      "Teach geospatial workflows, Earth visualization, map reading, and scenario design.",
  },
  {
    title: "Simulation & Scenario Design",
    description:
      "Create dynamic animated scenes with objects, paths, effects, and timeline playback.",
  },
  {
    title: "Security & Intelligence",
    description:
      "Build visual intelligence products using routes, markers, beams, and analysis overlays.",
  },
  {
    title: "Presentation & Reporting",
    description:
      "Transform geospatial data into cinematic visuals for reports, briefings, and decision-making.",
  },
];

export const productModules = [
  "Globe View",
  "Entities",
  "Inspector",
  "Timeline",
  "Drawing Tools",
  "Map Tools",
  "Analysis Tools",
  "Mesh Viewer",
  "Mapnik / PostgreSQL Workflow",
];
