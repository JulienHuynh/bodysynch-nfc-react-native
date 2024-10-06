import React from 'react';
import {View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity, Animated} from 'react-native';

const AndroidPrompt = (props: any, ref: any) => {
    const {onCancelPress} = props;
    const [_visible, _setVisible] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const [hintText, setHintText] = React.useState('');
    const animatedValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (ref) {
            ref.current = {
                setVisible: _setVisible,
                setHintText,
            };
        }
    }, [ref]);

    React.useEffect(() => {
        if (_visible) {
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setVisible(false);
                setHintText('');
            });
        }
    }, [_visible, animatedValue]);

    const backdropAnimStyle = {
        opacity: animatedValue,
    };

    const promptAnimStyle = {
        transform: [
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [Dimensions.get('window').height, 0], // ou 500, 0
                }),
            },
        ],
    };

    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.content}>
                <Animated.View style={[styles.backdrop, StyleSheet.absoluteFill, backdropAnimStyle]} />

                <Animated.View style={[styles.prompt, promptAnimStyle]}>
                    <Text style={styles.hint}>{hintText || 'Hello NFC'}</Text>

                    <TouchableOpacity style={styles.btn} onPress={() => {
                        _setVisible(false);
                        onCancelPress();
                    }}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'pink',
    },
    content: {
        flex: 1,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    prompt: {
        position: 'absolute',
        bottom: 0,
        left: 20,
        width: Dimensions.get('window').width - 2 * 20,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 60,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hint: {
        fontSize: 24,
        marginBottom: 20,
    },
    btn: {
        padding: 15,
        backgroundColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
    },
});




export default React.forwardRef(AndroidPrompt);
