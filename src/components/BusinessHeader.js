import React from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import * as ImagePicker from 'expo-image-picker';
import IconInput from './inputs/IconInput';

export default function BusinessHeader({
  businessName, onNameChange,
  businessDirection, onDirectionChange,
  businessPhone, onPhoneChange,
  logoUri, onLogoPick }) {
  const { colors } = useTheme();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onLogoPick(result.assets[0].uri);
    }
  };

  return (
    <View style={{...styles.container,  backgroundColor: colors.card, shadowColor: colors.text }}>
      <TouchableOpacity onPress={pickImage} style={styles.logoContainer}>
        {logoUri ? (
          <Image source={{ uri: logoUri }} style={styles.logo} />
        ) : (
          <View style={[styles.placeholderLogo, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
            <Text style={[styles.placeholderText, { color: colors.subText }]}>+ Logo</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.text }]}>Datos del Negocio</Text>
        <IconInput containerStyle={{
          borderRadius: 7,
          borderColor: colors.border,
          backgroundColor: 'transparent',
          borderWidth: 1,
          marginBottom: 5,
        }}
          iconName={'business'}
          placeholder={'Nombre del negocio'}
          value={businessName}
          onChangeText={onNameChange}
        />
        <IconInput containerStyle={{
          borderRadius: 7,
          borderColor: colors.border,
          backgroundColor: 'transparent',
          borderWidth: 1,
          marginBottom: 5,
        }}
          iconName={'location-on'}
          placeholder={'Dirección (opcional)'}
          value={businessDirection}
          onChangeText={onDirectionChange}
        />
        <IconInput containerStyle={{
          borderRadius: 7,
          borderColor: colors.border,
          backgroundColor: 'transparent',
          borderWidth: 1,
        }}
          iconName={'phone'}
          placeholder={'Teléfono (opcional)'}
          value={businessPhone}
          onChangeText={onPhoneChange}
        />
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
    borderRadius: 10,
    resizeMode: 'cover',
  },
  placeholderLogo: {
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  placeholderText: {
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
