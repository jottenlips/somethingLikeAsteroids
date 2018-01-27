import React from 'react';
import {
  AppRegistry,
} from 'react-vr';

import App from "./app/app";

import { reducer } from "./redux/reducer.js";


import { createStore, Provider } from "react-redux";

// const store = createStore(reducer);

export default class PlanetPlutoVr extends React.Component {

    render() {
        return (
            <App/>
        )
    }
};

AppRegistry.registerComponent('PlanetPlutoVr', () => PlanetPlutoVr);
