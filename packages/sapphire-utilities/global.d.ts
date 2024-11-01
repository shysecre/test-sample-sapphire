import type Redis from "ioredis"
import type { PrismaClient } from "@prisma/client"
// import type { IConfig } from "@yume/common"

declare module "@sapphire/pieces" {
  interface Container {
    redis: Redis
    prisma: PrismaClient
    // config: IConfig
  }
}

declare module "discord.js" {
  interface Client {
    guild?: Guild
  }
}
