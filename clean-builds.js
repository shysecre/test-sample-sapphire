const fs = require("node:fs")

const toDelete = []
const ignoreFolders = [
  ".git",
  "config",
  "data",
  "images",
  "mysql",
  "node_modules",
  "prisma",
  "redis",
  ".vscode",
  "server",
]

function collectFolders(folderToDelete, path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    for (const file of fs.readdirSync(path)) {
      const currentPath = path + "/" + file
      const stat = fs.lstatSync(currentPath)

      if (!stat.isDirectory()) continue
      if (currentPath.split("/").some((folderName) => ignoreFolders.includes(folderName))) continue

      if (currentPath.split("/").some((part) => folderToDelete.includes(part))) {
        toDelete.push(currentPath)
      } else {
        collectFolders(folderToDelete, currentPath)
      }
    }
  }
}

console.log("Cleaning build folders...")

collectFolders(["build"], ".")

for (const path of toDelete) {
  fs.rmSync(path, { recursive: true, force: true })
}

console.log("Successfully removed all build folders!")
