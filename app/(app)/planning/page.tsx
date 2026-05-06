import { getDiagnosticResult } from "@/lib/db/actions"
import { PlanningSession } from "@/components/planning/planning-session"

export default async function PlanningPage() {
  const diagnostic = await getDiagnosticResult()

  return <PlanningSession diagnosticData={diagnostic} />
}
