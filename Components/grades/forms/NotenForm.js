import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button, ScrollView} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-modern-datepicker";

export default function NotenForm() {
    const [title, setTitle] = useState();

    const [subjects, setSubjects] = useState([{label: "Mathematik", value: "m"}, {
        label: "Deutsch",
        value: "d"
    }, {label: "Englisch", value: "e"}, {label: "Deutsch", value: "x"}, {label: "Englisch", value: "y"}]) //später mit UseEffect aus Storage fächer hollen
    const [subject, setSubject] = useState(null);
    const [openSubject, setOpenSubject] = useState(false);

    const [semesters, setSemesters] = useState([{label: "BMS 21/22", value: "bms21/22"}, {
        label: "BMS 22/23",
        value: "bms22/23"
    }, {label: "BBW 21/22", value: "bbw21/22"}]) //später mit UseEffect aus Storage fächer hollen
    const [semester, setSemester] = useState(null);
    const [openSemester, setOpenSemester] = useState(false);

    const [mark, setMark] = useState(null);
    const [weight, setWeight] = useState('');

    const [selectedDate, setSelectedDate] = useState('');

    return (
        <ScrollView>
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
                <View style={{marginTop: openSubject ? subjects.length * 40 : 0}}>
                    <Text>Semester:</Text>
                    <DropDownPicker
                        open={openSemester}
                        value={semester}
                        items={semesters}
                        setOpen={setOpenSemester}
                        setValue={setSemester}
                        setItems={setSemesters}
                        placeholder={"Semester auswählen"}

                    />
                </View>
                <View style={{marginTop: openSemester ? semesters.length * 40 : 0}}>
                    <Text>Note:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={input => {
                            if ((input >= 1 && input <= 6) || input === '') {
                                setMark(input)
                            }
                        }}
                        value={mark}
                        keyboardType={"numeric"}
                        placeholder={"Note"}
                    />
                </View>
                <View>
                    <Text>Gewichtung:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={input => {
                            if ((input > 0 && input < 1000000) || input === '') {
                                setWeight(input)
                            }
                        }}
                        value={weight}
                        keyboardType={"numeric"}
                        placeholder={"Gewichtung (Standart: 1.0)"}
                    />
                </View>
                <View>
                    <Text>Date: </Text>
                    <DatePicker
                        mode={"date"}
                        onSelectedChange={date => setSelectedDate(date)}
                    />
                </View>
                <View style={{marginTop: 10}}>
                    <Button
                        title='Semester speichern'
                        color="#841584"
                    />
                </View>
            </View>
        </ScrollView>
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
    },
    dropdownSubject: {
        zIndex: -100
    }
});