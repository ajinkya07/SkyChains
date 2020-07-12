import React, { Component } from 'react';
import {
  View, Text, FlatList,
  ImageBackground,
  Image
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
    this.state = {
    };
  }

  showNotification = () => {
    alert('showNotification from category')
  }
  onSearchPress = () => {
    alert('onSearch from category')
  }


  render() {
    return (
      <View>

        <ImageBackground source={require('../../assets/image/BGGradient.png')}
          style={{ width: wp(100), height: hp(100) }}
        >
          <View style={{ justifyContent: 'center', width: wp(100), paddingVertical: Platform.OS === 'ios' ? hp(14) : hp(9) }}>
            <FlatList
              onRefresh={() => alert('inProgress')}
              refreshing={false}
              data={LIST && LIST}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => (
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
                        textColor={color.white}
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
              )
              }
            />
          </View>
        </ImageBackground>
      </View>

    );
  }
}
