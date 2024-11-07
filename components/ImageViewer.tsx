import { StyleSheet } from "react-native";
import { Image, type ImageSource } from "expo-image";

type Props = {
    imgSource: ImageSource;
    selectedImage: string | undefined;
};

export default function ImageViewer({ imgSource, selectedImage }: Props) {
    const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

    return (
        <Image
            style={styles.image}
            source={imageSource}
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