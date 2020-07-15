import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView, Dimensions, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import _Text from '@text/_Text'
import { color } from '@values/colors';

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;


export default {
  safeAreaView: {
    flex: 1,
    backgroundColor: color.white
  },
  mainContainer: {
    flex: 1,
    backgroundColor: color.white,
    // marginBottom:hp(1)
  },

  topHeading: {
    flexDirection: 'row', marginTop: hp(2), width: wp(100), paddingLeft: wp(2),
  },
  topHeading1: {
    flexDirection: 'row', marginTop: hp(3), width: wp(100),    paddingLeft: wp(2),
  },
  
  topHeading2: {
    flexDirection: 'row', marginTop: hp(5), width: wp(100),    paddingLeft: wp(2),
  },
  
  topHeading3: {
    flexDirection: 'row', marginTop: hp(5), width: wp(100),    paddingLeft: wp(2),
  },
  

  heading: {
    width: wp(65),
    paddingLeft: Platform.OS === 'ios' ? wp(2) : wp(1),

  },
  watchAllView: {
    width: wp(35), paddingRight: wp(4),
    justifyContent: 'flex-end', alignItems: 'center',
    flexDirection: 'row'
  },
  watchTouchableView: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
  },
  watchAllImage: {
    height: hp(1.8), width: hp(1.8), marginLeft: hp(0.8),top:1
  },

  horizontalCategory:{
        paddingLeft: wp(4),
  },

  categoryView: {
    alignItems: 'center', marginTop: hp(1.5),
    justifyContent: 'center',
    width: wp(26),
    marginRight:Platform.OS === 'ios' ? wp(4) : wp(1),

  },
  
  categoryImage: {
    height: hp(13),
    width: hp(13),
    borderColor:color.gray,
    borderWidth:0.2,
    borderRadius:10

  },

  horizontalLatestDesign:{
    backgroundColor:color.white,
    height:hp(39),width:wp(48),marginTop:hp(2),
    borderColor:color.gray,
    borderWidth:0.2,borderRadius:10,
    marginHorizontal: hp(1.5),
  },

  latestDesign: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(48)
    
  },
  latestImage: {
    height: hp(16),
    width: wp(48),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: 10,marginLeft:-2,
    marginTop:-2,
    alignItems: 'center',
    justifyContent: 'center',

  },
  latestTextView:{
    flexDirection:'row',
    width:wp(48),marginTop:hp(2),
    paddingHorizontal:hp(1)
  },
   latestTextView2:{
    flexDirection:'row',
    width:wp(48),marginTop:hp(1),
    paddingHorizontal:hp(1)
  },
  border: {
    marginTop: hp(1), borderTopColor: color.brandColor,
    borderWidth:0.5, width: wp(40),
},
iconView:{
  width:wp(48), marginTop: hp(2.5),
  flexDirection:'row',
  justifyContent:'space-around'
},
folloUs:{
  flexDirection:'row',
  width:wp(90),
  marginTop: hp(3),
  marginBottom:hp(2)
},
socialIconView:{
  flexDirection:'row',
  width:wp(35),
  marginLeft:hp(2.5),
  alignItems:'center',
  justifyContent:'space-around'

},
socialTextView:{
  alignItems:'center',
  width:wp(60),
  marginRight:hp(2),


}
}