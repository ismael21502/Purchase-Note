import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../context/ThemeContext';
import IconInput from './inputs/IconInput';

export default function AdditionalInfo({
    shippingCost, onCostChange,
    date, onDateChange }) {
    const { colors } = useTheme();
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        onDateChange(currentDate);
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.card, shadowColor: colors.text }]}>

            <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Información adicional</Text>
                <IconInput containerStyle={{
                    borderRadius: 7,
                    borderColor: colors.border,
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    marginBottom: 5,
                }}
                    isNumeric={true}
                    iconName={'attach-money'}
                    placeholder={'Costo de paquetería (opcional)'}
                    value={shippingCost}
                    onChangeText={onCostChange}
                />

                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <View pointerEvents="none">
                        <IconInput containerStyle={{
                            borderRadius: 7,
                            borderColor: colors.border,
                            backgroundColor: 'transparent',
                            borderWidth: 1,
                            marginBottom: 5,
                        }}
                            editable={false}
                            iconName={'calendar-month'}
                            placeholder={'Fecha'}
                            value={date ? date.toLocaleDateString() : ''}
                        />
                    </View>
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date || new Date()}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
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
