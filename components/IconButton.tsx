import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
    icon: keyof typeof MaterialIcons.glyphMap;
    label: string;
    onPress: () => void;
}

export default function IconButton({ icon, label, onPress }: Props) {
    return (
        <Pressable style={styles.iconButtonContainer} onPress={onPress}>
            <MaterialIcons name={icon} size={24} color="#fff" />
            <Text style={styles.iconButtonText}>{label}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    iconButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconButtonText: {
        color: '#fff',
        marginTop: 12
    }
});
