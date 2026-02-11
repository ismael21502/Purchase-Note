import React, { useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Alert, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';

import BusinessHeader from './components/BusinessHeader';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import InvoiceTemplate from './components/InvoiceTemplate';
import ClientForm from './components/ClientForm';
import { useTheme } from './context/ThemeContext';
import Footer from './components/Footer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Main = () => {
    const [items, setItems] = useState([{
        id: Date.now().toString(),
        product: 'Jordan 1',
        size: '37',
        quantity: parseFloat('6'),
        price: parseFloat('1300'),
    }]);

    const [businessName, setBusinessName] = useState('');
    const [businessDirection, setBusinessDirection] = useState('')
    const [businessPhone, setBusinessPhone] = useState('')

    const [clientName, setClientName] = useState('')
    const [clientDirection, setClientDirection] = useState('')

    const [logoUri, setLogoUri] = useState(null);
    const invoiceRef = useRef();

    const { colors } = useTheme();
    const insets = useSafeAreaInsets()
    const handleAddItem = (newItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
    };

    const handleRemoveItem = (id) => {
        Alert.alert(
            "Eliminar producto",
            "¿Estás seguro de que quieres eliminar este producto?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar", style: "destructive", onPress: () => {
                        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
                    }
                }
            ]
        );
    };

    const handleExport = async () => {
        if (items.length === 0) {
            Alert.alert("Error", "Agrega al menos un producto para exportar la nota.");
            return;
        }

        try {
            const uri = await captureRef(invoiceRef, {
                format: 'png',
                quality: 1,
                result: 'tmpfile',
                height: 1500, // Force a good resolution
            });

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri, {
                    mimeType: 'image/png',
                    dialogTitle: 'Compartir Nota de Venta',
                    UTI: 'public.png'
                });
            } else {
                Alert.alert("Guardado", `La imagen se ha guardado en: ${uri}`);
            }
        } catch (error) {
            console.error("Error al exportar:", error);
            Alert.alert("Error", "No se pudo generar la imagen de la nota.");
        }
    };

    const total = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    return (
        <View style={{...styles.container,  backgroundColor: colors.background, marginBottom: insets.bottom, marginTop: insets.top}} >
            {/* <StatusBar style="auto" /> */}

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <View style={styles.headerTitleContainer}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Crear Nota de Venta</Text>
                </View>

                <BusinessHeader
                    businessName={businessName}
                    onNameChange={setBusinessName}
                    businessDirection={businessDirection}
                    onDirectionChange={setBusinessDirection}
                    businessPhone={businessPhone}
                    onPhoneChange={setBusinessPhone}
                    logoUri={logoUri}
                    onLogoPick={setLogoUri}
                />

                <ClientForm
                    clientName={clientName}
                    onClientNameChange={setClientName}
                    clientDirection={clientDirection}
                    onClientDirectionChange={setClientDirection}
                />

                <ProductForm onAddItem={handleAddItem} />

                <ProductList items={items} onRemoveItem={handleRemoveItem} />

                {/* <TouchableOpacity style={[styles.exportButton, { backgroundColor: colors.secondary }]} onPress={handleExport}>
                    <Text style={styles.exportButtonText}>Exportar Nota (Imagen)</Text>
                </TouchableOpacity> */}
                <View style={styles.spacer} />
            </ScrollView>
            <Footer onPress={handleExport} total={total}/>


            {/* Hidden Invoice Template for Capture */}
            <View style={styles.hiddenContainer} pointerEvents="none">
                <InvoiceTemplate
                    ref={invoiceRef}
                    businessName={businessName}
                    logoUri={logoUri}
                    items={items}
                    total={total}
                />
            </View>
        </View>
    )
}

export default Main


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? 30 : 0,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        padding: 15,
        paddingBottom: 50,
    },
    headerTitleContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    
    spacer: {
        height: 50,
    },
    // Style to hide the view but keep it rendered for capture
    hiddenContainer: {
        position: 'absolute',
        top: -5000, // Move it way off screen
        left: -5000,
        opacity: 1, // Must be visible to be captured, even if off-screen
        backgroundColor: 'white',
    },
});
