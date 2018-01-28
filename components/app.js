import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { AmbientLight, Pano, asset, AppRegistry,VrHeadModel } from "react-vr";

import { randomSphereCoordinate, generateRandomSpeed, getRandomInt } from "../helpers/number-util";

import Asteroid from "../containers/asteroid-container";

import Laser from "../containers/laser-container";


export default class App extends React.Component {

    constructor() {
        super();
        this.generateAsteroids = this.generateAsteroids.bind(this);
    }

    prepareTheLaser = (e) => {

        const { eventType } = e.nativeEvent.inputEvent;

        const rotationOfHeadMatrix = VrHeadModel.rotationOfHeadMatrix();

        const directionX = rotationOfHeadMatrix[1];
        const directionY = rotationOfHeadMatrix[0];
        const directionZ = rotationOfHeadMatrix[2];

        if (eventType === "touchstart" || eventType === "keydown") {

            console.log("laser prepared");
            this.props.fireLaser({
                x: directionX,
                y: directionY,
                z: directionZ
            })
        }
    };


    generateAsteroids() {
        const numberOfAsteroids = Math.random() * 10;
        let asteroidValues = [];
        let asteroids = [];

        for (var i = 0; i < numberOfAsteroids; i++) {

            const coords = randomSphereCoordinate(200);

            asteroidValues.push({
                x: coords.x,
                y: coords.y,
                z: coords.z,
                speed: generateRandomSpeed(),
                size: generateRandomSpeed()
            })
        }



        asteroidValues.map((asteroid, index) => {
            asteroids.push(
                <Asteroid x={asteroid.x} y={asteroid.y} z={asteroid.z}
                          speed={asteroid.speed} size={asteroid.size} index={index} key={index} />
            );
            this.props.asteroidCreated(asteroid);
        });

        return asteroids
    }

    render() {
      return (
        <View onInput={this.prepareTheLaser}>
              <AmbientLight intensity={ 2.6 } />
              <Pano source={asset('chess-world.jpg')}/>
                {this.generateAsteroids()}
              <Laser x={0} y={0} z={0}/>
        </View>
      );
    }
}

