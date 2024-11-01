import { Command } from "@sapphire/framework"
import { ApplyOptions } from "@sapphire/decorators"

import { InteractionContextType } from "discord.js"

@ApplyOptions<Command.Options>({
  name: "ticket",
  description: "Обратиться в службу поддержки",
})
export class TicketCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName(this.name)
        .setDescription(this.description)
        .setContexts([InteractionContextType.Guild, InteractionContextType.BotDM])
        .addStringOption((option) =>
          option.setName("type").setRequired(false).setDescription("тип")
        )
    )
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true })

    interaction.editReply("bla")
  }
}
