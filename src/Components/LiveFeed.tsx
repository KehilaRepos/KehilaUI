import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import usePostByLocation from '../Hooks/usePostByLocation';
import PostCard from './PostCard';

export const LiveFeed = () => {

    const position: L.LatLngExpression = [ 32.070538, 34.779969 ];
    const postsByLocation = usePostByLocation( position[0], position[1], 300, 500 );

    console.log(postsByLocation);

  return (
    <Container maxWidth={'xl'}>
      <Grid container spacing={2} sx={{ p: { xs: 5, sm: 10 }, pt: { xs: 5, sm: 20 } }} justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ paddingBottom: 7, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h2' sx={{ fontSize: { xs: '44px', sm: '54px' } }}>
            Live Feed
          </Typography>
        </Grid>

        <Grid item xs={12} spacing={2} sm={5} maxHeight={"750px"} overflow={"scroll"}>
            
            {
                postsByLocation.map((post) => {
                    return (
                        <>
                            <PostCard post={post} type='livefeed' />
                            <br />
                        </>
                    );
                })
            }

        </Grid>

        <Grid item xs={12} sm={7}>

          <MapContainer center={position} zoom={9} scrollWheelZoom={false} style={{ height: '750px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {
                postsByLocation.map((post) => {

                    const location: L.LatLngExpression = [ post.location.x, post.location.y ];

                    return (
                        <Marker position={location}>
                            <Popup>
                                {post.title}
                            </Popup>
                        </Marker>
                    )
                })
            }

          </MapContainer>

        </Grid>

      </Grid>
    </Container>
  );
}
