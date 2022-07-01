import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button, ScrollView} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
    addMark,
    addNewExpense,
    addSemester,
    deleteSemester, getSemester, getSubject,
    pathes,
    registerObserver,
    unregisterObserver
} from "../../database/db";
import DatePicker from "react-native-modern-datepicker";

export default function NotenForm() {
    const [title, setTitle] = useState();

    const [subjects, setSubjects] = useState([{label: "Mathematik", value: "m"}]) //später mit UseEffect aus Storage fächer hollen
    const [subject, setSubject] = useState(null);
    const [openSubject, setOpenSubject] = useState(false);

    const [semesters, setSemesters] = useState([{label: "BMS 21/22", value: "bms21/22"}]) //später mit UseEffect aus Storage fächer hollen
    const [semester, setSemester] = useState(null);
    const [openSemester, setOpenSemester] = useState(false);
    const [counter ,setCounter] = useState(0);

    const [mark, setMark] = useState(null);
    const [weight, setWeight] = useState('');

    const [selectedDate, setSelectedDate] = useState('');

    const [subjectsFromSemester, setSubjectSemester] = useState([])


    useEffect(() => {
        getSemester(mapSemesters)
        getSubject(mapSubjects)

        registerObserver(pathes.semester, "noteFormSemester", (data) => {
            console.log("Form Data:" + counter)
        })


        return () => unregisterObserver(pathes.semester, "noteFormSemester")
    }, [])

    useEffect(() => {
        changeSubjects()
    }, semester)


    const mapSubjects = (data) => {
        setSubjects(data.map(semi => {
            return {
                label: semi.val.label,
                value: semi.val.value,
                semester: semi.val.semester
            }
        }))
    }

    const mapSemesters = (data) => {
        setSemesters(data.map(semi => {
            return {
                label: semi.val.label,
                value: semi.val.value
            }
        }))
    }

    const changeSubjects = () => {

        console.log("change subjects aufgerufen")

        let tmpArray = [];

        if(semester!== null){
            tmpArray = subjects.filter(o => o.semester === semester)
            setSubjectSemester(tmpArray)
        }


    }

    const submitData = () => {

        const test = {
            mark,
            weight,
            selectedDate,
            subject,
            semester
        }

        addMark(test)

    }


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
                    <Text>Semester:</Text>
                    <DropDownPicker
                        onPress={changeSubjects}
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
                    <Text>Fach (zuerst Semester auswählen):</Text>
                    <DropDownPicker
                        open={openSubject}
                        value={subject}
                        items={subjectsFromSemester}
                        setOpen={setOpenSubject}
                        setValue={setSubject}
                        setItems={setSubjectSemester}
                        placeholder={"Fach auswählen"}
                    />
                </View>

                <View style={{marginTop: openSubject ? subjects.length * 40 : 0}}>
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
                        mode={"calendar"}
                        onSelectedChange={date => setSelectedDate(date)}
                    />
                </View>
                <View style={{marginTop: 10}}>
                    <Button
                        onPress={submitData}
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