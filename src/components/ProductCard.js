import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { formatCurrency } from '../utils/priceFormat'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const ProductCard = ({ item, colors, onRemoveItem }) => {
    const Separator = ({ size, color}) => {
        return (
            <View style={{ backgroundColor: color, width: size, height: size, marginHorizontal: size, borderRadius: '100%' }}>
            </View>
        )
    }
    return (
        <View style={[styles.itemContainer, { backgroundColor: colors.card, shadowColor: colors.text }]}>
            <View style={styles.info}>
                <Text style={[styles.productName, { color: colors.text, fontWeight: 'bold' }]}>{item.product}</Text>
                <View style={{...styles.row,}}>
                    <Text style={{ ...styles.text, color: colors.subText }}>Talla {item.size ? `${item.size}` : ''}</Text>
                    <Separator size={3} color={colors.subText}/>
                    <Text style={{ ...styles.text, color: colors.subText }}>{item.quantity} unidades</Text>
                    <Separator size={3} color={colors.subText} />
                    <Text style={{...styles.text, color: colors.subText }}>
                        {formatCurrency(item.price)} 
                    </Text>
                </View>
                <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{formatCurrency((item.quantity * item.price), 'MXN')}</Text>
            </View>
            <TouchableOpacity onPress={() => onRemoveItem(item.id)} style={[styles.deleteButton, { backgroundColor: colors.error + '20' }]}>
                <MaterialIcons size={18} name={'delete'} color={colors.error} />
            </TouchableOpacity>
        </View>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
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
    deleteButton: {
        padding: 10,
        borderRadius: 5000,
        marginLeft: 10,
    },

    deleteText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    info: {
        flex: 1,
    },
    details: {
        fontSize: 14,
    },
    text: {
        fontSize: 14
    }
})