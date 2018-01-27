import { connect } from "react-redux";
import Asteroid from "../components/asteroid";

import { updateAsteroidX, updateAsteroidY, updateAsteroidZ } from "../redux/actions";

const mapStateToProps = state => ({
    // text: state.text,
    // keyword: state.keyword
});

const mapDispatchToProps = dispatch => ({
    updateAsteroidX: data => dispatch(updateAsteroidX(data)),
    updateAsteroidY: data => dispatch(updateAsteroidY(data)),
    updateAsteroidZ: data => dispatch(updateAsteroidZ(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Asteroid);