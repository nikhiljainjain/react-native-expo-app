import { useState } from "react";
import { StyleSheet, FlatList, Platform, Pressable } from "react-native";
import { Image, type ImageSource } from 'expo-image';

type Props = {
    onSelect: (image: ImageSource) => void;
    onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: Props) {
    const [emojis] = useState<ImageSource[]>([
        require("@/assets/emoji1.png"),
        require("@/assets/emoji2.png"),
        require("@/assets/emoji3.png"),
        require("@/assets/emoji4.png"),
        require("@/assets/emoji5.png"),
        require("@/assets/emoji6.png")
    ]);

    return (
        <FlatList 
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === "web" ? true : false}
            contentContainerStyle={styles.listContainer}
            data={emojis}
            renderItem={({ item, index }) => (
                <Pressable 
                    onPress={() => {
                        onSelect(item)
                        onCloseModal()
                    }}
                >
                    <Image source={item} key={index} style={styles.image} />
                </Pressable>
            )}    
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 20
    }
});
