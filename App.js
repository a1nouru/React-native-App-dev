import React from "react"
import { createStore } from "redux"
import { Provider } from "react-redux"
import AppNavigator from "./navigation/AppNavigator"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"

const client = new ApolloClient({
  uri: "https://graphql.contentful.com/content/v1/spaces/ocgkxhzkrjbn",
  credentials: "same-origin",
  headers: {
    Authorization: `Bearer ByFBN5eG97Oon5OoYxpRPI2dk24J2TzNI1pflvnSHYs`
  }
})
const initialState = {
  action: "",
  name: "Stanger",
  avatar: "https://cl.ly/55da82beb939/download/avatar-default.jpg",
} 

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case "OPEN_MENU": 
      return { ...state, action: "openMenu"};
    case "CLOSE_MENU": 
      return { ...state, action: "closeMenu"};
    case "UPDATE_NAME": 
      return { ...state, name: action.name };
    case "UPDATE_AVATAR": 
      return { ...state, avatar: action.avatar };
    case "OPEN_CARD": 
      return { ...state, action: "openCard"};
    case "CLOSE_CARD": 
      return { ...state, action: "closeCard"};
    case "OPEN_LOGIN": 
      return { ...state, action: "openLogin"};
    case "CLOSE_LOGIN": 
      return { ...state, action: "closeLogin"};
    default: 
      return state;
  }
};

const store = createStore(reducer)
  
const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  </ApolloProvider>

)

export default App;