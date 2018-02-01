import React from "React";
import { Model, asset, Animated, VrHeadModel, Sphere, Box } from "react-vr";
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

    	 // if (this.props.shouldFire && this.props.directionY !== 0 && this.props.directionZ !== 0 && this.props.directionX !== 0 ) {
            // this.fireLaser()
        // }

    }

    fireLaser = () => {
        this.moveZ(2000, this.props.directionY, this.props.directionZ, this.props.directionX);
        // this.moveX(200, this.props.directionY, this.props.directionZ, this.props.directionX, 0);
        // this.moveY(200, this.props.directionY, this.props.directionZ, this.props.directionX, 0);
        this.props.laserDidFire();
    };

    componentWillUnmount() {
        if (this.frameHandle) {
            cancelAnimationFrame(this.frameHandle);
            this.frameHandle = null;
        }
    }

    moveZ = (duration, directionY, directionZ, directionX, newZ) => {

        Animated.timing(this.state.z, {
            toValue: Math.cos(directionZ)*200,
            duration,
            easing: Easing.linear
        }).start(() => {
            this.setState(
                    () => ({
                        z:  Animated.Value(this.state.z._value+(10*Math.cos(directionZ))),
                    }),
                    () => {

                    	this.moveZ(duration,directionY,directionZ,directionX,0);
                    }
                );
        });
    };

    moveX = (duration, directionY, directionZ, directionX, newX) => {


        Animated.timing(this.state.x, {
            toValue:  directionX*100,
            duration,
            easing: Easing.linear
        }).start(() => {
            this.setState(
                    () => ({
                        x:  (Math.abs(newX)>10) ? Animated.Value(0) : new Animated.Value(newX--),
                    }),
                    () => {

                    	(Math.abs(newX)>=10) ? this.moveX(duration,directionY,directionZ,directionX,0) : this.moveX(duration,directionY,directionZ,directionX,newX--)
                      	
                    }
                );
        });
    };

    moveY = (duration, directionY, directionZ, directionX, newY) => {

        Animated.timing(this.state.y, {
            toValue:  directionY*100,
            duration,
            easing: Easing.linear
        }).start(() => {
            this.setState(
                    () => ({
                        y:  (Math.abs(newY)>10) ? Animated.Value(0) : new Animated.Value(newY--),
                    }),
                    () => {

                    	(Math.abs(newY)>=10) ? this.moveY(duration,directionY,directionZ,directionX,0) : this.moveY(duration,directionY,directionZ,directionX,newY--)
                      	
                    }
                );
        });
    };



    // isOutOfBoundsOfSphere = (directionY, directionZ, directionX) => {

    //     // console.log("props at bounds check", this.props);
    //     if (this.props.x !== undefined && this.props.y !== undefined && this.props.z !== undefined) {
    //         return (Math.cos(directionY)*100 < this.state.y._value || Math.cos(directionX)*100 < this.state.x._value || Math.cos(directionZ)*100 < this.state.z._value)
    //     }
    // };



    render () {
        return (
            <Animated.View  style={ {transform: [{translate: [this.state.x, this.state.y, this.state.z]}]}}>
            <Box style={{ position: 'absolute', transform: [{translate: [0, 0, 0]}, {rotateY: this.state.rotation}],
               layoutOrigin: [0.0, 0.0], color:"green"}}
      dimWidth={0.1}
  dimDepth={0.1}
  dimHeight={0.1}/>
            
            </Animated.View>
        )
    }
}