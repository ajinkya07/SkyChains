import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import IconPack from './IconPack';

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
    <View style={[styles.mainContainerStyle, containerStyle || null]}>
      <TextInput
        style={styles.textInput}
        placeholderTextColor={styles.whiteColor}
        underlineColorAndroid="transparent"
        autoCorrect={false}
        selectionColor={styles.whiteColor}
        autoCapitalize="none"
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
      />
      <View style={styles.loginIconStyle}>
        <Image style={styles.userTextInputButtonRight} source={Icon} />
      </View>
      {isPasswordField && (
        <View style={styles.buttonStyle}>
          <TouchableOpacity
            onPress={() => {
              setSecureInput(!secureInput);
            }}>
            <Image
              style={styles.userTextInputButtonRight}
              source={secureInput ? IconPack.HIDE : IconPack.UNHIDE}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 52,
    borderColor: 'yellow',
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: '#4d5c83',
    borderRadius: 30,
    fontWeight: 'bold',
  },
  whiteColor: {
    color: '#fff',
  },
  mainContainerStyle: {
    height: 70,
    width: '80%',
    //width: Appstore.wWidth -30,
  },
  userTextInputButtonRight: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
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

export default LoginFields;
