import { inspect } from "util"
import * as colorette from "colorette"
import { ApplicationCommandRegistries, RegisterBehavior } from "@sapphire/framework"

import "@sapphire/plugin-editable-commands/register"
import "@sapphire/plugin-logger/register"
import "@sapphire/plugin-subcommands/register"
import "@sapphire/plugin-utilities-store/register"

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite)

inspect.defaultOptions.depth = 1

colorette.createColors({ useColor: true })
