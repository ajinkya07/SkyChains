import React, { useState, Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image, ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
} from 'react-native';
import { Container, Content, Icon, Toast } from 'native-base';
import IconPack from '@login/IconPack';
import LoginFields from '@login/LoginFields'
import { color } from '@values/colors';
import { OTPregisterRequest } from "@register/RegisterAction";
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');



class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      isFullName: false,
      emailId: '',
      isEmail: false,
      organisation: '',
      isOrganisation: false,
      password: '',
      isPassword: false,
      mobileNo: '',
      isMobile: false,
      successRegisterVersion: 0,
      errorRegisterVersion: 0,

    }
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      successRegisterVersion, errorRegisterVersion
    } = nextProps;
    let newState = null;

    if (successRegisterVersion > prevState.successRegisterVersion) {
      newState = {
        ...newState,
        successRegisterVersion: nextProps.successRegisterVersion,
      };
    }
    if (errorRegisterVersion > prevState.errorRegisterVersion) {
      newState = {
        ...newState,
        errorRegisterVersion: nextProps.errorRegisterVersion,
      };
    }
    return newState;
  }


  async componentDidUpdate(prevProps, prevState) {
    const { OTPregisterData } = this.props

    if (this.state.successRegisterVersion > prevState.successRegisterVersion) {
      if (OTPregisterData.otp != "" ) {
        this.showToast("OTP sent successfully", 'success')
        this.props.navigation.navigate('VerifyOtpForRegister', {
          mobile: OTPregisterData.mobile_number, otp: OTPregisterData.otp,
          password: this.state.password,
          emailId:this.state.emailId,
          organisation:this.state.organisation,
          fullName:this.state.fullName
        })
      } else {
        this.showToast('Please contact admin', 'danger')
      }
    }
    if (this.state.errorRegisterVersion > prevState.errorRegisterVersion) {
      this.showToast(this.props.errorMsg, 'danger')
    }
  }


  onInputChanged = ({ inputKey, isValid, value }) => {
    let validationKey = "";
    switch (inputKey) {

      case "fullName":
        validationKey = "isFullName";
        break;

      case "mobileNo":
        validationKey = "isMobile";
        break;

      case "emailId":
        validationKey = "isEmail";
        break;

      case "organisation":
        validationKey = "isOrganisation";
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

  register = () => {
    const {
      password, isPassword,
      mobileNo, isMobile,
      fullName, isFullName,
      organisation, isOrganisation,
      emailId, isEmail
    } = this.state;

    let error = "";
    try {

      if (!isFullName) {
        error = "Please enter full name";
        throw new Error();
      }
      if (!isMobile) {
        error = "Please enter valid mobile number";
        throw new Error();
      }
      if (!isEmail) {
        error = "Please enter valid email address";
        throw new Error();
      }
      if (!isOrganisation) {
        error = "Please enter organisation name";
        throw new Error();
      }
      if (!isPassword) {
        error = "Please enter valid password";
        throw new Error();
      }
      else {
        const data = new FormData();
        data.append('mobile_number', mobileNo);

        this.props.OTPregisterRequest(data)
      }
    } catch (err) {
      console.log("err", err.toString());
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

    const { fullName, emailId, organisation, mobileNo, password } = this.state
    return (
      <Container>
        <ImageBackground source={IconPack.LOGIN_BG} style={styles.bgImage}>
          <SafeAreaView style={styles.flex}>
            <View style={styles.viewContainer}>
              <LoginFields
                value={fullName ? fullName : null}
                type="fullName"
                inputKey="fullName"
                maxLength={30}
                minLength={3}
                onChangeText={this.onInputChanged}
                placeholder="Full name"
                returnKeyType="next"
                placeholderTextColor="#fbcb84"
                Icon={IconPack.MOBILE_LOGO}
              />
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
                value={emailId ? emailId : null}
                type="emailId"
                inputKey="emailId"
                maxLength={30}
                minLength={3}
                onChangeText={this.onInputChanged}
                placeholder="Email"
                returnKeyType="next"
                placeholderTextColor="#fbcb84"
                Icon={IconPack.MOBILE_LOGO}
              />
              <LoginFields
                value={organisation ? organisation : null}
                type="organisation"
                inputKey="organisation"
                placeholder="Organisation"
                maxLength={20}
                minLength={3}
                onChangeText={this.onInputChanged}
                returnKeyType="next"
                placeholderTextColor="#fbcb84"
                Icon={IconPack.MOBILE_LOGO}
              />
              <LoginFields
                value={password ? password : null}
                type="password"
                inputKey="password"
                maxLength={10}
                minLength={6}
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
                title="Register"
                onButonPress={() => this.register()}
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
    marginTop: 20,
    marginBottom: 50,
  },
  loaderView: {
    position: 'absolute', height: hp(100), width: wp(100),
    alignItems: 'center', justifyContent: 'center'
  },
});

function mapStateToProps(state) {
  return {
    isFetching: state.registerReducer.isFetching,
    error: state.registerReducer.error,
    errorMsg: state.registerReducer.errorMsg,
    successRegisterVersion: state.registerReducer.successRegisterVersion,
    errorRegisterVersion: state.registerReducer.errorRegisterVersion,
    OTPregisterData: state.registerReducer.OTPregisterData,
  };
}


export default connect(mapStateToProps, { OTPregisterRequest })(Register);



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

