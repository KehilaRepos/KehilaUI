import { useRef } from 'react';
import { Grid, Button, FormControl, InputLabel, Select, MenuItem, Typography, TextField } from '@mui/material';
import useCategories from '../Hooks/useCategories';
import useZones from '../Hooks/useZones';
import useAvailabilities from '../Hooks/useAvailability';
import { utilsService } from '../Services/utilService'

interface Props {

}

const NewsLetter = ({}: Props) => {

    const fullNameRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const zoneRef = useRef<HTMLSelectElement>(null);
    const availabilityRef = useRef<HTMLSelectElement>(null);

    const categories = useCategories();
    const zones = useZones();
    const availabilities = useAvailabilities();

    const handleSubmit = () => {

        const formData = {
            full_name: fullNameRef.current?.value ?? '',
            phone: phoneNumberRef.current?.value ?? '',
            cid: categoryRef.current?.value ?? '',
            charity_zone: zoneRef.current?.value ?? '',
            availability: availabilityRef.current?.value ?? ''
        };

        const { request } = utilsService.signToNewsletter(formData);

        request
        .then(req => {
            console.log(req);
        })
        .catch(err => {
            console.log(err);
        });

    };
    
    return (

        <Grid container spacing={3} flexDirection={"column"} sx={{ pt: 5, pb: 15, backgroundColor: '#ffffff' }} justifyContent="center" alignItems="center" color="black">

            <Grid item padding={7} paddingBottom={7} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h2'>
                    Newsletter
                </Typography>
            </Grid>

            <Grid item xs={12} sx={{ width: '35%' }}>
                <TextField fullWidth
                id='nl-full-name'
                label="Full name"
                variant="outlined"
                inputRef={fullNameRef}
                />
            </Grid>

            <Grid item xs={12} sx={{ width: '35%' }}>
                <TextField fullWidth
                id='nl-phone'
                label="Phone Number"
                variant="outlined"
                inputRef={phoneNumberRef}
                />
            </Grid>

            <Grid item xs={12} sx={{ width: '35%' }}>
                <FormControl fullWidth>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        inputRef={categoryRef}
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
            <Grid item xs={12} sx={{ width: '35%' }}>
                <FormControl fullWidth>
                    <InputLabel id="zone-select-label">Zone</InputLabel>
                    <Select
                        inputRef={zoneRef}
                        labelId="zone-select-label"
                        id="zone-select"
                        label="Zone"
                        placeholder='Please select a zone'
                        defaultValue=""
                    >
                        {
                            zones.map(zone => (
                                <MenuItem value={zone.id} key={zone.id}>
                                {zone.name}
                                </MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ width: '35%' }}>
                <FormControl fullWidth>
                    <InputLabel id="availability-select-label">Availability</InputLabel>
                    <Select
                        inputRef={availabilityRef}
                        labelId="availability-select-label"
                        id="availability-select"
                        label="Availability"
                        placeholder='Please select a availability'
                        defaultValue=""
                    >
                        {
                            availabilities.map(availability => (
                                <MenuItem value={availability.id} key={availability.id}>
                                {availability.name}
                                </MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>
            </Grid>
           
            <Grid item xs={12} p={0} sx={{ width: '35%' }}>
                <Button variant="contained" onClick={handleSubmit} type="submit" sx={{height: "44px", backgroundColor: '#24507d'}} fullWidth>Sign me up!</Button>
            </Grid>

        </Grid>

    );
};

export default NewsLetter;