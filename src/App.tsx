import CardComponent from './Components/Card'
import { Button, SimpleGrid, Skeleton } from '@mantine/core';
import FooterComponent from './Components/FooterComponent'
import './scss/App.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [blogs, setBlogs] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [fetched, setFetched] = useState<boolean>(false)
  const [msg, setmsg] = useState<string>()

  const fetchBlogs = async () => {
    await axios("http://localhost:8080/api/getall")
    .then(res => {
      if (res.data.success) {
        setBlogs(res.data.data)
        setFetched(true)
        setLoading(false)
      } else {
        setLoading(false)
        setmsg('Failed Fetching Data')
      }
    })
  }

  useEffect(() => {
    fetchBlogs()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div >
        <div className="center-context" style={{ alignItems: 'center', justifyContent: 'center', height: '25vh', textAlign: 'center'}}>
          <h2>Your Favourite Blog Page on the Internet.</h2>
          <br />
          <h2>
          Do you want to create your own blog? 
          </h2>
          <Button variant="light" color="green" size="md" onClick={(() => window.location.href="/blogs/create")}>Create</Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '5%' }}>
        <Skeleton visible={loading}>
      <SimpleGrid
      cols={4}
      spacing="lg"
      breakpoints={[
        { minWidth: 2500, cols: 5, spacing: 'xl'},
        { minWidth: 2000, cols: 4, spacing: 'xl' },
        { minWidth: 1439, cols: 3, spacing: 'md'},
        { minWidth: 960, cols: 2, spacing: 'sm' },
        { minWidth: 0, cols: 1, spacing: 'sm' },
      ]}
    >
          
      
      {blogs.map((o: any, i: any) => {
        return <div className="cardcomp-div">
        <CardComponent 
        Title={o.Title}
        key={i + 1}
        ShortDescription={o.ShortDescription}
        Author={o.Author} // 16 letters max for author prop
        redirectLink={o.RedirectID}
        />
      </div>
      })} 
      
      {fetched ? <div></div> : <div style={{display: 'flex', justifyContent: 'center'}}><h1 style={{color: 'red'}}>{msg}</h1></div>}

    </SimpleGrid>
    </Skeleton>
        </div>
       <FooterComponent /> 
    </div>
  );
}

export default App;