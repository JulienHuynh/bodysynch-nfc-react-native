import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import AndroidPrompt from './AndroidPrompt';

const Game = () => {
    const [start, setStart] = React.useState(null) as [Date | null, Function];
    const [duration, setDuration] = React.useState(0) as [number, Function];
    const androidPromptRef = React.useRef();

    React.useEffect(() => {
        let count = 5;
        NfcManager.setEventListener(NfcEvents.DiscoverTag, () => {
            count--;
            // Android
            if (Platform.OS === 'android') {
                // @ts-ignore
                androidPromptRef.current.setHintText(`${count}...`);
            } else {
                NfcManager.setAlertMessageIOS(`${count}...`);
            }
            if (count <= 0) {
                NfcManager.unregisterTagEvent().catch(() => 0);
                setDuration(new Date().getTime() - start!.getTime());
                // Android
                if (Platform.OS === 'android') {
                    // @ts-ignore
                    androidPromptRef.current.setVisible(false);
                }
            }
        });

        return () => {
            NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        };
    }, [start]);

    async function scanTag() {
        await NfcManager.registerTagEvent();
        // Android
        if (Platform.OS === 'android') {
            // @ts-ignore
            androidPromptRef.current.setVisible(true);
        }
        setStart(new Date());
        setDuration(0);
    }
    return (
        <View style={styles.wrapper}>
            <Text>Hello NFC</Text>
            {duration > 0 && <Text>Duration: {duration}ms</Text>}
            <TouchableOpacity style={styles.btn} onPress={scanTag}>
                <Text>START</Text>
            </TouchableOpacity>
            {/* Android */}
            <AndroidPrompt ref={androidPromptRef} onCancelPress= {() => {
                NfcManager.unregisterTagEvent().catch(() => 0);
            }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        margin: 15,
        padding: 15,
        backgroundColor: '#ccc',
        borderRadius: 8,
    },
});

export default Game;
