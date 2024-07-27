import React, { useEffect, useRef, useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Autocomplete } from '@mui/material';
import useCategories from '../Hooks/useCategories';
import autoCompleteService from '../Services/autoCompleteService';
import loginService from '../Services/loginService';
import { postService } from '../Services/postsService';

const CreatePost: React.FC = () => {

    const [categoryId, setCategoryId] = useState<number>(0);

    const handleChangeCategory = (event: SelectChangeEvent<number>): void => {
        setCategoryId(Number(event.target.value));
    };

    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState<{ lat: number, lng: number }>({ lat: 0, lng: 0 });
    const [options, setOptions] = useState<any[]>([]);
    const [file, setFile] = useState<File | null>(null);

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (inputValue) {
            const fetchOptions = async () => {
                try {
                    const { request } = autoCompleteService.requestResults(inputValue);
                    const response = await request;
                    setOptions(response.data);
                } catch (error) {
                    console.error('Error fetching autocomplete suggestions:', error);
                    setOptions([]);
                }
            };

            fetchOptions();
        } else {
            setOptions([]);
        }
    }, [inputValue]);

    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, value: string) => {
        setInputValue(value);
        console.log(value);
    };

    const handleOptionSelected = (event: React.SyntheticEvent<Element, Event>, value: any | null) => {
        if (value) {
            setAddress(value.display_name || '');
            setCoordinates({ lat: value.lat, lng: value.lon });
        }
        else {
            setAddress('');
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files ? event.target.files[0] : null);
    };

    // Initialize refs for form inputs
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const expirationTimeRef = useRef<HTMLInputElement>(null);
    const targetRef = useRef<HTMLInputElement>(null);
    const contactEmailRef = useRef<HTMLInputElement>(null);
    const contactPhoneRef = useRef<HTMLInputElement>(null);
    const contactNameRef = useRef<HTMLInputElement>(null);
    const facebookRef = useRef<HTMLInputElement>(null);
    const instagramRef = useRef<HTMLInputElement>(null);
    const twitterRef = useRef<HTMLInputElement>(null);
    const websiteRef = useRef<HTMLInputElement>(null);
  
    // Function to handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {

      event.preventDefault();

      const formData = new FormData();
      formData.append('cid', String(categoryId));
      formData.append('title', titleRef.current?.value || '');
      formData.append('description', descriptionRef.current?.value || '');
      formData.append('lat', coordinates.lat.toString());
      formData.append('lng', coordinates.lat.toString());
      formData.append('expiration_time', expirationTimeRef.current?.value || '');
      formData.append('target', targetRef.current?.value || '0');
      formData.append('contact_email', contactEmailRef.current?.value || '');
      formData.append('contact_phone', contactPhoneRef.current?.value || '');
      formData.append('facebook', facebookRef.current?.value || '');
      formData.append('instagram', instagramRef.current?.value || '');
      formData.append('twitter', twitterRef.current?.value || '');
      formData.append('website', websiteRef.current?.value || '');
      formData.append('contact_name', contactNameRef.current?.value || '');
      formData.append( 'user_email', loginService.getLoggedInUserEmail() );
      if (file) {
          formData.append('file', file);
      }

      const { request } = postService.createPost( formData );

      request
        .then(res => {
          console.log(res.data);
          if(res.data.success) {
            console.log("success");
          }
          else {
            console.log("fail");
          }
        })
        .catch(err => {
          console.log(err);
        });

    };

    const categories = useCategories();
  
    return (
      <Container maxWidth="md">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ pb: 7, mt: 7, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h2' sx={{ fontSize: { xs: '44px', sm: '54px' } }}>
                    Create New Post
                </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="category-select-label">Category</InputLabel>
                        <Select
                            labelId="category-select-label"
                            onChange={handleChangeCategory}
                            id="category-select"
                            label="Category"
                            placeholder='Please select a category'
                            required
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
                <Grid item xs={12}>
                    <TextField fullWidth label="Title" inputRef={titleRef} required  />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Description" multiline rows={4} inputRef={descriptionRef} required  />
                </Grid>
                <Grid item xs={6}>
                <Autocomplete
                            freeSolo
                            value={address}
                            inputValue={inputValue}
                            onInputChange={handleInputChange}
                            onChange={handleOptionSelected}
                            options={options.map(option => ({
                                label: option.display_name,
                                lat: option.lat,
                                lon: option.lon
                            }))}
                            renderInput={(params) => (
                                <TextField {...params} label="Address" fullWidth />
                            )}
                        />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Expiration Time" type="datetime-local" InputLabelProps={{ shrink: true }} inputRef={expirationTimeRef} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Target" inputRef={targetRef} type="number" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Contact Email" type="email" inputRef={contactEmailRef} required  />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Contact Phone" inputRef={contactPhoneRef} required  />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Contact Name" inputRef={contactNameRef} required  />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Facebook" inputRef={facebookRef} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Instagram" inputRef={instagramRef} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Twitter" inputRef={twitterRef} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Website" inputRef={websiteRef} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="file"
                        onChange={handleFileChange}
                        fullWidth
                        inputProps={{ accept: 'image/*' }}
                    />
                </Grid>
                <Grid item xs={12} sx={{pb: 7}}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                </Grid>
                <a href='https://locationiq.com'>Search by LocationIQ.com</a>
            </Grid>
        </Box>
      </Container>
    );
  };
  
  export default CreatePost;
  