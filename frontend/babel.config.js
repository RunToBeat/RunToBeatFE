module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // @babel/plugin-proposal-class-properties
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    // @babel/plugin-transform-class-properties
    ['@babel/plugin-transform-class-properties', {loose: true}],
    // @babel/plugin-transform-private-methods
    ['@babel/plugin-transform-private-methods', {loose: true}],
    // @babel/plugin-transform-private-property-in-object
    ['@babel/plugin-transform-private-property-in-object', {loose: true}],
  ],
};
