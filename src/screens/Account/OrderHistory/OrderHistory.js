import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView,
  Platform
} from 'react-native';
import _CustomHeader from '@customHeader/_CustomHeader'



export default class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={{flex:1}}>
        <_CustomHeader
          Title='Order History'
          LeftBtnPress={() => this.props.navigation.goBack()}
        />
        <View style={styles.viewContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('OrderHistoryDetail')}>
            <View>
              <Text>Order Number:75</Text>
              <View style={styles.rowTextStyle}>
                <Text>Order Date</Text>
                <Text>2020-07-04</Text>
              </View>
              <View style={styles.rowTextStyle}>
                <Text>Delivery Date</Text>
                <Text>2020-07-30</Text>
              </View>
              <View style={styles.rowTextStyle}>
                <Text>Total Weight</Text>
                <Text>167.000</Text>
              </View>
              <View style={styles.rowTextStyle}>
                <Text>Remarks</Text>
                <Text>Test</Text>
              </View>
              <View style={styles.bottomLine}></View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('OrderHistoryDetail')}>
            <View>
              <Text>Order Number:74</Text>
              <View style={styles.rowTextStyle}>
                <Text>Order Date</Text>
                <Text>2020-07-04</Text>
              </View>
              <View style={styles.rowTextStyle}>
                <Text>Delivery Date</Text>
                <Text>2020-07-30</Text>
              </View>
              <View style={styles.rowTextStyle}>
                <Text>Total Weight</Text>
                <Text>167.000</Text>
              </View>
              <View style={styles.rowTextStyle}>
                <Text>Remarks</Text>
                <Text>Test</Text>
              </View>
              <View style={styles.bottomLine}></View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('OrderHistoryDetail')}>
            <View>
              <Text>Order Number:72</Text>
              <View style={styles.rowTextStyle}>
                <Text>Order Date</Text>
                <Text>2020-07-04</Text>
              </View>
              <View style={styles.rowTextStyle}>
                <Text>Delivery Date</Text>
                <Text>2020-07-30</Text>
              </View>
              <View style={styles.rowTextStyle}>
                <Text>Total Weight</Text>
                <Text>167.000</Text>
              </View>
              <View style={styles.rowTextStyle}>
                <Text>Remarks</Text>
                <Text>Test</Text>
              </View>
              <View style={styles.bottomLine}></View>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  viewContainer: {
    marginTop: Platform.OS === 'ios' ? 12 : 10,
    marginHorizontal: 16,
  },
  rowTextStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Platform.OS === 'ios' ? 4 : 2,
  },
  bottomLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.6,
    marginVertical: 10,
  },
});
