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
  name: "",
} 

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case "OPEN_MENU": 
      return { action: "openMenu"};
    case "CLOSE_MENU": 
      return { action: "closeMenu"};
    case "UPDATE_NAME": 
      return { name: action.name };
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