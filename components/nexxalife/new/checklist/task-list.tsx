import type { ChecklistTask } from "../../../../lib/nexxalife/contracts"
import { ChecklistTaskItem } from "./task-item"

export function ChecklistTaskList({ tasks }: { tasks: ChecklistTask[] }) {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <ChecklistTaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}
