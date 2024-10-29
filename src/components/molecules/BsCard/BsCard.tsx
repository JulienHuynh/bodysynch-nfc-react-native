import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

type BsCardProps = {
    SvgIcon: React.FC<SvgProps>;
    text: string;
    handleSelect: (value: number) => void;
    value: number;
    isSelected?: boolean;
};

const BsCard: React.FC<BsCardProps> = ({ SvgIcon, text, handleSelect, value , isSelected}) => {

    const onPress = () => {
        handleSelect(value);
    };

    return (
        <View style={[styles.shadowBox, isSelected && styles.selectedShadow]}>
            <TouchableOpacity style={[styles.button, isSelected && styles.selectedButton]} onPress={onPress}>
                <SvgIcon width={40} height={40} />
                <Text style={[styles.buttonText, isSelected && styles.selectedText]}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default BsCard;

const styles = StyleSheet.create({
    button: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 150,
        width: 150,
        marginBottom: 20,
    },
    buttonText: {
        color: '#000',
        fontSize: 14,
        marginTop: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    shadowBox: {
        // Ombre pour iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        // Ombre pour Android
        elevation: 3,
    },
    selectedButton: {
        borderColor: '#8883f0',
        borderWidth: 2,
    },
    selectedText: {
        color: '#8883f0',
    },
    selectedShadow: {
        // Augmente l’ombre pour la sélection, si désiré
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
});
