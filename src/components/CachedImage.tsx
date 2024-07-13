import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";

const CachedImage = props => {
    const { uri: url, style, onPress } = props;
    const [cachedUri, setCachedUri] = useState(null);

    useEffect(() => {
        const cacheImage = async () => {
            const name = shorthash.unique(url);
            const path = `${FileSystem.cacheDirectory}${name}`;
            const image = await FileSystem.getInfoAsync(path);
            if (image.exists) {
                setCachedUri(image.uri);
            } else {
                const newImage = await FileSystem.downloadAsync(url, path);
                setCachedUri(newImage.uri);
            }
        };
        cacheImage();
    }, [url]);

    return <Image style={style} onPress={onPress} source={{ uri: cachedUri || url }} />;
};

export default CachedImage;