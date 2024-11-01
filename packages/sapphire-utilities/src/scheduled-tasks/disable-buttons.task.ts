import { ApplyOptions } from "@sapphire/decorators"
import { ScheduledTask } from "@sapphire/plugin-scheduled-tasks"
import {
  ActionRowBuilder,
  ButtonBuilder,
  ChannelSelectMenuBuilder,
  ComponentType,
  MentionableSelectMenuBuilder,
  RoleSelectMenuBuilder,
  StringSelectMenuBuilder,
  UserSelectMenuBuilder,
  type TextChannel,
} from "discord.js"

const builders = {
  [ComponentType.Button]: ButtonBuilder,
  [ComponentType.ChannelSelect]: ChannelSelectMenuBuilder,
  [ComponentType.MentionableSelect]: MentionableSelectMenuBuilder,
  [ComponentType.RoleSelect]: RoleSelectMenuBuilder,
  [ComponentType.StringSelect]: StringSelectMenuBuilder,
  [ComponentType.UserSelect]: UserSelectMenuBuilder,
}

@ApplyOptions<ScheduledTask.Options>({ name: "DisableMessageComponents" })
export class DisableMessageComponents extends ScheduledTask {
  public async run({ channelId, messageId }: { channelId: string; messageId: string }) {
    try {
      const channel = <TextChannel>await this.container.client.guild?.channels.fetch(channelId)
      const message = await channel.messages.fetch(messageId)

      if (!message.components.length) {
        return
      }

      const rows = []

      for (const row of message.components) {
        const rowsComponents: any[] = []

        for (const component of row.components) {
          const ComponentBuilder = builders[component.type]

          if (!ComponentBuilder) continue

          rowsComponents.push(new ComponentBuilder(component.data as any).setDisabled(true))
        }

        if (!rowsComponents.length) continue

        rows.push(new ActionRowBuilder().setComponents(...rowsComponents))
      }

      message.edit({ components: rows as any })
    } catch (err) {}
  }
}
