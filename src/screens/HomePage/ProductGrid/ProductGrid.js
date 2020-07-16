import React, { Component } from 'react';
import {
    View, Text, SafeAreaView, Image, StyleSheet,
    TouchableOpacity, FlatList, ActivityIndicator
} from 'react-native';
import _CustomHeader from '@customHeader/_CustomHeader'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { connect } from 'react-redux';
import { color } from '@values/colors';
import ProductGridStyle from '@productGrid/ProductGridStyle';
import { getProductSubCategoryData } from '@productGrid/ProductGridAction';
import { Toast } from 'native-base';
import Modal from 'react-native-modal';
import { strings } from '@values/strings'



var userId = ''

const sortByData = [
    { id: '0', name: 'Code Ascending', url: require('../../../assets/image/DownArrow.png') },
    { id: '1', name: 'Code Descending', url: require('../../../assets/image/DownArrow.png') },
    { id: '2', name: 'Weight Ascending', url: require('../../../assets/image/DownArrow.png') },
    { id: '3', name: 'Code Descending', url: require('../../../assets/image/DownArrow.png') },
    { id: '4', name: 'Latest Ascending', url: require('../../../assets/image/DownArrow.png') }

]

class ProductGrid extends Component {
    constructor(props) {
        super(props);

        const categoryData = this.props.route.params.gridData;

        this.state = {
            categoryData: categoryData,
            successProductGridVersion: 0,
            errorProductGridVersion: 0,
            isSortByModal: false,
            selectedSortById: '2',

            gridData: [],
            loadingExtraData: false,
            page: 0

        };
        userId = global.userId;

    }

    componentDidMount = () => {
        const { categoryData, page } = this.state

        if (categoryData.subcategory.length === 0) {
            const data = new FormData();
            data.append('table', 'product_master');
            data.append('mode_type', 'normal');
            data.append('collection_id', categoryData.id);
            data.append('user_id', userId);
            data.append('record', 10);
            data.append('page_no', page);
            data.append('sort_by', '2');

            this.props.getProductSubCategoryData(data)
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { successProductGridVersion, errorProductGridVersion } = nextProps;
        let newState = null;

        if (successProductGridVersion > prevState.successProductGridVersion) {
            newState = {
                ...newState,
                successProductGridVersion: nextProps.successProductGridVersion,
            };
        }
        if (errorProductGridVersion > prevState.errorProductGridVersion) {
            newState = {
                ...newState,
                errorProductGridVersion: nextProps.errorProductGridVersion,
            };
        }
        return newState;
    }

    async componentDidUpdate(prevProps, prevState) {
        const { productGridData } = this.props;
        console.log("productGridData", productGridData);

        if (this.state.successProductGridVersion > prevState.successProductGridVersion) {
            if (productGridData.products && productGridData.products.length > 0) {
                this.setState({
                    //gridData: productGridData,
                    gridData: this.state.page === 1 ? productGridData.products : [...this.state.gridData, ...productGridData.products]

                })
            } else {
                this.showToast('Please contact admin', 'danger');
            }
        }
        if (this.state.errorProductGridVersion > prevState.errorProductGridVersion) {
            Toast.show({
                text: this.props.errorMsg ? this.props.errorMsg : strings.serverFailedMsg,
                color: 'warning',
                duration: 2500,
            });
        }
    }

    renderLoader = () => {
        return (
            <View style={styles.loaderView}>
                <ActivityIndicator size="large" color={color.brandColor} />
            </View>
        );
    };

    showToast = (msg, type, duration) => {
        Toast.show({
            text: msg ? msg : strings.serverFailedMsg,
            type: type ? type : 'danger',
            duration: duration ? duration : 2500,
        });
    };


    gridView = (item) => {
        const { gridItemDesign, latestTextView, latestTextView2,
            gridImage, gridDesign, border, iconView
        } = ProductGridStyle;

        let url = 'http://jewel.jewelmarts.in/public/backend/product_images/small_image/'

        return (
            <TouchableOpacity onPress={() => alert("latest design")}>
                <View style={gridDesign}>
                    <View style={gridItemDesign}>
                        <Image
                            resizeMode={'cover'}
                            style={gridImage}
                            defaultSource={require('../../../assets/image/default.png')}
                            source={{ uri: url + item.image_name }}
                        />
                        <View style={latestTextView}>
                            <View style={{ width: wp(15), marginLeft: 5 }}>
                                <_Text numberOfLines={1} fsPrimary >Code</_Text>
                            </View>
                            <View style={{ marginRight: 10, width: wp(25), justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <_Text numberOfLines={1} fsPrimary >{item.value[0]}</_Text>
                            </View>
                        </View>
                        <View style={border}></View>

                        <View style={latestTextView2}>
                            <View style={{ width: wp(16), marginLeft: 5 }}>
                                <_Text numberOfLines={1} fsPrimary >Gross Wt</_Text>
                            </View>
                            <View style={{ marginRight: 10, width: wp(25), justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <_Text numberOfLines={1} fsPrimary >{parseInt(item.value[1]).toFixed(2)}</_Text>
                            </View>
                        </View>
                        <View style={border}></View>

                        <View style={latestTextView2}>
                            <View style={{ width: wp(15), marginLeft: 5 }}>
                                <_Text numberOfLines={1} fsPrimary >Name</_Text>
                            </View>
                            <View style={{ marginRight: 10, width: wp(25), justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <_Text numberOfLines={2} fsPrimary >{item.value[2]}</_Text>
                            </View>
                        </View>
                        <View style={border}></View>

                        {item.in_cart === 0 &&
                            <View style={iconView}>
                                <TouchableOpacity onPress={() => alert('wishlist')}>
                                    <Image
                                        source={require('../../../assets/image/BlueIcons/Heart.png')}
                                        style={{ height: hp(3.3), width: hp(3.3) }}
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => alert('cart')}>
                                    <Image
                                        source={require('../../../assets/image/BlueIcons/DarkCart.png')}
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
                                        source={require('../../../assets/image/BlueIcons/Minus.png')}
                                        style={{ height: hp(3.3), width: hp(3.3) }}
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                                <_Text numberOfLines={1}
                                    textColor={color.brandColor}
                                    fsMedium fwHeading >{item.in_cart}</_Text>

                                <TouchableOpacity onPress={() => alert('cart')}>
                                    <Image
                                        source={require('../../../assets/image/BlueIcons/Plus.png')}
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

    showNoDataFound = (message) => {
        return (
            <View style={{
                height: hp(60), alignSelf: 'center', justifyContent: 'center',
            }}>
                <Image
                    source={require('../../../assets/gif/noData.gif')}
                    style={{ height: hp(20), width: hp(20) }}
                    resizeMode='cover'
                />
                <_Text style={{ paddingTop: 5 }}>{message}</_Text>
            </View>
        );
    }


    sortByModal = () => {

        const { isSortByModal } = this.state

        return (
            <View>
                <Modal
                    style={{
                        justifyContent: 'flex-end',
                        marginBottom: 0,
                        marginLeft: 0,
                        marginRight: 0,
                    }}
                    isVisible={this.state.isSortByModal}
                    onRequestClose={this.closeSortByModal}
                    onBackdropPress={() => this.closeSortByModal()}>
                    <SafeAreaView>
                        <View
                            style={{
                                height: hp(40),
                                backgroundColor: 'gray',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text>okoj</Text>
                            {/* <FlatList
                                data={categoryDatafromState}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                //ItemSeparatorComponent={this.categorySeperator}
                                renderItem={({ item }) => (
                                    <View style={{ paddingVertical: 12, alignItems: 'center' }}>
                                        <TouchableOpacity
                                            hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                            onPress={() => this.setSortBy(item)}>
                                            <_Text fsPrimary fwPrimary>{item.name}</_Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            /> */}
                        </View>
                    </SafeAreaView>
                </Modal>
            </View>

        );
    };

    openSortByModal = () => {
        this.setState({
            isSortByModal: true
        })
    }

    closeSortByModal = () => {
        this.setState({
            isSortByModal: false
        })
    }

    setSortBy = (item) => {
        const { categoryData } = this.state

        this.closeSortByModal()
        this.setState({ selectedSortById: item.id })

        const data = new FormData();
        data.append('table', 'product_master');
        data.append('mode_type', 'normal');
        data.append('collection_id', categoryData.id);
        data.append('user_id', userId);
        data.append('record', 10);
        data.append('page_no', 0);
        data.append('sort_by', "2");

        this.props.getProductSubCategoryData(data)
    }


    seperator = () => {
        return (
            <View
                style={{
                    borderBottomColor: color.primaryGray,
                    borderBottomWidth: 0.5,
                    width: wp(95),
                }}
            />
        );
    };

    LoadMoreData = () => {
        console.log("LoadMoreData");
        this.setState({
            page: this.state.page + 1
        }, () => this.LoadRandomData())
    }

    LoadRandomData = () => {
        console.log("LoadRandomData");
        const { categoryData, page } = this.state

        const data = new FormData();
        data.append('table', 'product_master');
        data.append('mode_type', 'normal');
        data.append('collection_id', categoryData.id);
        data.append('user_id', userId);
        data.append('record', 10);
        data.append('page_no', page);
        data.append('sort_by', '2');

        this.props.getProductSubCategoryData(data)
    }

    footer = () => {
        return (
            <View>
                {!this.props.isFetching && this.state.gridData.length >= 10 ?
                    <TouchableOpacity onPress={() => this.LoadMoreData()}>
                        <View style={{
                            flex: 1, height: hp(5), width: wp(100), backgroundColor: '#EEF8F7',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{ color: '#0d185c',fontSize:16,fontWeight:'bold' }}>Load More</Text>
                        </View>
                    </TouchableOpacity>
                    : null
                }
                {this.props.isFetching && this.state.gridData.length >= 10 ?
                    <View style={{
                        flex: 1, height: 40, width: wp(100), backgroundColor: '#EEF8F7',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <ActivityIndicator size="small" color={color.brandColor} />
                    </View>
                    : null
                }
            </View>

        );
    }


    render() {
        const { categoryData, gridData, isSortByModal, selectedSortById } = this.state

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
                <_CustomHeader
                    Title={categoryData.col_name}
                    RightBtnIcon1={require('../../../assets/image/BlueIcons/Search.png')}
                    RightBtnIcon2={require('../../../assets/image/BlueIcons/Notification.png')}
                    LeftBtnPress={() => this.props.navigation.goBack()}
                    RightBtnPressOne={() => alert("grid search")}
                    RightBtnPressTwo={() => alert("grid notify")}
                    rightIconHeight2={hp(3.5)}
                    LeftBtnPress={() => this.props.navigation.goBack()}
                />


                <View style={{
                    height: hp(6), width: wp(100), flexDirection: 'row',
                    borderBottomWidth: hp(0.2),
                    borderBottomColor: color.primaryGray,
                    backgroundColor: color.white
                }}>
                    <TouchableOpacity
                        disabled={this.props.error}
                        onPress={() => this.openSortByModal()}>
                        <View style={{
                            width: wp(33), flex: 1, flexDirection: 'row',
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Image style={{ height: hp(3), width: hp(3), marginRight: hp(1.5) }}
                                source={require('../../../assets/image/BlueIcons/Sort.png')}
                            />
                            <_Text fsHeading bold textColor={color.brandColor}>SORT</_Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={this.props.error}
                    >
                        <View style={{
                            width: wp(33), flex: 1, flexDirection: 'row',
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Image style={{ height: hp(3), width: hp(3), marginRight: hp(1.5) }}
                                source={require('../../../assets/image/BlueIcons/Filter.png')}
                            />
                            <_Text fsHeading bold textColor={color.brandColor}>FILTER</_Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity disabled={this.props.error}>
                        <View style={{
                            width: wp(33), flex: 1, flexDirection: 'row',
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Image style={{ height: hp(3), width: hp(3), marginRight: hp(2) }}
                                source={require('../../../assets/image/BlueIcons/Select.png')}
                            />
                            <_Text fsHeading bold textColor={color.brandColor}>SELECT</_Text>
                        </View>
                    </TouchableOpacity>

                </View>


                {gridData && <FlatList
                    data={gridData}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={{ marginBottom: hp(1), marginTop: hp(1), }}>
                            {this.gridView(item)}
                        </View>
                    )}

                    numColumns={2}
                    keyExtractor={(item, index) => (item.collection_id).toString()}
                    style={{ marginTop: hp(1), }}
                    //onEndReachedThreshold={0.3}
                    //onEndReached={()=> this.LoadMoreData()}
                    ListFooterComponent={this.footer()}
                // ListEmptyComponent={() => this.showNoDataFound(this.props.errorMsg)}
                />}


                {this.props.isFetching && this.renderLoader()}

                <View>
                    <Modal
                        style={{
                            justifyContent: 'flex-end',
                            marginBottom: 0,
                            marginLeft: 0,
                            marginRight: 0,
                        }}
                        isVisible={this.state.isSortByModal}
                        onRequestClose={this.closeSortByModal}
                        onBackdropPress={() => this.closeSortByModal()}>
                        <SafeAreaView>
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    paddingHorizontal: hp(2),
                                    borderColor: color.gray,
                                    borderWidth: 0.5,
                                    borderTopLeftRadius: 10, borderTopRightRadius: 10
                                }}>
                                <FlatList
                                    data={sortByData}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent={this.seperator}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                            onPress={() => this.setSortBy(item)}>
                                            <View style={{ width: wp(100), flexDirection: 'row' }}>
                                                <View style={{ paddingVertical: 15, width: wp(80), flexDirection: 'row' }}>
                                                    <_Text fsHeading fwHeading>{item.name}</_Text>
                                                    <Image source={item.url}
                                                        style={{ top: 2, marginLeft: hp(2), height: hp(3), width: hp(3) }}
                                                    />
                                                </View>
                                                <View style={{ paddingVertical: 15, width: wp(20), flexDirection: 'row' }}>
                                                    {item.id === selectedSortById &&
                                                        <Image source={require('../../../assets/image/BlueIcons/Tick.png')}
                                                            style={{
                                                                alignItems: 'flex-end',
                                                                marginLeft: hp(1), height: hp(3), width: hp(4)
                                                            }}
                                                        />
                                                    }
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                    )}
                                />
                            </View>
                        </SafeAreaView>
                    </Modal>
                </View>


            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    loaderView: {
        position: 'absolute',
        height: hp(100),
        width: wp(100),
        alignItems: 'center',
        justifyContent: 'center',
    }
});


function mapStateToProps(state) {
    return {
        isFetching: state.productGridReducer.isFetching,
        error: state.productGridReducer.error,
        errorMsg: state.productGridReducer.errorMsg,
        successProductGridVersion: state.productGridReducer.successProductGridVersion,
        errorProductGridVersion: state.productGridReducer.errorProductGridVersion,
        productGridData: state.productGridReducer.productGridData,
    };
}

export default connect(mapStateToProps, { getProductSubCategoryData })(ProductGrid);
