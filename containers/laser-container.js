import { connect } from "react-redux";
import Laser from "../components/laser";

import { updateLaserPosition, laserDidFire } from "../redux/actions";

const mapStateToProps = state => ({
    shouldFire: state.shouldFireLaser,
    directionX: state.laserDirectionX,
    directionY: state.laserDirectionY,
    directionZ: state.laserDirectionZ
});

const mapDispatchToProps = dispatch => ({
    updateLaserPosition: data => dispatch(updateLaserPosition(data)),
    laserDidFire: () => dispatch(laserDidFire())
});

export default connect(mapStateToProps, mapDispatchToProps)(Laser);
