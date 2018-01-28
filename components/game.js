import React from "react";
import { View } from "react-native";
import { asset, Pano, AmbientLight } from "react-vr";
import { PropTypes } from 'prop-types';
import Laser from "../containers/laser-container";

export default class Game extends React.Component {
    static propTypes = {
        generateAsteroids: PropTypes.func
    }

    render() {
        return (
            <View onInput={this.prepareTheLaser}>
              <AmbientLight intensity={ 2.6 } />
              <Pano source={asset('chess-world.jpg')}/>
              {this.props.generateAsteroids()}
              <Laser x={0} y={0} z={0}/>
            </View>
        );
    }
}