import React from "react";
import styled from "styled-components";
import { Animated, Dimensions, TouchableOpacity } from "react-native"
import { LogBox } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import MenuItem from "./MenuItem";
import { connect } from "react-redux"

function mapStateToProps(state) {
  return { action: state.action, name: state.name }
}

function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () => 
      dispatch({
        type: "CLOSE_MENU"
      })
  };
}

const screenHeight = Dimensions.get("window").height;

class Menu extends React.Component {

    state = {
        top: new Animated.Value(900)
    }

    componentDidMount(){
        this.toggleMenu()
        //Ignore warning 
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }

    componentDidUpdate() {
      this.toggleMenu();
    }

    toggleMenu = () => {
      if (this.props.action == "openMenu"){
        Animated.spring(this.state.top, {
          toValue: 60,
        }).start();
      }

      if (this.props.action == "closeMenu"){
        Animated.spring(this.state.top, {
          toValue: screenHeight,
        }).start()
      }
    } 
    render() {  
        return (
            <AnimatedContainer style={{top: this.state.top}}>
                <Cover>
                  <Image source={require('../assets/background2.jpg')}/>                  
                  <Title>{this.props.name}</Title>
                  <Subtitle>nouru@uber.com</Subtitle>
                </Cover> 
                <TouchableOpacity 
                  onPress={this.props.closeMenu} 
                  style={{
                    position: "absolute", 
                    top: 120, 
                    left: "50%", 
                    marginLeft: -22,
                    zIndex: 1
                  }}
                >
                  <CloseView>
                    <Ionicons name="ios-close" size={44} color="#546bfb"/>
                    </CloseView>
                </TouchableOpacity>
                <Content>
                  {items.map((item, index) => (
                    <MenuItem 
                      key={`item ${index}`}
                      icon={item.icon}
                      title={item.title}
                      text={item.text}
                    />
                  ))}
                </Content>
            </AnimatedContainer >
        );
    }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Menu);

const CloseView = styled.View`
    width: 44px;
    height: 44px;
    background: white;
    align-items: center;
    border-radius: 22px;
    justify-content: center;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15)
`

const Container = styled.View`
    position: absolute;
    background: white;
    width: 100%;
    height: 100%;
    z-index: 100;
    border-radius: 14px;
    overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
    height: 142px;
    background: black;
    align-items: center;
    justify-content: center;
`;

const Content = styled.View`
    height: ${screenHeight};
    background: #f0f3f5;
    padding: 50px;
`;


const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute 

`

const Title = styled.Text`
  font-weight :500;
  color: white;
  font-size: 24px;

`

const Subtitle = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 8px;

`

const items = [
  {
    icon: "ios-settings",
    title: "Account",
    text: "settings"
  },
  {
    icon: "ios-card",
    title: "Billing",
    text: "payments"
  },
  {
    icon: "ios-compass",
    title: "Learn React",
    text: "start course"
  },
  {
    icon: "ios-exit",
    title: "Log out",
    text: "see you soon!"
  }
];