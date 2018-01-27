import { connect } from "react-redux";
import App from "../components/app";

import { asteroidCreated } from "../redux/actions";

const mapStateToProps = state => ({
    // text: state.text,
    // keyword: state.keyword
});

const mapDispatchToProps = dispatch => ({
    asteroidCreated: asteroid => dispatch(asteroidCreated(asteroid))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);