import React from "React";
import { Model, asset, Animated } from "react-vr";
import { Easing } from "react-native";

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
            speed: this.props.speed
        };
        console.log("asteroid props", this.props);
        this.rotate = this.rotate.bind(this);
    }

    componentDidMount() {
        this.rotate();
        this.vroom();
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

    vroom = (duration = 5000) => {
        Animated.timing(this.state.z, {
            toValue: 0,
            duration,
            easing: Easing.linear
        }).start(() => {
            this.setState(
                () => ({
                    z: new Animated.Value(this.state.z++),
                }),
                () => {
                    this.vroom(duration--);
                }
            );
        });
};

    render () {
        return (
            <Animated.View style={ {transform: [{translateZ: this.state.z}]}}>
                <Model source={{ obj: asset(ASTEROID_ASSET_OBJ) }}
                       style={{ position: 'absolute', layoutOrigin: [5.0, 5.0]}}
                       texture={asset("asteroid-texture.jpg")}/>
            </Animated.View>
        )
    }
}