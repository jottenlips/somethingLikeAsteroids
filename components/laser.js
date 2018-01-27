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
            startingZ: 0,
            startingX: 0,
            startingY: 0,
            speed: 24
        };
        this.directionZ = this.props.directionZ,
        this.directionX = this.props.directionX,
        this.directionY = this.props.directionY,
        this.moveZ = this.moveZ.bind(this);
        this.moveX = this.moveX.bind(this);
        this.moveY = this.moveY.bind(this);
        this.isOutOfBoundsOfSphere = this.isOutOfBoundsOfSphere.bind(this);
        this.resetlaserPosition = this.resetlaserPosition.bind(this);
    }

    componentDidMount() {
        this.rotate();
        this.shootlaser();
    }

    shootlaser() {
        this.moveZ(2400);
        this.moveX(2400);
        this.moveY(2400);
    }

    componentWillUnmount() {
        if (this.frameHandle) {
            cancelAnimationFrame(this.frameHandle);
            this.frameHandle = null;
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
            toValue: 200,
            duration,
            easing: Easing.linear
        }).start(() => {

            if(this.isOutOfBoundsOfSphere()){

                this.setState(
                    () => ({z: new Animated.Value(this.props.speed)}),
                    () => {this.moveZ(duration)}
                );

            } else {
            
            this.setState(
                    () => ({
                        z:  new Animated.Value(this.props.directionZ*this.state.speed*1000),
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
            toValue: 200,
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
                    x:  new Animated.Value(this.props.directionX*this.state.speed*1000),
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
                        y: new Animated.Value(this.props.directionY*1000*this.state.speed),
                    }),
                    () => {
                        this.moveY(duration);
                    }
                );
            }
        });
    };

    isOutOfBoundsOfSphere = () => {

        if(this.state.inverseY === this.state.y._value || this.state.inverseX === this.state.x._value|| this.state.inverseZ === this.state.z._value){
            return true;
        }
    };

    resetlaserPosition = (callback) => {
        this.setState({x: new Animated.Value(0), y: new Animated.Value(0), z: new Animated.Value(0)});
        callback();
    };

    render () {

    	console.log(VrHeadModel.rotationOfHeadMatrix());

        return (
            <Animated.View  style={ {transform: [{translate: [this.state.x, this.state.y, this.state.z]}]}}>
                <Model source={{ obj: asset(laser_ASSET_OBJ) }}
                       style={{ position: 'absolute', transform: [{translate: [0, 0, -6]}],
                           layoutOrigin: [0.5, 0.5] }}
                       texture={asset("laser-texture.jpg")}/>
            </Animated.View>
        )
    }
}