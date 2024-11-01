import { container } from "@sapphire/pieces"
import { DisableMessageComponents } from "./disable-buttons.task"

export function loadScheduledTasks() {
  const store = "scheduled-tasks" as const

  void container.stores.loadPiece({
    name: DisableMessageComponents.name,
    piece: DisableMessageComponents,
    store,
  })
}
