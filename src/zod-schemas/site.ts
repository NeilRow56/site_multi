import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { sites } from '@/db/schema'
import { z } from 'zod/v4'

export const insertSiteSchema = createInsertSchema(sites, {
  name: schema =>
    schema
      .min(2, 'Name is required')
      .max(35, 'maximum of 35 characters for name'), // Extends schema
  description: schema =>
    schema
      .min(2, 'Description is required')
      .max(150, 'maximum of 150 characters for description'), // Extends schema
  subdirectory: schema =>
    schema
      .min(1, 'Subdirectory is required')
      .max(40, 'maximum of 40 characters for description') // Extends schema
})

export const selectSiteSchema = createSelectSchema(sites)

export type insertSiteSchemaType = z.infer<typeof insertSiteSchema>

export type selectSiteSchemaType = z.infer<typeof selectSiteSchema>
