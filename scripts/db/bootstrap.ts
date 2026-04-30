import { spawn } from "node:child_process"

function run(command: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      stdio: "inherit",
      env: process.env,
    })

    child.on("exit", (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`))
    })
  })
}

async function main() {
  await run("pnpm", ["db:migrate"])
  await run("pnpm", ["db:seed"])
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
