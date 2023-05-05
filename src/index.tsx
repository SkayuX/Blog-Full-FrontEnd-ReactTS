import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { MantineProvider, TypographyStylesProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications';
import NavbarComponent from './Components/NavbarComponent'
import App from './App';
import ViewBlog from './Blogs/ViewBlog'
import CreateBlogForm from './Blogs/CreateBlogForm'
import EditBlogForm from './Blogs/EditBlogForm'
import Page404 from './Page404'
import './root.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
<>
  <MantineProvider theme={{ colorScheme: 'dark' }}>
  <NotificationsProvider>
  <TypographyStylesProvider>
  <NavbarComponent />
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blogs/:BlogID" element={<ViewBlog />} />
      <Route path="/blogs/create" element={<CreateBlogForm />} />
      <Route path="/blogs/edit/:BlogID" element={<EditBlogForm />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  </BrowserRouter>
  </TypographyStylesProvider>
  </NotificationsProvider>
  </MantineProvider>
</>
);
