// @ts-nocheck
import { Autocomplete, Box, SelectChangeEvent, TextField, Typography } from '@mui/material'
import Divider from '@mui/material/Divider';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';import React, { useEffect, useState } from 'react'
import useCategories from '../Hooks/useCategories';
import useFilteredPosts from '../Hooks/useFilteredPosts';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PostCard from './PostCard';
import autoCompleteService from '../Services/autoCompleteService';
import { useLocation } from 'react-router-dom';
import L from 'leaflet';
import iconMarker from '../assets/images/mapmarker.png';

function Explore() {

    const categories = useCategories();
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState<{ lat: number, lng: number }>({ lat: 32.04759003002006, lng: 34.76083803170386 });
    const [radius, setRadius] = useState(10);
    const [options, setOptions] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState('');
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const cid = queryParams.get('cid');
        if (cid) {
            setSelectedCategoryId(parseInt(cid));
        }
    }, []);

    const buildQuery = () => {

        const queryParams = {};

        if(coordinates.lat !== 0 || coordinates.lng !== 0) {
            Object.assign(queryParams, {lat: coordinates.lat});
            Object.assign(queryParams, {lng: coordinates.lng});
        }

        if(radius !== null && radius != undefined && !Number.isNaN(radius)) {
            Object.assign(queryParams, {radius});
        }

        if(selectedCategoryId !== null && selectedCategoryId != undefined) {
            Object.assign(queryParams, {cid: selectedCategoryId});
        }

        return new URLSearchParams(queryParams).toString();

    }

    const queries = buildQuery();
    const posts = useFilteredPosts(`?${queries}`);

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
      const categoryId = event.target.value;
      setSelectedCategoryId(parseInt(categoryId));
    }

    const customIcon = new L.Icon({
        iconUrl: iconMarker,
        iconSize: [40, 40],
    });

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
        console.log(event);
        setInputValue(value);
    };

    const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadius(parseInt(event.target.value));
    };

    const handleOptionSelected = (event: React.SyntheticEvent<Element, Event>, value: any | null) => {
        console.log(event);
        if (value) {
            setAddress(value.display_name || '');
            setCoordinates({ lat: value.lat, lng: value.lon });
            console.log(coordinates);
        }
        else {
            setAddress('');
        }
    };

  return (

    <Box sx={{display: 'flex', height: '100vh'}} className={'explore-section'}>

        <Box flex={1.2} sx={{ backgroundColor: '#fff' }} className={'explore-inputs'}>

            <Box marginTop={4} sx={{display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Box>
                    <Typography variant='h4'>
                        Explore posts
                    </Typography>
                    <Typography variant='h6' marginTop={1} textAlign={'center'}>
                        let's explore!
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{marginTop: 5}}></Divider>

            <Box marginTop={3} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', flexShrink: 0 }}>

                <Box flex={0.8}>
                  <FormControl fullWidth>
                      <InputLabel id="category-select-label">Category</InputLabel>
                      <Select
                          labelId="category-select-label"
                          label="Filter By Category"
                          placeholder='Please select a category'
                          onChange={handleCategoryChange}
                          value={selectedCategoryId.toString()}
                      >
                        { /* Placeholder Category */}
                        <MenuItem value={0} key={0}>
                            Show All Categories
                        </MenuItem>
                        {
                            categories.map(category => (
                                <MenuItem value={category.cid} key={category.cid}>
                                {category.category_name}
                                </MenuItem>
                            ))
                        }

                      </Select>
                  </FormControl>
                </Box>

            </Box>

            <Divider sx={{marginTop: 5}}></Divider>

            <Box marginTop={3} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', flexShrink: 0, }}>
                <Autocomplete
                    sx={{flex: '0.6'}}
                    fullWidth
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
                        <TextField {...params} label="Filter By Location" />
                    )}
                />
                 <TextField
                    sx={{flex: '0.2'}}
                    label="km"
                    onChange={handleRadiusChange}
                    defaultValue={10}
                 />
            </Box>

        </Box>

        <Box flex={1.5} sx={{ boxShadow: '2px 0px 4px rgba(0,0,0, 0.705)', overflow: 'scroll', padding: '15px', backgroundColor: '#fafafa'}} className={'explore-cards'} >
        {
                posts?.map((post) => {
                    return (
                        <>
                            <PostCard post={post} />
                            <br />
                        </>
                    );
                })
            }
        </Box>

        <Box flex={3} sx={{boxShadow: '0px 0px 4px rgba(0,0,0, 0.505)'}}>
            <MapContainer center={coordinates} zoom={9} style={{ height: '100%', width: '100%' }} className={'explore-map'}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {
                    posts.map(post => {
                        return (
                            <Marker icon={customIcon} position={[post.location.x, post.location.y]}>
                                <Popup>
                                    <a href={`/post/${post.pid}`}>{post.title}</a>
                                </Popup>
                            </Marker>
                        );
                    })
                }
            </MapContainer>
        </Box>

    </Box>
  )
}

export default Explore