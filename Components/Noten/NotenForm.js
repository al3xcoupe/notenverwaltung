import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function NotenForm() {
    const [title, setTitle] = useState();
    const [subjects, setSubjects] = useState(["Mathematik", "Deutsch", "Englisch"]) //später mit UseEffect aus Storage fächer hollen
    const [subject, setSubject] = useState(null);
    const [openSubject, setOpenSubject] = useState(false);

    return (
        <View style={{marginTop: 10, alignContent: "center", paddingLeft: 10, paddingRight: 10}}>
            <View>
                <Text>Title:</Text>
                <TextInput
                    placeholder={"Title"}
                    style={styles.input}
                    onChangeText={text => {
                        setTitle(text)
                    }}
                    value={title}
                    keyboardType={"default"}
                />
            </View>
            <View>
                <Text>Fach:</Text>
                <DropDownPicker
                    open={openSubject}
                    value={subject}
                    items={subjects}
                    setOpen={setOpenSubject}
                    setValue={setSubject}
                    setItems={setSubjects}
                    placeholder={"Fach auswählen"}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        backgroundColor: "white"
    },
    comment: {
        borderWidth: 1,
        backgroundColor: "white"
    }
});