import React, { Component, useState } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ScrollView,
  Platform,
  StyleSheet,
  TextInput, ActivityIndicator,
  Alert,
} from 'react-native';
import { Container, Header, Toast, Picker, Icon } from 'native-base';
import IconPack from '@login/IconPack';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text'
import { color } from '@values/colors';
import { getProductDetails } from "@category/ProductDetailsAction";
import { urls } from '@api/urls'
import { strings } from '@values/strings'
import Swiper from 'react-native-swiper'
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import _CustomHeader from '@customHeader/_CustomHeader'




var userId = ''


const AnimatedContent = Animated.createAnimatedComponent(ScrollView);

const PickerDropDown = () => {
  const [selectedValue, setSelectedValue] = useState('18k');
  return (
    <View>
      <Picker
        iosIcon={<Icon name="arrow-down" style={{ marginRight: hp(4), fontSize: 20 }} />}
        mode="dropdown"
        style={{ height: 50, width: wp(55) }}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>

        <Picker.Item label="18k" value="18k" />
        <Picker.Item label="22k" value="22k" />
      </Picker>
    </View>
  );
};


const PickerWeightDropDown = (props) => {
  const [selectedValue, setSelectedValue] = useState(props.weight);
  return (
    <View >
      {/* <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label={props.weight} value={props.weight} />
      </Picker> */}

      <Picker
        iosIcon={<Icon name="arrow-down" style={{ marginRight: hp(4), fontSize: 20 }} />}
        mode="dropdown"
        style={{ height: 50, width: wp(55) }}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label={props.weight} value={props.weight} />
      </Picker>
    </View>
  );
};






class ProductDetails extends React.Component {

  fullHeight = EStyleSheet.value('375rem');
  fixHeader = EStyleSheet.value('0rem');
  topContentHeight = 550;


  constructor(props) {
    super(props);
    this.scrollY = new Animated.Value(0);

    const productItem = this.props.route.params.productItemDetails;
    this.state = {
      count: 1,
      remark: '',
      isHideDetail: true,
      length: '',
      productItem: productItem,
      successProductDetailsVersion: 0,
      errorProductDetailsVersion: 0,
      currentPage: 0

    };
    userId = global.userId;

  }

  componentDidMount = () => {
    const { productItem } = this.state

    const data = new FormData();
    data.append('table', 'product_master');
    data.append('mode_type', 'normal');
    data.append('collection_id', productItem.collection_id);
    data.append('user_id', userId);
    data.append('product_id', productItem.product_inventory_id);

    this.props.getProductDetails(data)
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    const { successProductDetailsVersion, errorProductDetailsVersion } = nextProps;
    let newState = null;

    if (successProductDetailsVersion > prevState.successProductDetailsVersion) {
      newState = {
        ...newState,
        successProductDetailsVersion: nextProps.successProductDetailsVersion,
      };
    }
    if (errorProductDetailsVersion > prevState.errorProductDetailsVersion) {
      newState = {
        ...newState,
        errorProductDetailsVersion: nextProps.errorProductDetailsVersion,
      };
    }
    return newState;
  }

  async componentDidUpdate(prevProps, prevState) {
    const { productDetailsData } = this.props;

    if (this.state.successProductDetailsVersion > prevState.successProductDetailsVersion) {
      if (productDetailsData.ack == '1') {
        this.setState({
          productDetailsStateData: productDetailsData.data[0],
          length: productDetailsData !== undefined ? productDetailsData.data[0].length : '',

        })
      } else {
        this.showToast(strings.serverFailedMsg, 'danger');
      }
    }
    if (this.state.errorProductDetailsVersion > prevState.errorProductDetailsVersion) {
      this.showToast(this.props.errorMsg, 'danger');
    }
  }


  showToast = (msg, type, duration) => {
    Toast.show({
      text: msg ? msg : strings.serverFailedMsg,
      type: type ? type : 'danger',
      duration: duration ? duration : 2500,
    });
  };



  _incrementCount() {
    this.setState({
      count: this.state.count + 1,
    });
  }
  _decrementCount() {
    if (this.state.count >= 2) {
      this.setState({
        count: this.state.count - 1,
      });
    }
  }

  toggleDescriptionDetails() {
    this.setState({
      isHideDetail: !this.state.isHideDetail,
    });
  }

  renderLoader = () => {
    return (
      <View style={styles.loaderView}>
        <ActivityIndicator size="large" color={color.white} />
      </View>
    );
  };

  setCurrentPage = (position) => {
    this.setState({ currentPage: position });
  }

  renderScreen = (data, k) => {
    const { productDetailsStateData } = this.state
    let url2 = urls.imageUrl + (productDetailsStateData !== undefined && productDetailsStateData.zoom_image)


    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('BannerImage', { bannerDataImagePath: productDetailsStateData, baseUrl: url2 })}>
        <View key={k}>
          <FastImage
            style={{ height: hp(30), width: wp(100) }}
            source={{
              uri: url2 + data,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />

        </View>
      </TouchableOpacity>

    )
  }

  carausalView = (item) => {
    return (
      <View style={{
        height: hp(33), width: wp(100),
        //borderBottomColor: color.gray,
        //borderWidth: !this.props.isFetching ? 0.5 : 0
      }}>
        {item ?
          <Swiper
            removeClippedSubviews={false}
            style={{ flexGrow: 1, }}
            autoplayTimeout={10}
            ref={(swiper) => { this.swiper = swiper; }}
            index={this.state.currentPage}
            autoplay={false}
            showsPagination={true}
            loadMinimal={true}
            loadMinimalLoader={<ActivityIndicator size="small" color='gray' />}
            dot={<View style={{
              backgroundColor: 'gray', width: 8, height: 8,
              borderRadius: 4, marginLeft: 3,
              marginRight: 3, top: 10
            }} />}
            activeDot={<View style={{
              backgroundColor: color.brandColor, width: 10, height: 10, borderRadius: 5,
              marginLeft: 3, marginRight: 3, top: 10
            }} />}
            onIndexChanged={(page) => this.setCurrentPage(page)}
          >
            {(item.image_name).map((page, index) => this.renderScreen(page, index))}
          </Swiper>
          : this.renderLoader()
        }
      </View>
    )
  }



  render() {
    const headerOpacity = this.scrollY.interpolate({
      inputRange: [0, 282, 283],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

    const { productDetailsStateData } = this.state

    let url = urls.imageUrl + (productDetailsStateData !== undefined && productDetailsStateData.zoom_image)

    return (
      <SafeAreaView style={styles.flex}>

        {productDetailsStateData ?
          <Container style={styles.flex}>
            <Header
              style={styles.headerStyle}
              iosBarStyle="default"
              androidStatusBarColor="default">
              <View style={styles.textViewStyle}>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                  <Image
                    source={require('../../assets/image/back.png')}
                    style={{marginLeft: 10,height: hp(2.2),width:  hp(2.2)
                    }}
                  />
             </TouchableOpacity>
                <Animated.Text
                  style={[styles.headerTextStyle,{opacity: headerOpacity}]}>
                  {productDetailsStateData.product_name}
                </Animated.Text>
              </View>
            </Header>

            <AnimatedContent
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
                {
                  useNativeDriver: true,
                },
              )}
              scrollEventThrottle={16}>
              <SafeAreaView style={styles.safeAreaViewStyle}>
                <View style={{ flex: 1 }}>
                  <View>
                    {/* <Image
                      source={{ uri: url + productDetailsStateData.image_name[0] }}
                      style={{ width: '100%', height: hp(38) }}
                      resizeMode='cover'
                    /> */}
                    {this.carausalView(productDetailsStateData)}
                  </View>

                  <View style={styles.mainContainerStyle}>
                    <View style={styles.topTitleContainer}>
                      <View style={{ width: wp(78) }}>
                        <Text style={{ fontSize: 20, color: color.brandColor }}>{productDetailsStateData.product_name}</Text>
                      </View>
                      <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                        <Image
                          source={IconPack.BLUE_WISHLIST}
                          style={styles.ImageStyle}
                        />
                        <Image
                          source={IconPack.BLUE_CART}
                          style={styles.ImageStyle}
                        />
                      </View>
                    </View>


                    <View style={styles.topBorderStyle}></View>
                    <View style={styles.quantityContainer}>
                      <View>
                        <Text style={{ fontSize: 20, color: 'gray' }}>Quantity</Text>
                      </View>
                      <View style={styles.quantitySubcontainer}>
                        <TouchableOpacity onPress={() => this._decrementCount()}>
                          <Image
                            source={IconPack.BLUE_MINUS}
                            style={styles.decrementCount}
                          />
                        </TouchableOpacity>
                        <TextInput
                          style={styles.countTextInput}
                          keyboardType={'numeric'}
                          onChangeText={count => this.setState({ count })}
                          value={String(this.state.count)}
                        />
                        <TouchableOpacity onPress={() => this._incrementCount()}>
                          <Image
                            source={IconPack.BLUE_PLUS}
                            style={styles.incrementCountIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.remarkContainer}>
                      <Image
                        source={IconPack.BLUE_CART}
                        style={styles.remarkIcon}
                      />
                      <TextInput
                        style={styles.remarksInput}
                        onChangeText={remark => this.setState({ remark })}
                        value={String(this.state.remark)}
                        placeholder="Remarks"
                        placeholderTextColor="gray"
                      />
                    </View>


                    <View style={styles.descriptionContainer}>
                      <TouchableOpacity
                        onPress={() => this.toggleDescriptionDetails()}>
                        <View style={styles.descriptionRowContainer}>
                          <Text style={{ fontSize: 20, color: 'gray' }}>Description</Text>
                          <Image
                            source={IconPack.GRAY_DOWN_ARROW}
                            style={styles.downArrow}
                          />
                        </View>
                      </TouchableOpacity>
                      {this.state.isHideDetail ? (
                        <>
                          <View style={{ marginTop: 10 }}>
                            <View style={styles.descriptionSubContainer}>
                              <View style={{ flexDirection: 'column' }}>
                                {(productDetailsStateData.key_label).map((key, i) => {
                                  return <Text style={{ marginTop: 10, fontSize: 17, color: 'gray' }}>{key.replace('_', ' ')}</Text>
                                })
                                }
                              </View>

                              <View style={{ flexDirection: 'column', }}>
                                {(productDetailsStateData.key_value).map((value, j) => {
                                  return <Text style={{ marginTop: 10, fontSize: 17, color: 'gray' }}>{value}</Text>
                                })
                                }
                              </View>

                            </View>
                          </View>
                        </>
                      ) : null}

                      <View style={styles.customerDetailTopborder}></View>
                      <Text
                        style={{
                          fontSize: 20, color: 'gray',
                          marginBottom: 10,
                          marginHorizontal: 10,
                        }}>
                        Customizable Detail
                  </Text>

                      {/* Melting */}
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: hp(3),
                          justifyContent: 'space-between',
                        }}>
                        <View style={styles.customizableContainer}>
                          <Text style={{ fontSize: 17, color: 'gray' }} >Melting</Text>
                        </View>
                        <PickerDropDown />
                      </View>


                      {/* WEIGHT */}



                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: hp(3),
                          justifyContent: 'space-between',
                        }}>
                        <View style={styles.customizableContainer}>
                          <Text style={{ fontSize: 17, color: 'gray' }}>Weight</Text>
                        </View>
                        <View>
                          <PickerWeightDropDown weight={productDetailsStateData.weight[0]} />
                        </View>
                      </View>

                      {/* LENGTH */}

                      <View style={styles.lenghtContainer}>
                        <View style={styles.customizableContainer}>
                          <Text style={{ fontSize: 17, color: 'gray' }}>Length</Text>
                        </View>
                        <View
                          style={{
                            width: '80%',
                            marginLeft: 110,
                          }}>
                          <TextInput
                            style={styles.lengthTextInput}
                            keyboardType={'numeric'}
                            onChangeText={length => this.setState({ length })}
                            value={String(this.state.length)}
                          />
                        </View>
                      </View>
                      <View style={styles.bottomTextContainer}>
                        <Text style={{ fontSize: 18, color: 'gray', textAlign: 'left' }}>
                          Note: * There may be 10% variation (+/-) in the actual
                      weight.{' '}
                        </Text>
                      </View>
                      {/* Footer buttons */}


                      <View
                        style={{
                          backgroundColor: '#11255a',
                          height: hp(6),
                          borderTopLeftRadius: 18,
                          borderTopRightRadius: 18,
                          flexDirection: 'row',
                          flex: 1,
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1.4,
                            borderRightWidth: 2,
                            borderRightColor: '#fbcb84',
                            margin: 3,
                          }}>
                          <Text
                            style={{ textAlign: 'center', color: '#fbcb84', fontWeight: '400' }}
                            onPress={() => Alert.alert('cart')}>
                            ADD TO CART
                      </Text>
                        </View>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                          }}>
                          <Text
                            style={{ textAlign: 'center', color: '#fbcb84', fontWeight: '400' }}
                            onPress={() => Alert.alert('wishlist')}>
                            WISHLIST
                      </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </AnimatedContent>

          </Container>
          :
          null
        }
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
  },
  loaderView: {
    position: 'absolute',
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 0,
    alignItems: 'center',
  },
  textViewStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTextStyle: {
    color: color.brandColor,
    fontSize: 22,
    //top: 3,
    marginLeft: 12
  },
  mainContainerStyle: {
    backgroundColor: '#fbcb84',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  topTitleContainer: {
    marginLeft: 10,
    marginTop: hp(1),
    flexDirection: 'row',
    width: wp(90),
    alignItems: 'center',
    marginBottom: hp(1),
  },
  ImageStyle: {
    width: hp(3),
    height: hp(3),
    resizeMode: 'contain',
    marginRight: 20,
  },
  topBorderStyle: {
    borderBottomColor: color.gray,
    borderBottomWidth: 0.5,
    marginHorizontal: 10
  },
  quantityContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  quantitySubcontainer: {
    flexDirection: 'row',
    marginLeft: hp(5),
    height: 50,
    alignItems: 'center',
    marginTop: hp(0.5)
  },
  decrementCount: {
    width: hp(5),
    height: hp(5),
    resizeMode: 'contain',
  },
  countTextInput: {
    borderBottomWidth: 0.5,
    height: 50,
    marginHorizontal: 10,
    width: wp(30),
    textAlign: 'center',
    fontSize: 22,
    color: color.brandColor
  },
  incrementCountIcon: {
    width: hp(5),
    height: hp(5),
    resizeMode: 'contain',
  },
  remarkContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    height: hp(9),
  },
  remarkIcon: {
    width: hp(4),
    height: hp(4),
    resizeMode: 'contain',
  },
  remarksInput: {
    borderBottomWidth: 1,
    height: 50,
    marginHorizontal: 15,
    width: wp(80),
    fontSize: 20,
    color: color.brandColor
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    marginTop: hp(1)
  },
  descriptionRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 20,
  },
  downArrow: {
    width: 15,
    height: 15,
    top: 5,
    resizeMode: 'contain',
    marginRight: 10,
  },
  descriptionSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: hp(1),
  },
  border: {
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 0.5,
    marginHorizontal: 20,
  },
  customerDetailTopborder: {
    borderBottomColor: '#D3D3D3',
    marginVertical: hp(3.5),
    borderBottomWidth: 1.5,
  },
  customizableContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lenghtContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginLeft: hp(3),

  },
  lengthTextInput: {
    borderBottomWidth: 1,
    height: 40,
    marginHorizontal: 10,
    width: '65%',
    fontSize: 18,
  },
  bottomTextContainer: {
    marginHorizontal: 10,
    marginTop: hp(3),
    marginBottom: hp(3),
  },
});


function mapStateToProps(state) {
  return {
    isFetching: state.productDetailsReducer.isFetching,
    error: state.productDetailsReducer.error,
    errorMsg: state.productDetailsReducer.errorMsg,
    successProductDetailsVersion: state.productDetailsReducer.successProductDetailsVersion,
    errorProductDetailsVersion: state.productDetailsReducer.errorProductDetailsVersion,
    productDetailsData: state.productDetailsReducer.productDetailsData,

  }
}

export default connect(mapStateToProps, { getProductDetails })(ProductDetails)