import { TextInput, Stack, Textarea, Button, Modal, Skeleton } from '@mantine/core';
import { FileText } from 'tabler-icons-react';
import { useEffect, useState } from 'react'
import { RichTextEditor } from '@mantine/rte';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import '../root.scss'

function EditBlogForm() {
    let params = useParams()

    const [value, onChange] = useState<string>('');
    const [titleValue, titleValueChange] = useState<string>('');
    const [shortDescValue, shortDescValueChange] = useState<string>('');
    const [authorValue, authorValueChange] = useState<string>('');
    const [footerValue, footerValueChange] = useState<string>('');
    const [opened, setOpened] = useState<boolean>(false)
    const [modalError, setModalError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)

    const fetchBlog = async () => {

        const response = await axios(`http://localhost:8080/api/get/${params.BlogID}`)
        .then(res => {
            if (res.data.success) {
                titleValueChange(res.data.data.post.Title)
                authorValueChange(res.data.data.post.Author)
                shortDescValueChange(res.data.data.post.ShortDescription)
                footerValueChange(res.data.data.post.Footer)
                onChange(res.data.data.post.Overview)
                setLoading(false)
            } else {
                setModalError(res.data.data.message)
                setOpened(true)
            }
        })

    }

    useEffect(() => {
        fetchBlog();
    }, [])

    const editBlog = async () => {

        const response = await axios.patch(`http://localhost:8080/api/edit/${params.BlogID}`, 
        {
            Title: titleValue,
            ShortDescription: shortDescValue,
            Overview: value,
            Footer: footerValue,
        })
        .then(res => {
            if (res.data.success) {
                window.location.href=`/blogs/${params.BlogID}`
            } else {
                setModalError(res.data.data.message)
                setOpened(true)
            }
        })

    }

    return (
        <div className="main" style={{display: 'flex', justifyContent: 'center'}}>
            <Skeleton visible={loading}>
            <div style={{ width: '75vw', marginTop: '3%' }}>
            <Stack align="stretch">
            <div style={{display: 'flex', justifyContent: 'center'}}><h2>Blog Editor</h2></div>
            <TextInput label="Your Blogs Title" value={titleValue} placeholder="Blog Title (2-24 characters)" icon={<FileText size={14} />} size="md" required onChange={(event) => titleValueChange(event.currentTarget.value)}/>
            <TextInput label="Your Blogs short description" value={shortDescValue} placeholder="Blog short description (16-128 characters)" icon={<FileText size={14} />} size="md" required onChange={(event) => shortDescValueChange(event.currentTarget.value)}/>
            <RichTextEditor value={value} onChange={onChange}
             controls={[
                ['bold', 'italic', 'underline'],
                ['unorderedList', 'h1', 'h2', 'h3'],
                ['alignLeft', 'alignCenter', 'alignRight'],
              ]}
            />
            <Textarea
                placeholder="Your full footer (if you don't want to include it, else leave it empty) (10-30 characters)"
                label="Footer"
                variant="filled"
                size="md"
                onChange={(event) => footerValueChange(event.currentTarget.value)}
                value={footerValue}
            />
            </Stack>
            <Button onClick={editBlog} style={{marginTop: '2.5%'}} variant="outline" color="yellow" >Save</Button>
            <Button style={{marginTop: '2.5%', marginLeft: '2%'}} variant="outline" color="red" onClick={() => window.location.href="/"}>Cancel</Button>
            </div>
            </Skeleton>
            <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Error!"
        centered
      >
          {modalError}
      </Modal>
        </div>
    )
}

export default EditBlogForm;