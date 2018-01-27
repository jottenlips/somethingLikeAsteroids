import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { AmbientLight, Pano, asset, AppRegistry,VrHeadModel } from "react-vr";

import { randomSphereCoordinate, generateRandomSpeed, getRandomInt } from "../helpers/number-util";

import Asteroid from "../containers/asteroid-container";


export default class App extends React.Component {

    constructor() {
        super();
        this.generateAsteroids = this.generateAsteroids.bind(this);
         this.createLaser = this.createLaser.bind(this);
    }

    createLaser(rotationOfHeadMatrix) {
        console.log(rotationOfHeadMatrix);
    }

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
        <View>
        {this.createLaser(VrHeadModel.rotationOfHeadMatrix())}
              <AmbientLight intensity={ 2.6 }  />
              <Pano source={asset('chess-world.jpg')}/>
                {this.generateAsteroids()}
        </View>
      );
    }
}

