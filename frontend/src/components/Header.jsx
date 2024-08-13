import React from 'react';
import { Nav, Navbar, Container, NavDropdown, Badge} from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom'; 
import logo from '../assets/logo.png';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { clearCartItems } from '../slices/cartSlice';
import SearchBox from './SearchBox';

const Header = () => {
  const { cartItems = []} = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ logoutApiCall ] = useLogoutMutation();
  const logoutHandler = async()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(clearCartItems());
      navigate('/login');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="ProShop" /> ProShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <SearchBox />
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && ( 
                <NavDropdown title = 'Admin' id = 'adminmenu'>
                  <LinkContainer to='admin/orderList'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='admin/userList'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='admin/productList'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
