import React, {Component} from 'react';
import { StackNavigator, createStackNavigator  } from 'react-navigation';
import {View,Platform, Select,StyleSheet, ToastAndroid, Text, Button, TextInput,TouchableOpacity, TouchableHighlight, Image, Alert} from 'react-native';
//import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import axios from 'axios';

 import {Form, Item, Label, Input, Thumbnail } from 'native-base';

 import BgImage from '../images/bg.jpg';

class SignUpView extends Component {
    
      constructor(props) {
        super(props);

        state = {
          name: '',
          //gender:'',
          country:'',
          email   : '',
          create_password: '',
          //confirm_password: '',
        //   gender: [
        //     {
        //         label: 'Male',
        //         color: 'green',
        //     },
        //     {
        //         label: 'Female',
        //         color: 'green',
        //     }
        // ],
        }
       // genderOptions: ['Male', 'Female', 'Others']
        //onPress = gender => this.setState({ gender });
      }



      // static navigationOptions = {
      //   drawerIcon : ({tintColor}) => (
      //     <Icon name ="home" style= {{ fontsize:24, color: tintColor}}/>
      //   )
      // }




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
          
          const res = await axios.post('http://192.168.1.103:8080/app/signup', {
            name: this.state.name,
            //gender: this.state.gender,
            country: this.state.country,
            email: this.state.email,
            create_pasword:this.state.create_password,
            confirm_pasword:this.state.create_password,
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
      //  const { navigate } = this.props.navigation;

        // let selectedGender = this.state.gender.find(e => e.selected == true);
        // selectedGender = selectedGender ? selectedGender.value : this.state.gender[0].label;

        return (
          <View style={styles.container}>
             <Image style={styles.bgImageStyle} source={BgImage}/>
             <View style = {styles.logoStyle}>
              {/* <Thumbnail square large source={Logo}/> */}
              <Text style = {styles.textLogoStyle}>TOUR GUIDE GILGIT-BALTISTAN</Text>
              
            </View>
            {/* <header>
              <Left>
                <Icon name = "menu" onPress={()=> this.props.navigation.openDrawer()}/>
              </Left>
            </header> */}
            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon} source={{uri: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-128.png'}}/>
              <TextInput style={styles.inputs}
                  placeholder="Full name"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  onChangeText={(name) => this.setState({name})}/>
            </View>
            {/* <Select title={'Gender'}
       name={'gender'}
       options = {this.state.genderOptions} 
       value = {this.state.newUser.gender}
       placeholder = {'Select Gender'}
       handleChange = {this.handleInput}
/> */}

            {/* <View style={styles.container}>
                <Text style={styles.header}>
                    Selected Gender - {selectedGender}
                </Text>
                <RadioGroup radioButtons={this.state.gender} onPress={this.onPress} />
            </View> */}
    
            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon} source={{uri: 'https://cdn3.iconfinder.com/data/icons/faticons/32/globe-01-512.png'}}/>
              <TextInput style={styles.inputs}
                  placeholder="Country"
                  keyboardType="text"
                  underlineColorAndroid='transparent'
                  onChangeText={(country) => this.setState({country})}/>
            </View>
            
            <View style={styles.inputContainer}>
              <Image style={styles.inputIcon} source={{uri: 'https://cdn2.iconfinder.com/data/icons/ikooni-outline-seo-web/128/seo3-22-128.png'}}/>
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
                  onChangeText={(create_password) => this.setState({create_password})}/>
            </View>

            {/* <View style={styles.inputContainer}>
              <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
              <TextInput style={styles.inputs}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  underlineColorAndroid='transparent'
                  onChangeText={(confirm_password) => this.setState({confirm_password})}/>
            </View> */}
    
            {/* <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener('signup')}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableHighlight> */}
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
                <Text style={styles.signUpText}> signup</Text>
            </TouchableHighlight>
          </View>
        );
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
      textLogoStyle: {
        fontSize: 15,
        marginBottom: 50,
        color: 'white'
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
        backgroundColor: "#079434",
      },
      signUpText: {
        color: 'white',
      }
    });
    export default SignUpView;