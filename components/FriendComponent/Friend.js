
import { StyleSheet, View, Text, Image, Button, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addFriendApi, removeFriendApi } from '../../api/apiApp';
import { getDataStorage, deleteDataStorage } from '../../config/Storage';

const Friend = function ({ id, hoTen, moTa, ngaySinh, hinhAnh, trangThaiKetBan }) {
    const [ketBan, setKetBan] = useState((trangThaiKetBan)?"Đã kết bạn":"Chưa kết bạn");
    const [color, setColor] = useState((trangThaiKetBan)?"#6D736D":"#19AFDF");
    const onPress = () => {
        if(ketBan == "Đã kết bạn"){
            Alert.alert('Bạn có muốn xóa?', "", [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: async () => {
                    const idNguoiDungHienTai = await getDataStorage({ nameData: 'idUser' });
                    await removeFriendApi(id, idNguoiDungHienTai).then(()=>{
                        setColor("#19AFDF");
                        setKetBan("Chưa kết bạn");
                    }).catch(()=>{
                        Alert.alert('Hủy theo dõi thất bại');
                    })

                }},
            ]);
        } else {
            Alert.alert('Bạn có muốn theo dõi?', "", [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: async () => {
                    const idNguoiDungHienTai = await getDataStorage({ nameData: 'idUser' });
                    await addFriendApi(id, idNguoiDungHienTai).then(()=>{
                        setColor("#6D736D");
                        setKetBan("Đã kết bạn");
                    }).catch(()=>{
                        Alert.alert('Theo dõi thất bại');
                    })

                }},
            ]);
        }
    };

    return (
        <View style={styles.item}>
            <View style={{justifyContent:'center', marginRight: 10}}>
                <Image 
                    source={{uri: hinhAnh}}  
                    style={styles.avatar} 
                />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', flexGrow: 1}}>
                <View>
                    <Text style={{fontWeight:'bold', color:'white', fontSize: 16}} numberOfLines={1} width={180}>{hoTen}</Text>
                    <Text style={{color:'white'}}>{ngaySinh}</Text>
                    <Text style={{color:'white'}} numberOfLines={1} width={180}>{moTa}</Text>
                </View>
                <View style={{justifyContent:'center', marginLeft: 10}}>
                    <TouchableOpacity style={[styles.button, {backgroundColor: color}]} onPress={onPress}>
                        <Text style={{color:'white'}}>{ketBan}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
      );

}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        backgroundColor: '#474747',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 10
    },
    avatar: {
        width: 50, 
        height: 50, 
        borderRadius: 50/ 2, 
        borderWidth: 1, 
        borderColor: 'white'
    },
    button: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
});

module.exports = {
    Friend
}