import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import Steps from 'react-native-steps';
import data from './FirstAidData';
import metadata from './metadata.json';
import { argonTheme } from '../../constants';

const { APP, BACKGROUND } = argonTheme.COLORS;
const stepIndicatorStyles = {
  stepIndicatorSize: 50,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: APP,
  separatorFinishedColor: APP,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: APP,
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 25,
  currentStepIndicatorLabelFontSize: 25,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 15,
  currentStepLabelColor: APP
};

export default class StepIndicator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0
    };
    this.viewabilityConfig = { itemVisiblePercentThreshold: 40 };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.stepIndicator}>
          <Steps
            configs={stepIndicatorStyles}
            count={metadata[this.props.injury].count}
            direction="vertical"
            current={this.state.currentPage}
          />
        </View>
        <FlatList
          style={{ flexGrow: 1 }}
          data={data[this.props.injury]}
          renderItem={this.renderPage}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
        />
      </View>
    );
  }

  renderPage = rowData => {
    const item = rowData.item;
    return (
      <View style={styles.rowItem}>
        <Text style={styles.body}>{item.body}</Text>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={item.image} />
        </View>
      </View>
    );
  };

  onViewableItemsChanged = ({ viewableItems }) => {
    const visibleItemsCount = viewableItems.length;
    if (visibleItemsCount !== 0) {
      this.setState({
        currentPage: viewableItems[visibleItemsCount - 1].index
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: BACKGROUND
  },
  stepIndicator: {
    marginVertical: 20, // 50
    paddingHorizontal: 20
  },
  rowItem: {
    marginVertical: 30, // space between list items
    flex: 1,
    paddingVertical: 20
  },
  body: {
    flex: 1,
    fontSize: 35,
    color: '#606060',
    lineHeight: 35, // edit with fontSize
    padding: 20, // edit with fontSize
    textAlign: 'center'
  },
  image: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150
  },
  imageContainer: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  }
});