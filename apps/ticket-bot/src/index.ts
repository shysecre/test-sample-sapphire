import "@yume/common/setup"
import "@yume/sapphire-utilities/register"

import config from "config"
import { container } from "@sapphire/pieces"
import { TicketClient } from "./client"

async function main() {
  try {
    const plainConfig: any = config.util.toObject()
    const ticketClient = new TicketClient(plainConfig)

    await ticketClient.login(container.config.tokens.ticket)
  } catch (err) {
    container.logger.error(err)
  }
}

main()
