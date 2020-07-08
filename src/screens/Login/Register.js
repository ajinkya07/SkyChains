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
    borderColor: 'yellow',
    fontSize: 18,
    color: '#ffffff',
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

export default function Register() {
  return (
    <Container>
      <ImageBackground source={IconPack.LOGIN_BG} style={styles.bgImage}>
        <SafeAreaView style={styles.flex}>
          <View style={styles.viewContainer}>
            <LoginFields
              value=""
              onChangeText={text => null}
              placeholder="Full name"
              returnKeyType="next"
              placeholderTextColor="#fbcb84"
              Icon={IconPack.MOBILE_LOGO}
            />
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
              placeholder="Email"
              returnKeyType="next"
              placeholderTextColor="#fbcb84"
              Icon={IconPack.MOBILE_LOGO}
            />
            <LoginFields
              value=""
              onChangeText={text => null}
              placeholder="Organisation"
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
            <ActionButtonRounded
              title="Register"
              onButonPress={() => {
                null;
              }}
              containerStyle={styles.buttonStyle}
            />
          </View>
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
    marginTop: 20,
    marginBottom: 50,
  },
});
