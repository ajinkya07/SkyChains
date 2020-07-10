import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Container from '@homepage/Container';
import SignIn from '@login/SignIn';
import Register from '@register/Register';
import ForgotPassword from '@forgotPassword/ForgotPassword';
import VerifyOtp from '@forgotPassword/VerifyOtp';


import AsyncStorage from '@react-native-community/async-storage';


const Stack = createStackNavigator();

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginValue: '',
    };
  }

  componentDidMount() {
    // this.getItem();
  }

  async getItem() {
    let value = await AsyncStorage.getItem('userId');

    if (value) {
      let parsed = JSON.parse(value);
      if (parsed) {
        global.userId = parsed;
        this.setState({ isLoginValue: true });
      } else {
        this.setState({ isLoginValue: false });
      }
    } else {
      this.setState({ isLoginValue: false });
    }
  }

  getLoginScene() {
    return (
      <Stack.Navigator initialRouteName={SignIn}>
        <Stack.Screen name="SignIn"
          component={SignIn} options={{ headerShown: false }}
        />
        <Stack.Screen name="Container"
          component={Container} options={{ headerShown: false }}
        />
        <Stack.Screen name="Register"
          component={Register} options={{ headerShown: false }}
        />
        <Stack.Screen name="ForgotPassword"
          component={ForgotPassword} options={{ headerShown: false }}
        />

        <Stack.Screen name="VerifyOtp"
          component={VerifyOtp} options={{ headerShown: false }}
        />


      </Stack.Navigator>

    );
  }

  getHomeScene() {
    return (
      <Stack.Navigator initialRouteName={SignIn}>
        <Stack.Screen name="SignIn"
          component={SignIn} options={{ headerShown: false }}
        />
        <Stack.Screen name="Container"
          component={Container} options={{ headerShown: false }}
        />
        <Stack.Screen name="Register"
          component={Register} options={{ headerShown: false }}
        />
        <Stack.Screen name="ForgotPassword"
          component={ForgotPassword} options={{ headerShown: false }}
        />

        <Stack.Screen name="VerifyOtp"
          component={VerifyOtp} options={{ headerShown: false }}
        />
      </Stack.Navigator>

    );
  }

  render() {
    const { isLoginValue } = this.state;
    return (
      <NavigationContainer>
        {/* {isLoginValue !== ''
          ? isLoginValue == true
            ? this.getHomeScene()
            : this.getLoginScene()
          : null} */}
        {this.getLoginScene()}

      </NavigationContainer>
    );
  }
}

export default Scene;
