import { connect } from "react-redux";
import Asteroid from "../components/asteroid";

import {playerCollisionDetected, updateAsteroidX, updateAsteroidY, updateAsteroidZ} from "../redux/actions";

const mapStateToProps = (state, ownProps) => ({
    x: state.asteroids[ownProps.index].x,
    y: state.asteroids[ownProps.index].y,
    z: state.asteroids[ownProps.index].z,
    speed: state.asteroids[ownProps.index].speed,
    id: ownProps.index
});

const mapDispatchToProps = dispatch => ({
    updateAsteroidX: data => dispatch(updateAsteroidX(data)),
    updateAsteroidY: data => dispatch(updateAsteroidY(data)),
    updateAsteroidZ: data => dispatch(updateAsteroidZ(data)),
    playerCollisionDetected: data => dispatch(playerCollisionDetected(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Asteroid);