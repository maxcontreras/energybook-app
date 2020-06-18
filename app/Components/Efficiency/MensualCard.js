import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Platform} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {returnArrayM} from './Data';
import {BottomCard, MensualDates} from './index';
import {isPortrait, screenHeight, screenWidth} from '../../Assets/constants';
import {RowText} from './index';
const mapStateToProps = state => ({
  userData: state.initialValues,
  readings: state.dailyReducer,
  adminIds: state.adminReducer,
  prices: state.costReducer,
});

class MensualCard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    isPortrait();
    this.state = {};
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }
  render() {
    let dataMensual = returnArrayM(this.props.data);
    //consumo total del mes / produccion total del mes
    let formula1 = (
      parseFloat(this.props.data.readingEPimp) /
      parseFloat(this.props.monthProd)
    ).toFixed(2);
    // precio de consumo
    let epimp = this.props.data.priceEPimp.split('$');
    // $consumo + $distribucion + $capacidad / podcuccion mensual
    let formula2 =
      (parseFloat(epimp[1]) +
        parseFloat(this.props.data.priceCapacity) +
        parseFloat(this.props.data.priceDistribution)) /
      parseFloat(this.props.monthProd);
    console.log(this.props.data.priceEPimp.split('$'));

    return (
      <View style={styles.extrenalView}>
        <Card
          title={
            <MensualDates
              data={this.props.data}
              setCalendar={this.props.setCalendar}
              mes={this.props.mes}
            />
          }
          containerStyle={styles.containerCard}
          titleStyle={styles.titleStyle}
          wrapperStyle={styles.wrapperStyle}>
          <View style={styles.innerView}>
            <View style={styles.innerView}>
              <RowText
                data={dataMensual}
                type={this.props.type}
                monthProd={this.props.monthProd}
              />
              <BottomCard
                type={this.props.type}
                formula1={formula1}
                formula2={formula2}
              />
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

export default connect(mapStateToProps)(MensualCard);
const styles = StyleSheet.create({
  titleStyle: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'normal',
    margin: 10,
    textAlign: 'right',
    height: 'auto',
    justifyContent: 'center',
  },
  containerCard: {
    height: 350,
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
    width: Math.min(screenWidth, screenHeight) - 20,
  },
  titleView: {
    color: 'black',
  },
  extrenalView: {
    flex: 1,
    width: '100%',
    height: 400,
    alignItems: 'center',
  },
  innerView: {
    flex: 1,
    paddingBottom: 10,
  },
  wrapperStyle: {
    borderRadius: 10,
    flex: 1,
  },
});
