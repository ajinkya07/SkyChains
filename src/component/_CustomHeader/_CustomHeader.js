import React, { Component } from 'react'
import {
    Header,
    Left,Button,Body,
    Right,Title,
} from 'native-base'

import {
    View, Image, TouchableOpacity,Platform
} from 'react-native';
import _Text from '@text/_Text'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { color } from '@values/colors';


export default class _CustomHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {

        return (
            <View >
                <Header hasTabs
                    style={{ 
                        width: wp(100),
                        height: hp(7.5),
                        paddingVertical: Platform.OS === 'ios' ? hp(2) : 2,
                        backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : 'transparent' }}
                >
                    <Left style={{ flex: 1 }}>
                        <Button
                            style={{ marginLeft: 8, marginTop: 8, }}
                            transparent
                            onPress={() => this.props.LeftBtnPress()}
                        >
                            <Image
                                source={this.props.LeftBtnIcon ? this.props.LeftBtnIcon :
                                    require('../../assets/image/back.png')}
                                style={{
                                    height: this.props.height ? this.props.height : hp(2.5),
                                    width: this.props.width ? this.props.width : hp(2.5)
                                }}
                            />

                        </Button>

                    </Left>

                    {this.props.Title &&
                        <Body style={{ flex: 1 }}>
                            <Title style={{ color: color.black,fontSize:hp(2.8) }}>
                                {this.props.Title ? this.props.Title : ''}
                            </Title>
                        </Body>
                    }

                    <Right style={{ flex: 1 }}>
                        {this.props.RightBtnIcon &&
                            <Button
                                style={{ marginRight: 5, marginTop: 10, }}
                                transparent
                                onPress={() => this.props.RightBtnPress()}
                            >
                                <Image source={this.props.RightBtnIcon}
                                    style={{
                                        height: this.props.height ? this.props.height : hp(2.5),
                                        width: this.props.width ? this.props.width : hp(2.5)
                                    }}
                                />

                            </Button>
                        }
                        {this.props.RightBtnText &&
                            <TouchableOpacity>
                                <_Text fsHeading bold textColor={color.tertiaryGray}>
                                    {this.props.RightBtnText}
                                </_Text>
                            </TouchableOpacity>
                        }
                    </Right>
                </Header>
                <View
                style={{
                  borderBottomWidth: hp(0.2),
                  borderBottomColor: '#DDDDDD',
                }}
              />
            </View>
        )
    }

}

