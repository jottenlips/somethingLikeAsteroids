import React from "React";
import { Model, asset, Animated } from "react-vr";
import { Easing } from "react-native";
import { isNegative } from "../helpers/number-util"

const ASTEROID_ASSET_OBJ = "asteroid.obj";

export default class Asteroid extends React.Component {
    constructor(props) {

        super(props);

        this.lastUpdate = Date.now();
        this.state = {
            rotation: 130,
            x: new Animated.Value(this.props.x),
            y: new Animated.Value(this.props.y),
            z: new Animated.Value(this.props.z),
            inverseZ: -this.props.z,
            inverseX: -this.props.x,
            inverseY: -this.props.y,
            speed: this.props.speed
        };
        console.log("asteroid props", this.props);
        this.rotate = this.rotate.bind(this);
        this.moveZ = this.moveZ.bind(this);
        this.moveX = this.moveX.bind(this);
        this.moveY = this.moveY.bind(this);
    }

    componentDidMount() {
        this.rotate();
        this.moveAsteroid();
    }

    moveAsteroid() {
        this.moveZ();
        this.moveX();
        this.moveY();
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

    moveZ = (duration = 5000) => {
        Animated.timing(this.state.z, {
            toValue: this.state.inverseZ,
            duration,
            easing: Easing.linear
        }).start(() => {
            this.setState(
                () => ({
                    z: new Animated.Value( isNegative(-this.state.inverseZ) ? this.state.z+=this.state.speed : this.state.z-=this.state.speed),
                }),
                () => {
                    this.moveZ(duration--);
                }
            );
        });
    };

    moveX = (duration = 5000) => {
        Animated.timing(this.state.x, {
            toValue: this.state.inverseX,
            duration,
            easing: Easing.linear
        }).start(() => {
            this.setState(
                () => ({
                    z: new Animated.Value(isNegative(-this.state.inverseX) ? this.state.x+=this.state.speed : this.state.x-=this.state.speed),
                }),
                () => {
                    this.moveX(duration--);
                }
            );
        });
    };

    moveY = (duration = 5000) => {
        Animated.timing(this.state.y, {
            toValue: this.state.inverseY,
            duration,
            easing: Easing.linear
        }).start(() => {
            this.setState(
                () => ({
                    z: new Animated.Value(isNegative(-this.state.inverseY) ? this.state.y+=this.state.speed : this.state.y-=this.state.speed),
                }),
                () => {
                    this.moveY(duration--);
                }
            );
        });
    };

    render () {
        return (
            <Animated.View style={ {transform: [{translate: [this.state.x, this.state.y, this.state.z]}]}}>
                <Model source={{ obj: asset(ASTEROID_ASSET_OBJ) }}
                       style={{ position: 'absolute', transform: [{translate: [0, 0, -6]}],
                           layoutOrigin: [0.5, 0.5] }}
                       texture={asset("asteroid-texture.jpg")}/>
            </Animated.View>
        )
    }
}