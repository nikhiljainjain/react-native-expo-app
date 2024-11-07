import { StyleSheet, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState, useRef } from 'react';
import { type ImageSource } from 'expo-image';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import domToImage from 'dom-to-image';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';	

const PlaceholderImage = require('@/assets/background-image.png');

export default function App() {
	const [status, requestPermission] = MediaLibrary.usePermissions();
	const imageRef = useRef<View>(null);
	const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
	const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);

	if (status === null) {
		requestPermission();
	}

	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		});

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
			setShowAppOptions(true);
		} else {
			alert('You did not select a photo');
		}
	}

	const onReset = () => {
		setShowAppOptions(false);
		setPickedEmoji(undefined);
	}

	const onAddSticker = () => {
		setIsModalVisible(true);
	};

	const onModalClose = () => {
		setIsModalVisible(false);
	};

	const onSaveImageAsync = async () => {
		try {
			if (Platform.OS !== 'web') {
				const localUri = await captureRef(imageRef, {
					height: 440,
					quality: 1
				});
	
				await MediaLibrary.saveToLibraryAsync(localUri);
				if (localUri) {
					alert('Saved!');
				}
			} else {
				const dataUrl = await domToImage.toJpeg(imageRef.current, {
					height: 440,
					quality: 1,
					width: 320
				});

				let link = document.createElement('a');
				link.download = `image-smash_${Date.now()}.jpeg`;
				link.href = dataUrl;
				link.click();
			}
		} catch (error) {
			console.error('Error saving image:', error);
		}
	};

	return (
		<View style={styles.container}>
			<GestureHandlerRootView style={styles.imageContainer}>
				<View ref={imageRef} collapsable={false}>
					<ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
					{pickedEmoji && (<EmojiSticker imageSize={40} stickerSource={pickedEmoji} />)}
				</View>
			</GestureHandlerRootView>
			{
				showAppOptions ? 
				(<View style={styles.optionsContainer}>
					<View style={styles.optionsRow}>
						<IconButton icon="refresh" label="Reset" onPress={onReset} />
						<CircleButton onPress={onAddSticker} />
						<IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
					</View>
				</View>) : (
				<View style={styles.footerContainer}>
					<Button label="Choose a Photo" theme='primary' onPress={pickImageAsync} />
					<Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
				</View>)
			}
			<EmojiPicker isVisible={isModalVisible} onClose={onModalClose} >
				<EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
			</EmojiPicker>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center'
	},
	imageContainer: {
		flex: 1
	},
	footerContainer: {
		flex: 1 / 3,
		alignItems: 'center'
	},
	optionsContainer: {
		position: 'absolute',
		bottom: 50
	},
	optionsRow: {
		flexDirection: 'row',
		alignItems: 'center'
	}
});
