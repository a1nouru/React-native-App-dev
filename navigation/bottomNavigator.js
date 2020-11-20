import React from 'react'
import {createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../Screens/HomeScreen'
import SectionScreen from '../Screens/SectionScreen'
import { Ionicons } from '@expo/vector-icons'
import ProjectScreen from '../Screens/ProjectScreens'
import CourseScreens from '../Screens/CourseScreens'

const activeColor = "#4775f2"
const inactiveColor = "#b8bece"

const HomeStack = createStackNavigator(
  {
  Home: HomeScreen,
  Section: SectionScreen,
  },
  {
    mode: "modal",
  }
)

HomeStack.navigationOptions = ({ navigation }) =>  {
  var tabBarVisible = true;
  var routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == "Section"){
    tabBarVisible = false;
  }

  return{
    tabBarVisible,
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }) => (
      <Ionicons name="ios-home" size={26} color={ focused ? activeColor : inactiveColor }/>
    )
  }
}

const CourseStack  = createStackNavigator({
  Course: CourseScreens
})

CourseStack.navigationOptions = {
  tabBarLabel: "Course", 
  tabBarIcon: ({ focused }) => (
    <Ionicons name="ios-albums" size={26} color={
      focused ? activeColor : inactiveColor
    }/>
  )
}

const ProjectStack = createStackNavigator({
  Project: ProjectScreen
})

ProjectStack.navigationOptions = {
  tabBarLabel: "Projects", 
  tabBarIcon: ({ focused }) => (
    <Ionicons name="ios-folder" size={26} color={
      focused ? activeColor : inactiveColor
    }/>
  )
}

const TabNavigator = createBottomTabNavigator({
  HomeStack,
  CourseStack, 
  ProjectStack,
})

export default TabNavigator;