import type { PrismaClient } from "@prisma/client"
import type Redis from "ioredis"
import type { Collection } from "discord.js"

declare module "@sapphire/pieces" {
  interface Container {
    plantedCurrency: Collection<
      string,
      { amount: number; captcha: string; messageId: string; channelId: string; taskId: string }
    >
    config: any
    prisma: PrismaClient
    redis: Redis
  }
}

declare module "discord.js" {
  interface Client {
    guild?: Guild
    mainChannel?: TextChannel
  }
}

declare module "@sapphire/plugin-utilities-store" {
  interface Utilities {}
}

declare module "@sapphire/plugin-scheduled-tasks" {
  interface ScheduledTasks {
    lotteryWinner: { winnerId: string; userIds: string[]; messageId: string }
  }
}

declare module "@sapphire/framework" {
  interface Preconditions {
    MainChannelOnly: never
  }
}
