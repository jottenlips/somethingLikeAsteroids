import React from 'react';
import {
  AppRegistry,
  VrHeadModel,
} from 'react-vr';
import { reactotron } from "./reactotronconfig";
import { compose } from "redux";
import App from "./containers/app-container";
import { reducer } from "./redux/reducer.js";
import { Provider } from "react-redux";

const store = reactotron.createStore(reducer, compose());
import socketIOClient from "socket.io-client";

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

AppRegistry.registerComponent('Something Like Asteroids', () => PlanetPlutoVr);
