import { Grid, Checkbox, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Typography } from '@mui/material';
import useCategories from '../Hooks/useCategories';

interface Props {

}

const BasicSearch = ({}: Props) => {

    const categories = useCategories();

    return (

        <Grid container spacing={2} sx={{ pt: { xs: 15, sm: 25 }, pb: 15, backgroundColor: '#ffffff' }} justifyContent="center" color="black">

            <Grid item paddingBottom={7} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h2' sx={{ fontSize: { xs: '44px', sm: '54px' } }}>
                    Quick Search
                </Typography>
            </Grid>

            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl sx={{width: '90%'}}>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        id="category-select"
                        label="Category"
                        placeholder='Please select a category'
                        defaultValue=""
                    >
                        {
                            categories.map(category => (
                                <MenuItem value={category.cid} key={category.cid}>
                                {category.category_name}
                                </MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Sort by location"
                />
            </Grid>

            <Grid item xs={12} md={2} p={0} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" type="submit" sx={{ width: '70%' }}>Search</Button>
            </Grid>

        </Grid>

    );
};

export default BasicSearch;