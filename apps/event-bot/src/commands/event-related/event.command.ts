import { ApplyOptions } from "@sapphire/decorators"
import { Subcommand } from "@sapphire/plugin-subcommands"
import { InteractionContextType } from "discord.js"

@ApplyOptions<Subcommand.Options>({
  name: "event",
  description: "Команды Sendo",
  subcommands: [
    {
      name: "manage",
      chatInputRun: "manage",
    },
    {
      chatInputRun: "unban",
      name: "unban",
    },
    {
      chatInputRun: "ban",
      name: "ban",
    },
    {
      chatInputRun: "reward",
      name: "reward",
    },
  ],
})
export class EventSubcommand extends Subcommand {
  public override registerApplicationCommands(registry: Subcommand.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addSubcommand((option) =>
          option.setName("manage").setDescription("старт/управление ивентом")
        )
        .addSubcommand((option) =>
          option
            .setName("ban")
            .setDescription("выдать ивент бан юзеру")
            .addUserOption((option) =>
              option.setName("user").setRequired(true).setDescription("пользователь")
            )
            .addIntegerOption((option) =>
              option
                .setName("days")
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(7)
                .setDescription("кол-во дней")
            )
            .addStringOption((option) =>
              option.setName("reason").setMinLength(3).setDescription("причина")
            )
        )
        .addSubcommand((option) =>
          option
            .setName("unban")
            .setDescription("снять ивент бан юзеру")
            .addUserOption((option) =>
              option.setName("user").setRequired(true).setDescription("пользователь")
            )
        )
        .addSubcommand((option) =>
          option.setName("reward").setDescription("вызвать управление наградами")
        )
        .setContexts([InteractionContextType.Guild])
    ),
      { guildIds: [this.container.config.guildId] }
  }

  public async reward(interaction: Subcommand.ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true })

    interaction.editReply("bla")
  }

  public async ban(interaction: Subcommand.ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true })

    interaction.editReply("bla")
  }

  public async unban(interaction: Subcommand.ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true })

    interaction.editReply("bla")
  }

  public async manage(interaction: Subcommand.ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true })

    interaction.editReply("bla")
  }
}
