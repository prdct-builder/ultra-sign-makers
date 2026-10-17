// Runs Vite for one site (or all sites) without needing cross-platform env-var syntax.
//   node scripts/site.mjs dev [site-id]
//   node scripts/site.mjs build [site-id ...]     (no ids = every site → dist/<site-id>)
//   node scripts/site.mjs preview <site-id>
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build, createServer, preview } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sitesDir = path.join(root, 'src/sites')
const allSites = fs
  .readdirSync(sitesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && fs.existsSync(path.join(sitesDir, d.name, 'site.ts')))
  .map((d) => d.name)
  .sort()

const [command, ...ids] = process.argv.slice(2)

function checkIds(list) {
  const unknown = list.filter((id) => !allSites.includes(id))
  if (unknown.length) {
    console.error(`Unknown site: ${unknown.join(', ')}\nSites: ${allSites.join(', ')}`)
    process.exit(1)
  }
}

checkIds(ids)

if (command === 'dev') {
  if (ids[0]) process.env.SITE = ids[0]
  const server = await createServer({ root })
  await server.listen()
  server.printUrls()
  const local = server.resolvedUrls?.local[0] ?? 'http://localhost:3000/'
  console.log(`\n  Sites (switch by path):`)
  for (const id of allSites) console.log(`    ${id.padEnd(24)} ${local}${id}/`)
} else if (command === 'build') {
  for (const id of ids.length ? ids : allSites) {
    process.env.SITE = id
    console.log(`\n▶ Building ${id} → dist/${id}`)
    await build({ root })
  }
} else if (command === 'preview') {
  if (!ids[0]) {
    console.error(`Usage: npm run preview -- <site-id>\nSites: ${allSites.join(', ')}`)
    process.exit(1)
  }
  process.env.SITE = ids[0]
  const server = await preview({ root })
  server.printUrls()
} else {
  console.error('Usage: node scripts/site.mjs <dev|build|preview> [site-id ...]')
  process.exit(1)
}
