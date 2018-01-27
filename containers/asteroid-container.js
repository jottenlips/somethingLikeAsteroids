import { connect } from "react-redux";
import Asteroid from "../components/asteroid";

import { updateAsteroidPosition } from "../redux/actions";

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    updateAsteroidPosition: data => dispatch(updateAsteroidPosition(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Asteroid);