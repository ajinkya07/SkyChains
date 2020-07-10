import React, { Component } from 'react';
import { color } from '@values/colors';
import { View, Image, Platform, Text } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Header, Left, Body, Right, Button, Title } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

class _Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      showBack,
      onSearchPress,
      onNotificationPress, onCallingPress,
      title,
      showSearch, showCalling, showNotification,
      profilePic,
    } = this.props;

    return (
      <Header
        style={{
          width: wp(100),
          height: hp(7.5),
          paddingVertical: Platform.OS === 'ios' ? hp(2) : 2,
          backgroundColor: '#FFFFFF',
        }}>
        <Left style={{marginLeft:hp(1),width:wp(30)}}>
          <Button transparent>
            {showBack ? (
              <Image
                style={{ height: hp(2.5), width: hp(2.5) }}
                source={require('../../assets/image/back.png')}
              />
            ) : (
                <View style={{marginTop:2,marginBottom:2,width:wp(40)}}>
                  <Text style={{ fontWeight:'500',color: color.brandColor,fontSize: hp(2.5) }}>SAR</Text>
                  <Text style={{ color: color.brandColor,marginTop:2,fontSize: hp(1.5) }}>A Royal Chains Brand</Text>
                </View>
              )}
          </Button>
        </Left>

        {/* right side operation */}

        <Right>
          {showSearch ? (
            <Button transparent onPress={onSearchPress}>
              <Image
                style={{ height: hp(2.8), width: hp(2.8) }}
                source={require('../../assets/image/BlueIcons/Search.png')}
              />
            </Button>
          ) : null
          }

          <Button transparent onPress={onCallingPress}>
            <Image
              style={{ height: hp(3), width: hp(3) }}
              source={require('../../assets/image/BlueIcons/Phone.png')}
            />
          </Button>


          <Button transparent onPress={onNotificationPress}>
            <Image
              resizeMode={'cover'}
              style={{ height: hp(3.2), width: hp(3.2) }}
              source={require('../../assets/image/BlueIcons/Notification.png')}
            // defaultSource={require('../../assets/img/defaultImage.png')}
            />
          </Button>
        </Right>
      </Header>
    );
  }
}

export default _Header;
