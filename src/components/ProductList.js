import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { formatCurrency } from '../utils/priceFormat';
import ProductCard from './ProductCard';

export default function ProductList({ items, onRemoveItem }) {
    const { colors } = useTheme();
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
                                {ProductCard({ item, colors })}
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
        // padding: 15,
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
    productName: {
        fontSize: 16,
        fontWeight: '500',
    },
    
    bold: {
        fontWeight: 'bold',
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
