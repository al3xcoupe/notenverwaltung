import {Text, StyleSheet, View, Switch, Button, SafeAreaView, FlatList} from "react-native";
import {useEffect, useState} from "react";
import {getSemester} from "../../database/db";


const Item = ({ title, navigation, link, semdId }) => (
    <View style={styles.item}>
        <Button style={styles.title} onPress={() => navigation.navigate("SubjectL", {semId: semdId})} title={title}></Button>
    </View>
);

const SemesterList = ({ navigation }) => {

    const [semesters, setSemesters] = useState([])

    const renderItem = ({ item }) => (
        <Item link={item.value} navigation={navigation} title={item.label}  semdId={item.value}/>
    );

    useEffect(() => {
        getSemester(mapSemesters)
    }, [])

    const mapSemesters = (data) => {
        //console.log("inside map", data)
        let i = 1;
        setSemesters(data.map(semi => {
            i++;
            return {
                label: semi.val.label,
                value: semi.val.value
            }
        }))
    }


    return (

        <SafeAreaView style={styles.container}>
            <FlatList
                data={semesters}
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

export default SemesterList;
