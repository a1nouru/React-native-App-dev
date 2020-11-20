import React from 'react'
import { PanResponder, Animated } from 'react-native';
import styled from 'styled-components';
import Project from '../Components/Project';
import {connect} from 'react-redux'

function mapStateToProps(state) {
  return {
    action: state.action
  };
}

/*Increment index of current card to show next card. 
If Last index, then return 0. */
function getNextIndex(index) {
  var nextIndex = index + 1;
  return (nextIndex < projects.length)? nextIndex : 0;
}

class ProjectScreen extends React.Component {

  constructor(props) {
    super(props);

    //creating and enabling pan gesture when components mounts
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        //If we only want to click on the card and not move it,
        // disable the panGesture else enable it
        if (gestureState.dx == 0 && gestureState.dy == 0){
          return false;
        } else {
          //Disable panGesture if card is opened.
          return (this.props.action == "openCard") ? false : true; 
        }
      },

      //Called when we slide card the card
      onPanResponderGrant: () => {
        //When front card is moved away, move second card infront 
        Animated.spring(this.state.scale, { toValue: 1 }).start();
        Animated.spring(this.state.translateY, { toValue: 0 }).start();

        //Change third card dimensions to become second card dimensions 
        Animated.spring(this.state.thirdScale, { toValue: 0.9 }).start();
        Animated.spring(this.state.thirdTranslateY, { toValue: 44 }).start();
        Animated.timing(this.state.opacity, {toValue: 1}).start()
      },
      
      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y}
      ]), 

      //When card is moved and then released. 
      onPanResponderRelease: () => {
        const positionX = this.state.pan.x.__getValue();
        Animated.timing(this.state.opacity, {toValue: 0}).start()

        //If we slide a card past a certain X-number then discard the card
        if (positionX > 200){
          Animated.timing(this.state.pan, {
            toValue: {x: 1000, y: 1000}
          }).start(()=> {
            this.setState({index: getNextIndex(this.state.index)});
            
            this.state.scale.setValue(1);
            this.state.translateY.setValue(0);
            this.state.pan.setValue({x: 0, y: 0});

            this.state.thirdScale.setValue(0.8);
            this.state.thirdTranslateY.setValue(-50);
          });
        } 
        else {
          Animated.spring(this.state.pan, {toValue: {x: 0, y: 0}}).start();
          Animated.spring(this.state.scale, { toValue: 0.9 }).start();
          Animated.spring(this.state.translateY, { toValue: 44 }).start();

          Animated.spring(this.state.thirdScale, { toValue: 0.8 }).start();
          Animated.spring(this.state.thirdTranslateY, { toValue: -50 }).start();
        }
      }, 
    })
  }

  static navigationOptions = {
    title: "Section",
    headerShown: false 
  };

  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(0.9),
    translateY: new Animated.Value(44),
    thirdScale: new Animated.Value(0.8),
    thirdTranslateY: new Animated.Value(-50),
    index: 0,
    opacity: new Animated.Value(0),
  }

  render() {
    return (
      <Container>
        <AnimatedMask style={{opacity: this.state.opacity}} />

        <Animated.View 
          style={{
            transform: [
              {translateX: this.state.pan.x},
              {translateY: this.state.pan.y}
            ]
          }}
          {...this._panResponder.panHandlers}
        >
          <Project 
            title={projects[this.state.index].title}
            image={projects[this.state.index].image}
            text={projects[this.state.index].text}
            author={projects[this.state.index].author}
            canOpen={true}
          />
        </Animated.View>

        <Animated.View style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
          top: 0,
          left: 0,
          justifyContent: "center",
          alignItems: "center",
          transform: [
            {scale: this.state.scale}, 
            {translateY: this.state.translateY}
          ]}}
        >
          {/* Second card */}
          <Project 
            title={projects[getNextIndex(this.state.index)].title}
            image={projects[getNextIndex(this.state.index)].image}
            text={projects[getNextIndex(this.state.index)].text}
            author={projects[getNextIndex(this.state.index)].author}
          />
        </Animated.View>

        <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -3,
          top: 0,
          left: 0,
          justifyContent: "center",
          alignItems: "center",
          transform: [
            {scale: this.state.thirdScale}, 
            {translateY: this.state.thirdTranslateY}
          ]}}
        
        >
          {/* Third card */}
          <Project 
            title={projects[getNextIndex(this.state.index + 1)].title}
            image={projects[getNextIndex(this.state.index + 1)].image}
            text={projects[getNextIndex(this.state.index + 1)].text}
            author={projects[getNextIndex(this.state.index + 1)].author}
          />
        </Animated.View>
        
      </Container>
    ) 
  }
} 
 
export default connect(mapStateToProps)(ProjectScreen);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
`

const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -3;
  background: rgba(0,0,0, 0.25)
`

const AnimatedMask = Animated.createAnimatedComponent(Mask);

const Text = styled.Text`

`

const projects = [
  {
    title: "Price Tag",
    author: "Lexen Liue",
    image: require('../assets/background6.jpg'),
    text: "Don’t skip design. Learn design and code, by building real apps with React and Swift. Complete courses about the best tools.Don’t skip design. Learn design and code, by building real apps with React and Swift. Complete courses about the best tools."
  },
  {
    title: "Filming",
    author: "Deo Lamar",
    image: require('../assets/background1.jpg'),
    text: "Don’t skip design. Learn design and code, by building real apps with React and Swift. Complete courses about the best tools."
  },
  {
    title: "Arts & Music",
    author: "Larry Ade",
    image: require('../assets/background8.jpg'),
    text: "Don’t skip design. Learn design and code, by building real apps with React and Swift. Complete courses about the best tools."
  },
  {
    title: "Local Guide",
    author: "Kalisa Cedric",
    image: require('../assets/background14.jpg'),
    text: "Don’t skip design. Learn design and code, by building real apps with React and Swift. Complete courses about the best tools."
  }
]