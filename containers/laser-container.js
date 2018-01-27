import { connect } from "react-redux";
import Asteroid from "../components/laser";

import { updateLaserPosition } from "../redux/actions";

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    updateLaserPosition: data => dispatch(updateLaserPosition(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Laser);