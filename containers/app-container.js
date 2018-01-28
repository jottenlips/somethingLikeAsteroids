import { connect } from "react-redux";
import App from "../components/app";

import {asteroidCreated, fireLaser} from "../redux/actions";

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    asteroidCreated: asteroid => dispatch(asteroidCreated(asteroid)),
    fireLaser: laserData => dispatch(fireLaser(laserData))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);