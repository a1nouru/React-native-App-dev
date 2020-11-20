import React from 'react'
import { Button, TouchableOpacity, StatusBar, Linking, ScrollView } from 'react-native';
import WebView from 'react-native-webview'
import styled from 'styled-components';
import { Ionicons } from "@expo/vector-icons";
import { color, event } from 'react-native-reanimated';
import MarkDown from 'react-native-showdown'

class SectionScreen extends React.Component {

  componentDidMount(){
    StatusBar.setBarStyle("light-content", true);
  }

  componentWillUnmount(){
    StatusBar.setBarStyle("dark-content", true);
  }

  static navigationOptions = {
    title: "Section",
    headerShown: false 
  };

  render() {
    const { navigation } = this.props;
    const section = navigation.getParam("section");
    return (
      <ScrollView>
      <Container>
        <Cover>
          <Image source={section.image}/>
          <Wrapper>
            <Logo source={section.logo}/>
            <Subtitle>{section.caption}</Subtitle>
          </Wrapper>
          <Title>{section.title}</Title>
          <Caption>{section.Subtitle}</Caption>
        </Cover>
        <TouchableOpacity 
          onPress={() => {
            this.props.navigation.goBack();
          }} 
          style={{position: "absolute", top: 50, right: 20}}
        >
          <CloseView>
            <Ionicons name="ios-close" size={36} color="4775f2" style={{marginTop: -2}}/>
          </CloseView>
        </TouchableOpacity>

        
        <Content>
          {/* <WebView 
            source={{ html: section.content + htmlStyles }} 
            scalesPageToFit={false} 
            scrollEnabled={false}
            ref={"webview"}
            onNavigationStateChange= { event => {

              if(event.url != "about:blank"){
                this.refs.WebView.stopLoading();
                Linking.openURL(event.url)
              }
            }}
          /> */}
          <MarkDown 
            body={section.content} 
            pureCSS={htmlStyles}
            scalesPageToFit={false} 
          />
        </Content>
       
      </Container>
      </ScrollView>
    ) 
  }
} 

export default SectionScreen;


const Container = styled.View`
  flex: 1;
`

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 50px;
  left: 20px;
  align-items: center;
`

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight : 600;
  text-transform: uppercase;
  padding-left: 10px;
  color: rgba(255, 255, 255, 0.8)
`

const Cover = styled.View`
  height: 375px;
`

const Image = styled.Image`
  height: 100%;
  width: 100%;
  position: absolute;
`

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 170px;
  top: 30%;
  left: 20px;
`

const Caption = styled.Text`
  font-size: 15px;
  color: white;
  font-weight: 500;
  bottom: 20px;
  position: absolute;
  left: 20px;
  width: 300px;
`

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`

const Content = styled.View`
  height: 100%;
  padding: 20px;
  background-color: white;
`

const htmlContent = `
  <h2>This is a title</h2>
  <p>This <strong>is</strong> a <a href="http://designcode.io">link</a></p>
  <img src="https://cl.ly/8861f359ed6d/download/Wave14.jpg" />
`;

const htmlStyles = `
  <style>
    * {
      font-family: -apple-system; 
      margin: 0;
      padding: 0;
      font-size: 17px; 
      font-weight: normal; 
      color: #b8bece;
      line-height: 24px;
    }

    h2 {
      font-size: 20px;
      text-transform: uppercase;
      color: #b8bece;
      font-weight: 600;
      margin-top: 50px;
    }

    p {
      margin-top: 20px;
    }

    a {
      color: #4775f2;
      font-weight: 600;
      text-decoration: none;
    }

    strong {
      font-weight: 700;
    }

  </style>
`;