import React from 'react';
import {
  AppRegistry,
  VrHeadModel,
} from 'react-vr';

import App from "./containers/app-container";

import { reducer } from "./redux/reducer.js";
import { createStore } from "redux";
import { Provider } from "react-redux";

import socketIOClient from "socket.io-client";

const store = createStore(reducer);

const endpoint = process.env.SERVER_ENDPOINT;

export default class PlanetPlutoVr extends React.Component {

    render() {

        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
};

AppRegistry.registerComponent('PlanetPlutoVr', () => PlanetPlutoVr);
