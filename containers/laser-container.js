import { connect } from "react-redux";
import Laser from "../components/laser";

import { updateLaserPosition } from "../redux/actions";

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    updateLaserPosition: data => dispatch(updateLaserPosition(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Laser);



    // constructor(props) {

    //     super(props);

    //     this.lastUpdate = Date.now();
    //     this.state = {
    //         rotation: 130,
    //         x: new Animated.Value(this.props.x),
    //         y: new Animated.Value(this.props.y),
    //         z: new Animated.Value(this.props.z),
    //         startingZ: 0,
    //         startingX: 0,
    //         startingY: 0,
    //         speed: 24
    //     };
    //     this.directionZ = this.props.directionZ,
    //     this.directionX = this.props.directionX,
    //     this.directionY = this.props.directionY,
    //     this.moveZ = this.moveZ.bind(this);
    //     this.moveX = this.moveX.bind(this);
    //     this.moveY = this.moveY.bind(this);
    //     this.isOutOfBoundsOfSphere = this.isOutOfBoundsOfSphere.bind(this);
    //     this.resetlaserPosition = this.resetlaserPosition.bind(this);
    // }
