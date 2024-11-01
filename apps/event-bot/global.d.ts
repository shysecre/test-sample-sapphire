import type { PrismaClient } from "@prisma/client"
import type Redis from "ioredis"
import { WebhookClient } from "discord.js"

declare module "@sapphire/pieces" {
  interface Container {
    config: any
    prisma: PrismaClient
    redis: Redis
    logEventsWebhook: WebhookClient
  }
}

declare module "discord.js" {
  interface Client {
    guild?: Guild
    sendoInformation?: TextChannel
  }
}

declare module "@sapphire/plugin-scheduled-tasks" {
  interface ScheduledTasks {
    eventban: never
    orderevent: never
    weeklySalary: never
    removeTransferRequest: { userId: string; messageId: string }
  }
}

declare module "@sapphire/plugin-utilities-store" {
  interface Utilities {}
}
