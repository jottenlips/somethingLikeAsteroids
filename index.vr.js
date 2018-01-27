import React from 'react';
import {
  AppRegistry,
} from 'react-vr';
import { reactotron } from "./reactotronconfig";
import {compose, createStore} from "redux";
import App from "./containers/app-container";
import { reducer } from "./redux/reducer.js";
import { Provider } from "react-redux";

const store = reactotron.createStore(reducer, compose());
// const store = createStore(reducer);
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
