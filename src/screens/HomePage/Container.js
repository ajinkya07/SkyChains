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
    this.props.navigation.navigate('Notification');
  }

  renderSearchbar = () => {
    this.props.navigation.navigate('SearchScreen');

  }

  renderCall = () => {
    alert('call')
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
          showLogo={false}
          showBack={false}
          showLoading={false}
          onSearchPress={() => this.renderSearchbar()}
          onCallingPress={() => this.renderCall()}
          onNotificationPress={() => this.onNotificationPress()}>
          <_Tabs />
        </_Container>
      </SafeAreaView>
    );
  }
}


export default Container
