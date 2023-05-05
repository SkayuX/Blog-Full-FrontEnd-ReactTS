import { Navbar, Nav, Container } from 'react-bootstrap'

const NavbarComponent = () => {
    
    return (
        <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="#home">Blog Page</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/blogs/create">Create</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}

export default NavbarComponent;