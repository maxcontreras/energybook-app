import React, {Component, PropTypes} from 'react';
import {View, StyleSheet, Dimensions, Platform} from 'react-native';
import {Card} from 'react-native-elements';
import {TopInfo, BottomInfo, BlueButton} from './index';

export default class PDFcard extends Component {
  constructor(props) {
    super(props);
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    this.state = {
      url: '',
      dailyTCC: '',
      values: [],
      pdfs: [],
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

  UNSAFE_componentWillMount() {
    this.setState({
      pdfs: this.props.pdfs,
    });
  }

  render() {
    return (
      <View>
        {this.state.pdfs.length != 0 && (
          <View>
            {this.state.pdfs.map((file, index) => (
              <View key={index} style={{flex: 1}}>
                <Card
                  title={file.title}
                  containerStyle={[styles.infoContainer, {padding: 0}]}
                  titleStyle={styles.titleStyle}
                  wrapperStyle={{borderRadius: 10}}>
                  <View style={[styles.infoContainer, {width: '100%'}]}>
                    <TopInfo
                      number={file.number}
                      description={file.description}
                    />
                    <BottomInfo date={file.date} />
                  </View>
                </Card>
                <BlueButton file={file.pdfFile} />
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  titleStyle: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'normal',
    margin: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
});
