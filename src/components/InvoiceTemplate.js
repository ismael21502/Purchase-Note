import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { formatCurrency } from '../utils/priceFormat';
const InvoiceTemplate = React.forwardRef(({ businessName, businessDirection, businessPhone, logoUri, items, total, clientName, clientDirection, date, shippingCost }, ref) => {
    const shippingCostValue = parseFloat(shippingCost) || 0;

    return (
        <View ref={ref} style={styles.container} collapsable={false}>
            {/* Header */}
            <View style={styles.header}>
                {logoUri && <Image source={{ uri: logoUri }} style={styles.logo} />}
                <View style={styles.headerTextContainer}>
                    <Text style={styles.businessName}>{businessName || 'Nombre del Negocio'}</Text>
                    {businessDirection ? <Text style={styles.businessInfo}>{businessDirection}</Text> : null}
                    {businessPhone ? <Text style={styles.businessInfo}>{businessPhone}</Text> : null}
                </View>
            </View>

            <Text style={styles.title}>NOTA DE COMPRA</Text>
            <View style={styles.clientInfoContainer}>
                <Text style={styles.date}>Fecha: {date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString()}</Text>
                {clientName ? <Text style={styles.clientInfo}>Cliente: {clientName}</Text> : null}
                {clientDirection ? <Text style={styles.clientInfo}>Dirección: {clientDirection}</Text> : null}
            </View>

            {/* Table Header */}
            <View style={[styles.row, styles.tableHeader]}>
                <Text style={[styles.cell, styles.colProduct, styles.headerText]}>Modelo</Text>
                <Text style={[styles.cell, styles.colQty, styles.headerText]}>Cant.</Text>
                <Text style={[styles.cell, styles.colSize, styles.headerText]}>Talla</Text>
                <Text style={[styles.cell, styles.colPrice, styles.headerText]}>Precio</Text>
                <Text style={[styles.cell, styles.colTotal, styles.headerText]}>Subtotal</Text>
            </View>

            {/* Table Body */}
            {items.map((item, index) => (
                <View key={index} style={styles.row}>
                    <Text style={[styles.cell, styles.colProduct]}>{item.product}</Text>
                    <Text style={[styles.cell, styles.colQty]}>{item.quantity}</Text>
                    <Text style={[styles.cell, styles.colSize]}>{item.size || '-'}</Text>
                    <Text style={[styles.cell, styles.colPrice]}>{formatCurrency(item.price)}</Text>
                    <Text style={[styles.cell, styles.colTotal]}>{formatCurrency(item.quantity * item.price)}</Text>
                </View>
            ))}


            {/* Shipping Cost Row - only show if > 0 */}
            {shippingCostValue > 0 && (
                <View style={[styles.row, styles.shippingRow]}>
                    <Text style={[styles.cell, styles.colProduct, styles.noBorder]}></Text>
                    <Text style={[styles.cell, styles.colQty, styles.noBorder]}></Text>
                    <Text style={[styles.cell, styles.colSize, styles.noBorder]}></Text>
                    <Text style={[styles.cell, styles.colPrice, styles.shippingLabel]}>Servicio de paquetería:</Text>
                    <Text style={[styles.cell, styles.colTotal, styles.shippingValue]}>{formatCurrency(shippingCostValue, 'MXN')}</Text>
                </View>
            )}
            <View style={[styles.row, styles.totalRow]}>
                <Text style={[styles.cell, styles.colProduct, styles.totalValue]}>Total:</Text>
                <Text style={[styles.cell, styles.colQty, styles.totalValue]}>{items.reduce((acc, item) => acc + item.quantity, 0)}</Text>
                <Text style={[styles.cell, styles.colSize, styles.totalValue]}></Text>
                <Text style={[styles.cell, styles.colPrice, styles.totalValue]}></Text>
                <Text style={[styles.cell, styles.colTotal, styles.totalValue]}>{formatCurrency(total)}</Text>
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
    headerTextContainer: {
        flex: 1,
    },
    businessInfo: {
        fontSize: 14,
        color: '#555',
        marginTop: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
        textTransform: 'uppercase',
    },
    clientInfoContainer: {
        marginBottom: 20,
        alignItems: 'flex-end',
    },
    date: {
        fontSize: 16,
        color: '#555',
        marginBottom: 2,
    },
    clientInfo: {
        fontSize: 16,
        color: '#000',
        marginTop: 2,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
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
        // marginTop: 10,
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
    shippingRow: {
        // marginTop: 5,
        borderBottomWidth: 0,
    },
    shippingLabel: {
        fontSize: 14,
        textAlign: 'right',
        fontStyle: 'italic',
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    shippingValue: {
        fontSize: 14,
        fontStyle: 'italic',
        borderBottomWidth: 1,
        borderColor: '#eee'
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
