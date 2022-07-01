import {
    Text,
    StyleSheet,
    View,
    Switch,
    Button,
    SafeAreaView,
    FlatList,
    Alert,
    Pressable,
    Modal,
    Image
} from "react-native";
import {useEffect, useState} from "react";
import {getNoten, getSemester, getSubject} from "../../database/db";


const Item = ({ mark, date, weight, subject, title, img}) => {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (


        <View>
            <Pressable onPress={toggleModal}>
                <View
                    style={styles.overViewGrades}

                >
                    <View>
                        <Text style={styles.testTitle}>{title}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.testMark}>{mark}</Text>
                    </View>
                </View>
                <Modal visible={isModalVisible} onRequestClose={() => { }}>
                    <View style={styles.centeredView}>
                        <Text style={styles.testTitle}>{title}</Text>
                        <Text style={{"marginBottom": 5}}>{'Datum:' + date.toString()}</Text>
                        <Text style={{"marginBottom": 5}}>{'Gewichtung:' + weight.toString()}</Text>
                        <Text style={styles.testMark}>{'Note:' + mark.toString()}</Text>

                        <Text>{img}</Text>

                        { img &&
                            <Image source={{uri: img}} />                        }



                        <Button title="Prüfung schliessen" onPress={toggleModal} />
                    </View>
                </Modal>
            </Pressable>

        </View>
    );
}

const GradeOverview = ({ route, navigation }) => {

    const [grades, setGrades] = useState([])
    const {subjectId} = route.params;


    const renderItem = ({ item }) => (
        <View>
            <Item mark={item.mark} date={item.date} img={item.img} weight={item.weight} subject={item.subject} title={item.label}/>
        </View>

    );

    useEffect(() => {
        getNoten(mapGrades)
    }, [])

    const mapGrades = (data) => {

        let tmpArray = [];

        tmpArray = data.map(semi => {
            return {
                id: semi.key,
                label: semi.val.title,
                mark: semi.val.mark,
                date: semi.val.selectedDate,
                weight: semi.val.weight,
                subject: semi.val.subject,
                img: semi.val.base64String
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

    testTitle: {
        fontSize: 20,
        marginBottom: 5
    },
    testMark: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign:'right',
    },
    overViewGrades: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 3,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 10,
        borderStyle: 'solid',
        borderWidth: 0.5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

});

export default GradeOverview;
