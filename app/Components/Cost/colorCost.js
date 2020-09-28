// VIEW FOR COLOR INDICATORS FOR THE CHART INSIDE COSTS
import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export default class Colors extends Component {
  constructor(props) {
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    super(props);
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  render() {
    //COLORS FOR CHART PER HOUR
    const datos1 = [
      {titulo: 'Base', color: '#EDDC44'},
      {titulo: 'Intermedia', color: '#25CEBC'},
      {titulo: 'Punta', color: '#DE3E10'},
    ];
    //COLORS FOR CHART PER DAY
    const datos2 = [
      {
        titulo: 'Diario',
        color: '#F68C42',
      },
    ];
    var key = 0;

    var array = this.props.color == 'Cada hora' ? datos1 : datos2;
    return (
      <View
        style={[
          styles.container,
          this.state.orientation == 'portrait'
            ? {width: Math.min(screenWidth, screenHeight), marginBottom: null}
            : {width: Math.max(screenWidth, screenHeight), marginBottom: 20},
        ]}>
        {array.map(datos => (
          <View key={key++} style={styles.innerView}>
            <View
              style={[
                styles.colorSquare,
                {
                  backgroundColor: datos.color,
                },
              ]}
            />
            <Text>{datos.titulo}</Text>
          </View>
        ))}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 'auto',
    backgroundColor: 'white',
  },
  colorSquare: {
    width: 20,
    height: 20,
    margin: 5,
  },
  innerView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
});
