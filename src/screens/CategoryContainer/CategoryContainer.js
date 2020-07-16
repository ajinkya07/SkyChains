import React, { Component } from 'react';
import {
  View, Text, FlatList,
  ImageBackground, SafeAreaView,
  Image, TouchableOpacity,ActivityIndicator
}
  from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { strings } from '@values/strings';
import { color } from '@values/colors';
import { capitalizeFirstLetter } from "@values/validate";
import _Header from '@header/_Header'
import * as Animatable from 'react-native-animatable';
import _CustomHeader from '@customHeader/_CustomHeader'
import _Container from '@container/_Container';



const LIST = [
  { id: '1', name: 'Choco Chains' },
  { id: '2', name: 'Choco Chains' },
  { id: '3', name: 'Choco Chains' },
  { id: '4', name: 'Choco Chains' },
  { id: '5', name: 'Choco Chains' },
  { id: '6', name: 'Choco Chains' },
  { id: '7', name: 'Choco Chains' },
  { id: '8', name: 'Choco Chains' },
  { id: '9', name: 'Choco Chains' },
  { id: '1', name: 'Choco Chains' }


]

export default class CategoryContainer extends Component {
  constructor(props) {
    super(props);

    const collection = this.props.route ? this.props.route.params.collection : [];

    this.state = {
      categories: collection
    };
  }

  showNotification = () => {
    alert('showNotification from category')
  }
  onSearchPress = () => {
    alert('onSearch from category')
  }

  renderLoader = () => {
    return (
        <View style={styles.loaderView}>
            <ActivityIndicator size="large" color={color.brandColor} />
        </View>
    );
};


  render() {
    const{categories} = this.state

    console.log("categories", this.state.categories);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>

         {categories&&
          <_CustomHeader
            Title={'Category'}
            RightBtnIcon1={require('../../assets/image/BlueIcons/Search.png')}
            RightBtnIcon2={require('../../assets/image/BlueIcons/Notification.png')}
            LeftBtnPress={() => this.props.navigation.goBack()}
            RightBtnPressOne={() => alert("grid search")}
            RightBtnPressTwo={() => alert("grid notify")}
            rightIconHeight2={hp(3.5)}
            LeftBtnPress={() => this.props.navigation.goBack()}
          />}

          <View style={{ justifyContent: 'center', width: wp(100), marginBottom: hp(9) }}>
            <FlatList
              onRefresh={() => alert('inProgress')}
              refreshing={false}
              data={LIST && LIST}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => alert('ok')}>
                  <Animatable.View animation="flipInX" style={{ paddingTop: hp(0.5), paddingBottom: hp(0.5) }}>
                    <View style={{ flexDirection: 'row', flex: 1, marginLeft: hp(2), marginRight: hp(2) }}>
                      <View style={{ flex: 0.25, justifyContent: 'flex-start', }}>
                        <Image
                          style={{
                            height: hp(9), width: hp(9), borderRadius: 10,
                            borderWidth: 0.3, borderColor: '#DCDCDC'
                          }}
                          source={require('../../assets/image/insta.png')}
                          defaultSource={require('../../assets/image/default.png')}
                        />
                      </View>

                      <View style={{ alignContent: 'center', justifyContent: 'center', flex: 0.70 }}>
                        <_Text numberOfLines={2} fwPrimary
                          //textColor={color.white}
                          fsMedium style={{ marginRight: hp(3) }}>
                          {capitalizeFirstLetter(item.name)}
                        </_Text>
                      </View>
                    </View>
                    {index !== 9 &&
                      <View
                        style={{
                          paddingTop: hp(1), marginLeft: wp(22), marginRight: wp(3),
                          alignSelf: 'stretch',
                          borderBottomColor: '#D3D3D3',
                          borderBottomWidth: 1,
                        }}
                      />}
                  </Animatable.View>
                </TouchableOpacity>
              )
              }
            />
          </View>

          {!categories && this.renderLoader()}

      </SafeAreaView>

    );
  }
}
