import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Manufactura, Salvar} from '../../Assets/Svg/Design/index';
import {getFontSize} from '../../Assets/constants';
let fontSize = getFontSize('large');
export default class BottomCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idPaCambiar: '',
      isExisting: false,
      values: [],
    };
  }
  checkProduction() {
    //Checks if there is a value existing already in the chosen day or not.
    fetch(
      `http://api.ienergybook.com/api/eficiencia?access_token=${
        this.props.accesToken
      }`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(res => {
        this.state.statusCode = res.status;
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        console.log(json);

        if (json[1].length != 0) {
          let exists = false;
          for (i in json[1]) {
            if (
              json[1][i].UserId == this.props.userId &&
              json[1][i].Dia == this.props.date
            ) {
              //if there is a match
              exists = true;
            }
          }
          this.setState(
            {
              isExisting: exists ? exists : false,
              idPaCambiar: exists ? json[1][i].id : '',
            },
            () => {
              this.saveProduction();
            },
          );
        }
      })
      .catch(err => {
        console.log('no se pudo');
      });
  }
  saveProduction() {
    //Inuput function.
    //Saves value given by the user after checked.
    //If no  value existing for the chosen day
    var write = {
      UserId: this.props.userId,
      Dia: this.props.date,
      valor: this.props.inputProduccion,
    };
    //If there is a value existing already in the chosen day
    var rewrite = {
      UserId: this.props.userId,
      Dia: this.props.date,
      valor: this.props.inputProduccion,
      id: this.state.idPaCambiar,
    };
    fetch(
      `http://api.ienergybook.com/api/eficiencia?access_token=${
        this.state.values.accesToken
      }`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.isExisting ? rewrite : write),
      },
    )
      .then(res => {
        this.state.statusCode = res.status;
        const data = res.json();
        return Promise.all([this.state.statusCode, data]);
      })
      .then(json => {
        this.setState({
          inputProduccion: null,
        });

        //Triggers father function to re-render and show changes.
        this.props.showDayProd();
      })
      .catch(err => {
        console.log('no se pudo');
      });
  }

  render() {
    return this.props.type == 'diario' ? (
      <View style={styles.guardarView}>
        <TouchableOpacity onPress={() => this.checkProduction()}>
          <Salvar style={styles.icon} />
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.mensualResult}>
        <View style={styles.resultView}>
          <Text style={styles.resultText}>{this.props.formula1} kWh/ u</Text>
          <Text style={styles.resultText}>00.00 $/ u</Text>
        </View>
        <View style={styles.manufactura}>
          <Manufactura style={{width: 50, height: 50}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  manufactura: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  resultText: {
    fontWeight: 'bold',
    fontSize: fontSize.title + 5,
    margin: 2.5,
  },
  resultView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mensualResult: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  guardarView: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  icon: {
    height: 35,
    width: 35,
  },
});
