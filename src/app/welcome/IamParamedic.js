import React, { Component } from 'react';
import { Image, View } from 'react-native';
import CommonButtons from './CommonButtons';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';
import { Images } from '../../constants';

class IamParamedic extends Component {
  render() {
    return (
      <Block flex style={{ backgroundColor: 'white' }}>
        <Block center style={{ position: 'absolute', top: 30 }}>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={Images.paramedic}
            />
          </View>
          <Text style={{ fontSize: 20, fontWeight: '700' }}>Paramedic</Text>
          <Text style={styles.descriptionText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry Lorem Ipsum
          </Text>
        </Block>
        <Block center style={{ position: 'absolute', bottom: 10 }}>
          <CommonButtons />
        </Block>
      </Block>
    );
  }
}

const styles = {
  image: {
    width: 170,
    height: 170,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30
  },
  imageWrapper: {
    backgroundColor: '#FF5B62',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
    width: 200,
    height: 200,
    borderRadius: 200 / 2
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 30,
    marginRight: 30
  }
};

export default IamParamedic;