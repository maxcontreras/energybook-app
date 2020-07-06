import React, {Component} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  ViewPropTypes,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {screenHeight, screenWidth, getCardWidth} from '../../Assets/constants';
const cardWidth = getCardWidth(2.2);

const mapStateToProps = state => ({
  readings: state.dailyReducer,
});

class DashboardChart extends Component {
  static propTypes = {
    progressShadowColor: PropTypes.string,
    progressColor: PropTypes.string,
    interiorCircleColor: PropTypes.string,
    circleRadius: PropTypes.number,
    progressWidth: PropTypes.number,
    percentage: PropTypes.number,
    exteriorCircleStyle: ViewPropTypes.style,
    interiorCircleStyle: ViewPropTypes.style,
    animationSpeed: PropTypes.number,
    initialPercentage: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    currentValue: PropTypes.number,
  };
  static defaultProps = {
    progressShadowColor: 'silver',
    progressColor: 'black',
    interiorCircleColor: 'white',
    circleRadius: 120,
    progressWidth: 60,
    animationSpeed: 2,
    initialPercentage: 0,
  };
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    this.state = {
      rotationAnimation: new Animated.Value(props.initialPercentage),
      datos: [],
      maxVal: this.props.maxVal,
      minVal: this.props.minVal,
      dp: this.props.dp,
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }

  componentDidUpdate() {
    this.animate();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  animate = () => {
    const toValue = this.getPercentage();
    const speed = this.props.animationSpeed;
    Animated.spring(this.state.rotationAnimation, {
      toValue,
      speed,
      useNativeDriver: true,
    }).start();
  };
  getPercentage = () => {
    const percentage = parseInt(this.props.dp);
    const minValue = this.props.minVal;
    const maxValue = this.props.maxVal;
    const currentValue = parseInt(this.props.dp);
    if (percentage) return (percentage * 100) / maxValue;
    if (percentage && minValue && maxValue) {
      return (percentage * 100) / maxValue;
    }

    return 0;
  };
  getStyles = () => {
    const {
      circleRadius,
      progressShadowColor,
      progressColor,
      progressWidth,
      interiorCircleColor,
    } = this.props;
    const interiorCircleRadius = circleRadius - progressWidth;

    return StyleSheet.create({
      exteriorCircle: {
        width: circleRadius * 2,
        height: circleRadius,
        borderRadius: circleRadius,
        backgroundColor: '#EEEEEE',
      },
      rotatingCircleWrap: {
        width: circleRadius * 2,
        height: circleRadius,
        top: circleRadius,
      },
      rotatingCircle: {
        width: circleRadius * 2,
        height: circleRadius,
        borderRadius: circleRadius,
        backgroundColor: '#A9F71B',
        transform: [
          {translateY: -circleRadius / 2},
          {
            rotate: this.state.rotationAnimation.interpolate({
              inputRange: [0, 100],
              outputRange: ['0deg', '180deg'],
            }),
          },
          {translateY: circleRadius / 2},
        ],
      },
      interiorCircle: {
        width: interiorCircleRadius * 2,
        height: interiorCircleRadius,
        borderRadius: interiorCircleRadius,
        backgroundColor: 'white',
        top: progressWidth,
      },
    });
  };

  render() {
    const styles = this.getStyles();
    //console.log(this.props);

    return (
      <Card
        containerStyle={[
          defaultStyles.cardStyle,
          this.state.orientation == 'portrait'
            ? {width: Math.min(screenWidth, screenHeight) - 20}
            : {
                width: cardWidth,
              },
        ]}>
        <View style={defaultStyles.view}>
          <View>
            <Text
              style={
                (defaultStyles.demanda,
                [
                  this.state.orientation == 'portrait'
                    ? null
                    : defaultStyles.cardLS,
                ])
              }>
              Demanda
            </Text>
          </View>
          <View
            style={[
              defaultStyles.exteriorCircle,
              styles.exteriorCircle,
              this.props.exteriorCircleStyle,
            ]}>
            <View
              style={[
                defaultStyles.rotatingCircleWrap,
                styles.rotatingCircleWrap,
              ]}>
              <Animated.View
                style={[defaultStyles.rotatingCircle, styles.rotatingCircle]}
              />
            </View>

            <View
              style={[
                defaultStyles.interiorCircle,
                styles.interiorCircle,
                this.props.interiorCircleStyle,
              ]}>
              {this.props.readings && (
                <Text style={defaultStyles.dato}>{this.props.dp}</Text>
              )}
              {this.props.children}
            </View>
          </View>
          {this.props.readings && (
            <View
              style={[
                this.state.orientation == 'portrait'
                  ? defaultStyles.maxMin
                  : defaultStyles.maxMinLandscape,
              ]}>
              <Text style={{fontSize: 10}}>{this.props.readings.minVal}</Text>
              <Text style={{fontSize: 10}}>{this.props.readings.maxVal}</Text>
            </View>
          )}
        </View>
      </Card>
    );
  }
}

export default connect(mapStateToProps)(DashboardChart);

const defaultStyles = StyleSheet.create({
  exteriorCircle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: 'center',
    overflow: 'hidden',
  },
  rotatingCircleWrap: {
    position: 'absolute',
    left: 0,
  },
  rotatingCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  interiorCircle: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  demanda: {
    textAlign: 'center',
    paddingBottom: 2,
    fontWeight: 'bold',
  },
  dato: {
    color: 'black',
    fontSize: 15,
  },
  maxMin: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: 240,
  },
  maxMinLandscape: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 240,
    backgroundColor: 'white',
  },
  view: {
    flex: 1,
    padding: 10,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  cardStyle: {
    padding: 0,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardLS: {
    height: 50,
  },
});
