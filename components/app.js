import React from "react";
import { View } from "react-native";
import { AmbientLight, Pano, asset, AppRegistry } from "react-vr";

import { generateRandomCoordinate, generateRandomSpeed, getRandomInt } from "../helpers/number-util";

import Asteroid from "../containers/asteroid-container";


export default class App extends React.Component {

    constructor() {
        super();
        this.generateAsteroids = this.generateAsteroids.bind(this);
    }

    generateAsteroids() {
        const numberOfAsteroids = Math.random() * 100;
        let asteroidValues = [];
        let asteroids = [];

        for (var i = 0; i < numberOfAsteroids; i++) {
            asteroidValues.push({
                x: generateRandomCoordinate(),
                y: generateRandomCoordinate(),
                z: generateRandomCoordinate(),
                speed: getRandomInt(3)+1,
                size: 10
            })
        }

        console.log(asteroidValues);

        asteroidValues.map((asteroid, index) => {
            asteroids.push(
                <Asteroid x={asteroid.x} y={asteroid.y} z={asteroid.z}
                          speed={asteroid.speed} size={asteroid.size} key={index} />
            );
            this.props.asteroidCreated(asteroid);
        });

        return asteroids
    }

    render() {
      return (
        <View>
          <AmbientLight intensity={ 2.6 }  />
          <Pano source={asset('chess-world.jpg')}/>
            {this.generateAsteroids()}
        </View>
      );
    }
}

