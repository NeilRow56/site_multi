import React from 'react'

async function getProducts() {
  // simulate a dummy error
  const shouldError = Math.random() > 0.5

  if (shouldError) {
    throw new Error('Failed to fetch products')
  }
  return [
    {
      id: 1,
      name: 'One'
    },
    {
      id: 2,
      name: 'Two'
    },
    {
      id: 3,
      name: 'Three'
    }
  ]
}

export default async function ErrorExamplePage() {
  const products = await getProducts()
  return (
    <div className='p-4'>
      <h1>Product List</h1>
      <div className='grid gap-4'>
        {products.map(product => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    </div>
  )
}
