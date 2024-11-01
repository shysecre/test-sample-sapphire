import { ApplyOptions } from "@sapphire/decorators"
import { Command } from "@sapphire/framework"

@ApplyOptions<Command.Options>({
  name: "balance",
  description: "Посмотреть баланс",
})
export class BalanceCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName(this.name)
          .setDescription(this.description)
          .addUserOption((option) =>
            option.setName("user").setRequired(false).setDescription("пользователь")
          ),
      {
        guildIds: [this.container.config.guildId],
      }
    )
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply()

    interaction.editReply("bla")
  }
}
