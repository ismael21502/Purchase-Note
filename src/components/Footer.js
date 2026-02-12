import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { MaterialIcons } from '@expo/vector-icons';
import { formatCurrency } from '../utils/priceFormat';
const Footer = ({ onPress, total=0 }) => {
    const { colors } = useTheme()

    return (
        <View style={{ ...styles.container, backgroundColor: colors.card, borderColor: colors.border }}>
            <View style={{ ...styles.row, marginBottom: 5 }}>
                <Text style={{ color: colors.text, fontSize: 18 }}>Total General:</Text>
                <Text style={{ color: colors.primary, fontSize: 22, fontWeight: 'bold' }}>{formatCurrency(total, 'MXN')}</Text>
            </View>
            <TouchableOpacity style={{...styles.exportButton, ...styles.row, justifyContent: 'center', backgroundColor: colors.primary }} onPress={onPress}>
                <MaterialIcons color={"#FFF"} size={20} name='upload' style={{marginRight: 6}}/>
                <Text style={styles.exportButtonText}>Exportar Nota</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderTopWidth: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    exportButton: {
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    exportButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})