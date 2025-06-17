import Form from 'next/form'
import { Input } from '@/components/ui/input'
import SearchButton from '@/components/search-button'

export default function SitesSearch() {
  return (
    <Form action='/sites' className='flex items-center gap-2'>
      <Input
        name='searchText'
        type='text'
        placeholder='Search Sites'
        className='w-full'
        autoFocus
      />
      <SearchButton />
    </Form>
  )
}
