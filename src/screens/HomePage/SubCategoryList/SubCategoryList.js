import React, { Component } from 'react';
import {
    View, Text, Image,

    FlatList, ImageBackground
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { strings } from '@values/strings';
import { color } from '@values/colors';
import { capitalizeFirstLetter } from "@values/validate";
import _Header from '@header/_Header'
import * as Animatable from 'react-native-animatable';
import IconPack from '@login/IconPack';


export default class SubCategoryList extends Component {
    constructor(props) {
        super(props);
        const data = this.props.route.params.subcategory;

        this.state = {
            subcategoryData: data
        };
    }

    subcategoryView = (item, index) => {
        console.log("item----", item);
        return (
            <Animatable.View animation="flipInX" style={{ paddingTop: hp(0.5), paddingBottom: hp(0.5) }}>
                <View style={{ flexDirection: 'row', flex: 1, marginLeft: hp(2), marginRight: hp(2) }}>
                    <View style={{ flex: 0.25, justifyContent: 'flex-start', }}>
                        <Image
                            style={{
                                height: hp(9), width: hp(9), borderRadius: 10,
                                borderWidth: 0.3, borderColor: '#DCDCDC'
                            }}
                            source={require('../../../assets/image/insta.png')}
                            defaultSource={require('../../../assets/image/default.png')}
                        />
                    </View>

                    <View style={{ alignContent: 'center', justifyContent: 'center', flex: 0.70 }}>
                        <_Text numberOfLines={2} fwPrimary
                            textColor={color.white}
                            fsMedium style={{ marginRight: hp(3) }}>
                            {item.col_name && capitalizeFirstLetter(item.col_name)}
                        </_Text>
                    </View>
                </View>
                {index !== (item.length - 1) &&
                    <View
                        style={{
                            paddingTop: hp(1), marginLeft: wp(22), marginRight: wp(3),
                            alignSelf: 'stretch',
                            borderBottomColor: '#D3D3D3',
                            borderBottomWidth: 1,
                        }}
                    />}
            </Animatable.View>
        )
    }
    render() {
        const { subcategoryData } = this.state
        return (
            <View>

                <ImageBackground
                    source={IconPack.LOGIN_BG}
                    style={{ width: wp(100), height: hp(100) }}
                >
                    <View style={{ justifyContent: 'center', width: wp(100), paddingVertical: Platform.OS === 'ios' ? hp(14) : hp(9) }}>
                        <FlatList
                            onRefresh={() => alert('inProgress')}
                            refreshing={false}
                            data={subcategoryData.subcategory && subcategoryData.subcategory}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) => (
                                this.subcategoryView(item, index)
                            )}
                        />
                    </View>
                </ImageBackground>
            </View>

        );
    }
}
