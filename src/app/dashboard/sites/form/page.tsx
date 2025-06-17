import { BackButton } from '@/components/dashboard/back-button'
import { db } from '@/db'
import { sites } from '@/db/schema'
import { getSite } from '@/lib/queries/getSite'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import React from 'react'
import { SiteForm } from './_components/site-form'
import SiteTable from './_components/site-table'

export async function generateMetadata({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { siteId } = await searchParams

  if (!siteId) return { title: 'New Site' }

  return { title: `Edit Site #${siteId}` }
}

const SitesFormPage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) => {
  try {
    const { getPermission } = getKindeServerSession()
    const managerPermission = await getPermission('manager')
    const isManager = managerPermission?.isGranted
    const { siteId } = await searchParams

    const data = await db.select().from(sites)

    // Edit site form
    if (siteId) {
      const site = await getSite(parseInt(siteId))

      if (!site) {
        return (
          <>
            <h2 className='mb-2 text-2xl'>Site ID #{siteId} not found</h2>
            <BackButton title='Go Back' variant='default' />
          </>
        )
      }

      // update site dialog/form component
      return (
        <div className='flex-flex-col space-y-2'>
          <SiteForm site={site} key={siteId} isManager={isManager} />
          <SiteTable data={data} />
        </div>
      )
    } else {
      // new site dialog/form component
      return (
        <div className='flex-flex-col space-y-2'>
          <SiteForm key='new' isManager={isManager} />
          <SiteTable data={data} />
        </div>
      )
    }
  } catch (e) {
    if (e instanceof Error) {
      throw e
    }
  }
}

export default SitesFormPage
