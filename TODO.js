import React, { Conponent } from "react"; 
import { 
 View,
 Text, 
 TouchableOpacity,
 StyleSheet,
 Dimensions,
 TextInput,
 }from "react-native";
import { TextInput } from "./node_modules/react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component{
    state = {
        isEditing: false,
        isCompleted: false,
        toDoValue: ""
       };
    render() {
        const { isCompleted, isEditing, toDoValue } = this.state;
        const { text } = this.props;
      return (
      <View style={style.container}>
          <view style= {style.column}>
            <TouchableOpacity onPress={this._toggleComplete}>
              <View 
                 style={[
                    styles.circle, 
                    isCompleted ? style.completedCircle : style.uncompletedCircle
                  ]} 
                />
            </TouchableOpacity>
            {isEditing ? (
             <TextInput
            style={[
                styles.text,
                styles.input,
                isCompleted ? styles.completedText: styles.uncompletedText
             ]} 
             value ={toDoValue}
             multiline={true}
             onChangeText={this._controllInput}
             returnKeyType={"done"}
             onBlur={this._finishEditing}
             />
            ) : (
              <Text 
                style={[
              styles.text,
              isCompleted ? styles.completedText : styles.uncompletedText
            ]}
           >
            {text}
            </Text>
         )}
        </view>

        {isEditing ? (
            <View style={style.actions}> 
              <TouchableOpacity onPressOut={this._finishEditing}>                  
                 <View style={style.actionContainer}>
                       <Text style={styles.actionText}>✅</Text>
                    </View> 
               </TouchableOpacity>
            </View>
            ) : ( 
            <View style={style.actions}> 
            <TouchableOpacity onPressOut={this._startEditing}>
                  <View style={style.actionContainer}>
                     <Text style={styles.actionText}>✏️</Text>
                  </View> 
             </TouchableOpacity>
             <TouchableOpacity>
                  <View style={style.actionContainer}>
                     <Text style={styles.actionText}>❌</Text>
                  </View> 
             </TouchableOpacity>
          </View> 
        )} 
        </View>
      );
    }
    _toggleComplete = () => {
        this.setState(prevState => {
            return{
              isCompleted: !prevState.isCompleted
          };   
        });
      };
      _startEditing = () => {
            const { text } = this.props;
          this.setState({ isEditing: true, toDoValue: text });
      };
      _finishEditing =() => {
          this.setState({
              isEditing: false
          });
      };
      _controlInput = text => {
        this.setState({ toDoValue: text })
      };
    }
 
    const style = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between"
      },
      circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,                               
        marginRight: 20,
      },
      completedCircle: {
          borderColor:"#bbb"
      },
      uncompletedCircle: {
          borderColor:"F23657"
      },
      text: {
          fontWeight: "600",
          fontSize: 20,
          marginVertical: 20,
      },
      completedText:{
        color: "#bbb",
        textDecorationLine: "Line-through"
      },
    uncompletedText: {
        color: "#353839"
    },
    column: {
        flexDirection: "row",
         alignItems: "center",
         width: width / 2,
         justifyContent: "space-between",
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginhorizontal: 10,
    },
    input: {
        marginVertical: 20,
        width: width / 2
    }
 });