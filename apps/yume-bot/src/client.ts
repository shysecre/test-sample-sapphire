// import { PrismaClient } from "@prisma/client"
import { LogLevel, SapphireClient, container } from "@sapphire/framework"
import { getRootData } from "@sapphire/pieces"
import { Time } from "@sapphire/time-utilities"
import { GatewayIntentBits, type TextChannel } from "discord.js"
import { Redis } from "ioredis"

export class YumeClient extends SapphireClient {
  public readonly rootData = getRootData()

  public constructor(config: any) {
    super({
      intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
      ],
      logger: { level: LogLevel.Debug },
      tasks: {
        bull: {
          defaultJobOptions: {
            removeOnComplete: true,
          },
          connection: {
            host: "localhost",
            port: 6379,
            db: 5,
          },
        },
      },
      defaultCooldown: {
        delay: Time.Second * 5,
        filteredUsers: config.owners,
      },
      enableLoaderTraceLoggings: true,
      loadDefaultErrorListeners: false,
      loadMessageCommandListeners: true,
      loadScheduledTaskErrorListeners: true,
    })

    this.init(config)
  }

  public init(config: any) {
    container.config = config
    // container.prisma = new PrismaClient({ datasourceUrl: config.dbUrl })
    container.redis = new Redis(config.redisUrl)

    // container.logRolesWebhook = new WebhookClient({ url: config.webhookUrl.roles })
    // container.logVoiceWebhook = new WebhookClient({ url: config.webhookUrl.voice })
    // container.logMessagesWebhook = new WebhookClient({ url: config.webhookUrl.messages })
  }

  public override get guild() {
    return this.guilds.cache.get(container.config.guildId)
  }

  public override get mainChannel() {
    return <TextChannel>this.guild?.channels.cache.get(container.config.channelIds.main)
  }

  public override get superSecretChannel() {
    return <TextChannel>this.guild?.channels.cache.get(container.config.channelIds.superSecret)
  }
}
