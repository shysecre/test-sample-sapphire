import "@yume/common/setup"
import "@yume/sapphire-utilities/register"

import config from "config"
import { EconomyClient } from "./client"
import { container } from "@sapphire/pieces"

async function main() {
  try {
    const plainConfig: any = config.util.toObject()
    const economyClient = new EconomyClient(plainConfig)

    await economyClient.login(container.config.tokens.economy)
  } catch (err) {
    container.logger.error(err)
  }
}

main()
