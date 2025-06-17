import { Metadata } from 'next'

const dummyData = {
  '1': {
    title: 'One'
  },
  '2': {
    title: 'Two'
  },
  '3': {
    title: 'Three'
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = dummyData[slug as keyof typeof dummyData]

  return {
    title: data.title
  }
}

export default async function DynamicSitePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = dummyData[slug as keyof typeof dummyData]
  return <div>{data.title}</div>
}
