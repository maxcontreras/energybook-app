import React, { Component } from "react";
import {
  AppRegistry,
  SectionList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Dimensions,
  Image,
  Platform
} from "react-native";
import Orientation from "react-native-orientation";
import { connect } from "react-redux";
import { Card } from "react-native-elements";

const mapStateToProps = state => ({
  userData: state.initialValues[0],
  //companyId
  companyData: state.initialValues[1],
  //city and stuff
  companyInfo: state.initialValues[2],
  prices: state.costReducer[0],
  readings: state.dailyReducer[0]
});
class Data extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      url: "",
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
  }
  componentDidMount() {
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
  componentWillUnmount() {
    this._isMounted = false;
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  render() {
    return (
      <View style={[this.state.portrait ? styles.viewCard : styles.cardLS]}>
        <Card containerStyle={styles.cardStyle}>
          <View style={styles.topCard}>
            <Text style={styles.facturationText}>Precio CFE del periodo</Text>
          </View>
          <View style={styles.bottom}>
            <View style={styles.data}>
              <View style={{ flexDirection: "row" }}>
                {this.props.readings && this.props.prices && (
                  <View style={styles.container}>
                    <SectionList
                      sections={[
                        {
                          title: "Base",
                          data: ["$" + this.props.prices.basePrice]
                        }
                      ]}
                      renderItem={({ item }) => (
                        <Text style={styles.item}>{item}</Text>
                      )}
                      renderSectionHeader={({ section }) => (
                        <Text style={styles.sectionHeader}>
                          {section.title}
                        </Text>
                      )}
                      keyExtractor={(item, index) => index}
                    />
                    <SectionList
                      sections={[
                        {
                          title: "Media",
                          data: ["$" + this.props.prices.middlePrice]
                        }
                      ]}
                      renderItem={({ item }) => (
                        <Text style={styles.item}>{item}</Text>
                      )}
                      renderSectionHeader={({ section }) => (
                        <Text style={styles.sectionHeader}>
                          {section.title}
                        </Text>
                      )}
                      keyExtractor={(item, index) => index}
                    />
                    <SectionList
                      sections={[
                        {
                          title: "Punta",
                          data: ["$" + this.props.prices.peakPrice]
                        }
                      ]}
                      renderItem={({ item }) => (
                        <Text style={styles.item}>{item}</Text>
                      )}
                      renderSectionHeader={({ section }) => (
                        <Text style={styles.sectionHeader}>
                          {section.title}
                        </Text>
                      )}
                      keyExtractor={(item, index) => index}
                    />
                    <SectionList
                      sections={[
                        {
                          title: "Capacidad",
                          data: ["$" + this.props.prices.capacityPrice]
                        }
                      ]}
                      renderItem={({ item }) => (
                        <Text style={styles.item}>{item}</Text>
                      )}
                      renderSectionHeader={({ section }) => (
                        <Text style={styles.sectionHeader}>
                          {section.title}
                        </Text>
                      )}
                      keyExtractor={(item, index) => index}
                    />
                    <SectionList
                      sections={[
                        {
                          title: "Distribución",
                          data: ["$" + this.props.prices.distributionPrice]
                        }
                      ]}
                      renderItem={({ item }) => (
                        <Text style={styles.item}>{item}</Text>
                      )}
                      renderSectionHeader={({ section }) => (
                        <Text style={styles.sectionHeader}>
                          {section.title}
                        </Text>
                      )}
                      keyExtractor={(item, index) => index}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Data);

var screenHeight = Math.round(Dimensions.get("window").height);
var screenWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "row"
  },
  sectionHeader: {
    paddingTop: 2,
    paddingBottom: 2,
    color: "black",
    fontSize: 12
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 12
  },
  date: {
    fontSize: 10
  },
  last: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10
  },
  bottom: {
    //flex: 6,
    backgroundColor: "white",
    width: Dimensions.get("window").width - 30,
    flexDirection: "row",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 70,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    flex: 0.5,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 12,
    paddingLeft: 10
  },
  data: {
    flex: 3,
    paddingLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  image: {
    width: 35,
    height: 35
  },
  viewCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
    paddingTop: 10,
    paddingBottom: 20
  },
  cardLS: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "flex-start",
    width: screenWidth,
    backgroundColor: "white",
    paddingTop: 0
  },

  cardLandscape: {
    flex: 1,
    justifyContent: "center",
    width: screenHeight,
    paddingLeft: 202,
    paddingRight: 202
  },
  topCard: {
    flex: 1.5,
    backgroundColor: "white",
    width: Dimensions.get("window").width - 30,
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 2,
    paddingTop: 10,
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  facturationText: {
    paddingLeft: 20,
    paddingBottom: 5,
    fontSize: 12
  },
  cardStyle: {
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowColor: "black",
        shadowOffset: { width: 20, height: 20 },
        shadowOpacity: 0.2
      },
      android: {
        elevation: 5
      }
    }),
    padding: 0,
    borderRadius: 10,
    height: 100
  }
});
