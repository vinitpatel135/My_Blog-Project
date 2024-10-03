import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    Container,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import api from '../Common/Api';
import { useNavigate } from 'react-router-dom';

const YourBlogs = ({ Auth }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState({ title: '', content: '' });
    const [isEditMode, setIsEditMode] = useState(false);
    const [postIdToEdit, setPostIdToEdit] = useState(null);
    const navigate = useNavigate()

    const fetchYourPosts = async () => {
        try {
            const res = await api.listUserPost(Auth?._id)
            setPosts(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };
    useEffect(() => {
        if(!Auth && !Auth?._id){
            navigate("/signup")
        }

        fetchYourPosts();
        // eslint-disable-next-line
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.deletePost(id)
            setPosts(posts.filter((post) => post._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleOpen = (post = { title: '', content: '' }, isEdit = false) => {
        setCurrentPost(post);
        setIsEditMode(isEdit);
        setPostIdToEdit(isEdit ? post._id : null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentPost({ title: '', content: '' });
        setIsEditMode(false);
    };

    const handleSave = async () => {
        try {
            if (isEditMode) {
                await api.editPost(postIdToEdit, currentPost)
                setPosts(posts.map((post) => (post._id === postIdToEdit ? currentPost : post)));
                fetchYourPosts()
            } else {
                await api.addPost({ ...currentPost, userId: Auth?._id })
                fetchYourPosts()
            }
            handleClose();
        } catch (err) {
            console.error(err);
        }
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
                Your Blog Posts
            </Typography>
            <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: '1.5rem' }}
                onClick={() => handleOpen()}
            >
                Add New Post
            </Button>
            <Grid container spacing={4}>
                {posts?.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post?._id}>
                        <Card style={{ height: '240px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <CardContent style={{ flexGrow: 1 }}>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {post?.title}
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
                            </CardContent>

                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleOpen(post, true)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleDelete(post?._id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </Card>

                    </Grid>
                ))}
            </Grid>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>{isEditMode ? 'Edit Post' : 'Add New Post'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        name="title"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={currentPost.title}
                        onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                    />
                    <TextField
                        label="Content"
                        name="content"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={6}
                        value={currentPost.content}
                        onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" variant="contained">
                        {isEditMode ? 'Update' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default YourBlogs;