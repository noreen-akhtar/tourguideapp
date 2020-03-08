import React, { Component } from 'react';
import {
  Platform, Text, AsyncStorage, View, StyleSheet, Alert,SafeAreaView, Button, TouchableOpacity,
  TouchableHighlight,
  Dimensions , 
} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';

import { createBottomTabNavigator,NavigationActions, createStackNavigator,} from 'react-navigation';

import axios from 'axios';

import Dashboard from './index';
import Signup from '../Signup/index'; // app/component/Signup/index';
import Login from '../Home/login';
import NearBy from './nearByLocations';
import { Thumbnail } from 'native-base';


//console = require('console');
const { width } = Dimensions.get('window')

// export default class App extends Component {
class DashboardApp extends Component {


  constructor(props) {
    super(props);
    this.state = {
      category: null,
      latitude: 35.910162,
      longitude: 74.3511313,

      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      // Marker: null,

      gotLocation: false,

      location: false,
      errorMessage: null,
      nearPlaces: false,
      // token : "8c769ab6f9eb12c4ee962893f734c011d355079e",
      token: "",
      markers: [
        {
          latitude: 35.950210,
          longitude: 74.238395,
          place_name: "Doka moka",
          address: "Description 2",
          place_detail_url: "www.",
          id: 2
        },
        {
          latitude: 35.910293,
          longitude: 74.338371,
          place_name: "Poka moka",
          address: "Description 2",
          place_detail_url: "www.",
          id: 3
        }
      ]
    };
  }
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      AsyncStorage.getItem('token').then((token) => { //TODO solve error 38
        console.log('token', token);
        this.setState({ token });
        this._getLocationAsync();
        this.places();

      });
    }//*/
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    };

    let location = await Location.getCurrentPositionAsync({});
    console.log("loc" , location);
    this.setState({ location });

    // console.log('HERE IS LOCA', this.state.location);

    const lat = location.coords.latitude;
    const lng = location.coords.longitude;
    this.setState({
      latitude: lat,
      longitude: lng
    });
    // console.log('HERE IS LOCA', this.state);
    this.places();

    // console.log("lat lng before calling " ,this.state.latitude );

  };

  places = async (cat) => {
    console.log('oooooo', AsyncStorage.getItem('token'));
    // console.log("lat lng" ,this.state.latitude, this.state.longitude);
    if (this.state.location !== false) {
      console.log("location", this.state.location);
      const res = await axios.post('http://192.168.1.3:8080/app/places', {
        user_lat: this.state.latitude,
        user_lng: this.state.longitude,

        category: cat ? cat : null,
        token: this.state.token
      })
        .then((response) => {
          console.log("mewon   ", response);
          if (response.status == 200) {
            // console.log("mewon   ",response.data);
            // var nearPlaces=response.data//.data;
            // console.log("All Places",response.data);

            //AsyncStorage.getItem('token', response.data.token);
            this.setState({ nearPlaces: response.data });
          }
        })
        .catch((error) => console.log('error', error));
    }
  }

  componentDidMount() {

    // if(this.state.location !== false) {
    //   this.places();
    // }
  }

  nearBy = () => {


    // if(this.state.nearPlaces !=false) {
    console.log('OOOOK');
    console.log('near p', this.state.nearPlaces);
    //this.state.nearPlaces.data.map((marker) => {
    this.state.markers.map((marker) => {
      return (
        <MapView.Marker
          key={marker.id}
          coordinate={{ latitude: parseFloat(marker.lat), longitude: parseFloat(marker.lng) }}
          title={marker.place_name}

          description={marker.address}

          url={marker.place_detail_url}
        >
          <MapView.Callout tooltip style={styles.customView}>
            <TouchableHighlight onPress= {()=>this.markerClick()} underlayColor='#dddddd'>
              <View style={styles.calloutText}>
                <Text>{marker.title}{"\n"}{marker.description}</Text>
              </View>
            </TouchableHighlight>
          </MapView.Callout>
        </MapView.Marker>
      );
    })
  }

  navi = () =>{
    console.log("noreen");
  }

  render() {
    const { navigate } = this.props.navigation;
    //  console.log(this.state.markers);
    // console.log('thsi.state',this.state.category);
    if (this.props.navigation.state.params) {
      console.log('caling palces for cat');
      this.places(this.props.navigation.state.params.item);
    }

    let text = 'Waiting...';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      //this.setState({gotLocation:true})
    }
    

    console.log("props", this.props)
    console.log("state ", this.state)
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            loadingEnabled: true,
            loadingIndicatorColor: "#666666",
            loadingBackgroundColor: "#eeeeee",
            moveOnMarkerPress: false,
            showsUserLocation: true,
            showsCompass: true,
            showsPointsOfInterest: false
          }}
        >
            <MapView.Marker
                    key="-1"
                    coordinate={{latitude: parseFloat(this.state.latitude), longitude: parseFloat(this.state.longitude) }}
                     pinColor={'green'}     
                  ></MapView.Marker>
           {
            this.state.nearPlaces.data ?
              this.state.nearPlaces.data.map((marker) => {
                console.log("marker", marker);
                return (
                  <MapView.Marker
                    key={marker.id}
                    coordinate={{ latitude: parseFloat(marker.lat), longitude: parseFloat(marker.lng) }}     
                  >
                    <MapView.Callout>
                      <TouchableOpacity title={marker.place_name}  underlayColor='#dddddd'>
                        <View onPress={() => console.log("click here")}>
                          <Text>{marker.place_name}</Text>
                          <Text>{marker.address}</Text>
                          <Text>{marker.category}</Text>

                          <Text>{marker.place_detail_url}</Text>
                        </View>
                      </TouchableOpacity>
                    </MapView.Callout>
                  </MapView.Marker>
                );
              })
              
              : null
            }
          


        </MapView>
      </View>
    );//*/
  }
}

class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`,
  });
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}

class FilterPlaces extends React.Component {

  state = {
    categories: null,
    value: null,
    //selectedCat: null,
    token: ""
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      AsyncStorage.getItem('token').then((token) => { //TODO solve error 38
        console.log('token', token);
        this.setState({ token });
        this.getCategoroies();
      });
    }
  }

  getCategoroies = async () => {
    console.log('oooooooooooooooo', AsyncStorage.getItem('token'));
    if (this.state.location !== false) {
      console.log("location", this.state.location);

      const res = await axios.post('http://192.168.1.3:8080/app/places/category', {
        user_lat: this.state.latitude,
        user_lng: this.state.longitude,

        //token: "fb313c463991d3bc3dc051094b667bdbf73790ec"//
        token: this.state.token
      })
        .then((response) => {
          if (response.status == 200) {
            //AsyncStorage.setItem('token', response.data.token);
            this.setState({ categories: response.data });
          }

        })
        .catch((error) => console.log('error', error));
    }
  }
  componentDidMount() {
    this.getCategoroies();
  }

  render() {
    let arr = [];
    if (this.state.categories) {
      const json_data = this.state.categories.data;
      console.log(" json ", json_data)

      for (var i in json_data)
        arr[i] = json_data[i];
      //arr.push( json_data[i]);
    }
    return (
      <View>
        {/* {this.loadCategories()} */}
        {this.state.categories && arr.map((item, key) => {
          console.log(" item :  ", key)
          return (

           // <Image style={styles.bgImageStyle} source={BgImage}/>
            <View key={key} style={styles.buttonContainer}>
              <Text>{item}</Text>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => {
                  // this.setState({
                  //   value: key,
                  //   selectedCat:item
                  // });
                  this.props.navigation.navigate(
                    'Dashboard',
                    { item },
                  );
                }}
              >
                {this.state.value === key && <View style={styles.checkedCircle} />}
                {console.log('selectedCat', this.state.selectedCat)}
              </TouchableOpacity>
            </View>
          );
        })
        }
        {/* {console.log("data bela ", this.state.categories )} */}
      </View>
    )
  }
}







// copied from stack overflow
// const tab_bar = TabNavigator({  // This tabNavigator is inside a stackNavigator, wich contains the 'login' view
//    Home: {
//      screen: Home
//    },
//    Logout: {
//      screen: Logout     // Empty screen, useless in this specific case
//        ,navigationOptions: ({navigation}) => ({
//            tabBarOnPress: (scene, jumpToIndex) => {
//                return Alert.alert(   // Shows up the alert without redirecting anywhere
//                    'Confirmation required'
//                    ,'Do you really want to logout?'
//                    ,[
//                      {text: 'Accept', onPress: () => { navigation.dispatch(NavigationActions.navigate({ routeName: 'login' }))}},
//                      {text: 'Cancel'}
//                     ]
//                );
//            },
//        })
//     },
// });
// copied from stack ends here






class Logout extends React.Component {
  signout=()=>{
    AsyncStorage.setItem('token', '');

    AsyncStorage.getItem('token').then((token)=>{
      console.log('new-token',token);
      // this.props.navigation.navigate('../Home/login');
    });

    //this.setState({token:''});
    //console.log('ttttoke',this.state);
    //this.props.navigation.navigate('Dashboard');
    //if(this.state==null || this.state.token=="")this.props.navigation.navigate('Signup');
  }
  // render() {
  //   return (
  //     <View>
  //       {/* <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener('signup')}>
  //             <Text style={styles.signUpText}>Sign Up</Text>
  //           </TouchableHighlight> */}
  //       {/* <Button
  //         onPress={() => this.props.navigation.navigate('Chat', {'user': 'login'})}
  //         title="logout"
  //       /> */}

  //       <TouchableOpacity
  //         style={styles.button}
  //         onPress={() => this.signout()}>
  //         <Text style={styles.text}>Logout</Text>
  //       </TouchableOpacity>
  //     </View>
  //   )
  // }
}

const MainScreenNavigator = createBottomTabNavigator({
  Dashboard: { screen: DashboardApp },
  Filter: { screen: FilterPlaces },
  Logout: { screen: Logout },
// Login:{screen: Login},
  Logout: {
    screen: Logout     // Empty screen, useless in this specific case
      ,navigationOptions: ({navigation}) => ({
          tabBarOnPress: (scene, jumpToIndex) => {
              return Alert.alert(   // Shows up the alert without redirecting anywhere
                  'Confirmation required'
                  ,'Do you really want to logout?'
                  ,[
                    {text: 'Accept', onPress: () => { 
                      AsyncStorage.setItem('token', '');
                      AsyncStorage.getItem('token').then((token)=>{
                        console.log('FInal-token',token);
                        // console.log('this.props.navigation',this.props.navigation);
                        // navigation.dispatch(navigation.navigate('../Home/login' ))
                        // navigation.navigate('Login' )
                        navigation.dispatch(NavigationActions.navigate({ routeName: 'login' }))
                        // this.props.navigation.navigate('../Home/login');
                      });
                    }},
                  
                    {text: 'Cancel'}
                   ]
              );
          },
      })
   },
})

const SimpleApp = createStackNavigator({
  Home: {
    screen: MainScreenNavigator,
    navigationOptions: {
      header:null
    },
  },
  // Logout: { screen: Login},
})

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <SimpleApp style={{ width: Dimensions.get("window").width }} />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#794F9B',
  },
})

// const styles = StyleSheet.create({

//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     textAlign: 'center',
//   },
//     container: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   map: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
// });
