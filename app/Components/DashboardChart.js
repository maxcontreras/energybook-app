import React, { Component } from "react";
import Swiper from "react-native-web-swiper";

import {
  Animated,
  View,
  StyleSheet,
  ViewPropTypes,
  Text,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import Orientation from "react-native-orientation";

export default class SemiCircleProgress extends Component {
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
    currentValue: PropTypes.number
  };
  static defaultProps = {
    progressShadowColor: "silver",
    progressColor: "black",
    interiorCircleColor: "white",
    circleRadius: 150,
    progressWidth: 60,
    animationSpeed: 2,
    initialPercentage: 0
  };
  constructor(props) {
    super(props);

    this.state = {
      rotationAnimation: new Animated.Value(props.initialPercentage),
      datos: [],
      maxVal: "",
      minVal: "",
      dp: [],
      iD: this.props.companyID,
      portrait: false,
      landscape: false
    };
  }
  componentWillMount() {
    const initial = Orientation.getInitialOrientation();
    if (initial === "PORTRAIT") {
      this.setState({
        portrait: true,
        landscape: false
      });
    } else {
      this.setState({
        portrait: false,
        landscape: true
      });
    }
    fetch(
      `http://api.ienergybook.com/api/DesignatedMeters/?filter={"include":["services"],"where":{"company_id":"${this.state.iD}"}}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => {
        this.state.statusCode = res.status;
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        this.setState({
          datos: json[1]
        }),
          this.setState({
            maxVal: this.state.datos[0].max_value,
            minVal: this.state.datos[0].min_value,
            dp: this.state.datos[0].services[0].dp
          });
        //console.log(this.state.datos);
      })
      .catch(err => {});
  }
  componentDidMount() {
    this.animate();
    Orientation.addOrientationListener(this._orientationDidChange);
  }
  _orientationDidChange = orientation => {
    if (orientation === "LANDSCAPE") {
      console.log("LANDSCAPE");
      this.setState({
        portrait: false,
        landscape: true
      });
    } else {
      this.setState({
        portrait: true,
        landscape: false
      });
      console.log("PORTRAIT");
    }
  };
  componentDidUpdate() {
    this.animate();
  }

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  animate = () => {
    const toValue = this.getPercentage();
    const speed = this.props.animationSpeed;
    Animated.spring(this.state.rotationAnimation, {
      toValue,
      speed,
      useNativeDriver: true
    }).start();
  };
  getPercentage = () => {
    const percentage = parseInt(this.state.dp);
    const minValue = this.state.minVal;
    const maxValue = this.state.maxVal;
    const currentValue = parseInt(this.state.dp);
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
      interiorCircleColor
    } = this.props;
    const interiorCircleRadius = circleRadius - progressWidth;

    return StyleSheet.create({
      exteriorCircle: {
        width: circleRadius * 2,
        height: circleRadius,
        borderRadius: circleRadius,
        backgroundColor: "#EEEEEE"
      },
      rotatingCircleWrap: {
        width: circleRadius * 2,
        height: circleRadius,
        top: circleRadius
      },
      rotatingCircle: {
        width: circleRadius * 2,
        height: circleRadius,
        borderRadius: circleRadius,
        backgroundColor: "#A9F71B",
        transform: [
          { translateY: -circleRadius / 2 },
          {
            rotate: this.state.rotationAnimation.interpolate({
              inputRange: [0, 100],
              outputRange: ["0deg", "180deg"]
            })
          },
          { translateY: circleRadius / 2 }
        ]
      },
      interiorCircle: {
        width: interiorCircleRadius * 2,
        height: interiorCircleRadius,
        borderRadius: interiorCircleRadius,
        backgroundColor: "white",
        top: progressWidth
      }
    });
  };

  render() {
    const styles = this.getStyles();
    return (
      <View
        style={[this.state.portrait ? defaultStyles.view : defaultStyles.view2]}
      >
        <View>
          <Text style={defaultStyles.demanda}>Demanda</Text>
        </View>
        <View
          style={[
            defaultStyles.exteriorCircle,
            styles.exteriorCircle,
            this.props.exteriorCircleStyle
          ]}
        >
          <View
            style={[
              defaultStyles.rotatingCircleWrap,
              styles.rotatingCircleWrap
            ]}
          >
            <Animated.View
              style={[defaultStyles.rotatingCircle, styles.rotatingCircle]}
            />
          </View>

          <View
            style={[
              defaultStyles.interiorCircle,
              styles.interiorCircle,
              this.props.interiorCircleStyle
            ]}
          >
            <Text style={defaultStyles.dato}>{this.state.dp}</Text>
            {this.props.children}
          </View>
        </View>
        <View
          style={[
            this.state.portrait
              ? defaultStyles.maxMin
              : defaultStyles.maxMinLandscape
          ]}
        >
          <Text style={{ fontSize: 10 }}>{this.state.minVal}</Text>
          <Text style={{ fontSize: 10 }}>{this.state.maxVal}</Text>
        </View>
      </View>
    );
  }
}
var screenHeight = Math.round(Dimensions.get("window").height);
var screenWidth = Math.round(Dimensions.get("window").width);

const defaultStyles = StyleSheet.create({
  exteriorCircle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: "center",
    overflow: "hidden"
  },
  rotatingCircleWrap: {
    position: "absolute",
    left: 0
  },
  rotatingCircle: {
    position: "absolute",
    top: 0,
    left: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  interiorCircle: {
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  demanda: {
    textAlign: "center",
    paddingBottom: 2
  },
  dato: {
    color: "black",
    fontSize: 15
  },
  maxMin: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white"
  },
  maxMinLandscape: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 10,
    width: 300,
    backgroundColor: "white"
  },
  view: {
    flex: 1,
    paddingBottom: 20,
    height: "auto",
    width: "auto",
    backgroundColor: "white"
  },
  view2: {
    flex: 1,
    paddingBottom: 20,
    height: 200,
    width: screenWidth,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  }
});
