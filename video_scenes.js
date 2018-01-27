// This file use for store the mapping of the scene in the video Pano

import {
  asset,
} from 'react-vr';


export const video_scenes = {
  "entry":{
    src:asset("flight.mp4", {format: 'mp4', layout: 'SPHERE'}),
    navigations:[{
      toward: "sea",
      translate: [0.73,-0.15,0.66],
      rotation: [0,36,0]
    }]
  },
  "sea":{
    src:asset("sea.mp4", {format: 'mp4', layout: 'SPHERE'}),
    navigations:[{
      toward: "entry",
      translate:  [-0.4,0.05,-0.9],
      rotation: [0,0,0]
    }]
  }
};
