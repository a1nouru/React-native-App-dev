import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveState = async state => {
  try{
    const serilizedState = JSON.stringify(state)
    await AsyncStorage.setItem("state", serilizedState)
  } catch(error){}
}