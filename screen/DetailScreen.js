import { StyleSheet, View, Text, Image, Button, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getMovieTrending } from '../api/flimsDB';
import { useRoute } from '@react-navigation/native';
import Header from '../components/DetailComponents/Header';
import Person from '../components/DetailComponents/Person';
import Body from '../components/DetailComponents/Body';

export default function DetailScreen({navigation}) {
    const route = useRoute();
    const itemId = route.params?.itemId;
    const [isBodyShort, setIsBodyShort] = useState(true);
    const [data,setData] = useState([]);
 

    useEffect(() => {
        setIsBodyShort(true);
    }, [itemId]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header navigation={navigation} data={data} />
            </View>
            <ScrollView style={styles.body}  >
                <Body id={itemId} setDataHeader ={setData}/>
            </ScrollView>
            <ScrollView style={isBodyShort ? styles.personShort : styles.personLong}>
                <Person id={itemId} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        backgroundColor: '#313230',
    },
    header: {
        flex: 0,
    },
    body: {
        flex: 1,
    },
    personShort: {
        flex: 1,
        maxHeight: 190, // Đặt giá trị tối đa cho phần "Person" khi "Body" ngắn
    },
    personLong: {
        flex: 1,
    },
});
