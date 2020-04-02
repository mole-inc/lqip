![LQIP: Low Quality Images](https://raw.githubusercontent.com/mole-inc/lqip/master/.github/logo.png)

# LQIP: Low Quality Images Placeholder

[![Downloads](https://badgen.net/npm/dm/@mole-inc/lqip)](https://www.npmjs.com/package/@mole-inc/lqip)
[![Version](https://badgen.net/npm/v/@mole-inc/lqip)](https://www.npmjs.com/package/@mole-inc/lqip)
[![License](https://badgen.net/npm/license/@mole-inc/lqip)](https://www.npmjs.com/package/@mole-inc/lqip)
[![codecov](https://codecov.io/gh/mole-inc/lqip/branch/master/graph/badge.svg)](https://codecov.io/gh/mole-inc/lqip)

## Installation

```
npm install lqip
```

## Usage Example

Generating Base64 from an image:

```js
const lqip = require('lqip');

const file = `./dest/to/file/riding-a-bike.jpg`;

lqip.base64(file).then(res => {
  console.log(res); // "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhY.....
});

```

## API Documentation

#### `lqip.base64(source: string | Buffer, forceJimp: boolean)`

This method accepts an image file path and Buffer, the file has to be one of those formats ['jpeg', 'jpg', 'png'] and returns a Base64. 
image string with a valid format and ready to be used in web applications such as in <img /> tags source or in CSS properties URLs. 

forceJimp is `false` as default. When this is a falsy, use [sharp](https://sharp.pixelplumbing.com/) if installed.

## Inspired by

- [Medium web app](https://medium.com/cucumbertown-magazine/the-beginners-guide-to-composition-in-food-photography-how-to-transform-your-food-photos-from-good-39613ab78bf2)
- [Instagram native mobile app](https://www.instagram.com/)
- [Polymer shop project](https://shop.polymer-project.org/)

## Remarkable Mentions

- Essential Image Optimization, An eBook by Addy Osmani [link](https://images.guide/)

## Notes, Credits & License

This is a maintained fork of [zouhir/lqip](https://github.com/zouhir/lqip).  
Original [lqip](https://github.com/zouhir/lqip) is released under The MIT License by [Zouhir Chahoud](https://zouhir.org/).

Please see LICENSE file
