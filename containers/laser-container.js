import { connect } from "react-redux";
import Asteroid from "../components/laser";

import { updateAsteroidPosition } from "../redux/actions";

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    updateAsteroidPosition: data => dispatch(updateLaserPosition(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Laser);