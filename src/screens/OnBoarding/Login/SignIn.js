import React, { useState, Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput, ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { Container, Content, Icon, Toast } from 'native-base';
import IconPack from '@login/IconPack';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '@values/colors';
import { validateEmail, validateMobNum, validateName, validatePassword, validateUserName } from "@values/validate";

const { width, height } = Dimensions.get('window');

import { signInRequest } from "@login/LoginAction";



class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isPassword: false,
      mobileNo: '',
      isMobile: false,
      successLoginVersion: 0,
      errorLoginVersion: 0,
    }
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      successLoginVersion, errorLoginVersion
    } = nextProps;
    let newState = null;

    if (successLoginVersion > prevState.successLoginVersion) {
      newState = {
        ...newState,
        successLoginVersion: nextProps.successLoginVersion,
      };
    }
    if (errorLoginVersion > prevState.errorLoginVersion) {
      newState = {
        ...newState,
        errorLoginVersion: nextProps.errorLoginVersion,
      };
    }
    return newState;
  }


  async componentDidUpdate(prevProps, prevState) {
    console.log("this.props.loginData", this.props.loginData);

    if (this.state.successLoginVersion > prevState.successLoginVersion) {
      if (this.props.loginData.user_status === "Available") {
        this.showToast("Login successfull", 'success')
        this.props.navigation.navigate('Container')
      } else {
        this.showToast('Please contact admin', 'danger')
      }
    }

    if (this.state.errorLoginVersion > prevState.errorLoginVersion) {
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

  };

  renderLoader() {
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


  loginRequest() {
    const {
      password,
      isPassword,
      mobileNo,
      isMobile,
    } = this.state;

    console.log("this.state", this.state);

    let error = "";
    try {

      if (!isMobile) {
        error = "Please enter valid mobile number";
        throw new Error();
      }
      if (password == "") {
        error = "Please enter password";
        throw new Error();
      }
      else {
        const data = new FormData();
        data.append('mobile_number', mobileNo);
        data.append('password', password);
        data.append('login_type', 'client');

        this.props.signInRequest(data)
        // this.props.navigation.navigate('Container')
      }
    } catch (err) {
      console.log("err", err);
      this.showToast(error, 'danger')
    }
  }

  render() {
    const { mobileNo, password } = this.state

    return (
      <Container>
        <ImageBackground source={IconPack.LOGIN_BG} style={styles.bgImage}>
          <SafeAreaView style={styles.flex}>
            <KeyboardAvoidingView
              keyboardVerticalOffset={-10}
              behavior="height"
              style={{ flex: 1 }}>
              <Content
                contentContainerStyle={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
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
                      Login
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
                    minLength={6}
                    onChangeText={this.onInputChanged}
                    placeholder="Password"
                    returnKeyType="done"
                    secureTextEntry
                    placeholderTextColor="#fbcb84"
                    isSecure={true}
                    Icon={IconPack.KEY_LOGO}
                  />
                  <View style={{ justifyContent: 'flex-end', marginLeft: 110 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                      <Text
                        style={{
                          paddingVertical: 22,
                          fontSize: 18,
                          color: '#fbcb84',
                          marginBottom: 10,
                        }}>
                        Forgot your password ?
                    </Text>
                    </TouchableOpacity>
                  </View>

                  <ActionButtonRounded
                    title="Login"
                    onButonPress={() => this.loginRequest()}

                    containerStyle={styles.buttonStyle}
                  />


                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{ paddingTop: 12, fontSize: 18, color: '#fbcb84' }}>
                      Don't have an account ?
                  </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#fbcb84',
                          fontWeight: 'bold',
                          paddingTop: 12,
                        }}>
                        Signup
                    </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Content>
            </KeyboardAvoidingView>
         
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
    //marginTop: 60,
  },
  loaderView: {
    position: 'absolute', height: hp(100), width: wp(100),
    alignItems: 'center', justifyContent: 'center'
  },
});


function mapStateToProps(state) {
  return {
    isFetching: state.loginReducer.isFetching,
    error: state.loginReducer.error,
    errorMsg: state.loginReducer.errorMsg,
    successLoginVersion: state.loginReducer.successLoginVersion,
    errorLoginVersion: state.loginReducer.errorLoginVersion,
    loginData: state.loginReducer.loginData,

  };
}


export default connect(mapStateToProps, { signInRequest })(SignIn);




class LoginFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: undefined,
      isValid: undefined,
      showPassword: false,
      secureInput: false
    };
  }

  onChangeText = (text) => {
    const {
      type,
      inputKey,
      onChangeText,
      minLength,
      maxLength,
      inputId
    } = this.props;
    let isValid = false;

    console.log("this.props", this.props);

    if (text && text.length > 0) {
      switch (type) {

        case "mobileNo":
          isValid = validateMobNum(text);
          break;

        case "emailId":
          isValid = validateEmail(text);
          break;

        case "password":
          isValid = validatePassword(text);
          break;

        case "firstName":
          isValid = validateName(text);
          break;

        case "lastName":
          isValid = validateName(text);
          break;

        default:
          break;
      }
    }
    this.setState({ isValid, text });
    onChangeText && onChangeText({ inputKey, isValid, value: text, inputId });
  };


  setSecureInput = (secureInput) => {
    if (this.props.isSecure) {
      this.setState({
        secureInput: !this.state.secureInput
      })
    }
  }


  render() {

    const { containerStyle, isSecure, placeholder, maxLength, minLength, placeholderTextColor, Icon } = this.props
    const { isPasswordField, secureInput } = this.state

    return (
      <View
        style={[loginFieldsStyles.mainContainerStyle, containerStyle || null]}>
        <TextInput
          maxLength={maxLength}
          minLength={minLength}
          style={loginFieldsStyles.textInput}
          placeholderTextColor={loginFieldsStyles.whiteColor}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          selectionColor={loginFieldsStyles.whiteColor}
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={this.onChangeText}
          secureTextEntry={isSecure && !secureInput}
        />
        <View style={loginFieldsStyles.loginIconStyle}>
          <Image
            style={loginFieldsStyles.userTextInputButtonLeft}
            source={Icon}
          />
        </View>
        {isSecure && (
          <View style={loginFieldsStyles.buttonStyle}>
            <TouchableOpacity
              onPress={() => this.setSecureInput(secureInput)}>
              <Image
                style={loginFieldsStyles.userTextInputButtonRight}
                source={!secureInput ? IconPack.UNHIDE : IconPack.HIDE}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
};

const loginFieldsStyles = StyleSheet.create({
  textInput: {
    height: 50,
    fontSize: 18,
    color: 'white',
    textAlign: 'left',
    marginTop: 20,
    backgroundColor: '#4d5c83',
    borderRadius: 40,
    paddingLeft: 42,
  },
  whiteColor: {
    color: '#fff',
  },
  mainContainerStyle: {
    height: 70,
    width: width - 80,
    //width: Appstore.wWidth -30,
  },
  userTextInputButtonRight: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  userTextInputButtonLeft: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },
  buttonStyle: {
    position: 'absolute',
    right: 12,
    top: 20,
    bottom: 0,
    justifyContent: 'center',
  },
  loginIconStyle: {
    position: 'absolute',
    right: 0,
    top: 20,
    bottom: 0,
    left: 12,
    justifyContent: 'center',
  },
});

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


