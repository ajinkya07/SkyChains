import React, { Component } from 'react';
import {
    View, Text, ScrollView, Dimensions, SafeAreaView,
    Image, ActivityIndicator, TouchableOpacity, Platform
} from 'react-native';
import HomePageStyle from '@homepage/HomePageStyle';
import { color } from '@values/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { strings } from '@values/strings';
import Swiper from 'react-native-swiper'
import Modal from 'react-native-modal';
import _CustomButton from '@customButton/_CustomButton'
import * as Animatable from 'react-native-animatable';
import { getHomePageData } from '@homepage/HomePageAction';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

var userId = ''


const SCREENS = [
    {
        key: 1,
        url: require('../../assets/image/insta.png')
    },
    {
        key: 2,
        url: require('../../assets/image/insta.png')
    },
    {
        key: 3,
        url: require('../../assets/image/backg.png')
    }
]

const LIST = [
    { key: 1, name: 'Choco Chains', url: require('../../assets/image/insta.png') },
    { key: 2, name: 'Mains Italian Chains', url: require('../../assets/image/insta.png') },
    { key: 3, name: 'IMP Assemble', url: require('../../assets/image/insta.png') },
    { key: 4, name: 'Mains Italian Chains', url: require('../../assets/image/insta.png') },
    { key: 5, name: 'IMP Assemble', url: require('../../assets/image/insta.png') }
]

const LIST2 = [
    { key: 1, code: 'CHOCO 11', weight: '71.00', inches: '31' },
    { key: 2, code: 'CHOCO 11', weight: '71.00', inches: '31' },
    { key: 3, code: 'CHOCO 11', weight: '71.00', inches: '31' },
    { key: 4, code: 'CHOCO 11', weight: '71.00', inches: '31' },
    { key: 5, code: 'CHOCO 11', weight: '71.00', inches: '31' },

]

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            isModalVisible: false,
            successHomePageVersion: 0,
            errorHomePageVersion: 0,
            isImageModalVisibel: false,
            imageToBeDisplayed: ''
        };
        userId = global.userId;

    }

    componentDidMount = () => {
        const type = Platform.OS === 'ios' ? 'ios' : 'android'

        const data = new FormData();
        data.append('user_id', userId);
        data.append('image_type', type);

        this.props.getHomePageData(data)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { successHomePageVersion, errorHomePageVersion } = nextProps;
        let newState = null;

        if (successHomePageVersion > prevState.successHomePageVersion) {
            newState = {
                ...newState,
                successHomePageVersion: nextProps.successHomePageVersion,
            };
        }
        if (errorHomePageVersion > prevState.errorHomePageVersion) {
            newState = {
                ...newState,
                errorHomePageVersion: nextProps.errorHomePageVersion,
            };
        }
        return newState;
    }

    //   async componentDidUpdate(prevProps, prevState) {
    //     const {  } = this.props;
    //   }


    setCurrentPage = (position) => {
        this.setState({ currentPage: position });
    }


    renderScreen = (data, index) => {
        const { homePageData } = this.props
        let baseUrl = homePageData && homePageData.base_path

        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Banner', { bannerData: data, baseUrl: baseUrl })}>
                <View key={index}>
                    {/* <Image style={{ height: hp(25), width: wp(100) }}
                        source={{ uri: baseUrl + data.brand_image }}
                        defaultSource={require('../../assets/image/default.png')}
                        resizeMode='cover'
                    /> */}
                    <FastImage
                        style={{ height: hp(25), width: wp(100) }}
                        source={{
                            uri: baseUrl + data.brand_image,
                            // cache: FastImage.cacheControl.cacheOnly,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />

                </View>
            </TouchableOpacity>

        )
    }

    carausalView = (bannerData) => {
        return (
            <View style={{
                height: hp(25), width: wp(100), borderBottomColor: color.gray,
                borderWidth: !this.props.isFetching ? 0.5 : 0
            }}>
                {bannerData ?
                    <Swiper
                        removeClippedSubviews={false}
                        style={{ flexGrow: 1, }}
                        autoplayTimeout={10}
                        ref={(swiper) => { this.swiper = swiper; }}
                        index={this.state.currentPage}
                        autoplay={true}
                        showsPagination={true}
                        loadMinimal={true}
                        loadMinimalLoader={<ActivityIndicator size="small" color='gray' />}
                        dot={<View style={{
                            backgroundColor: 'gray', width: 8, height: 8,
                            borderRadius: 4, marginLeft: 3,
                            marginRight: 3, top: 10
                        }} />}
                        activeDot={<View style={{
                            backgroundColor: color.white, width: 10, height: 10, borderRadius: 5,
                            marginLeft: 3, marginRight: 3, top: 10
                        }} />}
                        onIndexChanged={(page) => this.setCurrentPage(page)}
                    >
                        {bannerData.map((page, index) => this.renderScreen(page, index))}
                    </Swiper>
                    : this.renderLoader2()
                }
            </View>
        )
    }

    getProductGridOrNot = (data) => {
        if (data.subcategory.length === 0) {
            this.props.navigation.navigate("ProductGrid", { gridData: data })
        } else if (data.subcategory.length > 0) {
            this.props.navigation.navigate("SubCategoryList", { subcategory: data })
        }
    }



    getCategoryDesigns = (item, index) => {
        const { homePageData } = this.props
        const { categoryView, categoryImage, horizontalCategory } = HomePageStyle;
        let baseUrl = 'http://jewel.jewelmarts.in/public/backend/collection/'

        return (
            <TouchableOpacity onPress={() => this.getProductGridOrNot(item)}>
                <View animation="zoomIn" style={categoryView}>
                    <Animatable.Image animation="zoomIn"
                        resizeMode={'cover'}
                        style={categoryImage}
                        defaultSource={require('../../assets/image/default.png')}
                        source={{ uri: baseUrl + item.image_name }}
                    />
                    <_Text numberOfLines={2} fsPrimary
                        style={{ textAlign: 'center', marginTop: hp(1) }}>
                        {item.col_name}
                    </_Text>
                </View>
            </TouchableOpacity>
        );
    }


    getProductDesigns = (item, index) => {
        const { latestDesign, latestTextView, latestTextView2,
            latestImage, horizontalLatestDesign, border, iconView
        } = HomePageStyle;
        let url = 'http://jewel.jewelmarts.in/public/backend/product_images/zoom_image/'

        return (
            <TouchableOpacity
                onPress={() => alert("ok")}>
                {/* onPress={() => this.props.navigation.navigate('CategoryDetails')}> */}
                <View style={horizontalLatestDesign}>
                    <View style={latestDesign}>
                        <TouchableOpacity onLongPress={() => this.showImageModal(item)}>
                            <Image
                                // resizeMode={'cover'}
                                style={latestImage}
                                defaultSource={require('../../assets/image/default.png')}
                                source={{ uri: url + item.images[0].image_name }}
                            />
                        </TouchableOpacity>
                        <View style={latestTextView}>
                            <View style={{ width: wp(14), marginLeft: 5 }}>
                                <_Text numberOfLines={1} fsPrimary >Code</_Text>
                            </View>
                            <View style={{ marginRight: 10, width: wp(25), justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <_Text numberOfLines={1} fsPrimary >{item.collection_sku_code}</_Text>
                            </View>
                        </View>
                        <View style={border}></View>

                        <View style={latestTextView2}>
                            <View style={{ width: wp(14), marginLeft: 5 }}>
                                <_Text numberOfLines={1} fsPrimary >Weight</_Text>
                            </View>
                            <View style={{ marginRight: 10, width: wp(25), justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <_Text numberOfLines={1} fsPrimary >{parseInt(item.gross_wt).toFixed(2)}</_Text>
                            </View>
                        </View>
                        <View style={border}></View>

                        <View style={latestTextView2}>
                            <View style={{ width: wp(14), marginLeft: 5 }}>
                                <_Text numberOfLines={1} fsPrimary >Inches</_Text>
                            </View>
                            <View style={{ marginRight: 10, width: wp(25), justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <_Text numberOfLines={1} fsPrimary >{item.length}</_Text>
                            </View>
                        </View>
                        <View style={border}></View>
                        {item.in_cart === 0 &&
                            <View style={iconView}>
                                <TouchableOpacity onPress={() => alert('wishlist')}>
                                    <Image
                                        source={require('../../assets/image/BlueIcons/Heart.png')}
                                        style={{ height: hp(3.3), width: hp(3.3) }}
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => alert('cart')}>
                                    <Image
                                        source={require('../../assets/image/BlueIcons/DarkCart.png')}
                                        style={{ height: hp(3.3), width: hp(3.3) }}
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                            </View>
                        }

                        {item.in_cart > 0 &&
                            <View style={iconView}>
                                <TouchableOpacity onPress={() => alert('wishlist')}>
                                    <Image
                                        source={require('../../assets/image/BlueIcons/Minus.png')}
                                        style={{ height: hp(3.3), width: hp(3.3) }}
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                                <_Text numberOfLines={1}
                                    textColor={color.brandColor}
                                    fsMedium fwHeading >{item.in_cart}
                                </_Text>

                                <TouchableOpacity onPress={() => alert('cart')}>
                                    <Image
                                        source={require('../../assets/image/BlueIcons/Plus.png')}
                                        style={{ height: hp(3.3), width: hp(3.3) }}
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                            </View>
                        }

                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    showImageModal = (item) => {
        this.setState({
            imageToBeDisplayed: item,
            isImageModalVisibel: true
        })
    }


    onOkPressed = () => {
        this.setState({ isModalVisible: false })
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

    renderLoader2 = () => {
        return (
            <View style={{
                position: 'absolute', height: hp(25), width: wp(100),
                alignItems: 'center', justifyContent: 'center',
            }}>
                <ActivityIndicator size="large" color={color.gray} />
            </View>
        );
    };


    render() {
        const { mainContainer,
            topHeading, topHeading1, topHeading2, topHeading3, heading, watchAllView, watchTouchableView,
            watchAllImage, watchAllText, activityIndicatorView, folloUs, socialIconView, socialTextView
        } = HomePageStyle;

        const { homePageData, isFetching } = this.props
        const { imageToBeDisplayed } = this.state

        const bannerData = homePageData && homePageData.brand_banner ? homePageData.brand_banner : []

        const collection = homePageData && homePageData.collection ? homePageData.collection : []

        const finalCollection = homePageData && homePageData.final_collection ? homePageData.final_collection : []

        let imageUrl = 'http://jewel.jewelmarts.in/public/backend/product_images/zoom_image/'

        return (
            <View style={mainContainer}>

                <ScrollView showsVerticalScrollIndicator={false}>

                    {this.state.isModalVisible &&
                        <View>
                            <Modal style={{ justifyContent: 'center' }}
                                isVisible={this.state.isModalVisible}
                                onRequestClose={() => this.setState({ isModalVisible: false })}
                                onBackdropPress={() => this.setState({ isModalVisible: false })}
                                onBackButtonPress={() => this.setState({ isModalVisible: false })}
                            >
                                <SafeAreaView>
                                    <View
                                        style={{
                                            height: hp(68),
                                            backgroundColor: 'white',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 15
                                        }}>
                                        <View style={{
                                            bottom: hp(5), backgroundColor: 'white',
                                            borderColor: 'red', borderWidth: 1,
                                            alignItems: 'center', justifyContent: 'center',
                                            height: hp(8), width: hp(8), borderRadius: hp(4)
                                        }}>
                                            <TouchableOpacity
                                                hitSlop={{ position: 'absolute', top: 5, bottom: 5, left: 5, right: 5 }}
                                                onPress={() => this.onOkPressed()}>
                                                <Image source={require('../../assets/image/remove.png')}
                                                    style={{ height: hp(5), width: hp(5), }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <Image
                                            source={require('../../assets/image/insta.png')}
                                            defaultSource={require('../../assets/image/default.png')}
                                            style={{
                                                height: hp(50), width: wp(83),
                                                borderColor: 'gray',
                                                borderWidth: 1,
                                                bottom: hp(2)
                                            }}
                                        />

                                        <_CustomButton
                                            onPress={() => this.onOkPressed()}
                                            title="OK"
                                            height={hp(7.2)}
                                            width={wp(80)}
                                            fontSize={hp(2.5)}
                                            fontWeight={Platform.OS === 'ios' ? '400' : 'bold'}
                                        />
                                    </View>
                                </SafeAreaView>
                            </Modal>
                        </View>
                    }


                    {this.carausalView(bannerData)}


                    {/* CATEGORY DESIGNS */}
                    {!this.props.isFetching &&
                        <View style={topHeading}>
                            <View style={heading}>
                                <_Text
                                    fsExtraLarge
                                    fwPrimary
                                    numberOfLines={1}
                                    textColor={color.brandColor}>
                                    {strings.categoryDesigns}
                                </_Text>
                            </View>

                            <View style={watchAllView}>
                                <TouchableOpacity style={watchTouchableView}
                                    onPress={() => this.props.navigation.navigate('CategoryContainer', { collection: collection, fromSeeMore: true })}
                                >
                                    <_Text
                                        fsHeading
                                        numberOfLines={1}
                                        fwSmall
                                        textColor={color.brandColor}
                                    >
                                        {strings.seeMore}
                                    </_Text>
                                    <Image
                                        resizeMode={'cover'}
                                        style={watchAllImage}
                                        source={require('../../assets/image/watchAll.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{
                            paddingLeft: Platform.OS === 'ios' ? hp(2.2) : hp(1),
                            flexDirection: 'row'
                        }}>
                            {collection && collection.map((item, index) => (
                                this.getCategoryDesigns(item, index)
                            ))}
                        </View>
                    </ScrollView>



                    {/* PRODUCT DESIGNS */}

                    {finalCollection && finalCollection.map((data, index) => (
                        <View>
                            <View style={topHeading1}>
                                <View style={heading}>
                                    <_Text
                                        fsExtraLarge
                                        fwPrimary
                                        numberOfLines={1}
                                        textColor={color.brandColor}>
                                        {data.key}
                                    </_Text>
                                </View>
                            </View>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {data.product_assign && data.product_assign.map((product, index) => (
                                    <View style={{ flexDirection: 'row' }}>
                                        {this.getProductDesigns(product)}
                                    </View>
                                ))}

                            </ScrollView>
                        </View>
                    ))}


                    {/* FOLLOW US ON SOCIAL  */}

                    {!this.props.isFetching &&
                        <View style={folloUs}>
                            <View style={socialIconView}>
                                <TouchableOpacity>
                                    <Image
                                        source={require('../../assets/image/instaIcon.png')}
                                        style={{ height: hp(5), width: hp(5) }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image
                                        source={require('../../assets/image/facebook.png')}
                                        style={{ height: hp(4.8), width: hp(4.8) }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={socialTextView}>
                                <_Text
                                    textColor={color.brandColor}
                                    style={{ textAlign: 'center' }} fsExtraLarge fwSmall>
                                    Follow us on social media
                            </_Text>
                            </View>

                        </View>
                    }


                    {/*  IMAGE ON LONG PRESS */}

                    {this.state.isImageModalVisibel &&
                        <View>
                            <Modal style={{ justifyContent: 'center' }}
                                isVisible={this.state.isImageModalVisibel}
                                onRequestClose={() => this.setState({ isImageModalVisibel: false })}
                                onBackdropPress={() => this.setState({ isImageModalVisibel: false })}
                                onBackButtonPress={() => this.setState({ isImageModalVisibel: false })}
                            >
                                <SafeAreaView>
                                    <View style={{
                                        height: hp(42), backgroundColor: 'white', alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 10
                                    }}>
                                        <_Text fsMedium style={{marginTop:hp(0.5)}}>Code: {imageToBeDisplayed.collection_sku_code}</_Text>
                                        <View style={{marginTop:5,borderBottomColor:'gray',borderBottomWidth:1,width:wp(90)}}/>
                                        <Image
                                            source={{ uri: imageUrl + imageToBeDisplayed.images[0].image_name }}
                                            defaultSource={require('../../assets/image/default.png')}
                                            style={{
                                                height: hp(35), width: wp(90),marginTop:hp(1),
                                            }}
                                            resizeMode='cover'
                                        />
                                    </View>
                                </SafeAreaView>
                            </Modal>
                        </View>
                    }




                </ScrollView>

                {this.props.isFetching ? this.renderLoader() : null}

            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        isFetching: state.homePageReducer.isFetching,
        error: state.homePageReducer.error,
        errorMsg: state.homePageReducer.errorMsg,
        successHomePageVersion: state.homePageReducer.successHomePageVersion,
        errorHomePageVersion: state.homePageReducer.errorHomePageVersion,
        homePageData: state.homePageReducer.homePageData,
    };
}

export default connect(mapStateToProps, { getHomePageData },)(HomePage);
