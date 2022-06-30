import {Button, FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";

const DATA = [
    {
        id: '1',
        title: 'Note erfassen',
        link: 'Eingabe',
    },
    {
        id: '2',
        title: 'Überblick der Noten',
        link: 'Evaluation',
    },
    {
        id: '3',
        title: 'Einstellungen',
        link: 'Setting',
    },
];

const Item = ({ title, navigation, link }) => (
    <View style={styles.item}>
        <Button style={styles.title} onPress={() => navigation.navigate(link)} title={title}></Button>
    </View>
);


const HomeScreen = ({ navigation }) => {

    const renderItem = ({ item }) => (
        <Item link={item.link} navigation={navigation} title={item.title} />
    );


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;
