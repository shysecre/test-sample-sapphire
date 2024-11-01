import type { PrismaClient } from "@prisma/client"
import type Redis from "ioredis"
import type { WebhookClient } from "discord.js"

declare module "@sapphire/pieces" {
  interface Container {
    config: any
    prisma: PrismaClient
    redis: Redis
    logRolesWebhook: WebhookClient
    logVoiceWebhook: WebhookClient
    logMessagesWebhook: WebhookClient
  }
}

declare module "discord.js" {
  interface Client {
    guild?: Guild
    mainChannel?: TextChannel
    superSecretChannel?: TextChannel
  }
}

declare module "@sapphire/plugin-utilities-store" {
  interface Utilities {
    // voiceOnline: VoiceOnlineUtility
    // privateRoom: PrivateRoomUtility
    // supportVoiceOnline: SupportVoiceOnlineUtility
    // supportUtility: SupportUtility
  }
}

declare module "@sapphire/framework" {
  interface Preconditions {
    SupportVoiceOnly: never
    SupportEnabledOnly: never
  }
}
