import { coverageAnalysisScenario } from "./coverageAnalysis";
import { emergencyResponseScenario } from "./emergencyResponse";
import { infrastructurePlanningScenario } from "./infrastructurePlanning";
import { routePlanningScenario } from "./routePlanning";

export const demoScenarios = [
  routePlanningScenario,
  coverageAnalysisScenario,
  emergencyResponseScenario,
  infrastructurePlanningScenario,
];

export type DemoScenarioId = (typeof demoScenarios)[number]["id"];

export function getDemoScenarioById(id: string) {
  return demoScenarios.find((scenario) => scenario.id === id) || demoScenarios[0];
}
