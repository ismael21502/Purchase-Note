import React from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import * as ImagePicker from 'expo-image-picker';
import IconInput from './inputs/IconInput';

export default function ClientForm({
    clientName, onClientNameChange,
    clientDirection, onClientDirectionChange }) {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.card, shadowColor: colors.text }]}>

            <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Datos del Cliente</Text>
                <IconInput containerStyle={{
                    borderRadius: 7,
                    borderColor: colors.border,
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    marginBottom: 5,
                }}
                    iconName={'person'}
                    placeholder={'Nombre del cliente'}
                    value={clientName}
                    onChangeText={onClientNameChange}
                />
                <IconInput containerStyle={{
                    borderRadius: 7,
                    borderColor: colors.border,
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    marginBottom: 5,
                }}
                    iconName={'location-on'}
                    placeholder={'Dirección (opcional)'}
                    value={clientDirection}
                    onChangeText={onClientDirectionChange}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        elevation: 2, // Android shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    logoContainer: {
        marginRight: 15,
    },
    logo: {
        width: 70,
        height: 70,
        borderRadius: 35,
        resizeMode: 'cover',
    },
    placeholderLogo: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'dashed',
    },
    placeholderText: {
        color: '#888',
        fontSize: 12,
    },
    inputContainer: {
        flex: 1,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 5,
        fontWeight: 'bold',
    },
});
