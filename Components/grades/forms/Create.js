import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import React, {useState} from "react";

const Create = ({ navigation }) => {

    const [name, setName] = useState();
    const [options, setOptions] = useState([{label: "Fach", value: "f"}, {label: "Semester", value: "s"}])
    const [option, setOption] = useState(null);
    const [openOption, setOpenOption] = useState(false);


    const [semesters, setSemesters] = useState([{label: "BMS 21/22", value: "bms21/22"}, {label: "BMS 22/23", value: "bms22/23"}, {label: "BBW 21/22", value: "bbw21/22"}]) //später mit UseEffect aus Storage fächer hollen
    const [semester, setSemester] = useState(null);
    const [openSemester, setOpenSemester] = useState(false);

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
                    title={option === 'f' ? 'Fach speichern' : 'Semester speichern' }
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>





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