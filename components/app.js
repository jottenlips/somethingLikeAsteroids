import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { AmbientLight, Pano, asset, AppRegistry,VrHeadModel } from "react-vr";


import { randomSphereCoordinate, generateRandomSpeed, getRandomInt } from "../helpers/number-util";

import Asteroid from "../containers/asteroid-container";

import Laser from "../containers/laser-container";


export default class App extends React.Component {

    constructor() {
        super();
        generateAsteroids = this.generateAsteroids.bind(this);
        gameIsReady = false;
    }

    prepareTheLaser = (e) => {

        const { eventType } = e.nativeEvent.inputEvent;

        const rotationOfHeadMatrix = VrHeadModel.rotationOfHeadMatrix();

        const directionX = rotationOfHeadMatrix[1];
        const directionY = rotationOfHeadMatrix[0];
        const directionZ = rotationOfHeadMatrix[2];

        if (eventType === "touchstart" || eventType === "keydown") {
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

    starterButtons() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                width: 2,
                alignItems: 'stretch',
                transform: [{translate: [-1, 1, -5]}],
            }}>

                <View style={{margin: 0.1, height: 0.4}}>
                    <Text style={{fontSize: 0.3, textAlign: 'center', color: "#ffffff"}}>Something Like Asterioids</Text>
                </View>

                <TouchableWithoutFeedback onPress={this.isMultiplayer(false)}>
                    <View style={{ margin: 0.1, height: 0.3, borderWidth: 0.1, borderColor: "#ffffff" }}>
                        <Text style={{fontSize: 0.2, textAlign: 'center', color: "#ffffff"}}>1 Player</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this.isMultiplayer(true)}>
                    <View style={{ margin: 0.1, height: 0.3, borderWidth: 0.1, borderColor: "#ffffff" }}>
                        <Text style={{fontSize: 0.2, textAlign: 'center', color: "#ffffff"}}>2+ Players</Text>
                    </View>
                </TouchableWithoutFeedback>
                
             </View>
        );
    }

    isMultiplayer(bool) {
        if (bool) {
            this.setState({
                gameIsReady : true
            });
        } else {
            this.setState({
                gameIsReady : false
            });
        }
    }

    startGame() {
        this.generateAsteroids();
    }

    render() {
      return (
        <View onInput={this.prepareTheLaser}>
              <AmbientLight intensity={ 2.6 } />
              <Pano source={asset('chess-world.jpg')}/>
                {this.generateAsteroids()}
              <Laser x={0} y={0} z={-20}/>

        </View>
      );
    }
}

