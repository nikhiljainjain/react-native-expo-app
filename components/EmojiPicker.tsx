import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { PropsWithChildren } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>;

export default function EmojiPicker({ children, isVisible, onClose }: Props) {
    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Pick an Emoji</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" size={24} color="#fff" />
                    </Pressable>
                </View>
                {children}
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalContent: {
        height: '25%',
        width: '100%',
        backgroundColor: '#25292e',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        position: 'absolute',
        bottom: 0
    },
    titleContainer: {
        height: '18%',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#464c55',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    title: {
        fontSize: 24,
        color: '#fff'
    }
});
