import React from "react";
import { View, Text } from "react-native";
import { asset, AppRegistry, VrHeadModel, VrButton } from "react-vr";
import { PropTypes } from 'prop-types';


import { randomSphereCoordinate, generateRandomSpeed, getRandomInt } from "../helpers/number-util";

import Asteroid from "../containers/asteroid-container";
import FirstScreen from "../components/firstscreen.js";
import Game from "../components/game.js";

export default class App extends React.Component {

    constructor() {
        super();

        this.state = {
            gameIsReady : false,
            isMultiplayer : false
        };

        generateAsteroids = this.generateAsteroids.bind(this);
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

        return asteroids;
    }

    isMultiplayer(bool) {
        if (bool) {
            this.setState({
                gameIsReady : true,
                isMultiplayer : true
            });
        } else {
            this.setState({
                gameIsReady : true,
                isMultiplayer : false
            });
        }
    }

    render() {
        if (this.state.gameIsReady) {
          return <Game generateAsteroids={()=>this.generateAsteroids()}/>;
        } else {
          return <FirstScreen isMultiplayer={(bool) => this.isMultiplayer(bool)}/>
        }
    }
}

