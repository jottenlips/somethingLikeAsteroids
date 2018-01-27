import React from "React";
import { Model, asset } from "react-vr";

const ASTEROID_ASSET_OBJ = "";

export default class Asteroid extends React.Component {
    render () {
        return (
            <Model source={
                { obj: asset(ASTEROID_ASSET_OBJ) }
            } />
        )
    }
}