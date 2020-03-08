import React, {Component} from 'react';

import Dashboard from '../Dashboard/index';
//import Toast, {DURATION} from 'react-native-easy-toast';
import {
  Button,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  Alert,
  View,
  StyleSheet,
  ToastAndroid ,
  AsyncStorage
  } from 'react-native';

  import BgImage from '../images/bg.jpg';

  import Logo from '../images/logo.png';

  import { StackNavigator, createBottomTabNavigator  } from 'react-navigation';
  
  import axios from 'axios'; 
  
  import Signup from '../Signup/index';
  
  import { Form, Item, Label, Input, Thumbnail } from 'native-base';

  import { white } from 'ansi-colors';
// import {Ionicons} from '@expo/vector-icons'
//import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; 
// import { NavigationActions } from 'react-navigation';
class Login extends React.Component {

  static navigationOptions = {
    title: 'Tour Guide',
    //Sets Header text of Status Bar
    headerStyle: {
      backgroundColor: '#f4511e',
      //Sets Header color
    },
    headerTintColor: '#fff',
    //Sets Header text color
    headerTitleStyle: {
      fontWeight: 'bold',
      //Sets Header text style
    },
  };
  // static navigationOption = {
  //   title: 'Home',
  //   drawerIcon: ({ focused }) => (
  //     <Ionicons name= "md-home" size = {24} color = {focused ? 'blue' : 'black' }/>
  //   ),
  // };  
  constructor() {
    super();    
      this.state = {
        email: "",
        password: "",
        tokenValid:false,
        isLogin:true
        }
      }
      
      onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId);
      }
      
      componentWillMount(){
        AsyncStorage.getItem('token').then((token)=>{
        // console.log('jatoken',token);
        this.setState({token});
        this.validatetoken();   
        });
      }
      
      validatetoken = async(viewId) => {
        // console.log('calling now validate token');
        if(this.state.token==='')
        Alert.alert("Alert", "message"+viewId);
        else {
          // console.log("api" )
          const res = await axios.post('http://192.168.1.7:8080/app/validatetoken', {
          token: this.state.token
          })

         .then((response)=>{
            //  console.log('validate token response',response);
            if(response.data.status) this.setState({tokenValid:true});
          })
        
          .catch((error)=>console.log('validate token  error',error));
        }  
      }
      handleChange = event => {
        this.setState({
        [event.target.id]: event.target.value
            
      })
    }

    onSelect(index, value){
      this.setState({
      text: `Selected index: ${index} , value: ${value}`
      })
    }
    
    onClickListener = async(viewId) => {
      // Alert.alert("Alert", "jved"+viewId);
      if(viewId=="signup") this.props.navigation.navigate('Signup');//navigate('Signup');
      else{
        console.log('this.props.navigation',this.props.navigation);
      const { navigate } = this.props.navigation;
      
        if(this.state.email==='')
          Alert.alert("Alert", "Enter user Email ");

        else if(this.state.password==='')
          Alert.alert("Alert", "Enter Password");

        else {
            // console.log("api" )
            const res = await axios.post('http://192.168.1.7:8080/app/login', {
                email: this.state.email,//"some@gmail.com"
                password:this.state.password//"words"
            })
            .then((response)=>{
                // console.log('success',response.status);
                if(response.status == 200) {
                    // console.log('login response',response.data);
                    const data = response.data;
                    if(data.status) {
                      // AsyncStorage.getItem('token').then((value) => {
                      //   console.log('value',value);
                      //   if(value != null) 
                      //   this.setState({token:value});
                      // });

                      ToastAndroid.showWithGravityAndOffset(
                            'Login Successfully',
                            ToastAndroid.LONG,
                            ToastAndroid.TOP,
                            25,
                            50,
                          );

                        AsyncStorage.setItem('token', response.data.token);
                        this.setState({token: response.data.token,tokenValid:true});
                        navigate('Dashboard');
                        
                    } else {//Alert.alert('Info','Invalid Credentials');
                    ToastAndroid.showWithGravityAndOffset(
                        'Invalid Credentials',
                        ToastAndroid.LONG,
                        ToastAndroid.TOP,
                        25,
                        50,
                      );
                    }
                }
            })
            .catch((error)=>console.log('error',error));
        }
    }
    }

    loginUser = () => {
    }
    render() {
      
      if(this.state.tokenValid){
        return(
            <Dashboard/>
        )        
        
      }else {
        //this.props.navigation.navigate('Login');
      //const { navigate } = this.props.navigation;
      if(this.state.isLogin) {
        return(
          <View style={styles.containeStyle}>
            <Image style={styles.bgImageStyle} source={BgImage}/>
            <View style = {styles.logoStyle}>
              <Thumbnail square large source={Logo}/>
              <Text style = {styles.textLogoStyle}>TOUR GUIDE GILGIT-BALTISTAN</Text>
            </View>
            
            {/* <Form style={styles.formLoginStyle}>
              <Item floatingLabel>
                <Label>
                  <Text style={styles.inputStyle}>User Email</Text>
                </Label>
                <Input style={styles.inputStyle}/>
            
              </Item>
              <Item floatingLabel>
                <Label>
                  <Text style={styles.inputStyle}> Password</Text>
                </Label>
                <Input style={styles.inputStyle}secureTextEntry></Input>
              </Item>
            </Form> */}
            <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-128.png'}}/>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}/>
            </View>
            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://cdn2.iconfinder.com/data/icons/thin-line-icons-for-seo-and-development-1/64/SEO_key-128.png'}}/>
                <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})}/>
            </View>

            {/* <Button block info style ={styles.footerButtonStyle} onPress={() => this.onClickListener('Dashboard/index')}>
                <Text style={styles.signUpText}>
                   Login
                </Text>
            </Button> */}

          <View>
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('Dashboard/index')}>
                <Text style={styles.signUpText}> Login</Text>
            </TouchableHighlight>
            </View>

            {/* <View style={styles.footerSignupStyle}>
            <TouchableHighlight > */}
            {/* //onPress={() => this.onClickListener('restore_password')}> */}
              {/* <Text style={styles.signUpStyle}>
                Dont have an account? click Signup below
              </Text>
            </TouchableHighlight>
            </View> */}

            <View>
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('signup')}>
                <Text style={styles.signUpText}> Signup</Text>
            </TouchableHighlight>
            </View>
          </View>
        );
        } else {
          return (
              <Signup/>
          );
        }
      }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bgImageStyle: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:150,
    borderRadius:30
  },
  loginButton: {
    backgroundColor: "#27cae3",
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  signUpText: {
    color: 'white',
  },

    logoStyle: {
      marginTop: 70,
      marginBottom: 80,
      alignItems: 'center',
      justifyContent: 'center'
    },
    textLogoStyle: {
      fontSize: 15,
      color: 'white'
    },
    
  });
export default Login;