import React from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { connect } from 'react-redux'
import { LinearGradient} from 'react-native-svg'
import { 
  Animated, 
  TouchableWithoutFeedback, 
  Dimensions,
  StatusBar, 
  TouchableOpacity
} from 'react-native'

function mapStateToProps(state) {
  return {
    action: state.action
  }
}

function mapDispatchToProps(dispatch) {
  return {
    openCard: () => 
      dispatch({
        type: "OPEN_CARD"
      }),
    closeCard: () => 
      dispatch({
        type: "CLOSE_CARD"
      })
  }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const tabBarHeight = 83;

class Project extends React.Component {

  state = {
    cardWith: new Animated.Value(315),
    cardHeight: new Animated.Value(460),
    titleTop: new Animated.Value(20),
    opacity: new Animated.Value(0),
    textHeight: new Animated.Value(150),
    textWidth: new Animated.Value(300)
  }

  openCard = () => {
    if (!this.props.canOpen) return 

    Animated.spring(this.state.cardWith, {toValue: screenWidth}).start()
    Animated.spring(this.state.cardHeight, {toValue: screenHeight - tabBarHeight} ).start()
    Animated.spring(this.state.titleTop, {toValue: 40}).start();
    Animated.timing(this.state.opacity, {toValue: 1}).start();
    Animated.spring(this.state.textHeight, {toValue: 1000}).start();
    Animated.spring(this.state.textWidth, {toValue: 380}).start();
    
    StatusBar.setHidden(true)
    this.props.openCard();
  }

  closeCard = () => {
    Animated.spring(this.state.cardWith, {toValue: 315}).start()
    Animated.spring(this.state.cardHeight, {toValue: 460} ).start()
    Animated.spring(this.state.titleTop, {toValue: 20}).start();
    Animated.spring(this.state.textHeight, {toValue: 150}).start();
    Animated.spring(this.state.textWidth, {toValue: 300}).start();
    this.state.opacity.setValue(0)

    StatusBar.setHidden(false)
    this.props.closeCard();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.openCard}>
        <AnimatedContainer style={{width: this.state.cardWith, height: this.state.cardHeight}}>
          <Cover>
            <Image source ={this.props.image}/>
            <AnimatedTitle style={{top: this.state.titleTop}}
              >
                {this.props.title}</AnimatedTitle>
            <Author>by {this.props.author}</Author>
          </Cover>
          <AnimatedText 
          style={{height: this.state.textHeight, width: this.state.textWidth}}
          >
            {this.props.text}
          </AnimatedText>

          {/* {Text fade} */}
          <AnimatedLinearGradient 
            colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
            style={{
              position: "absolute",
              top: 330,
              width: "100%",
              height: this.state.textHeight
            }}
          />
        
          <TouchableOpacity 
            onPress={this.closeCard}
            style={{
              position: "absolute", 
              top: 20,
              right: 20,
            }}
          >
            <AnimatedCloseView
              style={{opacity: this.state.opacity}}
            >
              <Ionicons name="ios-close" size={32} color="#546bfb"/>
              </AnimatedCloseView>
          </TouchableOpacity>

        </AnimatedContainer>

      </TouchableWithoutFeedback>
    )
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps,
)(Project);

const Container = styled.View`
  width: 300px;
  height: 440px;
  background-color: white;
  border-radius: 14px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.20);
`

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 290px;
`

const Image = styled.Image`
  height: 100%;
  width: 100%;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`

const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
  width: 300px;
`

const AnimatedTitle = Animated.createAnimatedComponent(Title)

const Author = styled.Text`
  left: 20px;
  position: absolute;
  bottom: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: bold;
  font-size: 15px;
  text-transform: uppercase;
`

const Text = styled.Text`
  padding: 20px;
  width: 300px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 24px;
  color: #3c4560;
`

const AnimatedText = Animated.createAnimatedComponent(Text)

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`

const AnimatedCloseView = Animated.createAnimatedComponent(CloseView)

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)