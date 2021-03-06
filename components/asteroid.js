import React from "React";
import { Model, asset, Animated, VrHeadModel } from "react-vr";
import {Easing, Image, Text} from "react-native";
import { isNegative } from "../helpers/number-util"
import GazeButton from "react-vr-gaze-button";

const ASTEROID_ASSET_OBJ = "asteroid.obj";

export default class Asteroid extends React.Component {
    constructor(props) {

        super(props);

        this.lastUpdate = Date.now();
        this.state = {
            rotation: 10000,
            x: new Animated.Value(this.props.x),
            y: new Animated.Value(this.props.y),
            z: new Animated.Value(this.props.z),
            inverseZ: -this.props.z,
            inverseX: -this.props.x,
            inverseY: -this.props.y,
            speed: this.props.speed,
            isDestroyed: false
        };
        // console.log("asteroid props", this.props);
        this.rotate = this.rotate.bind(this);
        this.moveZ = this.moveZ.bind(this);
        this.moveX = this.moveX.bind(this);
        this.moveY = this.moveY.bind(this);
        this.isOutOfBoundsOfSphere = this.isOutOfBoundsOfSphere.bind(this);
    }

    componentDidMount() {
        this.rotate();
        this.moveAsteroid();
        console.log("asteroid props", this.props);
    }

    moveAsteroid() {
        this.moveZ(this.props.speed);
        this.moveX(this.props.speed);
        this.moveY(this.props.speed);
    }

    componentWillUnmount() {
        if (this.frameHandle) {
            cancelAnimationFrame(this.frameHandle);
            this.frameHandle = null;
            }
    }

    checkForCollision() {
        console.log("checking for collision");
        if (this.state.x._value < 10 && this.state.x._value > -10 && !this.state.isDestroyed) {
            this.props.playerCollisionDetected();
        } else if (this.state.x._value < 10 && this.state.x._value > -10 && !this.state.isDestroyed) {
            this.props.playerCollisionDetected();
        } else if (this.state.y._value < 10 && this.state.y._value > -10 && !this.state.isDestroyed) {
            this.props.playerCollisionDetected();
        } else if (this.state.z._value < 10 && this.state.z._value > -10 && !this.state.isDestroyed) {
            this.props.playerCollisionDetected();
        }
    }

    rotate() {
        const now = Date.now();
        const delta = now - this.lastUpdate;
        this.lastUpdate = now; this.setState({ rotation: this.state.rotation + delta / 150 });
        this.frameHandle = requestAnimationFrame(this.rotate);
    }

    moveZ = (duration) => {
        Animated.timing(this.state.z, {
            toValue: this.state.inverseZ,
            duration,
            easing: Easing.linear
        }).start(() => {
            if(this.isOutOfBoundsOfSphere()){

                this.setState(
                    () => ({z: new Animated.Value(-this.state.inverseZ)}),
                    () => {this.checkForCollision(); this.moveZ(duration);}
                );

            } else {

                this.setState(
                    () => ({
                        z: new Animated.Value( isNegative(-this.state.inverseZ) ? this.state.z++ : this.state.z--),
                    }),
                    () => {
                        this.moveZ(duration);
                    }
                );

            }
        });
    };

    moveX = (duration) => {
        Animated.timing(this.state.x, {
            toValue: this.state.inverseX,
            duration,
            easing: Easing.linear
        }).start(() => {
            if(this.isOutOfBoundsOfSphere()){

                this.setState(
                    () => ({x: new Animated.Value(-this.state.inverseX)}),
                    () => {this.moveX(duration)}
                );

            } else {
            this.setState(
                () => ({
                    x: new Animated.Value(isNegative(-this.state.inverseX) ? this.state.x++ : this.state.x--),
                }),
                () => {
                    this.moveX(duration);
                }
              );
            }
        });
    };

    moveY = (duration) => {
        Animated.timing(this.state.y, {
            toValue: this.state.inverseY,
            duration,
            easing: Easing.linear
        }).start(() => {
            if(this.isOutOfBoundsOfSphere()){
                this.setState(
                    () => ({y: new Animated.Value(-this.state.inverseY)}),
                    () => {this.moveY(duration)}
                );
            } else {
                this.setState(
                    () => ({
                        y: new Animated.Value(isNegative(-this.state.inverseY) ? this.state.y++ : this.state.y--),
                    }),
                    () => {
                        this.moveY(duration);
                    }
                );
            }
        });
    };

    isOutOfBoundsOfSphere = () => {

        console.log("props at bounds check", this.props);
        if (this.props.x !== undefined && this.props.y !== undefined && this.props.z !== undefined) {
            return (this.state.inverseY === this.props.y._value || this.props.inverseX === this.props.x._value || this.props.inverseZ === this.state.z._value)
        }
    };

    render () {

        return (
            <Animated.View style={ {transform: [{translate: [this.state.x, this.state.y, this.state.z]}]}}>
                <GazeButton onClick={() => this.setState({isDestroyed: true})} duration={1000}>
                {() => !this.state.isDestroyed ?
                    (
                        <Model source={{ obj: asset(ASTEROID_ASSET_OBJ) }}
                               style={{ position: 'absolute', transform: [{translate: [0, 0, 0]}],
                                   layoutOrigin: [0.5, 0.5] }}
                               texture={asset("asteroid-texture.jpg")}
                        />
                    )

                    :

                    (<Model source={{ obj: asset("laser.obj") }}
                            style={{ position: 'absolute', transform: [{translate: [0, 0, 0]}, { scale: 0.1}, {rotateY: this.state.rotation}, {rotateX: this.state.rotation}, {rotateZ: this.state.rotation} ],
                                layoutOrigin: [0.5, 0.5] }}
                            texture={asset("laser.jpg")}
                    />)}
                </GazeButton>
            </Animated.View>
        )
    }
};