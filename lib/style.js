'use strict'
import React, {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20
  },
  textInput: {
    height: 40, borderColor: 'gray', borderWidth: 1, marginTop:20,
    borderRadius: 2,
    padding: 4,
    color: '#333'
  },
  buttonContainer: {
		//  flex: 1, //1
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
  button: {
    marginTop: 20,
    height: 49,
		backgroundColor: '#4cae4c',
		justifyContent: 'center',
		alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 2
  },
  submitButton: {
		backgroundColor: '#4cae4c',
  },
  disabledButton: {
    backgroundColor: '#CCC'
  },
  buttonText: {
		fontSize: 18,
		color: '#FFF'
  }

});
