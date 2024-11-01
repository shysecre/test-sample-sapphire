import { Command } from "@sapphire/framework"
import { ApplyOptions } from "@sapphire/decorators"
// import { InteractionContextType } from "discord.js"

@ApplyOptions<Command.Options>({
  name: "inrole",
  description: "Посмотреть участников роли",
})
export class InRoleCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName(this.name)
        .setDescription(this.description)
        // .setContexts([InteractionContextType.Guild])
        .addRoleOption((option) => option.setName("role").setRequired(true).setDescription("роль"))
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
