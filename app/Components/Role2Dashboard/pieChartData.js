import {Platform} from 'react-native';
import {getCardWidth} from '../../Assets/constants';
const cardWidth = getCardWidth(2.2);
export function pieData(data) {
  const dataSource = {
    type: 'pie2d',
    width: cardWidth - 10,
    height: 330,
    dataFormat: 'json',
    chart: {
      plottooltext: '$label : $value',
      showlegend: '1',
      legendposition: 'top',
      legendItemFontSize: '10',
      theme: Platform.OS == 'ios' ? 'ocean' : 'fusion',
      valueFontSize: '10',
      showNames: '0',
      pieRadius: '0',
      showZeroPies: '0',
      showPercentValues: '0',
      showPercentInToolTip: '0',
      showLabels: '0',
      labelDistance: '10',
    },
    data: data,
  };
  return dataSource;
}
