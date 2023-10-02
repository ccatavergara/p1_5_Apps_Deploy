import React, { useState, useEffect, useRef } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import "./MapModule.css"
import axios from 'axios'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel  } from '@mui/material';
import { click } from '@testing-library/user-event/dist/click';
import {useAuthUser} from 'react-auth-kit';

const tkn = localStorage.getItem("token");

function MapModule(props) {
  const [userLocation, setUserLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');
  const mapReference = useRef(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [destid, setdestid] = useState('');
  
  const auth = useAuthUser();
  let email = auth().email;

  const GET_DATA_TRIP = gql`
  query {
  user(email: "${email}") {
      trips {
        id
        name
      }
    }
  }`;

  const { loading, error, data } = useQuery(GET_DATA_TRIP);

  console.log(data)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({
            lat: latitude,
            lng: longitude,
          });
        },
        (error) => {
          console.error('Error obteniendo la ubicación:', error);
        }
      );
    } else {
      console.error('La geolocalización no es soportada por este navegador.');
    }
  }, []);

  const handleSearchLocation = () => {
    const apiKey = process.env.REACT_APP_API_KEY;

    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${apiKey}`)
      .then((response) => {
        const results = response.data.results;

        if (results.length > 0) {
          const { lat, lng,formatted_address } = results[0].geometry.location;
          setUserLocation({
            lat,
            lng,
          });

          const newLocation = {
            lat,
            lng,
          };
          mapReference.current.map.setCenter(newLocation);

          let country = '';
          let city = '';

          for (const component of results[0].address_components) {
            if (component.types.includes('country')) {
              country = component.long_name;
            }
            if (component.types.includes('locality')) {
              city = component.long_name;
            }
          }

          const SaveDestination = {
            country: country || 'default', 
            city: city || 'default',     
            latitude: lat,
            longitude: lng,
            name: formatted_address || 'default', 
          }

          AddDestination(SaveDestination, tkn)

        } else {
          console.error('No se encontraron resultados para la ubicación ingresada.');
        }
      })
      .catch((error) => {
        console.error('Error al buscar la ubicación:', error);
      });
  };

  const AddDestination = (destinationData, token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    axios.post('http://127.0.0.1:3000/api/v1/destinations', destinationData, { headers })
      .then((response) => {
        console.log('Destino creado exitosamente:', response.data);
        console.log('ID', response.data.id  );
        setdestid(response.data.id);

      })
      .catch((error) => {
        console.error('Error al crear el destino:', error);
      });
  };

  const AddDestinationToTrip = (tripId, token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

      const associationData = {
        destination_id: destid,
        trip_id: tripId,
      };

      console.log(associationData)
    
      axios.post('http://127.0.0.1:3000/api/v1/trip_destinations', associationData, {headers})
        .then((response) => {
          console.log('Asociación creada exitosamente:', response.data);
        })
        .catch((error) => {
          console.error('Error al crear la asociación:', error);
        });
  };

  const handleInputChange = (event) => {
    setSearchLocation(event.target.value);
  };

  if (!userLocation) {
    return <div>Cargando la ubicación actual...</div>;
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleButtonClick = () => {
    console.log("opcion elegida", selectedOption)
    AddDestinationToTrip(selectedOption, tkn)

  };

  return (
    <div className="map">
      <Map google={props.google} zoom={14} initialCenter={userLocation} ref={mapReference}>
        {userLocation && <Marker position={userLocation} />}
      </Map>

      <div className="search-map">
        <div>
          <TextField
            variant="outlined"
            label="Buscar ubicación..."
            value={searchLocation}
            onChange={(e) => handleInputChange(e)}
            sx={{ backgroundColor: 'white' }}
          />
        </div>
        <div className="button-search">
          <Button variant="contained" onClick={() => handleSearchLocation()}>
            Buscar
          </Button>
        </div>
      </div>
      <div className='find-trip'>
        <div>
          <FormControl>
            <InputLabel htmlFor="select">Selecciona una opción</InputLabel>
            <Select
              labelId="select"
              id="select"
              open={isOpen}
              onClose={() => setIsOpen(false)}
              onOpen={() => setIsOpen(true)}
              value={selectedOption}
              onChange={handleOptionChange}
              style={{ backgroundColor: 'white', fontSize: '14px' }}
              MenuProps={{
                style: { maxHeight: '200px' },
              }}
            >
              <MenuItem value="">
                <em>Elegir Trip</em>
              </MenuItem>
              {data?.user?.trips.map((trip) => (
                <MenuItem key={trip.id} value={trip.id}>{trip.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Button variant="contained" onClick={handleButtonClick}>
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
}
  
  
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY 
})(MapModule);
