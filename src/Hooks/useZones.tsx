import { useState, useEffect } from 'react';
import { utilsService } from '../Services/utilService';

interface Zone {
  id: number
  name: string
  coordinates: object
}

const useZones = () => {

  const [ zones, setZones ] = useState<Zone[]>([]);

  useEffect(() => {

    const { request , cancel } = utilsService.getZones();

    request
    .then(res => {
      setZones(res.data.data);
    })
    .catch(err => {
      console.log(err);
    });

    return () => { cancel(); };
  
  }, []);

  return zones;

};

export default useZones;
