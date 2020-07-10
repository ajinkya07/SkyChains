import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground, Image, StyleSheet,
  TouchableOpacity, ActivityIndicator, SafeAreaView,
  TextInput, Dimensions,
} from 'react-native';
import { Container, Content, Icon,Toast } from 'native-base';
import IconPack from '@login/IconPack';
const { width, height } = Dimensions.get('window');
import { sendOtpRequest } from "@forgotPassword/ForgotAction";
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LoginFields from '@login/LoginFields'
import { color } from '@values/colors';



class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isPassword: false,
      mobileNo: '',
      isMobile: false,
      successForgotVersion: 0,
      errorForgotVersion: 0,

    }
  }



  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      successForgotVersion, errorForgotVersion
    } = nextProps;
    let newState = null;

    if (successForgotVersion > prevState.successForgotVersion) {
      newState = {
        ...newState,
        successForgotVersion: nextProps.successForgotVersion,
      };
    }
    if (errorForgotVersion > prevState.errorForgotVersion) {
      newState = {
        ...newState,
        errorForgotVersion: nextProps.errorForgotVersion,
      };
    }
    return newState;
  }


  async componentDidUpdate(prevProps, prevState) {
    const {forgotData} = this.props

    if (this.state.successForgotVersion > prevState.successForgotVersion) {
      if (forgotData.otp != "") {
        this.showToast("OTP sent successfully", 'success')
        this.props.navigation.navigate('VerifyOtp', { mobile: forgotData.mobile_number, otp: forgotData.otp,
                                        password:this.state.password })
      } else {
        this.showToast('Please contact admin', 'danger')
      }
    }
    if (this.state.errorForgotVersion > prevState.errorForgotVersion) {
      this.showToast(this.props.errorMsg, 'danger')
    }
  }


  onInputChanged = ({ inputKey, isValid, value }) => {
    let validationKey = "";
    switch (inputKey) {

      case "mobileNo":
        validationKey = "isMobile";
        break;

      case "password":
        validationKey = "isPassword";
        break;
      default:
        break;
    }

    this.setState({
      [inputKey]: value,
      [validationKey]: isValid,
    });

  }

  sendOtp = () => {
    const {
      password,
      isPassword,
      mobileNo,
      isMobile,
    } = this.state;

    let error = "";
    try {

      if (!isMobile) {
        error = "Please enter valid mobile number";
        throw new Error();
      }
      if (!isPassword) {
        error = "Please enter valid password";
        throw new Error();
      }
      else {
        const data = new FormData();
        data.append('mobile_number', mobileNo);

        this.props.sendOtpRequest(data)
      }
    } catch (err) {
      console.log("err", err);
      this.showToast(error, 'danger')
    }
  }

  renderLoader = () => {
    return (
      <View style={styles.loaderView}>
        <ActivityIndicator size="large" color={color.white} />
      </View>
    )
  }

  showToast = (msg, type, duration) => {
    Toast.show({
      text: msg ? msg : 'Server error, Please try again',
      type: type ? type : "danger",
      duration: duration ? duration : 2500
    });
  }


  render() {
    const { mobileNo, password } = this.state

    return (
      <Container>
        <ImageBackground source={IconPack.LOGIN_BG} style={styles.bgImage}>
          <SafeAreaView style={styles.flex}>
            <View style={styles.viewContainer}>
              <View
                style={{
                  marginHorizontal: 60,
                  height: 90,
                }}>
                <Text
                  style={{
                    color: '#fbcb84',
                    fontWeight: '400',
                    fontSize: 30,
                    marginBottom: 10,
                    textAlign: 'center',
                  }}>
                  Forgot Password
              </Text>
                <Text
                  style={{ fontSize: 16, color: '#ffffff', textAlign: 'center' }}>
                  Enter the Mobile No. associated with your Account
              </Text>
              </View>
              <LoginFields
                value={mobileNo ? mobileNo : null}
                type="mobileNo"
                inputKey="mobileNo"
                maxLength={10}
                minLength={10}
                onChangeText={this.onInputChanged}
                placeholder="Mobile"
                returnKeyType="next"
                placeholderTextColor="#fbcb84"
                Icon={IconPack.MOBILE_LOGO}
              />
              <LoginFields
                value={password ? password : null}
                type="password"
                inputKey="password"
                maxLength={10}
                minLength={10}
                onChangeText={this.onInputChanged}
                placeholder="Password"
                returnKeyType="done"
                secureTextEntry
                placeholderTextColor=""
                placeholderTextColor="#fbcb84"
                isSecure={true}
                Icon={IconPack.KEY_LOGO}
              />
              <ActionButtonRounded
                title="Confirm"
                onButonPress={() => this.sendOtp()}
                containerStyle={styles.buttonStyle}
              />
            </View>
           
            {
              this.props.isFetching && this.renderLoader()
            }
        
          </SafeAreaView>
       
       
        </ImageBackground>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    height: '100%',
    width: '100%',
  },
  flex: { flex: 1 },
  buttonStyle: {
    marginTop: 65,
    marginBottom: 22,
  },
  loaderView: {
    position: 'absolute', height: hp(100), width: wp(100),
    alignItems: 'center', justifyContent: 'center'
  },
});


function mapStateToProps(state) {
  return {
    isFetching: state.forgotReducer.isFetching,
    error: state.forgotReducer.error,
    errorMsg: state.forgotReducer.errorMsg,
    successForgotVersion: state.forgotReducer.successForgotVersion,
    errorForgotVersion: state.forgotReducer.errorForgotVersion,
    forgotData: state.forgotReducer.forgotData,
  };
}


export default connect(mapStateToProps, { sendOtpRequest })(ForgotPassword);



//-------------ActionButtonCommon-----------//
const ActionButtonRounded = ({ title, onButonPress, containerStyle }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onButonPress();
      }}>
      <View
        style={[
          actionButtonRoundedStyle.mainContainerStyle,
          containerStyle || null,
        ]}>
        <View style={actionButtonRoundedStyle.innerContainer}>
          <Text style={actionButtonRoundedStyle.titleStyle}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const actionButtonRoundedStyle = StyleSheet.create({
  mainContainerStyle: {
    backgroundColor: '#11255a',
    height: 50,
    width: width - 80,
    justifyContent: 'center',
    borderRadius: 40,
    borderColor: '#ffffff',
    borderWidth: 2,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '400',
  },
});

//-----------xxxxx//----------------------//
