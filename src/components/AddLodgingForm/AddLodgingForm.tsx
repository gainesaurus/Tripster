import React, { useState, useEffect, useRef } from 'react';

import { GoogleMap, StandaloneSearchBox, useLoadScript } from '@react-google-maps/api';

import styles from './AddLodgingForm.module.css';

const mapContainerStyle = {
  height: "250px",
  width: "350px",
}
const libraries = ["places"] as any;

function AddLodgingForm ({ closeForm }: any) {
  const autoCompleteRef = useRef<any>();
  const [latLng, setLatLng] = useState<google.maps.LatLng>();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  })
  const mapOptions = {
    fullscreenControl: false,
    keyboardShortcuts: false,
  };

  const handlePlaceChanged = async () => {
    const [ place ] = autoCompleteRef.current.getPlaces();
    if(place) {
        console.log(place.formatted_address)
        console.log(place.geometry.location.lat())
        console.log(place.geometry.location.lng())
        console.log(place.url)
        console.log(place.place_id)
        console.log(place.reference)
        let lat = place.geometry.location.lat()
        let lng = place.geometry.location.lng()
        setLatLng({lat, lng} as google.maps.LatLng);
    }
  }

  return (
    <div className={styles.addEventContainer}>
      <div className={styles.infoContainer}>
        <h2>Share where you're staying!</h2>

        {
          isLoaded?
          <StandaloneSearchBox
            onLoad={ref => autoCompleteRef.current = ref}
            onPlacesChanged={handlePlaceChanged}
          >
            <input
              type="text"
              placeholder="Search for your place."
              className={styles.lodgingSearchInput}
            />
          </StandaloneSearchBox>
          : <></>
        }
      </div>
      {
        latLng?
        <div className={styles.mapDisplay} id='map-display'>
          {
            isLoaded?
            <GoogleMap
            zoom={16}
            center={latLng}
            mapContainerStyle={mapContainerStyle}
            options={mapOptions}
            >
            </GoogleMap>
            : <></>
          }
        </div>
        : <></>
      }
      <input
      className={styles.lodgingSearchInput}
      type='text-box'
      placeholder='anything else you want to share?'
      >

      </input>

      <div className={styles.buttonDiv}>
        <button className={styles.submitButton}>Submit</button>
        <button className={styles.cancelButton} onClick={closeForm}>Cancel</button>
      </div>
    </div>

  )
}

export default AddLodgingForm;