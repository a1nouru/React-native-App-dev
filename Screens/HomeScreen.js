import React from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Animated, 
  Easing, 
  StatusBar, 
  Platform
} from 'react-native';
import styled from "styled-components"
import Card from '../Components/Card';
import { NotificationIcon } from "../Components/icons"
import Logo from '../Components/Logo';
import Course from '../Components/Course';
import Menu from '../Components/Menu';
import { connect } from 'react-redux'
import Avatar from '../Components/Avatar';
import gql from 'graphql-tag'
import { Query } from 'react-apollo';
import ModalLogin from '../Components/ModalLogin';

const CardsQuery = gql`
  {
    cardsCollection {
      items {
        title
        subtitle
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        subtitle
        caption
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        content
      }
    }
  }
`;

function mapStateToProps(state) {
  return { action: state.action, name: state.name }
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () => dispatch({
        type: "OPEN_MENU"
      }),
    openLogin: () => dispatch({
      type: "OPEN_LOGIN"
    })
  };
}
 
class HomeScreen extends React.Component {

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
  }

  static navigationOptions = {
    title: "Home",
    headerShown: false 
  }

  componentDidMount() {
    StatusBar.setBarStyle("dark-content", true)
  }

  componentDidUpdate() {
    this.togleMenu();
  }

  togleMenu = () => {
    if(this.props.action == "openMenu"){
      Animated.timing(this.state.scale, {
        toValue: 0.9, 
        duration: 300,
        easing: Easing.in(),
      }).start();

      Animated.spring(this.state.opacity, {
        toValue: 0.5,
      }).start();

      // StatusBar.setBarStyle("light-content", true);
    }

    if (this.props.action == "closeMenu"){    
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(),
      }).start();

      Animated.spring(this.state.opacity, {
        toValue: 1
      }).start();
    }

    //  StatusBar.setBarStyle("dark-content", true)
  };

  /*If user already logged-in(user name was set by firebase) 
  then openMenu else have user sign in. */
  handleAvatar = () => {
    if (this.props.name !== "Stanger") {
      this.props.openMenu();
    } else { this.props.openLogin()}
  }

  render(){
    return (
        <RootView>
          <Menu />

          <AnimatedContainer 
          style={{ transform: [{ scale: this.state.scale}], opacity: this.state.opacity }}>
          <SafeAreaView> 
            <ScrollView style={{height: "100%" }}> 
              <TitleBar>
                <TouchableOpacity 
                onPress={this.handleAvatar} 
                style={{ 
                  position: "absolute", 
                  top: 0, 
                  left: 20 
                }}>
                  <Avatar />
                </TouchableOpacity>
                <Tittle> Welcome back, </Tittle>
                <Name>{this.props.name}</Name>
                <NotificationIcon
                  style={{position: "absolute", right: 20, top: 5}}
                />
              </TitleBar>
    
              <ScrollView 
                style={{flexDirection: "row", padding: 20, paddingLeft: 12, paddingTop: 25}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {logos.map((logo, index) => (
                  <Logo key={`logo ${index}`} image={logo.image} text={logo.text} />
                ))}
              </ScrollView>
    
              <Subtitle>Continue Learning</Subtitle>
            
                <Query query={CardsQuery}>
                  {({loading, error, data}) => {
                    if (loading) return <Message>Loading...</Message>
                    if (error) {
                      console.log(error)
                      return (<Message>Error while fecting cards...</Message>)
                    }
                    
                    return (
                      <ScrollView horizontal={true} 
                        style={{flexDirection: "row", paddingBottom: 30}}
                        showsHorizontalScrollIndicator={false}
                      >
                        <CardsContainer>
                          {data.cardsCollection .items.map((card, index) => (
                            <TouchableOpacity key={`card ${index}`} onPress={()=>{
                              this.props.navigation.push("Section", {
                                section: card,
                              });
                            }}>
                              <Card 
                                title = {card.title}
                                image={card.image}
                                caption ={card.caption}
                                logo={card.logo}
                                subtitle={card.Subtitle}
                                content={card.content}
                              />
                            </TouchableOpacity>
                          ))}
                        </CardsContainer>
                      </ScrollView>
                    )
                  }}
                </Query>
    
              <Subtitle> Popular Courses </Subtitle>
              {courses.map((course, index) => (
                <Course
                  key={`course ${index}`}
                  title={course.title}
                  subtitle={course.subtitle}
                  logo={course.logo}
                  image={course.image}
                  author={course.author}
                  avatar={course.avatar}
                  caption={course.caption}
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
        <ModalLogin />
      </RootView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen)

const RootView = styled.View`
  background: black;
  flex: 1;

`

const Container = styled.View`
  flex:1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  
`;

const CardsContainer = styled.View`
  flex-direction: row;
  
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Tittle = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 40px;
  padding-left: 75px;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 14px;
  margin-left: 20px;
  margin-top: 10px;
  text-transform:uppercase;
`;

const Message = styled.Text`
  padding-left: 20px;
  font-weight: 500;
  font-size: 15px;
  color: #b8bece;
` 

const logos = [
  {
    image: require("../assets/logo-framerx.png"),
    text: "FramerX",
  },
  {
    image: require("../assets/logo-figma.png"),
    text: "Figma",
  },
  {
    image: require("../assets/logo-studio.png"),
    text: "Studio",
  },
  {
    image: require("../assets/logo-react.png"),
    text: "React",
  },
  {
    image: require("../assets/logo-swift.png"),
    text: "Swift",
  },
  {
    image: require("../assets/logo-sketch.png"),
    text: "Sketch",
  }
]

const cards = [
  {
    title: "React Native for Designers",
    image: require("../assets/background14.jpg"),
    caption : "React Native",
    logo: require("../assets/logo-react.png"),
    Subtitle: "1 of 12 Sections",
  },
  {
    title: "Styled Components",
    image: require("../assets/background12.jpg"),
    caption : "React Native",
    logo: require("../assets/logo-react.png"),
    Subtitle: "2 of 12 Sections",
  },
  {
    title: "Props and icons",
    image: require("../assets/background13.jpg"),
    caption : "React Native",
    logo: require("../assets/logo-react.png"),
    Subtitle: "3 of 12 Sections",
  },
  {
    title: "Static data and Loops",
    image: require("../assets/background11.jpg"),
    caption : "React Native",
    logo: require("../assets/logo-react.png"),
    Subtitle: "4 of 12 Sections",
  }
] 

const courses = [
  {
    title: "Designing swift UI",
    subtitle: "10 sections",
    logo: require("../assets/logo-swift.png"),
    image: require("../assets/background7.jpg"),
    author: "Okolo Ben",
    avatar: require("../assets/avatar.jpg"),
    caption : "Desing interactive Swift UI",
  },
  {
    title: "Getting started with Figma",
    subtitle: "13 sections",
    logo: require("../assets/logo-figma.png"),
    image: require("../assets/background6.jpg"),
    author: "John Devic",
    avatar: require("../assets/avatar.jpg"),
    caption : "Prototyping designs with Figma",
  },
  {
    title: "React UI",
    subtitle: "5 sections",
    logo: require("../assets/logo-react.png"),
    image: require("../assets/background12.jpg"),
    author: "David Gary",
    avatar: require("../assets/avatar.jpg"),
    caption : "Getting started with react UI",
  },
  {
    title: "Learning framerX",
    subtitle: "20 sections",
    logo: require("../assets/logo-framerx.png"),
    image: require("../assets/background9.jpg"),
    author: "Lee Yin",
    avatar: require("../assets/avatar.jpg"),
    caption : "Mastering FramerX designs",
  },
]