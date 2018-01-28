import React from "react";
import { View, Text } from "react-native";
import { asset, VrButton, Pano } from "react-vr";
import { PropTypes } from 'prop-types';

export default class FirstScreen extends React.Component {
    static propTypes = {
        isMultiplayer: PropTypes.func
    }

    render() {
        return (
            <View>
                <Pano source={asset('chess-world.jpg')}/>
                <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        width: 4,
                        alignItems: 'stretch',
                        transform: [{translate: [-2, 2, -5]}],
                        backgroundColor: 'grey',
                        borderWidth: 0.05,
                        borderColor: "#ffffff"
                    }}>

                    <View style={{marginTop: 0.5, marginBottom: 1, height: 0.4}}>
                        <Text style={{fontSize: 0.3, textAlign: 'center', color: "#ffffff"}}>Something Like Asterioids</Text>
                    </View>

                    {/*

                    For another day.. 

                    <VrButton onClick={()=>this.props.isMultiplayer(false)} style={{marginTop: 0.5, marginBottom: 0.5}}>
                        <View style={{ height: 0.5, borderWidth: 0.05, borderColor: "#ffffff" }}>
                            <Text style={{fontSize: 0.2, textAlign: 'center', color: "#ffffff"}}>1 Player</Text>
                         </View>
                    </VrButton>
                    */}

                    <VrButton onClick={()=>this.props.isMultiplayer(true)} style={{marginBottom: 0.5, marginLeft: 1, marginRight: 1}}>
                        <View style={{ height: 0.5, backgroundColor: "#ffffff", alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{fontSize: 0.2, textAlign: 'center', color: "#000000"}}>Start the Game</Text>
                        </View>
                    </VrButton>
                        
                </View> 
            </View>     
        );
    }
}