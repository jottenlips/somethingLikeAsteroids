import React from "react";
import {View} from "react-native";
import {AmbientLight, Pano, asset, AppRegistry} from "react-vr";


export class App extends React.Component {
    render() {
      return (
        <View>
          <AmbientLight intensity={ 2.6 }  />
          <Pano source={asset('chess-world.jpg')}/>
        </View>
      );
    }
}

