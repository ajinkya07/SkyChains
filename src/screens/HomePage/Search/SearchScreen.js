import React, { Component } from 'react';
import {
    View, Text, SafeAreaView, TouchableOpacity,
    StyleSheet, TextInput, ScrollView, Image
} from 'react-native';
import {
    DatePicker, Footer
} from "native-base";

import _CustomHeader from '@customHeader/_CustomHeader'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { connect } from 'react-redux';
import { color } from '@values/colors';



export default class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gwFrom: '',
            gwTo: '',
            nwFrom: '',
            nwTo: '',
            fromDate: new Date(),
            toDate: new Date()
        };
    }

    setToDate(newDate) {
        this.setState({ toDate: newDate });
    }

    setFromDate(newDate) {
        this.setState({ fromDate: newDate });
    }


    onTextChanged = (inputKey, value) => {
        this.setState({
            [inputKey]: value,
        });
    }


    grossWeight = () => {
        const { gwFrom, gwTo, nwFrom, nwTo } = this.state

        return (
            <View style={{ marginHorizontal: wp(3) }}>
                <_Text fsHeading>Gross Weight</_Text>
                <View style={{ marginTop: hp(1), flexDirection: 'row', width: wp(100), justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', width: wp(40) }}>
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={(gwFrom) => this.onTextChanged('gwFrom', gwFrom)}
                            value={gwFrom}
                            placeholder="From"
                            maxLength={10}
                            placeholderTextColor="gray"
                            keyboardType={'numeric'}
                        />
                    </View>
                    <_Text fsMedium style={{ marginTop: hp(2) }}>AND   </_Text>

                    <View style={{ flexDirection: 'row', width: wp(40) }}>
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={(gwTo) => this.onTextChanged('gwTo', gwTo)}
                            value={gwTo}
                            maxLength={10}
                            placeholder="To"
                            placeholderTextColor="gray"
                            keyboardType={'numeric'}
                        />
                    </View>
                </View>
            </View>
        )
    }

    netWeight = () => {
        const { gwFrom, gwTo, nwFrom, nwTo } = this.state
        return (
            <View style={{ marginHorizontal: wp(3) }}>
                <_Text fsHeading>Net Weight</_Text>
                <View style={{ marginTop: hp(1), flexDirection: 'row', width: wp(100), justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', width: wp(40) }}>
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={(nwFrom) => this.onTextChanged('nwFrom', nwFrom)}
                            value={nwFrom}
                            maxLength={10}
                            placeholder="From"
                            placeholderTextColor="gray"
                            keyboardType={'numeric'}
                        />
                    </View>
                    <_Text fsMedium style={{ marginTop: hp(2) }}>AND   </_Text>

                    <View style={{ flexDirection: 'row', width: wp(40) }}>
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={(nwTo) => this.onTextChanged('nwTo', nwTo)}
                            value={nwTo}
                            maxLength={10}
                            placeholder="To"
                            placeholderTextColor="gray"
                            keyboardType={'numeric'}
                        />
                    </View>
                </View>
            </View>
        )
    }

    productReleaseDate = () => {
        return (
            <View style={{ marginHorizontal: wp(3) }}>
                <_Text fsHeading>Product Release Between:</_Text>
                <View style={{ marginTop: hp(0.5), flexDirection: 'row', width: wp(100), justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', width: wp(40) }}>
                        <DatePicker
                            defaultDate={new Date()}
                            // minimumDate={new Date(2018, 1, 1)}
                            //maximumDate={new Date(2018, 12, 31)}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="From Date"
                            textStyle={{ marginTop: hp(0.5), fontSize: 20 }}
                            placeHolderTextStyle={{ color: "gray", fontSize: 20 }}
                            onDateChange={() => this.setFromDate()}
                        />

                    </View>
                    <_Text fsMedium style={{ marginTop: hp(1.5) }}>AND   </_Text>

                    <View style={{ flexDirection: 'row', width: wp(40) }}>
                        <DatePicker
                            defaultDate={new Date()}
                            // minimumDate={new Date(2018, 1, 1)}
                            //maximumDate={new Date(2018, 12, 31)}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="To Date"
                            textStyle={{ marginTop: hp(0.5), fontSize: 20 }}
                            placeHolderTextStyle={{ color: "gray", fontSize: 20 }}
                            onDateChange={() => this.setToDate()}
                        />
                    </View>
                </View>
            </View>
        )
    }


    selectKarat = () => {
        return (
            <View style={{ marginHorizontal: wp(3) }}>
                <_Text fsHeading>Karat:</_Text>
                <TouchableOpacity>
                    <View style={{
                        marginTop: hp(1), flexDirection: 'row',
                        justifyContent: 'space-between', width: wp(90),
                    }}>
                        <_Text fsHeading textColor={'gray'} style={{ marginLeft: wp(3) }}>Select Karat:</_Text>
                        <Image
                            style={{ height: hp(2.5), width: hp(2.5), marginTop: hp(0.5) }}
                            source={require('../../../assets/image/DownArrow.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    selectCategories = () => {
        return (
            <View style={{ marginHorizontal: wp(3), }}>
                <_Text fsHeading>Select Categories:</_Text>

                <View style={{ marginHorizontal: wp(3), justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <View style={styles.roundedButton}>
                            <View style={styles.buttonText}>
                                <_Text fsHeading bold>SELECT CATEGORIES</_Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }

    searchButton = () => {
        return (
            <View style={{ marginBottom: hp(4), marginHorizontal: wp(3), justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity>
                    <View style={styles.roundedButtonSearch}>
                        <View style={styles.buttonText}>
                            <_Text fsHeading bold textColor={'#fbcb84'}>SEARCH</_Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
                <_CustomHeader
                    Title={'Search'}
                    RightBtnIcon2={require('../../../assets/image/BlueIcons/Notification.png')}
                    LeftBtnPress={() => this.props.navigation.goBack()}
                    RightBtnPressTwo={()=> this.props.navigation.navigate('Notification')}
                    rightIconHeight2={hp(3.5)}
                />
                <ScrollView>

                    <View style={{ paddingVertical: hp(1.5), justifyContent: 'center', alignItems: 'center' }}>
                        <_Text fsHeading>Code Search:</_Text>
                        <TouchableOpacity>
                            <View style={styles.roundedButton}>
                                <View style={styles.buttonText}>
                                    <_Text fsHeading bold>SEARCH BY CODE</_Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.border} />

                    <_Text fsHeading style={{ textAlign: 'center', marginTop: hp(1.5) }}>Advanced Search:</_Text>

                    <View style={{ paddingVertical: hp(1.5), }}>
                        {this.grossWeight()}
                    </View>
                    <View style={{ paddingVertical: hp(1.5), }}>
                        {this.netWeight()}
                    </View>

                    <View style={{ paddingVertical: hp(1.5), }}>
                        {this.productReleaseDate()}
                    </View>

                    <View style={{ paddingVertical: hp(0.5), }}>
                        {this.selectKarat()}
                    </View>

                    <View style={{ paddingVertical: hp(2), }}>
                        {this.selectCategories()}
                    </View>

                    <View style={{ paddingVertical: hp(0.5), }}>
                        <View style={styles.border} />
                        {this.searchButton()}
                    </View>

                </ScrollView>



            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    border: {
        borderColor: '#DDDDDD',
        borderBottomWidth: 0.8,
        marginTop: hp(1)
    },
    textInputStyle: {
        height: 45,
        width: wp(35),
        borderColor: 'gray',
        borderBottomWidth: 1,
        fontSize: 20
    },
    roundedButton: {
        marginTop: hp(1.5),
        backgroundColor: 'white', height: 50, alignItems: 'center',
        width: wp(85), justifyContent: 'center', borderRadius: 40,
        borderColor: '#fbcb84', borderWidth: 2,
    },
    roundedButtonSearch: {
        marginTop: hp(1.5),
        backgroundColor: '#11255a', height: 50, alignItems: 'center',
        width: wp(85), justifyContent: 'center', borderRadius: 40,
    },
    buttonText: {
        width: wp(100), height: hp(100),
        justifyContent: 'center',
        alignItems: 'center'
    }
})
