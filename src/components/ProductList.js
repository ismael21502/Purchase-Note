import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { formatCurrency } from '../utils/priceFormat';
export default function ProductList({ items, onRemoveItem }) {
    const { colors } = useTheme();

    const renderItem = ({ item }) => (
        <View style={[styles.itemContainer, { backgroundColor: colors.card, shadowColor: colors.text }]}>
            <View style={styles.info}>
                <Text style={[styles.productName, { color: colors.text }]}>{item.product} {item.size ? `(${item.size})` : ''}</Text>
                <Text style={[styles.details, { color: colors.subText }]}>
                    {item.quantity} x ${item.price.toFixed(2)} = <Text style={[styles.bold, { color: colors.text }]}>{formatCurrency((item.quantity * item.price), 'MXN')}</Text>
                </Text>
            </View>
            <TouchableOpacity onPress={() => onRemoveItem(item.id)} style={[styles.deleteButton, { backgroundColor: colors.error + '20' }]}>
                {/* <Text style={styles.deleteText}>✕</Text> */}
                <MaterialIcons size={18} name={'delete'} color={colors.error} />
            </TouchableOpacity>
        </View>
    );

    // const total = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

    return (
        <View style={[styles.container, { backgroundColor: 'transparent' }]}>
            <Text style={[styles.header, { color: colors.text }]}>Lista de Productos</Text>

            {items.length === 0 ? (
                <Text style={[styles.emptyText, { color: colors.subText }]}>No hay productos agregados.</Text>
            ) : (
                <>
                    <View style={styles.listContainer}>
                        {items.map((item) => (
                            <View key={item.id}>
                                {renderItem({ item })}
                            </View>
                        ))}
                    </View>

                    {/* <View style={[styles.totalContainer, { borderTopColor: colors.border }]}>
                        <Text style={[styles.totalLabel, { color: colors.text }]}>Total General:</Text>
                        <Text style={[styles.totalValue, { color: colors.primary }]}>${total.toFixed(2)}</Text>
                    </View> */}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // borderRadius: 10,
        padding: 15,
        // elevation: 2,
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.1,
        // shadowRadius: 2,
        marginBottom: 20, // Add margin to avoid being hidden by footer/export button if needed
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    listContainer: {
        // maxHeight: 300, 
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
        borderRadius: 12,
        elevation: 2,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    info: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: '500',
    },
    details: {
        fontSize: 14,
    },
    bold: {
        fontWeight: 'bold',
    },
    deleteButton: {
        padding: 10,
        borderRadius: 5000,
        marginLeft: 10,
    },

    deleteText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        marginVertical: 20,
        fontStyle: 'italic',
    },
    totalContainer: {
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 22,
        fontWeight: 'bold',
    },
});
