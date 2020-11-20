import React from "react";
import { 
  Keyboard, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  Animated, 
  Dimensions, 
  Alert 
} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";
import { BlurView } from 'expo-blur';
import Success from "./Success";
import { TabRouter } from "react-navigation";
import LoginAnimation from "./LoginAnimation";
import { connect } from 'react-redux';
import firebase from './Firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveState} from './AsynchStorage'
 
const screenHeight = Dimensions.get("window").height

function mapStateToProps(state) {
  return {
    action: state.action
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeLogin: () => dispatch({
        type: "CLOSE_LOGIN"
      }),
    updateName: (name) => 
      dispatch({
        type: "UPDATE_NAME",
        name
      }),
    updateAvatar: (avatar) => 
      dispatch({
        type: "UPDATE_AVATAR",
        avatar
      })
  };
}

class ModalLogin extends React.Component {

  state = {
    email: "",
    password: "",
    iConEmail: require("../assets/icon-email.png"),
    iConPassword: require("../assets/icon-password.png"),
    isLoginSuccess: false,
    isLoading: false,
    top: new Animated.Value(screenHeight),
    scale: new Animated.Value(1.3),
    translateY: new Animated.Value(0)
  }

  componentDidMount() {
     this.retrieveName();
  }
  componentDidUpdate() {
    if (this.props.action == "openLogin"){
      Animated.timing(this.state.top, {
        toValue: 0, 
        duration: 0,
      }).start();
      
      Animated.spring(this.state.scale, {toValue: 1}).start();
      Animated.timing(this.state.translateY, {toValue: 0, duration: 0}).start();
    }

    //Animation for when we close the login 
    if (this.props.action == "closeLogin"){
      setTimeout(() => {
        Animated.timing(this.state.top, {
          toValue: screenHeight, 
          duration: 0,
        }).start();
        Animated.spring(this.state.scale, {toValue: 1.3}).start();
      }, 500);
      
      Animated.timing(this.state.translateY, {toValue: 800, duration: 500}).start();
    }
  }

  storeName = async name => {
    try{
      await AsyncStorage.setItem("name", name)
    } catch(error) {}
  }

  retrieveName = async () => {
    try {
      const name =  await AsyncStorage.getItem("name")
      if (name !== null){
        this.props.updateName(name)
      }
    } catch {}
  }
  
  hanleLogin = () => {
    this.setState({ isLoading: true })

    const email = this.state.email
    const password = this.state.password

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        Alert.alert("Error", error.message)
      })
      .then(response => {
        this.setState({ isLoading: false })

        if (response){
          this.setState({ isLoginSuccess: true })

          this.fetchUser()

          //Close Login after successfully login
          setTimeout(() => {
            this.props.closeLogin();
            this.setState({ isLoginSuccess: false })
          }, 2000)
        }
      })
  } 

  fetchUser = () => {
    fetch("https://uifaces.co/api", {
      headers: new Headers ({
        "X-API-KEY": "60FB3C14-D4DF479F-937E02FB-CD8723F4",
      })
    })
    .then(response => response.json())
    .then(response => {
      const name = response[0].name
      const avatar = response[0].photo

      saveState({name, avatar})
      this.props.updateName(name)
      this.props.updateAvatar(avatar)
    })
    .catch(function(error) {
      console.log('There was an error fetching profile avatar: ' + error.message);
    });
  }

  onFocusEmail = () => {
    this.setState({
      iConEmail: require("../assets/icon-email-animated.gif"),
      iConPassword: require("../assets/icon-password.png"),
    })
  }

  onFocusPassword = () => {
    this.setState({
      iConEmail: require("../assets/icon-email.png"),
      iConPassword: require("../assets/icon-password-animated.gif"),
    })
  }

  tapBackground = () => {
    Keyboard.dismiss()
    this.props.closeLogin();
  }

  render() {
    return (
      <AnimatedContainer style={{top: this.state.top}}>
        <TouchableWithoutFeedback onPress={this.tapBackground}>
          <BlurView tint="default" intensity={100} style={{
            position: "absolute",
            width: "100%",
            height: "100%"}} 
          />    
        </TouchableWithoutFeedback>

        <AnimatedModal style={{
          transform: [
            {scale: this.state.scale},
            {translateY: this.state.translateY}
          ]
        }}>
          <Logo source={require("../assets/logo-dc.png")}/>
          <Text>Start Learing  Access pro content</Text>
          
          <TextInput 
            onChangeText={ email => this.setState({ email })}
            placeholder="Email" 
            keyboardType="email-address" 
            autoCapitalize='none'
            autoCorrect={false}
            onFocus={this.onFocusEmail}
          />
            
          <TextInput 
            onChangeText={ password => this.setState({ password })}
            placeholder="Password" 
            secureTextEntry={true} 
            autoCapitalize='none'
            autoCorrect={false}
            onFocus={this.onFocusPassword}
          />
        
          <IconEmail source={this.state.iConEmail}/>
          <IconPassowrd source={this.state.iConPassword}/>
          <TouchableOpacity onPress={this.hanleLogin}>
            <Button>
              <ButtonText>Log In</ButtonText>
            </Button>
          </TouchableOpacity>
        </AnimatedModal>

        <Success isActive={this.state.isLoginSuccess}/>
        <LoginAnimation isActive={this.state.isLoading}/>
      </AnimatedContainer>
    )
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ModalLogin);


const Container = styled.View`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const Modal = styled.View`
  width: 335px;
  height: 370px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`

const AnimatedModal = Animated.createAnimatedComponent(Modal)

const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`

const Text = styled.Text`
  margin-top: 15px;
  margin-bottom: 10px;
  
  font-size: 13;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  text-align: center;
  color: #b8bcec;
`

const TextInput = styled.TextInput`
  width: 295px;
  height: 44px;
  border: 1px solid #dbdfea;
  border-radius: 10px;
  font-size: 15px;
  color: #3c4560;
  margin-bottom: 20px;
  padding-left: 44px;
  
`
const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 165px;
  left: 31px;
`

const IconPassowrd = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 223px;
  left: 35px;
`

const Button = styled.View`
  width: 295px;
  height: 50px;
  background: #5263ff;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 10px #c2cbff;
`

const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
  font-weight: 600;
  text-transform: uppercase;

`