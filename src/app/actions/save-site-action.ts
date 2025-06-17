'use server'

import { eq } from 'drizzle-orm'
import { flattenValidationErrors } from 'next-safe-action'
import { redirect } from 'next/navigation'

import { db } from '@/db'
import { sites } from '@/db/schema'

import { insertSiteSchema, type insertSiteSchemaType } from '@/zod-schemas/site'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { actionClient } from '@/lib/safe-action'
import { revalidatePath } from 'next/cache'

export const saveSiteAction = actionClient
  .metadata({ actionName: 'saveSiteAction' })
  .inputSchema(insertSiteSchema, {
    // ve represents validation errors
    handleValidationErrorsShape: async ve =>
      flattenValidationErrors(ve).fieldErrors
  })
  .action(
    async ({ parsedInput: site }: { parsedInput: insertSiteSchemaType }) => {
      const { isAuthenticated } = getKindeServerSession()

      const isAuth = await isAuthenticated()

      if (!isAuth) redirect('/login')

      // New Site
      // All new customers are active by default - no need to set active to true
      // createdAt and updatedAt are set by the database
      if (site.id === 0) {
        const result = await db
          .insert(sites)
          .values({
            name: site.name,
            description: site.description,
            subdirectory: site.subdirectory
          })
          .returning({ insertedId: sites.id })
        revalidatePath('/dashboard/sites')
        return {
          message: `Site ID #${result[0].insertedId} created successfully`
        }
      }

      // Existing customer
      // updatedAt is set by the database
      const result = await db
        .update(sites)
        .set({
          name: site.name,
          description: site.description,
          subdirectory: site.subdirectory,
          active: site.active
        })
        .where(eq(sites.id, site.id!))
        .returning({ updatedId: sites.id })
      revalidatePath('/dashboard/sites')

      return { message: `Site ID #${result[0].updatedId} updated successfully` }
    }
  )
