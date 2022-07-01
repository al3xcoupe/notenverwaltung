import {Text, StyleSheet, View, Switch, Button} from "react-native";
import {useEffect, useState} from "react";
import {clearItem, getItem, registerObserver, setItem, unregisterObserver} from "../storage/observableStorageService";


const Setting = ({ navigation }) => {

    const [isEnabled1, setIsEnabled1] = useState(false);
    const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);

    const [isEnabled2, setIsEnabled2] = useState(false);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);

    const [isCalled, setIsCalled] = useState(false);

    useEffect(() => {
        if(!isCalled) {
            getItem("@RoundNumber", callback1)
            getItem("@OnlyWholeNumber", callback2)
        } else {
            setItem("@RoundNumber", isEnabled1)
            setItem("@OnlyWholeNumber", isEnabled2)
        }
    }, [isEnabled1, isEnabled2])

    const callback1 = (value) => {
        setIsEnabled1(value);
        setIsCalled(true);
    }

    const callback2 = (value) => {
        setIsEnabled2(value);
        setIsCalled(true);
    }

    return (

        <View>
            <View style={styles.rowContainer}>
                <Text>Noten auf 2 Nachkommastellen runden</Text>
                <Switch style={styles.switchToggle}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch1}
                        value={isEnabled1}
                />
            </View>

            <View style={styles.rowContainer}>
                <Text>Noten nur in Ganzzahlen anzeigen</Text>
                <Switch style={styles.switchToggle}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch2}
                        value={isEnabled2}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10
    },
    settingLine: {
        display: 'inline-block',
    },
    switchToggle: {
        marginLeft: 'auto',
        marginRight: 20
    }
});


export default Setting;