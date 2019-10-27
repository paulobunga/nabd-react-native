import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  ActivityIndicator,
  StatusBar,
  Alert,
  Platform
} from 'react-native';
import { Icon } from '../../components';
import { Block, Text } from 'galio-framework';
import { Colors } from '../../constants';
import PhoneInput from 'react-native-phone-input';
import ModalPickerImage from './ModalPickerImage';
import { signInAttempt, fillSignInForm } from '../../actions';
import { connect } from 'react-redux';
import t from '../../I18n';
import { Actions } from 'react-native-router-flux';
import { Spinner } from '../../components/Spinner';

const { width, height } = Dimensions.get('screen');

class SignIn extends Component {
  constructor(props) {
    super(props);
    state = {
      email: '',
      password: ''
    };

    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.state = {
      pickerData: null
    };
  }

  componentDidMount() {
    this.setState({
      pickerData: this.phone.getPickerData()
    });
  }

  onPressFlag() {
    this.myCountryPicker.open();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.iso2);
  }

  isLoading() {
    // console.log('hi', this.state);
    return (
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            const { signInAttempt, phone, password, userType } = this.props;
            signInAttempt({
              phone,
              password,
              userType
            });
          }}
        >
          <View style={styles.button}>
            {this.props.loading ? (
              <Spinner color={Colors.WHITE} size="small" />
            ) : (
              <Text style={{ color: Colors.WHITE, fontFamily: 'Manjari-Bold' }}>
                {t.LogIn}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : null}
        >
          <Text
            style={{
              textAlign: 'left',
              fontSize: 50,
              fontWeight: 'bold',
              marginLeft: 20,
              lineHeight: 50,
              marginBottom: 25
            }}
          >
            Welcome{'\n'}Back
          </Text>
          <View>
            <View style={styles.inputContainer}>
              <PhoneInput
                ref={ref => {
                  this.phone = ref;
                }}
                initialCountry="eg"
                offset={22}
                onChangePhoneNumber={value => {
                  this.props.fillSignInForm({
                    key: 'phone',
                    value
                  });
                }}
                onPressFlag={this.onPressFlag}
                style={{ paddingLeft: 13 }}
                textProps={{
                  placeholder: t.PhoneNumber
                }}
              />

              <ModalPickerImage
                ref={ref => {
                  this.myCountryPicker = ref;
                }}
                data={this.state.pickerData}
                onChange={country => {
                  this.selectCountry(country);
                }}
                cancelText="Cancel"
              />
            </View>
            <View style={styles.passwordContainer}>
              <Icon
                size={16}
                color={Colors.BLACK}
                name="padlock"
                family="flaticon"
                style={styles.inputIcons}
              />
              <TextInput
                style={styles.inputs}
                placeholder={t.Password}
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                onChangeText={value =>
                  this.props.fillSignInForm({
                    key: 'password',
                    value
                  })
                }
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <View>{this.isLoading()}</View>
        <TouchableOpacity
          style={styles.textButtonContainer}
          onPress={() => console.log('restore_password')}
        >
          <Text>{t.ForgotPassword}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textButtonContainer}
          onPress={() => Actions.signup()}
        >
          <Text>{SignUp}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  inputContainer: {
    paddingLeft: 15,
    borderWidth: 0,
    borderRadius: 30,
    height: 55,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 10,
    justifyContent: 'center'
  },
  passwordContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    borderWidth: 0,
    borderRadius: 30,
    height: 55,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 10,
    justifyContent: 'center'
  },
  inputs: {
    height: 55,
    borderBottomColor: '#FFFFFF',
    flex: 1
  },
  inputIcons: {
    alignSelf: 'center',
    margin: 10,
    marginLeft: 20
  },
  textButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 100,
    marginBottom: 10
  },
  loginButton: {
    backgroundColor: Colors.APP
  },
  loginText: {
    color: 'white'
  },
  phoneContainer: {
    borderColor: Colors.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF',
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
    justifyContent: 'center',
    paddingLeft: 10
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center'
  },
  buttonContainer: {
    width: '100%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  button: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.APP
  }
});

const mapSateToProps = state => {
  // console.log('state', state);
  const { userType } = state.openApp;
  const { phone, password, loading } = state.signin;
  return { phone, password, loading, userType };
};

export default connect(
  mapSateToProps,
  { signInAttempt, fillSignInForm }
)(SignIn);
