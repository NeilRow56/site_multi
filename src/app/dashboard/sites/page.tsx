import { EmptyState } from '@/components/dashboard/empty-state'

import React from 'react'

const SitesPage = () => {
  return (
    <>
      <EmptyState
        title='You dont have any Sites created'
        description='You currently dont have any Sites. Please create some so that you can
        see them right here!'
      />
    </>
  )
}

export default SitesPage
