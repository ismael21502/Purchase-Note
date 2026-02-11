import { StyleSheet, Text, TextInput, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '../../context/ThemeContext';

const IconInput = ({ containerStyle, iconName = '', placeholder, value, onChangeText, fontSize = 14 }) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.container, containerStyle]}>
            <MaterialIcons size={14} name={iconName} color={colors.primary} style={styles.icon} />
            <TextInput
                style={[styles.textInput, { fontSize: fontSize, color: colors.text }]}
                placeholder={placeholder}
                placeholderTextColor={colors.subText}
                value={value}
                onChangeText={onChangeText}
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
        marginLeft: 5,
    },
    textInput: {
        padding: 5,
        flex: 1,
        includeFontPadding: false,
    }
})