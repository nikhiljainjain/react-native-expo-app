import { Text, View, StyleSheet } from 'react-native';

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <Text>About</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
		backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
}); 
