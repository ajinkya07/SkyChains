import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';

const {width, height} = Dimensions.get('window');
const hRem = height / 1600;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const AnimatedFastImage = Animated.createAnimatedComponent(Image);
const BG_IMAGE_MAX_HEIGHT = width * 0.9026162791;
const MINUS_TOP = BG_IMAGE_MAX_HEIGHT;
const MINUS_TOP_LESS = MINUS_TOP - 49;



const ProductDetails = props => {
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerHeight = useHeaderHeight();
  props.navigation.setOptions({
    headerTitle: () => (
      <Animated.Text
        style={[{opacity: titleOpacity}, styles.headerExpertNameStyle]}>
        Virat Kohli
      </Animated.Text>
    ),
    headerTitleStyle: {
      fontSize: 18,
    },
    headerTransparent: true,
    // headerLeft: () => <null />
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-150, 0],
    outputRange: [1.8, 1],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, MINUS_TOP_LESS, MINUS_TOP],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  
  return (
    <View style={styles.container}>
      <AnimatedFastImage
        source={{
          uri:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsq6ySNxF--9epg-z285B8gDfy68WgGdAoDQ&usqp=CAU',
        }}
        style={[
          styles.absImageStyle,
          {
            transform: [
              {
                scale: imageScale,
              },
            ],
            zIndex: -1,
          },
        ]}
      />
      <Animated.View
        style={{
          width: '100%',
          height: headerHeight,
          backgroundColor: '#fff',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          opacity: titleOpacity,
          zIndex: 0,
        }}
      />
      <AnimatedScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        scrollEventThrottle={16}
        overScrollMode="always"
        style={{zIndex: -1}}>
        <View style={styles.contentViewStyle}>
          <View style={styles.contentStyle}>
            <View style={styles.nameContainer}>
              <Text style={styles.expertNameStyle} numberOfLines={1}>
                Virat Kohli
              </Text>
            </View>
            <Text style={styles.tagTextStyle}>India</Text>
            <View style={styles.dividerLine} />
            <Text style={styles.livesInTextStyle}>Lives in Mumbai</Text>
            <Text style={styles.descTextStyle}>
              In fall 2017, something odd happened to Fredrik Backman, the
              bestselling Swedish author of 2012â€™s A Man Called Ove. He was
              scheduled to be at a book fair in Copenhagen, but suddenly nothing
              made sense. â€œAll the dates were confused, I didnâ€™t know where I
              was supposed to be,â€ the 39-year-old says via WhatsApp from his
              home in Stockholm. â€œThereâ€™s an expression in Swedish when youâ€™re
              burned out. They say, â€˜This person hit the wall.â€™ Thatâ€™s what I
              did.â€ In adulthood, Backmanâ€™s gigs included being a forklift
              driver and a blogger. â€œI still donâ€™t feel, â€˜Oh, Iâ€™m an author,â€™â€‰â€
              he says. â€œIf these were medieval times, I would be the guy
              wandering from village to village telling stories for coins.â€ Itâ€™s
              pretty much the only thing heâ€™s been doing since the age of 25,
              but he still assumes it could all go away tomorrow. â€œThe only
              thing that people have to decide is, â€˜Weâ€™re done with this,â€™ and
              that part of my life is over. But Iâ€™ll still tell stories. I donâ€™t
              have much in the way of hobbies. I donâ€™t have a lot of friends. I
              donâ€™t do a lot of things. Iâ€™m with my family, I write, and I
              read.â€ And Backman prefers that, really. But in 2017, another
              strange thing happened: the movie adaptation of A Man Called Ove
              was nominated for an Academy Award for best foreign film. (Tom
              Hanks is starring in an English-language adaptation scheduled to
              be released later this year.) Backman and his wife, who handles
              the business aspects of his career, flew to L.A. for the Oscars,
              but theyâ€™d only gotten one ticket, and Backman wasnâ€™t keen to go
              to the event by himself. â€œThere was no way Iâ€™d be there without my
              wife,â€ he says. â€œSo she went with the film crew, which they were
              very happy about; they were like, â€˜We get the fun one!â€™â€‰â€
            </Text>
            <Text style={styles.expertsPhiolosyStyle}>NewsDetails</Text>
            <Text style={styles.quoteStyle}>
              Fredrik Backman Steals From Himself
            </Text>
          </View>
          <View style={styles.getInTouchContainer}>
            <Text style={styles.getInTouchText}>Information</Text>
          </View>
        </View>
      </AnimatedScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  absImageStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: undefined,
    aspectRatio: 0.9026162791,
  },
  container: {
    flex: 1,
  },
  contentViewStyle: {
    backgroundColor: '#fff',
    marginTop: MINUS_TOP,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentStyle: {marginHorizontal: 16},
  nameContainer: {
    flexDirection: 'row',
    marginTop: 18,
  },
  expertNameStyle: {
    fontSize: 21,
    color: 'black',
  },
  dividerLine: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#2d2e2f55',
    marginTop: 27 * hRem,
  },
  livesInTextStyle: {
    fontSize: 16,
    color: '#000000',
    opacity: 0.55,
    marginTop: 15 * hRem,
  },
  descTextStyle: {
    fontSize: 16,
    color: 'black',
    marginTop: 23 * hRem,
  },
  expertsPhiolosyStyle: {
    fontSize: 16,
    color: '#000000',
    marginTop: 46 * hRem,
  },
  quoteStyle: {
    fontSize: 21,
    color: '#000000',
    textAlign: 'center',
    marginTop: 40 * hRem,
    lineHeight: 28,
  },
  getInTouchContainer: {
    backgroundColor: '#ece9df',
    marginTop: 39 * hRem,
    paddingTop: 43 * hRem,
    paddingBottom: 37 * hRem,
    paddingHorizontal: 16,
  },
  headerExpertNameStyle: {
    fontSize: 18,
    color: '#000000',
  },
  tagTextStyle: {
    fontSize: 16,
    color: '#000000',
    opacity: 0.55,
    marginTop: 10 * hRem,
  },
});

export default ProductDetails;