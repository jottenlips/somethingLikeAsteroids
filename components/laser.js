import React from "React";
import { Model, asset, Animated, VrHeadModel, Sphere } from "react-vr";
import { Easing } from "react-native";
import { isNegative } from "../helpers/number-util"

const laser_ASSET_OBJ = "laser.obj";


// banana 
// <Model source={{ obj: asset(laser_ASSET_OBJ) }}
                       // style={{ position: 'absolute', transform: [{translate: [0, 0, -60]}],
                           // layoutOrigin: [0.5, 0.5] }}
                       // texture={asset("laser.jpg")}/>

export default class laser extends React.Component {
    constructor(props) {

        super(props);

        this.lastUpdate = Date.now();
        this.state = {
            rotation: 130,
            x: new Animated.Value(0),
            y: new Animated.Value(0),
            z: new Animated.Value(0),
            speed: 24
        };
        this.moveZ = this.moveZ.bind(this);
        this.moveX = this.moveX.bind(this);
        this.moveY = this.moveY.bind(this);
        this.fireLaser = this.fireLaser.bind(this);
    }

    componentDidUpdate() {
        if (this.props.shouldFire && this.props.directionY !== 0 && this.props.directionZ !== 0 && this.props.directionX !== 0 ) {
            this.fireLaser()
        }
    }

    componentDidMount() {
    }

    fireLaser = () => {
        this.moveZ(100, this.props.directionY, this.props.directionZ, this.props.directionX);
        // this.moveX(100, this.props.directionY, this.props.directionZ, this.props.directionX);
        // this.moveY(100, this.props.directionY, this.props.directionZ, this.props.directionX);
        this.props.laserDidFire();
    };

    componentWillUnmount() {
        if (this.frameHandle) {
            cancelAnimationFrame(this.frameHandle);
            this.frameHandle = null;
        }
    }

    moveZ = (duration, directionY, directionZ, directionX) => {

    	console.log(`eulerX ${directionZ}`)
    	console.log(`new z value ${-directionZ*1000+this.state.z._value}`)
    	console.log(`final z ${directionZ*200}`)



        Animated.timing(this.state.z, {
            toValue:  directionZ*20000,
            duration,
            easing: Easing.linear
        }).start(() => {
            this.setState(
                    () => ({
                        z:  new Animated.Value((-directionZ*1000)+this.state.z._value),
                    }),
                    () => {

                        this.moveZ(duration,directionY,directionZ,directionX);
                        this.props.laserDidFire();
                    }
                );
        });
    };
     moveX = (duration, directionY, directionZ, directionX) => {

        Animated.timing(this.state.x, {
            toValue:  directionX*100,
            duration,
            easing: Easing.linear
        }).start(() => {
            this.setState(
                    () => ({
                        x:  new Animated.Value(-directionX*1000+this.state.x._value),
                    }),
                    () => {

                        this.moveX(duration--,directionY,directionZ,directionX);
                        this.props.laserDidFire();
                    }
                );
        });
    };

    moveY = (duration, directionY, directionZ, directionX) => {

        Animated.timing(this.state.y, {
            toValue:  directionY*200,
            duration,
            easing: Easing.linear
        }).start(() => {
            this.setState(
                    () => ({
                        y:  new Animated.Value(-directionY*1000+this.state.y._value),
                    }),
                    () => {

                        this.moveY(duration--,directionY,directionZ,directionX);
                        this.props.laserDidFire();
                    }
                );
        });
    };



    render () {
        return (
            <Animated.View  style={ {transform: [{translate: [this.state.x, this.state.y, this.state.z]}]}}>
            <Sphere style={{ position: 'absolute', transform: [{translate: [0, 0, 0]}, {rotateY: this.state.rotation}],
               layoutOrigin: [0.0, 0.0], color:"slateblue"}}
      />
            
            </Animated.View>
        )
    }
}