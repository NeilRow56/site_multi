import { EmptyState } from '@/components/dashboard/empty-state'
import { getSites } from '@/lib/queries/getSite'
import SiteTable from './form/_components/site-table'
import SitesSearch from './form/_components/site-search'

export const metadata = {
  title: 'Site Search',
  description: 'This is an example of writing static metadata'
}

const SitesPage = async ({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) => {
  const { searchText } = await searchParams

  if (!searchText) {
    const results = await getSites()
    return (
      <>
        <SitesSearch />
        {results.length ? (
          <SiteTable data={results} />
        ) : (
          <EmptyState
            title='You dont have any Sites created'
            description='You currently dont have any Sites. Please create some so that you can
          see them right here!'
          />
        )}
      </>
    )
  }
}

export default SitesPage
