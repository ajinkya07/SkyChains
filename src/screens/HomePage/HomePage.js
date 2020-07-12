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

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            isModalVisible: true
        };
    }

    setCurrentPage = (position) => {
        this.setState({ currentPage: position });
    }


    renderScreen = (data, index) => {
        return (
            <View key={index}>
                <Image style={{ height: hp(23), width: wp(100) }}
                    source={data.url}
                    defaultSource={require('../../assets/image/default.png')}
                />
            </View>
        )
    }

    carausalView = () => {
        return (
            <View style={{ height: hp(23), width: wp(100) }}>
                <Swiper
                    style={{ flexGrow: 1, }}
                    //loop={true}
                    autoplayTimeout={5}
                    ref={(swiper) => { this.swiper = swiper; }}
                    index={this.state.currentPage}
                    autoplay={true}
                    showsPagination={true}
                    loadMinimalLoader={<ActivityIndicator />}
                    dot={<View style={{
                        backgroundColor: '#D7D7D7', width: 8, height: 8,
                        borderRadius: 4, marginLeft: 3,
                        marginRight: 3, top: 10
                    }} />}
                    activeDot={<View style={{
                        backgroundColor: color.brandColor, width: 10, height: 10, borderRadius: 5,
                        marginLeft: 3, marginRight: 3, top: 10
                    }} />}
                    onIndexChanged={(page) => this.setCurrentPage(page)}
                >
                    {SCREENS.map((page, index) => this.renderScreen(page, index))}
                </Swiper>
            </View>
        )
    }


    getCategoryDesigns = (item, index) => {
        const {
            categoryView,
            categoryImage, horizontalCategory
        } = HomePageStyle;

        return (
            <TouchableOpacity onPress={() => alert("ok")}>
                <Animatable.View animation="zoomIn" style={categoryView}>
                    <Image
                        resizeMode={'cover'}
                        style={categoryImage}
                        defaultSource={require('../../assets/image/default.png')}
                        source={require('../../assets/image/insta.png')}
                    />
                    <_Text numberOfLines={2} fsSmall style={{ textAlign: 'center', marginTop: hp(1) }}>
                        {item.name}
                    </_Text>
                </Animatable.View>
            </TouchableOpacity>
        );
    }


    getLatestDesigns = (item, index) => {
        const {
            latestDesign, latestTextView, latestTextView2,
            latestImage, horizontalLatestDesign, border, iconView
        } = HomePageStyle;


        return (
            <TouchableOpacity onPress={() => alert("latest design")}>
                <View style={horizontalLatestDesign}>
                    <View style={latestDesign}>
                        <Image
                            resizeMode={'cover'}
                            style={latestImage}
                            defaultSource={require('../../assets/image/default.png')}
                            source={require('../../assets/image/insta.png')}
                        />
                        <View style={latestTextView}>
                            <View style={{ width: wp(14), marginLeft: 5 }}>
                                <_Text numberOfLines={1} fsPrimary >Code</_Text>
                            </View>
                            <View style={{ marginRight: 10, width: wp(25), justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <_Text numberOfLines={1} fsPrimary >{item.code}</_Text>
                            </View>
                        </View>
                        <View style={border}></View>

                        <View style={latestTextView2}>
                            <View style={{ width: wp(14), marginLeft: 5 }}>
                                <_Text numberOfLines={1} fsPrimary >Weight</_Text>
                            </View>
                            <View style={{ marginRight: 10, width: wp(25), justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <_Text numberOfLines={1} fsPrimary >{item.weight}</_Text>
                            </View>
                        </View>
                        <View style={border}></View>

                        <View style={latestTextView2}>
                            <View style={{ width: wp(14), marginLeft: 5 }}>
                                <_Text numberOfLines={1} fsPrimary >Inches</_Text>
                            </View>
                            <View style={{ marginRight: 10, width: wp(25), justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <_Text numberOfLines={1} fsPrimary >{item.inches}</_Text>
                            </View>
                        </View>
                        <View style={border}></View>

                        <View style={iconView}>
                            <TouchableOpacity onPress={() => alert('wishlist')}>
                                <Image
                                    source={require('../../assets/image/BlueIcons/Heart.png')}
                                    style={{ height: hp(3), width: hp(3) }}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => alert('cart')}>
                                <Image
                                    source={require('../../assets/image/BlueIcons/DarkCart.png')}
                                    style={{ height: hp(3), width: hp(3) }}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }


    getBestSelling = (item, index) => {
        const {
            latestDesign, latestTextView, latestTextView2,
            latestImage, horizontalLatestDesign, border, iconView
        } = HomePageStyle;

        return (
            <TouchableOpacity onPress={() => alert("best selling")}>
                <View style={horizontalLatestDesign}>
                    <View style={latestDesign}>
                        <Image
                            resizeMode={'cover'}
                            style={latestImage}
                            defaultSource={require('../../assets/image/default.png')}
                            source={require('../../assets/image/default.png')}
                        />
                        <View style={latestTextView}>
                            <View style={{ width: wp(14), marginLeft: 5 }}>
                                <_Text numberOfLines={1} fsPrimary >Code</_Text>
                            </View>
                            <View style={{ marginRight: 10, width: wp(25), justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <_Text numberOfLines={1} fsPrimary >{item.code}</_Text>
                            </View>
                        </View>
                        <View style={border}></View>

                        <View style={latestTextView2}>
                            <View style={{ width: wp(14), marginLeft: 5 }}>
                                <_Text numberOfLines={1} fsPrimary >Weight</_Text>
                            </View>
                            <View style={{ marginRight: 10, width: wp(25), justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <_Text numberOfLines={1} fsPrimary >{item.weight}</_Text>
                            </View>
                        </View>
                        <View style={border}></View>

                        <View style={latestTextView2}>
                            <View style={{ width: wp(14), marginLeft: 5 }}>
                                <_Text numberOfLines={1} fsPrimary >Inches</_Text>
                            </View>
                            <View style={{ marginRight: 10, width: wp(25), justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <_Text numberOfLines={1} fsPrimary >{item.inches}</_Text>
                            </View>
                        </View>
                        <View style={border}></View>

                        <View style={iconView}>
                            <TouchableOpacity onPress={() => alert('wishlist')}>
                                <Image
                                    source={require('../../assets/image/BlueIcons/Heart.png')}
                                    style={{ height: hp(3.5), width: hp(3.5) }}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => alert('cart')}>
                                <Image
                                    source={require('../../assets/image/BlueIcons/DarkCart.png')}
                                    style={{ height: hp(3.5), width: hp(3.5) }}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }


    getDiwaliCollection = (item, index) => {
        const {
            latestDesign, latestTextView, latestTextView2,
            latestImage, horizontalLatestDesign, border, iconView
        } = HomePageStyle;

        return (
            <TouchableOpacity onPress={() => alert("best selling")}>
                <View style={horizontalLatestDesign}>
                    <View style={latestDesign}>
                        <Image
                            resizeMode={'cover'}
                            style={latestImage}
                            defaultSource={require('../../assets/image/default.png')}
                            source={require('../../assets/image/default.png')}
                        />
                        <View style={latestTextView}>
                            <View style={{ width: wp(14), marginLeft: 5 }}>
                                <_Text numberOfLines={1} fsPrimary >Code</_Text>
                            </View>
                            <View style={{ marginRight: 10, width: wp(25), justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <_Text numberOfLines={1} fsPrimary >{item.code}</_Text>
                            </View>
                        </View>
                        <View style={border}></View>

                        <View style={latestTextView2}>
                            <View style={{ width: wp(14), marginLeft: 5 }}>
                                <_Text numberOfLines={1} fsPrimary >Weight</_Text>
                            </View>
                            <View style={{ marginRight: 10, width: wp(25), justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <_Text numberOfLines={1} fsPrimary >{item.weight}</_Text>
                            </View>
                        </View>
                        <View style={border}></View>

                        <View style={latestTextView2}>
                            <View style={{ width: wp(14), marginLeft: 5 }}>
                                <_Text numberOfLines={1} fsPrimary >Inches</_Text>
                            </View>
                            <View style={{ marginRight: 10, width: wp(25), justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <_Text numberOfLines={1} fsPrimary >{item.inches}</_Text>
                            </View>
                        </View>
                        <View style={border}></View>

                        <View style={iconView}>
                            <TouchableOpacity onPress={() => alert('wishlist')}>
                                <Image
                                    source={require('../../assets/image/BlueIcons/Heart.png')}
                                    style={{ height: hp(3.5), width: hp(3.5) }}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => alert('cart')}>
                                <Image
                                    source={require('../../assets/image/BlueIcons/DarkCart.png')}
                                    style={{ height: hp(3.5), width: hp(3.5) }}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    onOkPressed = () => {
        this.setState({ isModalVisible: false })
    }

    render() {
        const { mainContainer,
            topHeading, topHeading1, topHeading2, topHeading3, heading, watchAllView, watchTouchableView,
            watchAllImage, watchAllText, activityIndicatorView, folloUs, socialIconView, socialTextView
        } = HomePageStyle;

        return (
            <View style={mainContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>


                    {this.state.isModalVisible &&
                        <View>
                            <Modal
                                style={{
                                    justifyContent: 'center',
                                    // paddingVertical:hp(2)
                                    // marginBottom: 0,
                                    // marginLeft: 0,
                                    // marginRight: 0,
                                }}
                                //     animationIn='fadeIn'
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
                                            //  borderTopLeftRadius:15,
                                            //  borderTopRightRadius:15

                                        }}>
                                        <View style={{
                                            bottom: hp(5), backgroundColor: 'white',
                                            borderColor:'red',borderWidth:1,
                                            alignItems: 'center', justifyContent: 'center',
                                            height: hp(8), width: hp(8), borderRadius: hp(4)
                                        }}>
                                            <TouchableOpacity
                                                hitSlop={{position: 'absolute', top: 5, bottom: 5, left: 5, right: 5 }}
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
                                        //  resizeMode='cover'
                                        />

                                        <_CustomButton
                                            onPress={() => this.onOkPressed()}
                                            title="OK"
                                            height={hp(7.5)}
                                            width={wp(80)}
                                            fontSize={hp(3)}
                                            fontWeight='bold'
                                        />
                                    </View>
                                </SafeAreaView>
                            </Modal>
                        </View>
                    }


                    {this.carausalView()}

                    {/* CATEGORY DESIGNS */}
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
                            <TouchableOpacity style={watchTouchableView}>
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

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{ paddingLeft: Platform.OS === 'ios' ? hp(2.2) : hp(1), flexDirection: 'row' }}>
                            {LIST && LIST.map((item, index) => (
                                this.getCategoryDesigns(item, index)
                            ))}
                        </View>
                    </ScrollView>


                    {/* LATEST DESIGNS */}
                    <View style={topHeading1}>
                        <View style={heading}>
                            <_Text
                                fsExtraLarge
                                fwPrimary
                                numberOfLines={1}
                                textColor={color.brandColor}>
                                {strings.latestDesigns}
                            </_Text>
                        </View>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                        <View style={{ paddingLeft: hp(2), flexDirection: 'row' }}>
                            {LIST2 && LIST2.map((item, index) => (
                                this.getLatestDesigns(item, index)
                            ))}
                        </View>

                    </ScrollView>

                    {/* BEST SELLING */}
                    <View style={topHeading2}>
                        <View style={heading}>
                            <_Text
                                fsExtraLarge
                                fwPrimary
                                numberOfLines={1}
                                textColor={color.brandColor}>
                                {strings.bestSelling}
                            </_Text>
                        </View>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                        <View style={{ paddingLeft: hp(2), flexDirection: 'row' }}>
                            {LIST2 && LIST2.map((item, index) => (
                                this.getBestSelling(item, index)
                            ))}
                        </View>

                    </ScrollView>



                    {/* DIWALI COLLECTION */}
                    <View style={topHeading3}>
                        <View style={heading}>
                            <_Text
                                fsExtraLarge
                                fwPrimary
                                numberOfLines={1}
                                textColor={color.brandColor}>
                                {strings.diwaliCollection}
                            </_Text>
                        </View>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                        <View style={{ paddingLeft: hp(2), flexDirection: 'row' }}>
                            {LIST2 && LIST2.map((item, index) => (
                                this.getDiwaliCollection(item, index)
                            ))}
                        </View>

                    </ScrollView>

                    {/* FOLLOW US ON SOCIAL  */}

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

                </ScrollView>
            </View>
        );
    }
}
