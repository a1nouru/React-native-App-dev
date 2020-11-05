import React from 'react'
import { Button } from 'react-native';
import styled from 'styled-components';

class CourseScreens extends React.Component {

  static navigationOptions = {
    title: "Section",
    headerShown: false 
  };

  render() {
    return (
      <Container>
        <Text>Course Screen</Text>
      </Container>
    ) 
  }
} 

export default CourseScreens;


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Text = styled.Text`

`