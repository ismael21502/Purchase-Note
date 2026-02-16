import React, { useState } from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import IconInput from './inputs/IconInput';

const ActivateAppModal = ({ visible, onActivate }) => {
    const { colors } = useTheme();
    const [password, setPassword] = useState('');

    const handleActivate = () => {
        // For now, it just calls onActivate with the password
        onActivate(password);
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
        >
            <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
                        <View style={styles.header}>
                            <Text style={[styles.title, { color: colors.text }]}>Activar Aplicación</Text>
                            <Text style={[styles.subTitle, { color: colors.subText }]}>
                                Ingresa la clave de activación para desbloquear la app.
                            </Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <IconInput
                                iconName="lock"
                                placeholder="Contraseña de activación"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={true}
                                containerStyle={[styles.input, { borderBottomWidth: 1 }]}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: colors.primary }]}
                            onPress={handleActivate}
                        >
                            <Text style={styles.buttonText}>Activar</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

export default ActivateAppModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    keyboardView: {
        width: '100%',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        padding: 25,
        borderRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
    inputContainer: {
        marginBottom: 25,
        height: 50,
    },
    input: {
        flex: 1,
    },
    button: {
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
