import { Alert, StyleSheet, Text, useAnimatedValue, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAll } from '../apis/Network';
const Home_Banner = () => {
    const [allData, setAllData] = useState([])
    useEffect(() =>{
        const handleApi= async()=>{
            const{data,status}=await getAll();
            if(status===200) {
                setAllData(data);
            }else{
                Alert.alert(`Request Failed with ${data}`);
            }
        };


        handleApi();
    },[]);
  return (
    <View>
      <Text>Home_Banner</Text>
    </View>
  )
}

export default Home_Banner

const styles = StyleSheet.create({})