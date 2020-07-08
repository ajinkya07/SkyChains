import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {Container, Content, Icon} from 'native-base';
import IconPack from './IconPack';
const {width, height} = Dimensions.get('window');

const LoginFields = ({
  containerStyle,
  isSecure,
  placeholder,
  placeholderTextColor,
  Icon,
}) => {
  const [secureInput, setSecureInput] = useState(isSecure);
  var isPasswordField = false;
  if (isSecure) {
    isPasswordField = true;
  }
  return (
    <View
      style={[loginFieldsStyles.mainContainerStyle, containerStyle || null]}>
      <TextInput
        style={loginFieldsStyles.textInput}
        placeholderTextColor={loginFieldsStyles.whiteColor}
        underlineColorAndroid="transparent"
        autoCorrect={false}
        selectionColor={loginFieldsStyles.whiteColor}
        autoCapitalize="none"
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
      />
      <View style={loginFieldsStyles.loginIconStyle}>
        <Image
          style={loginFieldsStyles.userTextInputButtonLeft}
          source={Icon}
        />
      </View>
      {isPasswordField && (
        <View style={loginFieldsStyles.buttonStyle}>
          <TouchableOpacity
            onPress={() => {
              setSecureInput(!secureInput);
            }}>
            <Image
              style={loginFieldsStyles.userTextInputButtonRight}
              source={secureInput ? IconPack.UNHIDE : IconPack.HIDE}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
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
const ActionButtonRounded = ({title, onButonPress, containerStyle}) => {
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

export default function SignIn({navigation}) {
  return (
    <Container>
      <ImageBackground source={IconPack.LOGIN_BG} style={styles.bgImage}>
        <SafeAreaView style={styles.flex}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={-10}
            behavior="height"
            style={{flex: 1}}>
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
                  value=""
                  onChangeText={text => null}
                  placeholder="Mobile"
                  returnKeyType="next"
                  placeholderTextColor="#fbcb84"
                  Icon={IconPack.MOBILE_LOGO}
                />
                <LoginFields
                  value=""
                  onChangeText={text => null}
                  placeholder="Password"
                  returnKeyType="done"
                  secureTextEntry
                  placeholderTextColor=""
                  placeholderTextColor="#fbcb84"
                  isSecure={true}
                  Icon={IconPack.KEY_LOGO}
                />
                <View style={{justifyContent: 'flex-end', marginLeft: 110}}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
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
                  onButonPress={() => navigation.navigate('Container')}

                  containerStyle={styles.buttonStyle}
                />
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{paddingTop: 12, fontSize: 18, color: '#fbcb84'}}>
                    Don't have an account ?
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Register')}>
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
        </SafeAreaView>
      </ImageBackground>
    </Container>
  );
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
  flex: {flex: 1},
  buttonStyle: {
    //marginTop: 60,
  },
});