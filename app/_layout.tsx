import { Stack } from 'expo-router';
import { setStatusBarStyle } from 'expo-status-bar';
import { useEffect } from 'react';

export default function RootLayout() {
    useEffect(() => {
        setTimeout(() => {
            setStatusBarStyle('light');
        });
    });

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
};