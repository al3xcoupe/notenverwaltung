import {Text, StyleSheet, View, Switch, Button, SafeAreaView, FlatList} from "react-native";
import {useEffect, useState} from "react";
import {getNoten, getSemester, getSubject} from "../../database/db";


const Item = ({ title, navigation, link,subjectId  }) => (
    <View style={styles.item}>
        <Button style={styles.title} onPress={() => navigation.navigate("link", {subjectId: subjectId})} title={title}></Button>
    </View>
);

const SubjectList = ({ route, navigation }) => {

    const [grades, setGrades] = useState([])
    const {subjectId} = route.params;


    const renderItem = ({ item }) => (
        <Item link={item.label} navigation={navigation} title={item.label}/>
    );

    useEffect(() => {
        getNoten(mapGrades)
    }, [])

    const mapGrades = (data) => {

        let tmpArray = [];

        tmpArray = data.map(semi => {
            return {
                label: 'Hallo Welt',
                subject: semi.val.subject
            }})

        tmpArray = tmpArray.filter(o => o.subject === subjectId)
        setGrades(tmpArray);
    }


    return (

        <SafeAreaView style={styles.container}>
            <FlatList
                data={grades}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SubjectList;
