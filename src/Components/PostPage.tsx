import { useParams } from 'react-router-dom';
import { Box, Container, Grid, Typography, Paper, IconButton, Skeleton } from '@mui/material';
import { Facebook, Instagram, Twitter, Web } from '@mui/icons-material';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import usePost from '../Hooks/useSinglePost';

const PostPage = () => {
    const { postId } = useParams<{ postId?: string }>();
    const postIdNumber = postId ? parseInt(postId, 10) : null;
    const { post } = postIdNumber ? usePost(postIdNumber) : { post: null };

    return (
        <>
            {/* Full Width Image Container */}
            <Box sx={{ width: '100%', overflow: 'hidden' }}>
                {!post ? (
                    <Skeleton variant="rectangular" width="100%" height={300} />
                ) : (
                    <img src={post?.has_image ? `https://kehilaimagebucket.s3.amazonaws.com/${post.pid}` : ''} alt={post ? post.title : "Placeholder"} style={{ width: '100%', height: '700px' }} />
                )}
                <Typography variant="h3" sx={{ position: 'relative', bottom: 63, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 300 }}>
                    {!post ? <Skeleton width="40%" /> : post.title}
                </Typography>
            </Box>

            {/* Content Container */}
            <Container maxWidth="xl">
                <Grid container spacing={2} sx={{ marginTop: 2, display: 'flex' }}>
                    {/* Left Column: Description, Social Media, Contact Info */}
                    <Grid item xs={12} md={6} container spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={2} sx={{ padding: 2, minHeight: '340px' }}>
                                <Typography variant="h5">Description</Typography>
                                {!post ? <Skeleton width="80%" height={200} /> : <Typography>{post.description}</Typography>}
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={2} sx={{ padding: 2 }}>
                                <Typography variant="h5">Social Media</Typography>
                                <Box>
                                    {!post ? (
                                        <>
                                            <Skeleton variant="circular" width={40} height={40} />
                                            <Skeleton variant="circular" width={40} height={40} />
                                            <Skeleton variant="circular" width={40} height={40} />
                                        </>
                                    ) : (
                                        <>
                                            {post.facebook && <IconButton href={post.facebook} target="_blank" color="primary"><Facebook /></IconButton>}
                                            {post.instagram && <IconButton href={post.instagram} target="_blank" color="secondary"><Instagram /></IconButton>}
                                            {post.twitter && <IconButton href={post.twitter} target="_blank"><Twitter /></IconButton>}
                                            {post.website && <IconButton href={post.website} target="_blank"><Web /></IconButton>}
                                        </>
                                    )}
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={2} sx={{ padding: 2 }}>
                                <Typography variant="h5">Contact Information</Typography>
                                {!post ? (
                                    <Skeleton variant="text" width="80%" height={50} />
                                ) : (
                                    <>
                                        <Typography><strong>Email:</strong> {post.contact_email}</Typography>
                                        <Typography><strong>Name:</strong> {post.contact_name}</Typography>
                                        <Typography><strong>Phone:</strong> {post.contact_phone}</Typography>
                                    </>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Right Column: Map and Raw Details */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={2} sx={{ padding: 2 }}>
                            <Typography variant="h5">Map</Typography>
                            {!post ? (
                                <Skeleton variant="rectangular" width="100%" height={400} />
                            ) : (
                                <MapContainer center={[post.location.x, post.location.y]} zoom={14} style={{ height: 400 }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={[post.location.x, post.location.y]} />
                                </MapContainer>
                            )}
                        </Paper>
                        <Paper elevation={2} sx={{ mt: 2, padding: 2 }}>
                            <Typography variant="h5">Raw Details</Typography>
                            {!post ? (
                                <>
                                    <Skeleton variant="text" width="80%" height={30} />
                                    <Skeleton variant="text" width="80%" height={30} />
                                    <Skeleton variant="text" width="80%" height={30} />
                                </>
                            ) : (
                                <>
                                    <Typography><strong>Creation Time:</strong> {new Date(post.creation_time).toLocaleString()}</Typography>
                                    <Typography><strong>Expiration Time:</strong> {new Date(post.expiration_time).toLocaleString()}</Typography>
                                    <Typography><strong>Target:</strong> {post.target}</Typography>
                                </>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default PostPage;