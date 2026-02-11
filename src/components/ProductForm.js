import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import IconInput from './inputs/IconInput';
import { MaterialIcons } from '@expo/vector-icons';
import { formatCurrency } from '../utils/priceFormat';
export default function ProductForm({ onAddItem }) {
    const [product, setProduct] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const { colors } = useTheme();

    const handleAdd = () => {
        if (!product.trim()) {
            Alert.alert('Error', 'El nombre del producto es obligatorio.');
            return;
        }
        if (!quantity || isNaN(quantity) || parseFloat(quantity) <= 0) {
            Alert.alert('Error', 'Ingresa una cantidad válida.');
            return;
        }
        if (!price || isNaN(price) || parseFloat(price) < 0) {
            Alert.alert('Error', 'Ingresa un precio válido.');
            return;
        }

        const newItem = {
            id: Date.now().toString(),
            product,
            size,
            quantity: parseFloat(quantity),
            price: parseFloat(price),
        };

        onAddItem(newItem);

        // Reset form
        setProduct('');
        setSize('');
        setQuantity('');
        setPrice('');
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.card, shadowColor: colors.text }]}>
            <View style={{ ...styles.row, justifyContent: 'space-between' }}>
                <Text style={[styles.header, { color: colors.text }]}>Agregar Producto</Text>
                <View style={[styles.calculated, { backgroundColor: colors.background, borderColor: colors.border }]}>
                    <Text style={[styles.calculatedText, { color: colors.text }]}>
                        Total: {formatCurrency((parseFloat(quantity || 0) * parseFloat(price || 0)), 'MXN')}
                    </Text>
                </View>
            </View>
            <TextInput
                style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.border, color: colors.text }]}
                placeholder="Producto"
                placeholderTextColor={colors.subText}
                value={product}
                onChangeText={setProduct}
            />

            <View style={styles.row}>
                <TextInput
                    style={[styles.input, { marginRight: 5, backgroundColor: colors.inputBackground, borderColor: colors.border, color: colors.text }]}
                    placeholder="Talla"
                    placeholderTextColor={colors.subText}
                    value={size}
                    onChangeText={setSize}
                />
                <TextInput
                    style={[styles.input, { marginRight: 5, backgroundColor: colors.inputBackground, borderColor: colors.border, color: colors.text }]}
                    placeholder="Cant."
                    placeholderTextColor={colors.subText}
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                />
                <TextInput
                    style={[styles.input, { backgroundColor: colors.inputBackground, borderColor: colors.border, color: colors.text }]}
                    placeholder="Precio"
                    placeholderTextColor={colors.subText}
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                />
            </View>

            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary, borderColor: colors.primary }]} onPress={handleAdd}>
                <MaterialIcons size={20} name={'add'} color={'#fff'} style={{ marginRight: 5 }} />
                <Text style={[styles.buttonText, { color: '#fff' }]}>Agregar a la Nota</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    calculated: {
        borderWidth: 1,
        borderRadius: 100000000,
        padding: 5,
        justifyContent: 'center',
    },
    calculatedText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 5,
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
