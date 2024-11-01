import {
  Plugin,
  SapphireClient,
  container,
  postInitialization,
  postLogin,
} from "@sapphire/framework"

import { loadListeners, loadPreconditions, loadScheduledTasks, loadUtilities } from "."
import {
  ScheduledTaskHandler,
  ScheduledTaskHandlerOptions,
  ScheduledTaskStore,
} from "@sapphire/plugin-scheduled-tasks"
import type { ClientOptions } from "discord.js"

export class CustomSapphireUtilities extends Plugin {
  public static override async [postInitialization](this: SapphireClient) {
    loadUtilities()
    loadListeners()
    loadPreconditions()

    container.logger.info(`@yume/sapphire-utilities registered successfully!`)
  }
}

export class CustomSapphireScheduledTasks extends Plugin {
  public static override async [postInitialization](this: SapphireClient) {
    this.stores.register(new ScheduledTaskStore())
  }

  public static override async [postLogin](this: SapphireClient, options: ClientOptions) {
    container.tasks = new ScheduledTaskHandler(options.tasks)

    loadScheduledTasks()

    container.tasks.createRepeated()

    container.logger.info(`@yume/sapphire-utilities/tasks registered successfully!`)
  }
}

SapphireClient.plugins.registerPostInitializationHook(
  CustomSapphireUtilities[postInitialization],
  "CustomSapphireUtilities-postInitialization"
)

SapphireClient.plugins.registerPostLoginHook(
  CustomSapphireScheduledTasks[postLogin],
  "CustomSapphireScheduledTasks-postLogin"
)

SapphireClient.plugins.registerPostInitializationHook(
  CustomSapphireScheduledTasks[postInitialization],
  "CustomSapphireScheduledTasks-postInitialization"
)

declare module "@sapphire/framework" {
  interface Preconditions {}
}

declare module "@sapphire/plugin-scheduled-tasks" {
  interface ScheduledTasks {
    DisableMessageComponents: { channelId: string; messageId: string }
  }
}

declare module "@sapphire/pieces" {
  interface Container {
    tasks: ScheduledTaskHandler
  }

  interface StoreRegistryEntries {
    "scheduled-tasks": ScheduledTaskStore
  }
}

declare module "discord.js" {
  export interface ClientOptions {
    tasks: ScheduledTaskHandlerOptions
    loadScheduledTaskErrorListeners?: boolean
  }
}
