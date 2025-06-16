import { db } from '@/db'
import { sites } from '@/db/schema'

import { eq } from 'drizzle-orm'

export async function getSite(id: number) {
  const site = await db.select().from(sites).where(eq(sites.id, id))

  return site[0]
}
