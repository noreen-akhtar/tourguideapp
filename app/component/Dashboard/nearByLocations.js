import React, { Component } from 'react';
import MapView from 'react-native-maps';

export default class NearByPlaces extends Component {

    constructor(){
        console.log('inside nearloc');
    }
    render()
    {
        console.log('Propa',this.props);
        //return(
            // this.props.nearBy.data.map((location)=>{
            //     {console.log('PLOCATION',location.lat);}
            //     return null;
            // })
            this.props.places.data && this.props.places.data.map((location)=>{
                 console.log("location ",location);
                return <MapView.Marker
                coordinate={{latitude:parseFloat(location.lat), longitude: parseFloat(location.lng)}}
                title={location.place_name}
                description={location.address}
                link={location.place_detail_url}
                //image={require('../../../assets/marker_blue.png')}
                />  
                }) //*/
        //)
    }

}