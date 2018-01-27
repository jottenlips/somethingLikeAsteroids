import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Sphere,
  AmbientLight,
} from 'react-vr';



export default class PlanetPlutoVr extends React.Component {

  constructor() { super(); this.state = { rotation: 130, }; this.lastUpdate = Date.now(); this.rotate = this.rotate.bind(this); } 
  componentDidMount() { this.rotate(); } 
  componentWillUnmount() { if (this.frameHandle) { cancelAnimationFrame(this.frameHandle); this.frameHandle = null; } } 
  rotate() { const now = Date.now(); const delta = now - this.lastUpdate; this.lastUpdate = now; this.setState({ rotation: this.state.rotation + delta / 150 }); this.frameHandle = requestAnimationFrame(this.rotate); }

  render() {
    return (
      <View>
      <AmbientLight intensity={ 2.6 }  />

        <Pano source={asset('chess-world.jpg')}/>
        
        <Sphere style={{ position: 'absolute', transform: [{translate: [-2, -0.5, -2]}, {rotateY: this.state.rotation}],
               layoutOrigin: [0.0, 0.0], color:"slateblue"}}
      />
      <Sphere style={{ position: 'absolute', transform: [{translate: [5, -1, -10]}, {rotateY: this.state.rotation}],
               layoutOrigin: [0.5, 0.5],color: "slategray", }}
      />
      <Sphere style={{ position: 'absolute', transform: [{translate: [-3, 4, -5]}, {rotateY: this.state.rotation}],
               layoutOrigin: [0.0, 0.0], color: "thistle", }}
      />



      </View>

      
        

        
    );
  }
};

AppRegistry.registerComponent('PlanetPlutoVr', () => PlanetPlutoVr);
