import React, { Component, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity, FlatList,
  StyleSheet, ActivityIndicator,
  Dimensions, ScrollView
} from 'react-native';
import { Container, Tab, Tabs, TabHeading, Icon } from 'native-base';
import IconPack from '@login/IconPack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text'
import { color } from '@values/colors';
import { getCartData, getWishlistData } from '@cartContainer/CartContainerAction';
import { connect } from 'react-redux';
import { urls } from '@api/urls'



var userId = ''

const { width } = Dimensions.get('window');


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
    height: 42,
    width: width - 36,
    justifyContent: 'center',
    borderRadius: 40,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: '#fbcb84',
    fontSize: 14,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '400',
  },
});



class CartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      isToggle: false,
      isToogleTwo:false,
      cartStateData:[],
      wishStateData:[],
      openMoreDetailsIdwish:'',
      openMoreDetailsIdCart:'',

      successCartVersion: 0,
      errorCartVersion: 0,

      successWishlistVersion: 0,
      errorWishlistVersion: 0,
    };
    userId = global.userId;

  }

  componentDidMount = async() => {
    const type = Platform.OS === 'ios' ? 'ios' : 'android'

    const data = new FormData();
    data.append('user_id', userId);
    data.append('table', 'cart');

    await this.props.getCartData(data)

    const data2 = new FormData();
    data2.append('user_id', userId);
    data2.append('table', 'wishlist');

    await this.props.getWishlistData(data2)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { successCartVersion, errorCartVersion,
      successWishlistVersion, errorWishlistVersion } = nextProps;
    let newState = null;

    if (successCartVersion > prevState.successCartVersion) {
      newState = {
        ...newState,
        successCartVersion: nextProps.successCartVersion,
      };
    }
    if (errorCartVersion > prevState.errorCartVersion) {
      newState = {
        ...newState,
        errorCartVersion: nextProps.errorCartVersion,
      };
    }
    if (successWishlistVersion > prevState.successWishlistVersion) {
      newState = {
        ...newState,
        successWishlistVersion: nextProps.successWishlistVersion,
      };
    }
    if (errorWishlistVersion > prevState.errorWishlistVersion) {
      newState = {
        ...newState,
        errorWishlistVersion: nextProps.errorWishlistVersion,
      };
    }

    return newState;
  }

  async componentDidUpdate(prevProps, prevState) {
    const { cartData, wishlistData } = this.props;

    if (this.state.successCartVersion > prevState.successCartVersion) {
      this.setState({
        cartStateData: cartData
      })
    }
    if (this.state.successWishlistVersion > prevState.successWishlistVersion) {
      this.setState({
        wishStateData: wishlistData
      })
    }
  }

  renderLoader = () => {
    return (
      <View style={{
        position: 'absolute', height: hp(80), width: wp(100),
        alignItems: 'center', justifyContent: 'center',
      }}>
        <ActivityIndicator size="large" color={color.brandColor} />
      </View>
    );
  };

  noDataFound = (msg) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', bottom: hp(30) }}>
        <Image
          source={require("../../assets/gif/noData.gif")}
          style={{ height: hp(20), width: hp(20) }}
        />
        <Text style={{ fontSize: 18, fontWeight: '400' }}>{msg}</Text>
      </View>
    )
  }

  setToggleView = (data) => {
    this.setState({
      isToggle: !this.state.isToggle,
      openMoreDetailsIdwish:data.cart_wish_id
    })
  }


  wishListView = (data) => {
    const { isToggle,openMoreDetailsIdwish } = this.state
    let baseurl = urls.imageUrl + data.thumb_image

    return (
      <TouchableOpacity
        onPress={() => this.setToggleView(data)}>
        <View style={styles.tabCartTopContainer}>
          <View style={styles.imgView}>
            <Image
              style={styles.imgStyle}
              source={{ uri : baseurl + data.images }}
            />
          </View>
          <View style={styles.codeCollectionView}>
            <Text style={styles.codeText}>Code</Text>
            <Text style={styles.textColor}>Collection</Text>
          </View>
          <View style={styles.chainTitleView}>
            <Text style={styles.chainTitleText}>{data.collection_sku_code}</Text>
            <Text style={styles.textColor}>{data.collection_name}</Text>
          </View>
        </View>
        <View style={styles.moreDetailView}>
          <View>
            <Text style={styles.moreDetailText}>More Details</Text>
          </View>
          <View>
            <Image source={require('../../assets/image/DownArrow.png')}
              style={{ height: hp(2), width: hp(2) }}
            />
          </View>
        </View>
        {isToggle && (openMoreDetailsIdwish === data.cart_wish_id) 
        ? (
          <>
            <View style={styles.tabCartMiddleContainer}>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>gross wt:</Text>
                <Text style={styles.text}>{data.values[0]}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>net wt:</Text>
                <Text style={styles.text}>{data.values[1]}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>quantity:</Text>
                <Text style={styles.text}>{data.values[2]}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>remarks:</Text>
                <Text style={styles.text}>{data.values[3]}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>length:</Text>
                <Text style={styles.text}>{data.values[4]}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>weight:</Text>
                <Text style={styles.text}>{data.values[5]}</Text>
              </View>
            </View>
            <View style={styles.tabCartBottomContainer}>
              <TouchableOpacity onPress={() => alert('MoveToCart')}>
                <View style={styles.tabCartBottomImgView}>
                  <Image
                    style={styles.tabCartBottomImg}
                    source={IconPack.MOVE_TO}
                  />
                  <Text style={styles.btnText}>MOVE TO CART</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alert('Delete')}>
                <View style={styles.tabCartBottomImgView}>
                  <Image
                    style={styles.tabCartBottomImg}
                    source={IconPack.DELETE}
                  />
                  <Text style={styles.btnText}>DELETE</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
        <View style={styles.border} />
      </TouchableOpacity>
    );
  };



  favoriteDetail = (wishlistData) => {
    return (
      <FlatList
        data={wishlistData}
        refreshing={this.props.isFetching}
       onRefresh={()=>this.scrollDownToRefreshWishList()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ marginBottom: hp(1), marginTop: hp(1), }}>
            {this.wishListView(item)}
          </View>
        )}
        keyExtractor={(item, index) => (item.cart_wish_id).toString()}
        style={{ marginTop: hp(1), }}
      />

    );
  };

  scrollDownToRefreshWishList = ()=>{

    const wishDataRefresh = new FormData();
    wishDataRefresh.append('user_id', userId);
    wishDataRefresh.append('table', 'wishlist');

    this.props.getWishlistData(wishDataRefresh)

  }


  setCartToggleView = (data) =>{
    this.setState({ isToogleTwo: !this.state.isToogleTwo,
    openMoreDetailsIdCart:data.cart_wish_id
    })
  }


  cartView = (item) => {
    // const [isToggle, setToggleView] = useState(false);

    // const setToggleValue = isToggle => {
    //   isToggle = !isToggle;
    //   setToggleView(isToggle);
    // };
    const { isToogleTwo,openMoreDetailsIdCart } = this.state
    let baseurl2 = urls.imageUrl + item.thumb_image

    return (
      <TouchableOpacity
        onPress={() => this.setCartToggleView(item)}>

        <View style={styles.tabCartTopContainer}>
          <View style={styles.imgView}>
            <Image
              style={styles.imgStyle}
              source={{ uri : baseurl2 + item.images }}

            />
          </View>
          <View style={styles.codeCollectionView}>
            <Text style={styles.codeText}>Code</Text>
            <Text style={styles.textColor}>Collection</Text>
          </View>
          <View style={styles.chainTitleView}>
            <Text style={styles.chainTitleText}>{item.collection_sku_code}</Text>
            <Text style={styles.textColor}>{item.collection_name}</Text>
          </View>
        </View>
        <View style={styles.moreDetailView}>
          <View>
            <Text style={styles.moreDetailText}>More Details</Text>
          </View>
          <View>
            <Image source={require('../../assets/image/DownArrow.png')}
              style={{ height: hp(2), width: hp(2) }}
            />
          </View>
        </View>
        {isToogleTwo && (openMoreDetailsIdCart === item.cart_wish_id) 
        ? (
          <>
            <View style={styles.tabCartMiddleContainer}>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>gross wt:</Text>
                <Text style={styles.text}>{item.values[0]}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>net wt:</Text>
                <Text style={styles.text}>{item.values[1]}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>quantity:</Text>
                <Text style={styles.text}>{item.values[2]}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>remarks:</Text>
                <Text style={styles.text}>{item.values[3]}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>length:</Text>
                <Text style={styles.text}>{item.values[4]}</Text>
              </View>
              <View style={styles.cartDetail}>
                <Text style={styles.textColor}>weight:</Text>
                <Text style={styles.text}>{item.values[5]}</Text>
              </View>
            </View>
            <View style={styles.tabCartBottomContainer}>
              <TouchableOpacity onPress={() => alert('edit')}>
                <View style={styles.tabCartBottomImgView}>
                  <Image style={styles.tabCartBottomImg} source={IconPack.EDIT} />
                  <Text style={styles.btnText}>EDIT</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alert('MoveToWishList')}>
                <View style={styles.tabCartBottomImgView}>
                  <Image
                    style={styles.tabCartBottomImg}
                    source={IconPack.MOVE_TO}
                  />
                  <Text style={styles.btnText}>MOVE TO WISHLIST</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alert('Delete')}>
                <View style={styles.tabCartBottomImgView}>
                  <Image
                    style={styles.tabCartBottomImg}
                    source={IconPack.DELETE}
                  />
                  <Text style={styles.btnText}>DELETE</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
        <View style={styles.border} />
      </TouchableOpacity>
    );
  };



  CartDetails = (cartData) => {
    return (
      <FlatList
        data={cartData}
        refreshing={this.props.isFetching}
        onRefresh={()=>this.scrollDownToRefreshCart()}      
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ marginBottom: hp(1), marginTop: hp(1), }}>
            {this.cartView(item)}
          </View>
        )}
        keyExtractor={(item, index) => (item.cart_wish_id).toString()}
        style={{ marginTop: hp(1), }}
      />
    );
  };

  scrollDownToRefreshCart = ()=>{

    const refreshData = new FormData();
    refreshData.append('user_id', userId);
    refreshData.append('table', 'cart');

     this.props.getCartData(refreshData)

  }



  render() {
    const { cartData, wishlistData, isFetching } = this.props
    const { wishStateData,cartStateData } = this.state



    return (
      <Container style={{ flex: 1 }}>
        <Tabs
          tabBarUnderlineStyle={{ backgroundColor: color.brandColor }}
          onChangeTab={({ i }) => this.setState({ currentPage: i })}>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: '#ffffff' }}>
                <Image
                  resizeMode="contain"
                  style={{ width: 22, height: 22 }}
                  source={
                    this.state.currentPage ?
                      require('../../assets/image/GreyCart.png')
                      : require('../../assets/image/BlueIcons/DarkCart.png')
                  }
                />
              </TabHeading>
            }>
            {cartData.length > 0 && !isFetching && this.CartDetails(cartData)}
          </Tab>

          <Tab
            heading={
              <TabHeading style={{ backgroundColor: '#ffffff' }}>
                <Image
                  resizeMode="contain"
                  style={{ width: 22, height: 22 }}
                  source={
                    this.state.currentPage ?
                      require('../../assets/image/BlueIcons/Heart.png') :
                      require('../../assets/image/GreyHeart.png')
                  }
                />
              </TabHeading>
            }>
            {wishlistData.length > 0 && !isFetching &&  this.favoriteDetail(wishlistData)}
          </Tab>
        </Tabs>

        {cartData.length > 0 && this.state.currentPage === 0 ?
          <View
            style={{
              height: 52,
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: 20,
            }}>
            <ActionButtonRounded
              title="CART WEIGHT"
              onButonPress={() => alert('cart Weight')}
              containerStyle={styles.buttonStyle}
            />
            <ActionButtonRounded
              title="PLACE ORDER"
              onButonPress={() => alert('PlaceOrder')}
              containerStyle={styles.buttonStyle}
            />
          </View> : null
        }
        {wishlistData.length > 0 && this.state.currentPage === 1 ?
          <View
            style={{
              height: 52,
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginHorizontal: 20,
            }}>
            <ActionButtonRounded
              title="CART WEIGHT"
              onButonPress={() => alert('cart Weight')}
              containerStyle={styles.buttonStyle}
            />
            <ActionButtonRounded
              title="PLACE ORDER"
              onButonPress={() => alert('PlaceOrder')}
              containerStyle={styles.buttonStyle}
            />
          </View> : null
        }
        {this.props.isFetching ? this.renderLoader() : null}

        {!this.props.isFetching && this.props.cartData.length === 0 && this.state.currentPage === 0 ? this.noDataFound(this.props.errorMsgCart) : null}
        {!this.props.isFetching && this.props.wishlistData.length === 0 && this.state.currentPage === 1 ? this.noDataFound(this.props.errorMsgWishlist) : null}

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  tabCartTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginBottom: 10,
  },
  imgView: {
    height: hp(7),
    width: hp(9),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:0.4,
    borderColor:color.gray,
    borderRadius:5
  },
  imgStyle: {
    width: hp(8),
    height: hp(6),

  },
  codeCollectionView: {
    justifyContent: 'center',
  },
  codeText: {
    textAlign: 'left',
    color: '#808080',
  },
  chainTitleView: {
    justifyContent: 'center',
  },
  chainTitleText: {
    textAlign: 'right',
    color: '#808080',
  },
  moreDetailView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
  },
  moreDetailText: {
    fontWeight: '600',
    color: '#808080',
  },
  tabCartMiddleContainer: {
    marginTop: 10,
    marginHorizontal: 18,
  },
  cartDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    marginBottom: 10,
    color: '#808080',
  },
  tabCartBottomContainer: {
    marginHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabCartBottomImgView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabCartBottomImg: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  btnText: {
    fontSize: 12,
  },
  border: {
    marginHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    marginTop: 10,
    marginBottom: 10,
  },
  textColor: {
    color: '#808080',
  },
  buttonStyle: {
    backgroundColor: '#11255a',
    height: 42,
    width: 140,
    justifyContent: 'center',
    borderRadius: 40,
    marginVertical: 5,
  },
});




function mapStateToProps(state) {
  return {
    isFetching: state.cartContainerReducer.isFetching,
    error: state.cartContainerReducer.error,
    errorMsgCart: state.cartContainerReducer.errorMsgCart,
    successCartVersion: state.cartContainerReducer.successCartVersion,
    errorCartVersion: state.cartContainerReducer.errorCartVersion,
    cartData: state.cartContainerReducer.cartData,

    errorMsgWishlist: state.cartContainerReducer.errorMsgWishlist,
    successWishlistVersion: state.cartContainerReducer.successWishlistVersion,
    errorWishlistVersion: state.cartContainerReducer.errorWishlistVersion,
    wishlistData: state.cartContainerReducer.wishlistData,

  };
}

export default connect(mapStateToProps, { getCartData, getWishlistData })(CartContainer);
