import { useState, useEffect } from 'react';
import { utilsService } from '../Services/utilService';

interface Availability {
  id: number
  name: string
}

const useAvailabilities = () => {

  const [ availabilities, setAvailabilities ] = useState<Availability[]>([]);

  useEffect(() => {

    const { request , cancel } = utilsService.getAvailability();

    request
    .then(res => {
      setAvailabilities(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });

    return () => { cancel(); };
  
  }, []);

  return availabilities;

};

export default useAvailabilities;
