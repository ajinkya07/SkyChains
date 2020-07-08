import React, { Component } from 'react';
import {
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  Dimensions,
} from 'react-native';
import { Icon, Header, Item, Input, Card, Body, Toast } from 'native-base';
import _Container from '@container/_Container';
import { color } from '@values/colors';
import _Tabs from '@tabs/_Tabs';
import HomePageStyle from '@homepage/HomePageStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { strings } from '@values/strings';


class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }




  onNotificationPress() {
    alert('inProgress')
    //this.props.navigation.navigate('Notification');
  }

  renderSearchbar = () =>{
    alert('inProgress')
    //this.props.navigation.navigate('SearchScreen');

  }


  render() {
    const { safeAreaView } = HomePageStyle;


    return (
      <SafeAreaView style={safeAreaView}>
        <_Container
          showHeader
          showSearch
          showNotification
          showCalling
          showLoading={false}
          onSearchPress={() => this.renderSearchbar()}
          onNotificationPress={() => this.onNotificationPress()}>
          <_Tabs />
        </_Container>
      </SafeAreaView>
    );
  }
}


export default Container
