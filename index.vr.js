'use strict';

/**
 * VideoSample360 displays a 360 video pano, along with a video control component.
 *
 * The video can be controlled by the video control component. To do this, a
 * MediaPlayerState is created and hooked to video and video control component.
 * See [MediaPlayerState](docs/mediaplayerstate.html)
 */

import React from 'react';
import {
  asset,
  AppRegistry,
  View,
  Sphere,
  Mesh,
  VrButton,
  Image,
  Text,
  VideoPano,
  VideoControl,
  Scene,
  MediaPlayerState,
} from 'react-vr';
import {video_scenes} from "./video_scenes";


class VideoSample360 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerState: new MediaPlayerState({autoPlay: true, muted: true}), // init with muted, autoPlay
      current_scene: "entry",   // the current scene
      // videoSrc:[asset('video.webm', {format: 'webm', layout: 'SPHERE'})]
    };
  }
// {
//     // onChangeVideo(e){
//     //   this.setState({videoSrc:[asset('video.mp4', {format: 'mp4', layout: 'SPHERE'})]})
//     // }
// }


  getNavagtionBtns(){
    let res=  video_scenes[this.state.current_scene].navigations.map((item, i )=>{
      return(
        <VrButton   key={i}
                style={{
                    layoutOrigin: [0.5, 0.5],
                    transform: [{translate: item.translate},
                                {rotateX: item.rotation[0]},
                                {rotateY: item.rotation[1]},
                                {rotateZ: item.rotation[2]}]
                }}
                onClick={ (e) =>{this.setState({current_scene: item.toward}); }}>

                <VrButton
                       style={{
                          width: 0.15,
                          height:0.15,
                          borderRadius: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderStyle: 'solid',
                          borderColor: '#FFFFFF80',
                          borderWidth: 0.01
                       }}>
                       <VrButton
                              style={{ width: 0.1,
                                     height:0.1,
                                     borderRadius: 50,
                                     backgroundColor: '#FFFFFFD9'
                              }}>
                       </VrButton>
                </VrButton>

        </VrButton>
      )
    });
    console.dir(res)
    return res;
  }

  render() {
    return (
      <View>
        <VideoPano
          playerState={this.state.playerState}
          source={video_scenes[this.state.current_scene].src}
        />

        {
          this.getNavagtionBtns()
        }
        <VideoControl
          style={{
            height: 0.2,
            width: 4,
            layoutOrigin: [0.5, 0.5, 0],
            transform: [{translate: [0, 0, -4]}],
          }}
          playerState={this.state.playerState}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('VideoSample360', () => VideoSample360);
