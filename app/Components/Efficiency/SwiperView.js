import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {EffSwiperOptions} from '../../Assets/constants';
import Swiper from 'react-native-web-swiper';
import {CardChida, MensualCard} from './index';
import moment from 'moment/min/moment-with-locales';

export default class SwiperView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  aver() {
    return false;
  }

  setDayDates(date) {
    var mes = moment(date)
      .locale('es')
      .format('MMMM');
    var año = moment(date).format('YYYY');
    let customdates = {
      from: `${moment(date)
        .startOf('month')
        .format('YYYY-MM-DD')}`,
      until: `${moment(date)
        .endOf('month')
        .format('YYYY-MM-DD')}`,
    };
    let dayFecha = {
      from: `${date}`,
      until: `${date}`,
    };
    let mesesito = mes.charAt(0).toUpperCase() + mes.slice(1);
    let mesNum = moment(date).format('MM');
    this.props.functionDayDates(customdates, dayFecha, mesesito, año, mesNum);
  }

  render() {
    return (
      <View style={styles.swiperView}>
        <Swiper gesturesEnabled={this.aver} controlsProps={EffSwiperOptions}>
          <View>
            <CardChida
              type={'diario'}
              setDayDates={this.setDayDates.bind(this)}
              fecha={this.props.dayFecha}
              data={this.props.cardData}
              mes={this.props.mesesito}
              ref={this.props.myRef}
            />
          </View>
          <View>
            <MensualCard
              type={'mensual'}
              setCalendar={this.props.setMonthCalendar}
              data={this.props.cardData}
              mes={this.props.mesesito}
              fecha={this.props.dayFecha}
              monthProd={this.props.monthProd}
            />
          </View>
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  swiperView: {
    flex: 1,
    width: '100%',
    height: 400,
    marginBottom: 20,
  },
});
