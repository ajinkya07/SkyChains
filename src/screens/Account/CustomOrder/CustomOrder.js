import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class CustomOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
        <Text> CustomOrder </Text>
      </View>
    );
  }
}
