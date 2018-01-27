import React from "react";
import { Box } from "react-vr";

const laserStyle = {
    color: "green"
};

export default class Laser extends React.Component {

    render() {
        return (
            <Box dimWidth={2} dimHeight={1} dimDepth={2} style={laserStyle}/>
        )
    }

}
