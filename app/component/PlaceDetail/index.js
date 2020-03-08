import React, {Component} from 'react';
import { StackNavigator, createStackNavigator  } from 'react-navigation';
import {View,Platform, Select,StyleSheet, ToastAndroid, Text, Button, TextInput,TouchableOpacity, TouchableHighlight, Image, Alert} from 'react-native';
//import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import axios from 'axios';

// import {Header, Left,Right, Icon} from 'native-base';
    
   export default class PlaceDetail extends Component {
    
      constructor(props) {
        super(props);

        state = {
          name: '',
          //gender:'',
          country:'',
          email   : '',
          create_password: '',
          
        }
    }

      handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }


      onSelect(index, value){
        this.setState({
          text: `Selected index: ${index} , value: ${value}`
        })
      }

      onClickListener = async(viewId) => {

        console.log('calling now');
        if(this.state.name==='')
          Alert.alert("Alert", "Enter full name "+viewId);
        // else if(this.state.gender==='')
        //   Alert.alert("Alert", "Select Gender "+viewId);
        else if(this.state.country==='')
          Alert.alert("Alert", "Select country "+viewId);
        else if(this.state.email==='')
        Alert.alert("Alert", "Enter valid email "+viewId);
        
        else {
          console.log("api " )
          
          const res = await axios.post('http://192.168.9.86:8080/app/signup', {
            name: this.state.name,
            //gender: this.state.gender,
            country: this.state.country,
            email: this.state.email,
            create_pasword:'test',
            confirm_pasword:'test',
            gender:1
      })
      .then((response)=>{
        // console.log('success',response.status);
        if(response.status == 200) {
            console.log('data',response.data);
            const data = response.data;
            if(data.status) {
                const token = data.token;
                ToastAndroid.showWithGravityAndOffset(
                    //toastColor= 'green',
                    'Sigup Successfully',
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50,
                  );
            } else {//Alert.alert('Info','Invalid Credentials');
            ToastAndroid.showWithGravityAndOffset(
                //toastColor= 'red',
                'The user already exits',
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
  
signupUser = () => {
}

      render() {
     
        return (
          <View style={styles.container}>
            
            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
              <TextInput style={styles.inputs}
                  placeholder="Full name"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  onChangeText={(name) => this.setState({name})}/>
            </View>
            

          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#455a64'
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
          flex:1,
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
        borderRadius:30,
      },
      loginButton: {
        backgroundColor: "#FF4DFF",
      },
      signUpText: {
        color: 'white',
      }
    });