import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import React, {useEffect, useState} from "react";
import {
    addFach,
    addNewExpense,
    addSemester,
    getSemester,
    pathes,
    registerObserver,
    unregisterObserver
} from "../../database/db";
import {makeid} from "../../other/idMaker";

const Create = ({ navigation }) => {

    const [name, setName] = useState();
    const [options, setOptions] = useState([{label: "Fach", value: "f"}, {label: "Semester", value: "s"}])
    const [option, setOption] = useState(null);
    const [openOption, setOpenOption] = useState(false);


    const [semesters, setSemesters] = useState([{label: "BMS 21/22", value: "bms21/22"}]) //später mit UseEffect aus Storage fächer hollen
    const [semester, setSemester] = useState(null);
    const [openSemester, setOpenSemester] = useState(false);

    useEffect(() => {
        getSemester(mapSemesters)
    }, [])


    const mapSemesters = (data) => {
        //console.log("inside map", data)
        setSemesters(data.map(semi => {
            return {
                label: semi.val.label,
                value: semi.val.value
            }
        }))
    }

    const submitData = () => {

        let id = makeid();

        console.log(semester)

        const semesterObject = {
            label: name,
            value: id
        }

        const fach = {
            label: name,
            semester: semester,
            value: id
        }

        if(option === 'f'){
            addFach(fach);
        }else{
            addSemester(semesterObject)
        }



    }

    return (
        <View style={{marginTop: 10, alignContent: "center", paddingLeft: 10, paddingRight: 10}}>
            <View>
                <Text>Name:</Text>
                <TextInput
                    placeholder={"Name"}
                    style={styles.input}
                    onChangeText={name => {
                        setName(name)
                    }}
                    value={name}
                    keyboardType={"default"}
                />
            </View>
            <View>
                <Text>Was erstellen?</Text>
                <DropDownPicker
                    schema={{
                        label: 'label',
                        value: 'value'
                    }}
                    open={openOption}
                    value={option}
                    items={options}
                    setOpen={setOpenOption}
                    setValue={setOption}
                    setItems={setOptions}
                    placeholder={"Option auswählen"}
                />
            </View>

            {option === 'f' &&
                <View style={{marginTop: openOption ? options.length * 40 : 0}}>
                <Text>Welches Semester</Text>
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
        }

            <View style={{marginTop: openOption
                    ? options.length * 40
                    : (openSemester ? semesters.length * 40 : 0)}}>
                <Button
                    onPress={submitData}
                    title={option === 'f' ? 'Fach speichern' : 'Semester speichern' }
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
            {semesters.forEach(semi => {

            })}
        </View>
    );
}


export default Create;


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