import '../scss/ViewBlog.scss'
import { useEffect, useState } from 'react'
import { Badge, Button, Modal, Divider, Stack, Skeleton } from '@mantine/core'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../root.scss'

function ViewBlog() {

    const params = useParams()

    const [loading, setLoading] = useState<boolean>(true)
    const [value, onChange] = useState<string>('');
    const [titleValue, titleValueChange] = useState<string>('');
    const [shortDescValue, shortDescValueChange] = useState<string>('');
    const [authorValue, authorValueChange] = useState<string>('');
    const [footerValue, footerValueChange] = useState<string>('');
    const [opened, setOpened] = useState<boolean>(false)
    const [modalError, setModalError] = useState<string>('')
    const [time, setTime] = useState<any>('')

    useEffect(() => {
        fetchBlog()
    }, [])

    const fetchBlog = async () => {

        const response = await axios(`http://localhost:8080/api/get/${params.BlogID}`)
        .then(res => {
            if (res.data.success) {
                titleValueChange(res.data.data.post.Title)
                authorValueChange(res.data.data.post.Author)
                shortDescValueChange(res.data.data.post.ShortDescription)
                footerValueChange(res.data.data.post.Footer)
                onChange(res.data.data.post.Overview)
                setTime(res.data.data.post.Date)
                setLoading(false)
            } else {
                setModalError(res.data.data.message)
                setOpened(true)
            }
        })

    }

    const editBlog =  () => {
        window.location.href=`/blogs/edit/${params.BlogID}`
    }

    const likeBlog = () => {

    }

    const deleteBlog = async () => {

        await axios.delete(`http://localhost:8080/api/delete/${params.BlogID}`)
        .then(res => {
            if (res.data.success) {
                window.location.href="/"
            } else {
                setModalError(res.data.data.message)
                setOpened(true)
            }
        })

    }

    return (
        <div className="main">
            <Skeleton visible={loading}>
            <div className="main-title">
                <h1>
                <div dangerouslySetInnerHTML={{ __html: titleValue }} style={{display: 'flex', width: '100%', wordWrap: 'break-word', wordBreak: 'break-word' }}></div>
                <Badge color="yellow" variant="light" size="lg">Author: {authorValue}</Badge></h1>
                <div dangerouslySetInnerHTML={{ __html: shortDescValue }} style={{display: 'flex', wordWrap: 'break-word', wordBreak: 'break-word' }}></div>
                <br />
                <div className="main-content">
                    <Stack>
                        <div dangerouslySetInnerHTML={{ __html: value }} style={{display: 'flex', width: '100%', wordWrap: 'break-word', wordBreak: 'break-word' }}></div>
                        <div dangerouslySetInnerHTML={{ __html: footerValue }} style={{display: 'flex', width: '100%', wordWrap: 'break-word', wordBreak: 'break-word' }}></div>
                    </Stack>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', position: 'fixed', bottom: '0', textAlign: 'center', alignItems: 'center', width: '75%'}}>
                <Button variant="filled" color="green" style={{margin: '0.75rem'}} onClick={likeBlog}>
                        Like
                </Button>
                <Button variant="filled" color="yellow" style={{margin: '0.75rem'}} onClick={editBlog}>
                    Edit
                </Button>
                <Button variant="filled" color="red" style={{margin: '0.75rem'}} onClick={deleteBlog}>
                    Delete
                </Button>
                </div>
                <Modal
        opened={opened}
        onClose={() => window.location.href="/"}
        title="Error!"
        centered
      >
          {modalError}
      </Modal>
            </div> 
            </Skeleton>
        </div>
    )
}

export default ViewBlog;
