import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Container, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import api from '../Common/Api';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const fetchPosts = async () => {
        try {
            const res = await api.listAllPost();
            setPosts(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line
    }, []);

    const handleCardClick = (post) => {
        setSelectedPost(post);
        setOpenDialog(true);
    };

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom align="center">
                All Blog Posts
            </Typography>

            {posts.length === 0 ? (
                <Typography variant="h6" align="center" color="textSecondary">
                    No blog posts available.
                </Typography>
            ) : (
                <Grid container spacing={4}>
                    {posts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post._id}>
                            <Card
                                style={{
                                    height: '240px',
                                    borderRadius: '12px',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                                }}
                                onClick={() => handleCardClick(post)}
                            >
                                <CardContent style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h5" component="h2" gutterBottom style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                                        {post.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        style={{
                                            flexGrow: 1,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: post.content.length > 200 ? '4' : 'none'
                                        }}
                                    >
                                        {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" style={{ marginTop: '1rem', fontStyle: 'italic', textAlign: 'right' }}>
                                        Author: {post.userId.fullName}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>{selectedPost?.title}</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">{selectedPost?.content}</Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: '1rem' }}>
                        Author: {selectedPost?.userId?.fullName}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Home;
