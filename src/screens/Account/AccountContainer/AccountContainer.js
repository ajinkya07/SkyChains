import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {Container, Content, Icon, Toast} from 'native-base';
import IconPack from '../../OnBoarding/Login/IconPack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { strings } from '@values/strings';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { version } from "../../../../package.json"



const AccountRow = ({icon, title, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.accountRowViewContainer}>
        <Image style={styles.imageStyle} source={icon} />
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.view}>
          <Image style={styles.forwardIconStyle} source={IconPack.FORWARD} />
        </View>
      </View>
      <View style={styles.border} />
    </TouchableOpacity>
  );
};
export default class AccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setLogout  = () =>{
    Alert.alert(
      'Do you want to logout',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'LOG OUT',
          onPress: () => {
            this.setLoginData()
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: 'SignIn' },
                ],
              })
            );
          },
        },
      ],
      {cancelable: false},
    );

  }


  setLoginData() {
    global.userId =  "";
    AsyncStorage.setItem('userId', "")
  }

  showAppVersion = ()=>{
    Toast.show({
      text:'App version:  ' + version,
      color:'warning',
      duration:3500
    })
  }
  render() {
    console.log("version",version);
    
    return (
      <View style={{flex: 1,width:wp(100)}}>
          <ScrollView showsVerticalScrollIndicator={false} >
            <ImageBackground
              source={IconPack.ACCOUNT_BG}
              style={styles.bgImage}>
              <View style={styles.topViewContainer}>
                <Image
                  style={styles.profileImageStyle}
                  source={IconPack.PROFILE}
                />
                <Text style={styles.profileName}>Aziz Khan</Text>
                <TouchableOpacity onPress={() => null}>
                  <Text style={styles.editProfileText}>EDIT PROFILE</Text>
                </TouchableOpacity>
              </View>
              <AccountRow
                title="Order History"
                icon={IconPack.ORDER_HISTORY}
                onPress={() => this.props.navigation.navigate('OrderHistory')}
              />
              <AccountRow
                title="Custom Order"
                icon={IconPack.CUSTOM_ORDER}
                onPress={() => this.props.navigation.navigate('CustomOrder')}
              />
              <AccountRow
                title="Exclusive"
                icon={IconPack.EXCLUSIVE}
                onPress={() => alert('Todo')}
              />
              <AccountRow
                title="About Us"
                icon={IconPack.ABOUT}
                onPress={() => this.props.navigation.navigate('AboutUs')}
              />
              <AccountRow
                title="Call / Email Us"
                icon={IconPack.EMAIL}
                onPress={() => alert('Todo')}
              />
              <AccountRow
                title="Social Media"
                icon={IconPack.PROFILE}
                onPress={() => alert('Todo')}
              />
              <AccountRow
                title="WhatsApp"
                icon={IconPack.WHATS_UP}
                onPress={() => alert('Todo')}
              />
              <AccountRow
                title="Share App"
                icon={IconPack.SHARE}
                onPress={() => alert('Todo')}
              />
              <AccountRow
                title="Rate App"
                icon={IconPack.RATE}
                onPress={() => alert('Todo')}
              />
              <AccountRow
                title="Version"
                icon={IconPack.VERSION}
                onPress={() => this.showAppVersion()}
                
              />
              <AccountRow
                title="Logout"
                icon={IconPack.LOGOUT}
                onPress={() => this.setLogout()}
              />
            </ImageBackground>
          </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    height: hp(100),
    width: wp(100),
  },
  imageStyle: {
    width: hp(3),
    height: hp(3),
  },
  forwardIconStyle: {
    width: hp(2),
    height: hp(2),
  },
  profileImageStyle: {
    width: hp(11),
    height: hp(11),
    borderRadius: hp(5),
    overflow: 'hidden',
  },
  editProfileText: {
    color: '#fbcb84',
    fontWeight: 'bold',
    fontSize: hp(2),
    textDecorationLine: 'underline',
  },
  profileName: {
    color: '#fbcb84',
    paddingTop: 8,
    paddingBottom: 10,
    fontSize: hp(3),
  },
  topViewContainer: {
    marginBottom: 55,
    marginLeft: 16,
    marginTop: hp(2),
  },
  accountRowViewContainer: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    marginHorizontal: 32,
    alignItems: 'center',
    padding: 12,
  },
  titleText: {
    fontSize: hp(2.2),
    color: '#fbcb84',
  },
  titleView: {
    flex: 1,
    marginLeft: 50,
  },
  border: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.6,
    marginHorizontal: 16,
  },
  view: {
    marginLeft: 80,
  },
});