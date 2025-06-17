async function getData() {
  await new Promise(resolve => setTimeout(resolve, 5000))

  return {
    stats: {
      users: 10000
    }
  }
}

const ExampleLoadingPage = async () => {
  const data = await getData()

  return (
    <div className='pb-4'>
      <h1>Loading example</h1>
      <p>Users:{data.stats.users}</p>
    </div>
  )
}

export default ExampleLoadingPage
