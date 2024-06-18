import Grid from '@mui/material/Grid'
import PostCard from './PostCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import usePost from '../Hooks/usePost';
import { Typography } from '@mui/material';

export const PopularPosts = () => {

    const posts = usePost();

  return (

        <Grid container spacing={0} sx={{ p: {xs: 5, sm: 10}, pt: { xs: 5, sm: 20 } }} justifyContent="center" alignItems="center">

            <Grid item paddingBottom={7}>
                <Typography variant='h2' sx={{ fontSize: { xs: '44px', sm: '54px' } }}>
                    Popular Posts
                </Typography>
            </Grid>

            <Swiper spaceBetween={30} slidesPerView={2}  modules={[]} loop
                breakpoints={{
                    // window width >= 0px
                    0: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    // window width >= 768px
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 40,
                    },
                    // window width >= 1024px
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 50,
                    },
                  }}>

                {
                    posts.map((post, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <PostCard post={post} />
                            </SwiperSlide>
                        );
                    })
                }


            </Swiper>
        </Grid>

  )
}
