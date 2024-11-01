import type Redis from "ioredis"

declare module "@sapphire/pieces" {
  interface Container {
    config: any
    redis: Redis
  }
}

declare module "discord.js" {
  interface Client {
    guild?: Guild
  }
}
