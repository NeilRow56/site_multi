import { db } from '@/db'
import { sites } from '@/db/schema'

import { asc, eq } from 'drizzle-orm'

export async function getSite(id: number) {
  const site = await db.select().from(sites).where(eq(sites.id, id))

  return site[0]
}

export async function getSites() {
  const results = await db.select().from(sites).orderBy(asc(sites.name))

  return results
}
