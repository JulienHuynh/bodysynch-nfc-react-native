import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import NfcManager from 'react-native-nfc-manager';
import Game from './Game';
import AndroidPrompt from './AndroidPrompt';

const App = () => {
  const [hasNfc, setHasNfc] = React.useState(null) as [boolean | null, Function];
  // Android
  const promptRef = React.useRef();
  const [enabled, setEnabled] = React.useState(null) as [boolean | null, Function];

  React.useEffect(() => {
    async function checkNfc() {
      const isSupported = await NfcManager.isSupported();
      if (isSupported) {
        await NfcManager.start();
        setEnabled(await NfcManager.isEnabled());
      }
      setHasNfc(isSupported);
    }
    checkNfc();
  }, []);

  if (hasNfc === null) {
    return null;
  } else if (!hasNfc) {
    return (
      <View style={styles.wrapper}>
        <Text>No NFC available</Text>
        {/* Android */}
        <TouchableOpacity onPress={() => {
            // @ts-ignore
            promptRef.current.setVisible(true);
          }}>
          <Text>SCAN NFC</Text>
        </TouchableOpacity>
        <AndroidPrompt ref={promptRef}/>
      </View>
    );
  } else if (!enabled) {
    return (
      <View style={styles.wrapper}>
        <Text>NFC is not enabled</Text>
        <TouchableOpacity onPress={() => {
            NfcManager.goToNfcSetting();
          }}>
          <Text>Go to NFC setting</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={async() => {
          setEnabled(await NfcManager.isEnabled());
        }}>
          <Text>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
     <Game />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
