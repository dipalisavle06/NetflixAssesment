import { ScrollView, StyleSheet, Text, View,ScrollView } from 'react-native';
import React from 'react';
import Home_Banner from '../component/Home_Banner';

const Home = () => {
  return (
    <View style={styles.container}>
    <ScrollView style={styles.scroll}>
       <Home_Banner />
    </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
   container:{
    backgroundColor:'#000',
    flex:1,
   },
   scroll:{
    flex:1,
   }

})