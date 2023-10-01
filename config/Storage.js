
import AsyncStorage from '@react-native-async-storage/async-storage';

const setDataStorages = async ({nameData,data}) => {
    try {
        await AsyncStorage.setItem(nameData, data.toString());
        console.log('ID đã được lưu.');
      } catch (error) {
        console.error('Lỗi khi lưu ID:', error);
      }
}


const getDataStorage = async ({nameData}) => {
    try {
        const userId = await AsyncStorage.getItem(nameData);
        if (userId !== null) {
          // Đã tìm thấy giá trị ID
          console.log('ID đã được tìm thấy:', userId);
          return userId;
        } else {
          // Không tìm thấy giá trị ID
          console.log('Không tìm thấy ID.');
          return null;
        }
      } catch (error) {
        console.error('Lỗi khi lấy ID:', error);
        return null;
      }
      
}

const deleteDataStorage = async ({nameData}) => {
    try {
        await AsyncStorage.removeItem(nameData);
        console.log('ID đã được xóa.');
      } catch (error) {
        console.error('Lỗi khi xóa ID:', error);
      }
}



module.exports = { setDataStorages, getDataStorage, deleteDataStorage };
