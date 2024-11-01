import "@yume/common/setup"
import "@yume/sapphire-utilities/register"

import config from "config"
import { YumeClient } from "./client"
import { container } from "@sapphire/pieces"

async function main() {
  try {
    const plainConfig: any = config.util.toObject()
    const yumeClient = new YumeClient(plainConfig)

    await yumeClient.login(container.config.tokens.yume)
  } catch (err) {
    container.logger.error(err)
  }
}

main()
