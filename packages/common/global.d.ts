import { Guild } from "discord.js"

declare module "@sapphire/pieces" {
  interface Container {}
}

declare module "discord.js" {
  interface Client {
    guild?: Guild
  }
}
