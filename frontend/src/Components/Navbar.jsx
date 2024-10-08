import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ Auth, setAuth }) => {
    const navigate = useNavigate();
    const location = useLocation(); // Get current location

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('token');
        navigate("/signup");
    };

    // Check if a given route is the current route
    const isActive = (path) => location.pathname === path;

    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        My Blog App
                    </Typography>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                        style={{
                            borderBottom: isActive('/') ? '2px solid #fff' : 'none', // Add underline if active
                        }}
                    >
                        Home
                    </Button>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/your-blogs"
                        style={{
                            borderBottom: isActive('/your-blogs') ? '2px solid #fff' : 'none',
                        }}
                    >
                        Your Blogs
                    </Button>

                    {Auth && Auth._id ? (
                        <Button
                            color="inherit"
                            onClick={logout}
                            style={{
                                borderBottom: isActive('/logout') ? '2px solid #fff' : 'none',
                            }}
                        >
                            Sign Out
                        </Button>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/signin"
                                style={{
                                    borderBottom: isActive('/signin') ? '2px solid #fff' : 'none',
                                }}
                            >
                                Sign In
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/signup"
                                style={{
                                    borderBottom: isActive('/signup') ? '2px solid #fff' : 'none',
                                }}
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
