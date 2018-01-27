import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  View,
  AmbientLight,
} from 'react-vr';
import { reducer } from "./redux/reducer.js";
import { createStore, Provider } from "react-redux";
// import App from "./components/app";

// import { App } from "./components/app";

const store = createStore(reducer);

export default class PlanetPlutoVr extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
};

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

AppRegistry.registerComponent('PlanetPlutoVr', () => PlanetPlutoVr);
