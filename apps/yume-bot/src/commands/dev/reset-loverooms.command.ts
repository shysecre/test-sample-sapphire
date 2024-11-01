import { ApplyOptions } from "@sapphire/decorators"
import { Command } from "@sapphire/framework"
// import { InteractionContextType } from "discord.js"

@ApplyOptions<Command.Options>({
  name: "reset-loverooms",
  description: "сброс месячного онлайна, удаление лаврум и отправка финальных топов",
})
export class ResetLoveroomsCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) => builder.setName(this.name).setDescription(this.description)
      // .setContexts([InteractionContextType.Guild])
    ),
      {
        guildIds: [this.container.config.guildId],
      }
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true })

    interaction.editReply("bla")
  }
}
