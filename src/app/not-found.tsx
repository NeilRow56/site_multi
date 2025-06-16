'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'

const NotFoundPage = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <Image
        className='m-0 rounded-xl'
        src='/images/not-found-1024x1024.png'
        width={350}
        height={350}
        sizes='350px'
        alt='Page Not Found'
        priority={true}
        title='Page Not Found'
      />
      <div className='w-1/3 rounded-lg p-6 text-center shadow-md'>
        <h1 className='mb-4 text-3xl font-bold'>Not Found</h1>
        <p className='text-destructive'>Could not find requested page</p>
        <Button
          variant='outline'
          className='mt-4 ml-2'
          onClick={() => (window.location.href = '/')}
        >
          Back To Home
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
