import '../scss/ViewBlog.scss'
import { TextInput, Stack, Textarea, Button, Modal } from '@mantine/core';
import { FileText } from 'tabler-icons-react';
import { useState } from 'react'
import { RichTextEditor } from '@mantine/rte';
import { showNotification } from '@mantine/notifications';
import axios from 'axios'
import '../root.scss'

function CreateBlogForm() {
    const initialValue = `You can express your full creativity here, with editing tools and other features. Feel like in home.. Type your Blog here (50-5000 characters)`

    const [value, onChange] = useState<string>(initialValue);
    const [titleValue, titleValueChange] = useState<string>('');
    const [shortDescValue, shortDescValueChange] = useState<string>('');
    const [authorValue, authorValueChange] = useState<string>('');
    const [footerValue, footerValueChange] = useState<string>('');
    const [opened, setOpened] = useState<boolean>(false)
    const [modalError, setModalError] = useState<string>('')

    // title 2-24
    // desc 16-128
    // body 50-5000
    // footer 10-30
    // author 2-16

    const verifyInput = () => {
        const x: any = titleValue;
        const y: any = shortDescValue;
        const z: any = authorValue;
        const c: any = value;
        const v: any = footerValue;

        const ctn = (title: string) => {
            showNotification({
                title: 'Whoops theres an error!',
                message: title,
                color: 'red'
            })
        }

        if (x.length > 24) {
            return ctn("Your Title is too long, 2-24 Limits!")
        } else if (x.length < 2) {
            return ctn("Your Title is too short, 2-24 Limits!")
        }

        if (y.length > 128) {
            return ctn("Your Short Description is too long, 16-128 Limits!")
        } else if (y.length < 16) {
            return ctn("Your Short Description is too short, 16-128 Limits!")
        }

        if (c.length > 5000) {
            return ctn("Your Main Content is too long, 50-5000 Limits!")
        } else if (c.length < 50) {
            return ctn("Your Main Content is too short, 50-5000 Limits!")
        }
        
        if (v.length > 30) {
            return ctn("Your Footer is too long, 10-30 Limits!")
        } else if (v.length < 10) {
            return ctn("Your Footer is too short, 10-30 Limits!")
        }

        if (z.length > 16) {
            return ctn("Your Name is too long, 2-16 Limits!")
        } else if (z.length < 2) {
            return ctn("Your Name is too short, 2-16 Limits!")
        }

        axios.post("http://localhost:8080/api/create",
            {
                Title: x,
                ShortDescription: y,
                Overview: c,
                Author: z,
                Footer: v,
                Date: Date.now()
            }
        ).then(res => {
            if (res.data.success) {
                window.location.href=`/blogs/${res.data.data.createdBlogID}`
            } else {
                setOpened(true)
                setModalError(res.data.data.message)
            }
        })
    }

    return (
        <div className="main" style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{ width: '75vw', marginTop: '3%' }}>
            <Stack align="stretch">
            <div style={{display: 'flex', justifyContent: 'center'}}><h2>Blog Creator</h2></div>
            <TextInput label="Your Blogs Title" placeholder="Blog Title (2-24 characters)" icon={<FileText size={14} />} size="md" required onChange={(event) => titleValueChange(event.currentTarget.value)}/>
            <TextInput label="Your Blogs short description" placeholder="Blog short description (16-128 characters)" icon={<FileText size={14} />} size="md" required onChange={(event) => shortDescValueChange(event.currentTarget.value)}/>
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
            />
            <TextInput label="What is your name?" placeholder="Your beautiful name here (2-16 characters)" icon={<FileText size={14} />} size="md" required onChange={(event) => authorValueChange(event.currentTarget.value)}/>
            </Stack>
            <Button style={{marginTop: '2.5%'}} variant="outline" color="green" onClick={verifyInput}>Publish</Button>
            <Button style={{marginTop: '2.5%', marginLeft: '2%'}} variant="outline" color="red" onClick={() => window.location.href="/"}>Cancel</Button>
            </div>
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

export default CreateBlogForm;