import React from "React";
import { Model, asset, Animated, VrHeadModel } from "react-vr";
import { Easing } from "react-native";
import { isNegative } from "../helpers/number-util"

const laser_ASSET_OBJ = "laser.obj";

export default class laser extends React.Component {
    constructor(props) {

        super(props);

        this.lastUpdate = Date.now();
        this.state = {
            rotation: 130,
            x: new Animated.Value(this.props.x),
            y: new Animated.Value(this.props.y),
            z: new Animated.Value(this.props.z),
            speed: 24
        };
        this.moveZ = this.moveZ.bind(this);
        this.moveX = this.moveX.bind(this);
        this.moveY = this.moveY.bind(this);
        this.fireLaser = this.fireLaser.bind(this);
    }

    componentDidUpdate() {
        if (this.props.shouldFire) {
            this.fireLaser()
        }
    }

    componentDidMount() {
    }

    fireLaser = () => {
        this.moveZ(2400);
        this.moveX(2400);
        this.moveY(2400);
        this.props.laserDidFire();
    };

    componentWillUnmount() {
        if (this.frameHandle) {
            cancelAnimationFrame(this.frameHandle);
            this.frameHandle = null;
        }
    }

    moveZ = (duration) => {
        Animated.timing(this.state.z, {
            toValue: 200,
            duration,
            easing: Easing.linear
        }).start(() => {
            this.setState(
                    () => ({
                        z:  new Animated.Value(this.props.directionZ*this.state.speed*100),
                    }),
                    () => {
                        this.moveZ(duration);
                        this.props.laserDidFire();
                    }
                );

          
        });
    };

    moveX = (duration) => {
        Animated.timing(this.state.x, {
            toValue: 200,
            duration,
            easing: Easing.linear
        }).start(() => {
           
            this.setState(
                () => ({
                    x:  new Animated.Value(this.props.directionX*this.state.speed*1000),
                }),
                () => {
                    this.moveX(duration);
                    this.props.laserDidFire();

                }
              );
        });
    };

    moveY = (duration) => {
        Animated.timing(this.state.y, {
            toValue: this.state.inverseY,
            duration,
            easing: Easing.linear
        }).start(() => {
                this.setState(
                    () => ({
                        y: new Animated.Value(this.props.directionY*1000*this.state.speed),
                    }),
                    () => {
                        this.moveY(duration);
                        this.props.laserDidFire();
                    }
                );
        });
    };

    render () {
        return (
            <Animated.View  style={ {transform: [{translate: [this.state.x, this.state.y, this.state.z]}]}}>
                <Model source={{ obj: asset(laser_ASSET_OBJ) }}
                       style={{ position: 'absolute', transform: [{translate: [0, 0, -60]}],
                           layoutOrigin: [0.5, 0.5] }}
                       texture={asset("laser.jpg")}/>
            </Animated.View>
        )
    }
}