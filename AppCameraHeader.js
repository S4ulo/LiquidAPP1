import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { StyleSheet, Image, Text, View, SafeAreaView, ScrollView, Animated, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

export default function App() {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const camRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Acesso negado! </Text>;
  }
  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      setOpen(true);
      console.log(data);
    }
  }

  return (
    <SafeAreaView>
      <Animated.View style={[
        styles.header,
        {
          height: scrollY.interpolate({
            inputRange: [10, 160, 185],
            outputRange: [140, 20, 0],
            extrapolate: 'clamp'
          }),
          opacity: scrollY.interpolate({
            inputRange: [1, 75, 170],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp'
          })
        }
      ]}>
        <FontAwesome
          name="home"
          size={35}
          color="white"
        />
        <Animated.Image
          source={require('./src/img/color_transparent.png')}
          style={{ width: 300, height: 300 }}
          resizeMode='contain'
        />
        <Image
          source={require('./src/img/color_with_background.jpg')}
          style={{ width: 35, height: 150 }}
          resizeMode='contain'
        />
      </Animated.View>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([{
          nativeEvent: {
            contentOffset: { y: scrollY }
          },
        }],
          { useNativeDriver: false })}
      >
        <View style={styles.box}>
          <Camera
            style={{ flex: 1 }} 
            type={type}
            ref={camRef}
          >
            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 20,
                  left: 20
                }}
                onPress={() => {
                  setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
                }}>
                <Text style={{ fontSize: 20, marginBottom: 13, color: '#fff' }}>Trocar</Text>
              </TouchableOpacity>

              { capturedPhoto &&
                <Modal animationType='slide' transparent={false} visible={open}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center',margin:20}}>
                  <TouchableOpacity style={{ margin: 10 }} onPress={() => setOpen(false)}>
                    <FontAwesome name='window-close' size={50} color='#ff0000' />
                  </TouchableOpacity>


                    <Image style={{width:'100%',height:300,borderRadius:20}} source ={{uri:capturedPhoto}} />


                  </View>
                </Modal>
              }
            </View>
          </Camera>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <FontAwesome name='camera' size={23} color={'black'} />
          </TouchableOpacity>

        </View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
        <View style={styles.box}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
  },
  box: {
    height: 300,
    backgroundColor: '#ddd',
    margin: 7,
    borderRadius: 5
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    margin: 20,
    borderRadius: 10,
    height: 50
  }
});