import { View, Text, Image, SafeAreaView, Dimensions, Platform,StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '@values/colors';

const { width, height } = Dimensions.get('window')

export default {
    container: {
        height: hp(100), backgroundColor: 'white',
    },
    appNameView: {
        height: hp(20), justifyContent: 'center', alignItems: 'center' 
    },
    mainView: {
        height: hp(65),paddingTop:hp(8) ,
    },
    userNameView:{
        marginTop: hp(1)
    },
    passwordView:{
        marginTop: hp(2)
    },
    btnView:{
        marginTop: hp(5), alignItems: 'center'
    },
    nextBtn:{
        width: wp(90), borderRadius: 3, height: hp(7), alignItems: 'center', justifyContent: 'center',
    },
    getHelp:{
      flexDirection:'row',justifyContent:'center',  alignItems: 'center', marginTop: hp(2)
    },
    apiButtonMainView:{
        flexDirection: 'row', flex: 1
    },
   
    borderLine:{
        justifyContent: 'flex-end',
       marginTop:Platform.OS === 'ios' ? hp(5) : hp(7), borderTopColor: color.lightGray, borderTopWidth: hp(0.1), width: wp(100)
    },
    dontHaveView:{
     flexDirection: 'row', justifyContent: 'center',alignItems:'center' ,marginTop: Platform.OS ==='ios'? hp(2) : hp(3),
    },
    loaderView:{
        position:'absolute', height:hp(100), width:wp(100), alignItems:'center', justifyContent:'center'
    },
};