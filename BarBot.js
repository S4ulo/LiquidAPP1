import { StyleSheet, View } from 'react-native';
import BarBot from './src';



export default function App() {
  return (
    <View style={styles.container}>
      <BarBot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
});
