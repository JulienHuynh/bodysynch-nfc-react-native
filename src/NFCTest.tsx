import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform, Alert} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import AndroidPrompt from './AndroidPrompt';

const NFCTest = () => {
    const androidPromptRef = React.useRef();
    const [glucoseData, setGlucoseData] = useState(null as number | null);

    const readGlucoseData = async () => {
        try {
            await NfcManager.start();
            // Android
            if (Platform.OS === 'android') {
                // @ts-ignore
                androidPromptRef.current.setVisible(true);
            }

            // Activer la technologie NFC ISO15693
            await NfcManager.requestTechnology(NfcTech.NfcV);
            const iso15693Handler = NfcManager.iso15693HandlerIOS;
            let response: any;
            if (Platform.OS === 'android') {
                response = await NfcManager.transceive([0x00, 0xA3, 0x01]);
            } else {
                const command = {
                    flags: 0x00, // Exemple de flag, à ajuster si nécessaire
                    commandCode: 0xA3, // Commande rawRead pour lire les données du capteur
                    data: [0x00, 0x01], // Données nécessaires pour lire la première page de la mémoire FRAM
                };
                response = await iso15693Handler.sendRequest(command);
            }

            console.log("test2");

            if (response && response.length > 0) {
                // Traitez les données reçues (par exemple, convertir en glucose)
                const glucoseValue = parseGlucoseData(response);
                setGlucoseData(glucoseValue);
                Alert.alert('Données de glucose récupérées', `Valeur: ${glucoseValue}`);
            } else {
                Alert.alert('Erreur', 'Aucune donnée reçue du capteur');
            }
        } catch (ex) {
            console.warn(ex);
            Alert.alert('Erreur', 'Impossible de lire les données du capteur');
        } finally {
            // Libérer la technologie NFC après utilisation
            NfcManager.cancelTechnologyRequest();
        }
    };

    // Fonction pour parser les données de glucose (à adapter selon le format des données)
    const parseGlucoseData = (data: any) => {
        // Logique de parsing ici (à adapter selon le format des données du capteur)
        return parseInt(data.join(''), 16); // Exemple basique
    };
    return (
        <View style={styles.wrapper}>
            <Text>Hello NFC</Text>
            <TouchableOpacity style={styles.btn} onPress={readGlucoseData}>
                <Text>START</Text>
            </TouchableOpacity>
            {/* Android */}
            <AndroidPrompt ref={androidPromptRef} onCancelPress= {() => {
                NfcManager.unregisterTagEvent().catch(() => 0);
            }}/>
            {glucoseData && (
                <Text>Dernière valeur de glucose : {glucoseData}</Text>
            )}
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

export default NFCTest;
