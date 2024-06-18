import { useRef, useState } from 'react';
import { Grid, Button, FormControl, InputLabel, Select, MenuItem, Typography, TextField } from '@mui/material';
import useCategories from '../Hooks/useCategories';
import useZones from '../Hooks/useZones';
import useAvailabilities from '../Hooks/useAvailability';
import { utilsService } from '../Services/utilService'
import TransitionAlert from './Alert';

interface Props {

}

const NewsLetter = ({}: Props) => {

    const [ successAlert, setSuccessAlert ] = useState<boolean>(false);
    const [ errorAlert, setErrorAlert ] = useState<boolean>(false);


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
            if(req.data.success) {
                setSuccessAlert(true);
            }
            else {
                setErrorAlert(true);
            }
        })
        .catch(err => {
            console.log(err);
        });

    };
    
    return (

        <Grid container spacing={3} flexDirection={"column"} sx={{ pt: { xs: 0, sm: 25 }, pb: { xs: 10, sm: 25 }, backgroundColor: '#ffffff' }} justifyContent="center" alignItems="center" color="black">

            <Grid item paddingBottom={7} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h2' sx={{
                    fontWeight: '300', // Lighter font-weight
                    letterSpacing: 1, // Spacing between letters
                    fontSize: { xs: '44px', sm: '54px' },
                }}>
                    Newsletter
                </Typography>
            </Grid>

            <Grid item xs={12} sx={{ width: { xs: '90%', sm: '35%' } }}>
                <TextField fullWidth
                id='nl-full-name'
                label="Full name"
                variant="outlined"
                inputRef={fullNameRef}
                />
            </Grid>

            <Grid item xs={12} sx={{ width: { xs: '90%', sm: '35%' } }}>
                <TextField fullWidth
                id='nl-phone'
                label="Phone Number"
                variant="outlined"
                inputRef={phoneNumberRef}
                />
            </Grid>

            <Grid item xs={12} sx={{ width: { xs: '90%', sm: '35%' } }}>
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
            <Grid item xs={12} sx={{ width: { xs: '90%', sm: '35%' } }}>
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

            <Grid item xs={12} sx={{ width: { xs: '90%', sm: '35%' } }}>
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
           
            <Grid item xs={12} p={0} sx={{ width: { xs: '90%', sm: '35%' } }}>
                <Button variant="contained" onClick={handleSubmit} type="submit" sx={{height: "44px", backgroundColor: '#24507d'}} fullWidth>Sign me up!</Button>
            </Grid>

            <Grid item xs={12} p={0}  sx={{ width: { xs: '90%', sm: '35%' } }}>
                <TransitionAlert key="successNewsLetter" textContent={'Thank you for registering to our volunteering program!'} open={successAlert} alertType={'success'} setOpen={setSuccessAlert} />
            </Grid>

            <Grid item xs={12} p={0}  sx={{ width: { xs: '90%', sm: '35%' } }}>
                <TransitionAlert key="errorNewsLetter" textContent={'An error occurred when trying to register to the newsletter. Please try again later!'} open={errorAlert} alertType={'error'} setOpen={setErrorAlert} />
            </Grid>

        </Grid>

    );
};

export default NewsLetter;