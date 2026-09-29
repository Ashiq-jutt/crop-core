const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Figma exports icons/logos as SVG files; ship them as assets rendered by expo-image.
config.resolver.assetExts.push('svg');

module.exports = config;
