/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';
import { Button, Spinner } from 'native-base';
import axios from 'axios';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ProductCard from './src/ProductCard';

class App extends React.Component {
  state = {
    loading: false,
    textContentFlag: true,
    receivedItem : [],
  };

  getContentsHandler = () => {
    this.setState(prevState => {
        return { textContentFlag : !prevState.textContentFlag, loading: true }
    });
    axios.get(' https://pixabay.com/api/?key=17116025-59af6bf08512e84d50c227107&q=yellow+flowers&image_type=photo&pretty=true')
        .then(res => {
          console.info(res);
          this.setState({ loading : false, receivedItem: res.data.hits });
        })
        .catch(err => {
          console.info(err);
        })
  }

  totalItems = () => {
    const { receivedItem } = this.state;
    if(receivedItem.length === 0) {
      return;
    }
    return receivedItem.map(im => {
      <ProductCard item={im} />
    });
  }
  
  showDetails = im => {
    const { receivedItem } = this.state;
    let newReceivedItem;
    if (im === null){
      newReceivedItem = receivedItem.map(i => {
        return {
          ...i,
          selected: false,
        };
      })
    } else {
      newReceivedItem = receivedItem.map(i => {
        if(i.id === im.id){
          return {
            ...i,
            selected : true,
          };
        } else {
          return {
            ...i,
            selected : false,
          };
        }
      });
    }
    this.setState({ receivedItem : newReceivedItem });
  }

  resetValues = () => {
    this.setState({ receivedItem : [] });
  }

  getBodyContent = () => {
    const { loading, receivedItem } = this.state;
    let returnValue;
    if(receivedItem.length > 0){
      returnValue = 
      (<FlatList
          contentContainerStyle={styles.scrollStyle}
          style={{ height: 320 }}
          data={receivedItem}
          renderItem={({ item }) => <ProductCard item={item} showDetails={this.showDetails}/>}
          keyExtractor={item => item.id}
        />)
    } else if(loading) {
      returnValue = <Spinner />;
    }
    return returnValue;
  }

  render(){
    const { loading, textContentFlag, receivedItem } = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.headingWrapper}>
              <Text style={styles.headingText}>Welcome to this Awesome Project. Click the button below to explore!</Text>
            </View>
            <Button style={{ ...styles.btnStyle, opacity: receivedItem.length > 0 ? 0.5 : null }} onPress={this.getContentsHandler} disabled={receivedItem.length > 0}>
              <Text style={styles.btnText}>Get Awesome Contents</Text>
            </Button>
            {receivedItem.length > 0 ? <Button style={{ ...styles.btnStyle, backgroundColor: '#6AB021', marginTop: 0 }} onPress={this.resetValues}>
              <Text style={styles.btnText}>Reset</Text>
            </Button> : null}
            {this.getBodyContent()}
          </View>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' },
  headingWrapper: { width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#CCCCCC10', elevation: 3, marginTop: 20, padding: 15 },
  headingText: { color: '#AD0028', width: '100%', textAlign: 'center', fontSize: 26, paddingHorizontal: 20 },
  btnStyle: { alignSelf: 'center', width:'50%', backgroundColor: '#AD0028', marginVertical: 25 },
  btnText: { color: '#FFFFFF', width: '100%', textAlign: 'center', fontSize: 16 },
  scrollStyle: { justifyContent: 'center', alignItems: 'center', width: '98%' },
});

export default App;
