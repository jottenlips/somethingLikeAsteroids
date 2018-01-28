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
        this.moveZ(10);
        this.props.laserDidFire();
    };

    componentWillUnmount() {
        if (this.frameHandle) {
            cancelAnimationFrame(this.frameHandle);
            this.frameHandle = null;
        }
    }

    moveZ = (duration) => {
        console.log(this.state.z._value);
        Animated.timing(this.state.z, {
            toValue: this.props.z -200 * this.props.directionZ,
            duration,
            easing: Easing.linear
        }).start(() => {
            this.setState(
                    () => ({
                        z:  new Animated.Value(this.state.z._value + 10)
                        //z:  isNegative(this.state.z._value) ? new Animated.Value(this.state.z._value + 100) : new Animated.Value(this.state.z._value - 100),
                    }),
                    () => {
                        this.moveZ(duration);
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