import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios'
import './TripPage.css';
import { useParams } from "react-router-dom";
import { useAuthUser } from 'react-auth-kit';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const tkn = localStorage.getItem("token");

const MapContainer = (props) => {
    const {id} = useParams();
    const mapRef = useRef(null);
    const [Datadest, setDatadest] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);

    const headers = {
      Authorization: `Bearer ${tkn}`,
    };

    useEffect(() => {
      axios
        .get(`http://127.0.0.1:3000/api/v1/destinationstrips/${id}`, { headers })
        .then((response) => {
          const extractedData = response.data.map((destination) => ({
            lat: destination.latitude,
            lng: destination.longitude,
          }));
          setDatadest(extractedData);
        })
        .catch((error) => {
          console.error('Error al crear el destino:', error);
        });
    }, [id]);

    console.log(Datadest)

    const handleMarkerClick = (markerName, destination) => {
      // Perform actions when a marker is clicked
      console.log(`Marker ${markerName} was clicked.`);
      console.log('Destination information:', destination);

      // // You can also set selectedMarker and selectedDestination states here if needed
      setSelectedMarker(markerName);
      setSelectedDestination(destination);
    };

    return (
      <div className='map-trip'>
        <Map
          google={props.google}
          ref={mapRef}
          zoom={3}
          initialCenter={{ lat: 0, lng: 0 }}
        >
          {Datadest.map((d, index)=>(
            <Marker
              key={index}
              name={`Mi Marcador ${index+1}`}
              position={{ lat: d.lat, lng: d.lng }}
              onClick={() => handleMarkerClick(`Mi Marcador ${index + 1}`, d)}
            />
            ))}

          {selectedMarker && selectedDestination && (
            <InfoWindow
            marker={selectedMarker}
            position={selectedDestination}
            visible={true}
            >
              <div>
              <h3>{selectedMarker}</h3>
              <p>Destination Information:</p>
              <p>Latitude: {selectedDestination.lat}</p>
              <p>Longitude: {selectedDestination.lng}</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    );

}


export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY
})(MapContainer);
