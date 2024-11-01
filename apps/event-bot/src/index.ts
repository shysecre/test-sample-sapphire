import "@yume/common/setup"
import "@yume/sapphire-utilities/register"

import config from "config"
import { EventClient } from "./client"
import { container } from "@sapphire/pieces"

async function main() {
  try {
    const plainConfig: any = config.util.toObject()
    const eventClient = new EventClient(plainConfig)

    await eventClient.login(container.config.tokens.events)
  } catch (err) {
    container.logger.error(err)
  }
}

main()
