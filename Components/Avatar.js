import React from "react"
import styled from "styled-components";
import { connect } from "react-redux"

function mapStateToProps(state) {
  return {
    name: state.name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateName: name => dispatch({
      type: "UPDATE_NAME",
      name: name,
    })
  }
}

class Avatar extends React.Component {

  state = {
    photo: "https://cl.ly/55da82beb939/download/avatar-default.jpg"
  }

  componentDidMount() {
    fetch("https://uifaces.co/api", {
      headers: new Headers ({
        "X-API-KEY": "60FB3C14-D4DF479F-937E02FB-CD8723F4",
      })
    })
    .then(response => response.json())
    .then(response => {
      this.setState({
        photo: response[0].photo
      });

      this.props.updateName(response[0].name)
    })
    .catch(function(error) {
      console.log('There was an error fetching profile avatar: ' + error.message);
    });
  }

  render(){
    return(
      <Image source={{ uri: this.state.photo}}/>
    )
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`