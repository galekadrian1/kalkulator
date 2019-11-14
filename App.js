/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  View
} from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    const changeDim = () => {};
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
    this.state = {
      result: "0",
      operationText: "0",
      basic: ['','+','-','/','*']
    };
  }
  factorial(n) {
    if (n === 0) return 1;
    let f = 1;
    for (let i = 1; i < n; i++) {
        f = f * (i + 1);
    }
    return f;
  }
  renderIfLandscape(){
    if (this.state.orientation === 'landscape'){
      return(
        <View>
          <TouchableOpacity onPress={()=>this.advancedOperation('x^2')} style={styles.btn}><Text style={styles.btnText,styles.white}>x^2</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>this.advancedOperation('x!')} style={styles.btn}><Text style={styles.btnText,styles.white}>x!</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>this.advancedOperation('x^3')} style={styles.btn}><Text style={styles.btnText,styles.white}>x^3</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>this.advancedOperation('log2')} style={styles.btn}><Text style={styles.btnText,styles.white}>log2</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>this.advancedOperation('log10')} style={styles.btn}><Text style={styles.btnText,styles.white}>log10</Text></TouchableOpacity>
        </View>
        );
    }
  }
  clearText(){
      let tmp = "";
      for(let i = 0; i < this.state.operationText.length; i++){
        if(this.checkIfTextIsBasic(this.state.operationText[i])){
          return tmp;
        }
        else{
          tmp += this.state.operationText[i];
        }
      }
  }
  advancedOperation(operation){
    let fixed = this.state.operationText;
    if(this.checkIfOperationSelected()){
        fixed = this.clearText();
    }
    switch(operation){
      case 'x^2':
        this.setState({
            result: parseFloat(fixed*fixed),
            operationText: "0"
          })
          break;
      case 'x!':
        this.setState({
            result: this.factorial(parseFloat(this.state.operationText)),
            operationText: "0"
          })
          break;
      case 'x^3':
        this.setState({
            result: parseFloat(fixed*fixed*fixed),
            operationText: "0"
          })
          break;
      case 'log2':
        this.setState({
            result: Math.log2(fixed),
            operationText: "0"
          })
          break;
      case 'log10':
        this.setState({
            result: Math.log10(fixed),
            operationText: "0"
          })
          break;

    }
  }
  calculateResult(){
    if(this.state.operationText.includes('/') && this.state.operationText[this.state.operationText.length-1] == '0'){
      this.setState({
          result: 'Nie mozna dzielic przez 0',
          operationText: "0"
        })
    }
    else{
      this.setState({
          result: eval(this.state.operationText),
          operationText: "0"
        })
    }
  }
  clear(){
    this.setState({
        result: "0",
        operationText: "0"
      })
  }
  checkIfOperationSelected(){
    for(let i = 1; i < this.state.basic.length; i++){
      if(this.state.operationText.includes(this.state.basic[i])){
        return true;
      }
    }
    return false;
  }
  checkIfTextIsBasic(text){
    for(let i = 1; i < this.state.basic.length; i++){
      if(this.state.basic[i] == text){
        return true;
      }
    }
    return false;
  }
  buttonPressed(text){
    let operation = false;
    if(text == '='){
      return this.calculateResult()
    }
    else if(text == 'AC'){
      return this.clear()
    }
    if(this.state.operationText[this.state.operationText.length - 1] == '0' && text == '0'){
      return null;
    }
    if(this.checkIfOperationSelected()){
      if(this.checkIfTextIsBasic(text)){
        return null;
      }
    }
    if(this.state.operationText.includes('.') && text == '.'){
      if(this.checkIfOperationSelected()){
        if(this.checkIfTextIsBasic(this.state.operationText[this.state.operationText.length - 1]) && text == '.'){
          this.setState({
              operationText: this.state.operationText+"0."
            })
        }
        else{
          let count = (this.state.operationText.match(/\./g) || []).length;
          if(count >= 2){
            return null;
          }
          else{
            this.setState({
                operationText: this.state.operationText+"."
              })
          }
        }
      }
      return null;
    }
    if(this.state.operationText == "0" && text != "."){
        this.setState({
            operationText: text
          })
    }
    else{
      this.setState({
          operationText: this.state.operationText+text
        })
    }
  }
  render(){
    let rows = []
    let rowsBasic = []
    let nums = [['AC','',''],['1','2','3'],['4','5','6'],['7','8','9'],['0','.','=']]
    for(let i = 0; i < 5; i++){
        row = []
        for(let j = 0; j < 3; j++){
          row.push(<TouchableOpacity onPress={()=>this.buttonPressed(nums[i][j])} style={styles.btn}><Text style={styles.btnText}>{nums[i][j]}</Text></TouchableOpacity>)
        }
        rows.push(<View style={styles.row}>{row}</View>)
    }
    for(let i = 0; i <5; i++){
       rowsBasic.push(<TouchableOpacity onPress={()=>this.buttonPressed(this.state.basic[i])} style={styles.btn}><Text style={styles.btnText,styles.white}>{this.state.basic[i]}</Text></TouchableOpacity>)
    }

    return(
        <View style={styles.container}>
          <View style={styles.result}>
            <Text>{this.state.result}</Text>
          </View>
          <View style={styles.calculations}><Text>{this.state.operationText}</Text></View>

          <View style={styles.buttons}>
              <View style={styles.numbers}>
                {rows}
              </View>
              <View style={styles.operations}>
                <View>
                  {rowsBasic}
                </View>
                {this.renderIfLandscape()}
              </View>
          </View>

        </View>
      );
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  btnText:{
    fontSize: 30,
  },
  white:{
    fontSize: 40,
    color: 'white'
  },
  btn:{
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  row:{
    flexDirection: 'row',
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  result:{
    flex: 2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculations:{
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons:{
    flex:7,
    flexDirection: 'row'
  },
  numbers:{
    flex:3,
    backgroundColor:'yellow'
  },
  operations:{
    flex:1,
    justifyContent: 'space-around',
    backgroundColor:'black',
    flexDirection: 'row'
  }
});
