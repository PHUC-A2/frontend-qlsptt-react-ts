import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router";

const Header = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to={"/"}>Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={"/news"}>News</Nav.Link>
                            <Nav.Link as={Link} to={"/feedback"}>Feedback</Nav.Link>
                            <Nav.Link as={Link} to={"/cart"}>Cart</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to={"/login"}>Sign in</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/register"}>Sign up</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/profile"}>Profile</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/admin"}>Dashboard</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;