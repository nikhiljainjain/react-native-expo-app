import { StyleSheet } from "react-native";
import { Image, type ImageSource } from "expo-image";

type Props = {
    imgSource: ImageSource
};

export default function ImageViewer({ imgSource }: Props) {
    return (
        <Image
            style={styles.image}
            source={imgSource}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18
    }
});