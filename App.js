import React, { Component } from 'react';

import {
  Platform,
  Text,
  Image,
  View,
  StyleSheet,
  AsyncStorage,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  DrawerItems
} from 'react-navigation';

import Signup from './app/component/Signup/index';
import Login from './app/component/Home/login';
import Dashboard from './app/component/Dashboard/index';
  
// const AppNavigator = createStackNavigator({
//   Login: { screen: Login },
//   Signup: { screen: Signup }
// });

export default class App extends Component {

constructor(props) {
  super(props);
  this.state = {
    token:''
  }
}

render() {
  // if(this.state.token ==''){
    return (
      <View style={styles.container}>
        <Login/>
      </View>
    );
  // }else {
    // return (
    //   <View style={styles.container}>                 
    //     <Dashboard/> 
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#DCDCDC',
}
});
//*/

/*
import React from 'react';
import { ListView, Text, View, StyleSheet, Dimensions, Button } from 'react-native';
import { StackNavigator, createBottomTabNavigator  } from 'react-navigation';
import { Constants } from 'expo';

// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Welcome',
//   };
//   render() {
//     const { navigate } = this.props.navigation;
//     return (
//       <View>
//         <Text>Hello Chat app!</Text>
//         <Button
//           onPress={() => navigate('Chat', {'user': 'Lucy'})}
//           title="Chat with Lucy"
//         />
//       </View>
//     )
//   }
// }

class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${ navigation.state.params.user }`,
  });
  render() {
    const { params } = this.props.navigation.state; 
    return (
      <View>
        <Text>Chat with { params.user }</Text>
      </View>
    );
  }
}

class RecentChatsScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>List of recent chat.</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Chat', {'user': 'Jane'})}
          title="Chat with Janeee"
        />
      </View>
    )
  }
}

class AllContactsScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>List of all contact.</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Chat', {'user': 'Lucy'})}
          title="Chat with Lucy"
        />
      </View>
    )
  }
}

const MainScreenNavigator = createBottomTabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
})

const SimpleApp = StackNavigator({
  Home: { 
    screen: MainScreenNavigator,
    navigationOptions: {
      title: 'My Chatste',
    },
  },
  Chat: { screen: ChatScreen },
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
  } 
})
//*/