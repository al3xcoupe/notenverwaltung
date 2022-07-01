import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button, ScrollView, Image} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
    addMark,
    getSemester, getSubject, pathes as firebasePathes,
    registerObserver,
    unregisterObserver
} from "../../database/db";
import DatePicker from "react-native-modern-datepicker";
import * as ImagePicker from 'expo-image-picker';
import {getToday} from 'react-native-modern-datepicker';
import mime from "react-native-mime-types";
import * as FileSystem from "expo-file-system/build/FileSystem";
import * as pathe from "path";

export default function NotenForm() {
    const [title, setTitle] = useState();

    const [subjects, setSubjects] = useState([{label: "Mathematik", value: "m"}]) //später mit UseEffect aus Storage fächer hollen
    const [subject, setSubject] = useState(null);
    const [openSubject, setOpenSubject] = useState(false);

    const [semesters, setSemesters] = useState([{label: "BMS 21/22", value: "bms21/22"}]) //später mit UseEffect aus Storage fächer hollen
    const [semester, setSemester] = useState(null);
    const [openSemester, setOpenSemester] = useState(false);
    const [counter, setCounter] = useState(0);

    const [mark, setMark] = useState(null);
    const [weight, setWeight] = useState('');

    const [selectedDate, setSelectedDate] = useState('');

    const [subjectsFromSemester, setSubjectSemester] = useState([]);

    const [image, setImage] = useState(null);
    const [status, requestPermission] = ImagePicker.useCameraPermissions();


    useEffect(() => {
        getSemester(mapSemesters)
        getSubject(mapSubjects)

        registerObserver(firebasePathes.semester, "noteFormSemester", (data) => {
            console.log("Form Data:" + counter)
        })


        return () => unregisterObserver(firebasePathes.semester, "noteFormSemester")
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

        if (semester !== null) {
            tmpArray = subjects.filter(o => o.semester === semester)
            setSubjectSemester(tmpArray)
        }


    }

    const submitData = async () => {
        console.log("Image uRI", image)
        const uri = image;
        const mimeType = mime.contentType(pathe.extname(uri));
        const res = await FileSystem.readAsStringAsync(uri, {encoding: FileSystem.EncodingType.Base64});
        const base64String = "data:" + mimeType + ";base64," + res;

        console.log("Bild ", base64String)

        const markToAdd = {
            mark,
            weight,
            selectedDate,
            subject,
            semester,
            base64String
        }

        addMark(markToAdd)

    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        console.log("result ", result);
        console.log("result uri", result.uri)

        if (!result.cancelled) {
            console.log("set image uri")
            setImage(result.uri);
        }
    };

    const takeImage = async () => {
        const {granted} = await requestPermission();
        console.log(status)

        if (granted) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1,
            });

            console.log(result);

            if (!result.cancelled) {
                setImage(result.uri);
            }
        }
    };


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
                        selected={getToday()}
                        onSelectedChange={date => setSelectedDate(date)}
                    />
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Button title="Pick an image from camera roll" onPress={pickImage}/>
                </View>
                <View style={{marginTop: 15, alignItems: 'center', justifyContent: 'center'}}>
                    <Button title="Take image with camera" onPress={takeImage}/>
                </View>
                {image && <View style={{alignSelf: "center", marginTop: 5}}>
                    <Image source={{uri: image}} style={{width: 200, height: 200}}/>
                </View>}
                <View style={{marginTop: 10}}>
                    <Button
                        onPress={() => {
                            console.log("submit")
                            submitData().then(r => {
                                console.log("r bei submit: ", r)
                            })
                        }}
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