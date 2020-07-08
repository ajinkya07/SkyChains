import React, { Component } from 'react';
import {
    View, ActivityIndicator,
    TouchableOpacity,
     SafeAreaView,
     Dimensions,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LoginStyle from '@login/LoginStyle'
import _Text from '@text/_Text'
import { color } from '@values/colors';
import { strings } from '@values/strings'
import { Toast } from 'native-base';
// import { connect } from 'react-redux'
import { validateEmail, validatePassword } from '@values/validate';
import _InputBox from '@inputBox/_InputBox';

const { width, height } = Dimensions.get('window')


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            isPassword: false,
            emailId: '',
            isEmail: false,
            successLoginVersion: 0,
            errorLoginVersion: 0,
            userInfo: '',
        }
    }

  



    onInputChanged = ({ inputKey, isValid, value }) => {
        let validationKey = "";
        switch (inputKey) {

            case "emailId":
                validationKey = "isEmailId";
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
        const { loaderView } = LoginStyle
        return (
            <View style={loaderView}>
                <ActivityIndicator size="large" color={color.lightGray} />
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

    //  MANUAL LOGIN BY EMAIL PASSWORD

    loginPress() {
        const {
            password,
            isPassword,
            emailId,
            isEmailId,
        } = this.state;
        let error = "";
        try {

            if (!isEmailId) {
                error = "Please enter Valid EmailId";
                throw new Error();
            }
            if (password == "") {
                error = "Please enter Valid Password";
                throw new Error();
            }
            else {
                this.props.signInRequestNormal({ emailId, password })
            }
        } catch (err) {
            console.log("err", err);

            this.showToast(error, 'danger')
           
        }
    }


    render() {
        const { emailId, password } = this.state
        const { container, appNameView, mainView, fbLogo, userNameView, passwordView, btnView, getHelp,
            nextBtn, borderLine, dontHaveView } = LoginStyle

        const height = hp(18)
        const width = wp(100) + 40
        const profileTop = height - hp(5)

        return (
            <SafeAreaView style={container}>
                <View>
                    <View style={{
                        backgroundColor: color.loginColor,
                        height: height, top: -10, left: -20,
                        width: width,
                        borderBottomLeftRadius: (height + width) / 2,
                        borderBottomRightRadius: (height + width) / 2
                    }}>
                        <View style={appNameView}>
                            <_Text fsLogoName bold textColor={color.white}>{strings.appName}</_Text>
                        </View>
                    </View>

                    <View style={mainView}>
                        <View style={userNameView}>
                            <_InputBox label={"Email Id"}
                                maxLength={50}
                                minLength={3}
                                type="emailId"
                                inputKey="emailId"
                                value={emailId ? emailId : null}
                                onChangeText={this.onInputChanged} keyboardType="email-address"></_InputBox>
                        </View>

                        <View style={passwordView}>
                            <_InputBox maxLength={20}
                                minLength={6}
                                type="password"
                                inputKey="password"
                                value={password ? password : null}
                                secureText={true} label={"Password"}
                                onChangeText={this.onInputChanged}></_InputBox>
                        </View>

                        <View style={btnView}>
                            <TouchableOpacity
                                onPress={() =>this.props.navigation.navigate('Container')}
                                style={[nextBtn, { backgroundColor: color.loginColor }]}>
                                <_Text fsHeading fwPrimary textColor={color.white}>Login</_Text>
                            </TouchableOpacity>
                        </View>
                        <View style={getHelp}>
                            <_Text fsPrimary textColor={color.teritary}>Forgot password?</_Text>
                           
                            <TouchableOpacity onPress = {()=> alert("inProgress")}>
                            <_Text fsHeading fwPrimary textColor={color.loginColor}> Get Help</_Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    <View style={borderLine}></View>
                    <View style={dontHaveView}>
                        {/* <_Text fsPrimary textColor={color.teritary}>Don't have an account? </_Text> */}
                        <_Text fsPrimary textColor={color.teritary}>Not registered yet? </_Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                            <_Text fsHeading fwPrimary textColor={color.loginColor}>Register Here</_Text>
                        </TouchableOpacity>
                    </View>
                </View>
               
            </SafeAreaView>

        );
    }
}




export default Login

//TO GENERATE HASH KEY FOR FACEBOOK

//keytool -exportcert -alias androiddebugkey -keystore android/app/debug.keystore | openssl sha1 -binary | openssl base64
