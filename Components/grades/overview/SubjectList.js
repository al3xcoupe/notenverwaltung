import {Text, StyleSheet, View, Switch, Button, SafeAreaView, FlatList} from "react-native";
import {useEffect, useState} from "react";
import {getSemester, getSubject} from "../../database/db";


const Item = ({ title, navigation, link,subjectId  }) => (
    <View style={styles.item}>
        <Button style={styles.title} onPress={() => navigation.navigate("GradeList", {subjectId: subjectId})} title={title}></Button>
    </View>
);

const SubjectList = ({ route, navigation }) => {

    const [subjects, setSubjects] = useState([])
    const {semId} = route.params;


    const renderItem = ({ item }) => (
        <Item link={item.value} navigation={navigation} title={item.label} subjectId={item.value}/>
    );

    useEffect(() => {
        getSubject(mapSubjects)
    }, [])

    const mapSubjects = (data) => {

        let tmpArray = [];

        tmpArray = data.map(semi => {
            return {
                label: semi.val.label,
                value: semi.val.value,
                semester: semi.val.semester
            }})

        tmpArray = tmpArray.filter(o => o.semester === semId)
        setSubjects(tmpArray);
    }


    return (

        <SafeAreaView style={styles.container}>
            <FlatList
                data={subjects}
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
