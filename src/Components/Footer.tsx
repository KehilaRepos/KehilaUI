import { Box, Container, Grid, Typography } from '@mui/material';
import logoImage from '../assets/images/logo.png';

const Footer = () => {
    return (
        <Box component="footer" sx={{ backgroundColor: '#222831', mt: 4, py: 3 }}>
            <Container maxWidth="lg">
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
                        <Box
                            component="img"
                            src={logoImage}
                            alt="Kehila Logo"
                            sx={{
                                height: 'auto',
                                width: '150px'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="white" gutterBottom>
                            Contact
                        </Typography>
                        <Typography variant="body2" color="white">
                            +972 526 797 218<br />
                            kehilacharity@gmail.com
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
