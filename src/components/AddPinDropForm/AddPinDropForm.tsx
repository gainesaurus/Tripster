import React, { useState, useRef } from 'react';

import { Loader } from '@googlemaps/js-api-loader';
import styles from './AddPinDropForm.module.css';
import { Close } from '@mui/icons-material';
import { ILocation } from '../../../Types';
import { ILatLng } from '../../../Types';
import { useRouter } from 'next/router';
import { createLocation } from '../../services/locationService';
import { useUserContext } from '../../Contexts/UserContext';


const libraries = ["places"] as any;

interface AddPinDropProps {
  closeForm: () => void
  setAllLocations: (arg:ILocation[]) => void
  allLocations: ILocation[]
}
function AddPinDropForm ({closeForm, setAllLocations, allLocations}:AddPinDropProps) {
  const inputRef = useRef() as React.RefObject<HTMLInputElement>;
  const autoCompleteRef = useRef() as any;
  const [info, setInfo] = useState<string>();
  const [latLng, setLatLng] = useState<ILatLng>();

  const router = useRouter()
  const tripId = router.query.id;
  const user = useUserContext();

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    version: "weekly",
    libraries: libraries
  });

  loader.load()
  .then(()=> {
    autoCompleteRef.current = new google.maps.places.Autocomplete(
      inputRef.current as HTMLInputElement, {
        fields: ["address_components", "geometry", "icon", "name"]
      }
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      console.log({ place });
      let lat = place.geometry.location.lat()
      let lng = place.geometry.location.lng()
      setLatLng({lat, lng});
    });
    if (latLng) {
      let map = new google.maps.Map(document.getElementById('map-display') as HTMLElement, {
        center: latLng,
        zoom: 13
      })
      let marker = new google.maps.Marker({
        position: latLng,
        map: map,
      })

      google.maps.event.addListener(map, 'click', function(event:any) {
          placeMarker(event.latLng)
      });

      const placeMarker = (location: ILatLng) => {
        if(marker) {
          marker.setMap(null);
          marker = new google.maps.Marker({
            position: location,
            map: map
          })
          setLatLng(location)
        }
      }
    }
  })

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    const location = {
      tripId: tripId as string,
      info: info as string,
      latLng: latLng as ILatLng,
      // profile_pic: user.
    }
    user.authUser && location && createLocation(user.authUser.token, location).then((location:ILocation | void) => {setAllLocations([...allLocations, location] as ILocation[])})
    console.log(location);

    setInfo('');
    setLatLng(undefined);
    closeForm();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <div className={styles.addPinDropContainer}>
      <button className={styles.XButton} onClick={closeForm}><Close /></button>
      <form onSubmit={handleSubmit} className={styles.infoContainer}>
        <div>
          <h2>Share a location!</h2>
          <input
            placeholder="Add some info..."
            className={styles.locationSearchInput}
            value={info}
            onChange={(e)=>setInfo(e.target.value)}
            ></input>

            <input
            id='search-place'
            ref={inputRef}
            type="text"
            placeholder="Where is it?"
            className={styles.locationSearchInput}
            ></input>

        </div>
        {
          latLng?
          <div className={styles.mapDisplay} id='map-display'>
          </div>
          : <></>
        }
        <div className={styles.buttonDiv}>
          <button
            type='submit'
            className={styles.submitButton}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
export default AddPinDropForm;
