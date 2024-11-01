const { join } = require("node:path")

const NODE_CONFIG_DIR = join(__dirname, "config")
const ENV = { NODE_ENV: "prod", NODE_CONFIG_DIR }
const APPS = ["yume-bot", "ticket-bot", "moderation-bot", "event-bot", "economy-bot", "clan-bot"]

function generateApps() {
  const apps = []

  for (const app of APPS) {
    apps.push({
      env: ENV,
      script: "npm",
      args: "run start",
      cwd: `./apps/${app}`,
      instance_var: "INSTANCE_ID",
      name: app,
    })
  }

  return apps
}

module.exports = {
  apps: generateApps(),
}
