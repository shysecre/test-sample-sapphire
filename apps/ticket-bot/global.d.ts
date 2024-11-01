import type { PrismaClient } from "@prisma/client"

declare module "@sapphire/pieces" {
  interface Container {
    config: any
    prisma: PrismaClient
  }
}

declare module "discord.js" {
  interface Client {
    guild?: Guild
  }
}

declare module "@sapphire/plugin-utilities-store" {
  interface Utilities {
    // ticket: TicketUtility
  }
}
