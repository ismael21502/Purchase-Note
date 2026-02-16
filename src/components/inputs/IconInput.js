import { StyleSheet, Text, TextInput, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const IconInput = ({ containerStyle, iconName = '', placeholder, value, onChangeText, fontSize = 16, isNumeric = false, editable = true, secureTextEntry = false }) => {
    const { colors } = useTheme();
    const [isFocused, setIsFocused] = useState(false)
    return (
        <View style={{ ...styles.container, ...containerStyle, borderColor: isFocused ? colors.primary : colors.border }}>
            <MaterialIcons size={22} name={iconName} color={colors.primary} style={styles.icon} />
            <TextInput
                editable={editable}
                keyboardType={isNumeric ? 'numeric' : 'default'}
                secureTextEntry={secureTextEntry}
                style={[styles.textInput, { fontSize: fontSize, color: colors.text }]}
                placeholder={placeholder}
                placeholderTextColor={colors.subText}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    )
}

export default IconInput

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 10,
    },
    textInput: {
        padding: 10,
        flex: 1,
        includeFontPadding: false,
    }
})