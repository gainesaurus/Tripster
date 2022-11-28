import React from 'react';

import { PhotoAlbum } from 'react-photo-album';


export default function Photos() {
  //MOCK DATA
  let photos = [
    {
      src: 'https://res.cloudinary.com/enchanting/q_70,f_auto,c_fit,dpr_2,w_700,h_400/exodus-web/2022/09/Landing-page-walking.jpg',
      width: 15,
      height: 10,
    },
    {
      src: 'https://res.cloudinary.com/enchanting/q_70,f_auto,c_fit,dpr_2,w_700,h_400/exodus-web/2022/09/Landing-page-walking.jpg',
      width: 15,
      height: 10,
    }
  ];

  return (
    <div>
      <h1>Photos</h1>
      <PhotoAlbum layout='rows' photos={photos}/>
    </div>
  )
}


