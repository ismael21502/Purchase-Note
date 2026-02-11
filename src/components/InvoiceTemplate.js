import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const InvoiceTemplate = React.forwardRef(({ businessName, logoUri, items, total }, ref) => {
    return (
        <View ref={ref} style={styles.container} collapsable={false}>
            {/* Header */}
            <View style={styles.header}>
                {logoUri && <Image source={{ uri: logoUri }} style={styles.logo} />}
                <Text style={styles.businessName}>{businessName || 'Nombre del Negocio'}</Text>
            </View>

            <Text style={styles.title}>NOTA DE COMPRA</Text>
            <Text style={styles.date}>Fecha: {new Date().toLocaleDateString()}</Text>

            {/* Table Header */}
            <View style={[styles.row, styles.tableHeader]}>
                <Text style={[styles.cell, styles.colQty, styles.headerText]}>Cant.</Text>
                <Text style={[styles.cell, styles.colProduct, styles.headerText]}>Producto</Text>
                <Text style={[styles.cell, styles.colSize, styles.headerText]}>Talla</Text>
                <Text style={[styles.cell, styles.colPrice, styles.headerText]}>Precio</Text>
                <Text style={[styles.cell, styles.colTotal, styles.headerText]}>Subtotal</Text>
            </View>

            {/* Table Body */}
            {items.map((item, index) => (
                <View key={index} style={styles.row}>
                    <Text style={[styles.cell, styles.colQty]}>{item.quantity}</Text>
                    <Text style={[styles.cell, styles.colProduct]}>{item.product}</Text>
                    <Text style={[styles.cell, styles.colSize]}>{item.size || '-'}</Text>
                    <Text style={[styles.cell, styles.colPrice]}>${item.price.toFixed(2)}</Text>
                    <Text style={[styles.cell, styles.colTotal]}>${(item.quantity * item.price).toFixed(2)}</Text>
                </View>
            ))}

            {/* Empty rows filler if needed, or just total */}
            <View style={[styles.row, styles.totalRow]}>
                <Text style={[styles.cell, styles.colQty, styles.noBorder]}></Text>
                <Text style={[styles.cell, styles.colProduct, styles.noBorder]}></Text>
                <Text style={[styles.cell, styles.colSize, styles.noBorder]}></Text>
                <Text style={[styles.cell, styles.colPrice, styles.totalLabel]}>TOTAL:</Text>
                <Text style={[styles.cell, styles.colTotal, styles.totalValue]}>${total.toFixed(2)}</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>¡Gracias por su compra!</Text>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        padding: 40,
        backgroundColor: 'white',
        width: 800, // Fixed width for consistent image generation
        minHeight: 1000,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        paddingBottom: 20,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginRight: 20,
    },
    businessName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
        textTransform: 'uppercase',
    },
    date: {
        textAlign: 'right',
        marginBottom: 20,
        fontSize: 16,
        color: '#555',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        borderTopWidth: 1,
        borderTopColor: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    cell: {
        padding: 10,
        fontSize: 14,
        color: '#000',
        borderRightWidth: 1,
        borderRightColor: '#eee',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    // Column widths
    colQty: { width: '10%', textAlign: 'center' },
    colProduct: { width: '40%' },
    colSize: { width: '15%', textAlign: 'center' },
    colPrice: { width: '15%', textAlign: 'right' },
    colTotal: { width: '20%', textAlign: 'right', borderRightWidth: 0 },

    totalRow: {
        borderBottomWidth: 0,
        marginTop: 10,
    },
    noBorder: {
        borderRightWidth: 0,
    },
    totalLabel: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'right',
        backgroundColor: '#f9f9f9',
    },
    totalValue: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000',
        backgroundColor: '#f9f9f9',
    },
    footer: {
        marginTop: 50,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#666',
    }
});

export default InvoiceTemplate;
