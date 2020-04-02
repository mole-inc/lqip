![LQIP: Low Quality Images](https://raw.githubusercontent.com/mole-inc/lqip/master/.github/logo.png)

# LQIP: Low Quality Images Placeholder

[![Downloads](https://badgen.net/npm/dm/@mole-inc/lqip)](https://www.npmjs.com/package/@mole-inc/lqip)
[![Version](https://badgen.net/npm/v/@mole-inc/lqip)](https://www.npmjs.com/package/@mole-inc/lqip)
[![License](https://badgen.net/npm/license/@mole-inc/lqip)](https://www.npmjs.com/package/@mole-inc/lqip)
[![codecov](https://codecov.io/gh/mole-inc/lqip/branch/master/graph/badge.svg)](https://codecov.io/gh/mole-inc/lqip)

## Installation

```
npm install @mole-inc/lqip
```

## Usage Example

Generating Base64 from an image:

```js
import lqip from "@mole-inc/lqip"

const file = `./dest/to/file/riding-a-bike.jpg`;

const res = await lqip(file).catch(err => {
  console.error(err);
});
console.log(res);
// {
//   content: Buffer...,
//   metadata: {
//     originalWidth: 1400,
//     originalHeight: 700,
//     width: 14,
//     height: 7,
//     type: "jpeg",
//     dataURIBase64: "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhY.....",
//   }
// }
//
// e.g. `<img src="${res.metadata.dataURIBase64}" lazy-src="${file}" >`

// or use `then`

lqip(file).then(res => {
  console.log(res);
}).catch(err => {
  console.error(err);
});
```

## API Documentation

### `lqip(source: string | Buffer, options?: LqipOpitons): Promise<LqipResult>`

default function

Name      | Description
--------- | ---------------------------------------
`source`  | Path to image file or `Buffer`
`options` | LqipOpitons (optional)

##### `LqipOpitons`

```ts
export interface LqipOpitons {
  width?: number;
  forceJimp?: boolean;
}
```

Field       | Default       | Description
----------- | ------------- | -------------------------------------------------------------------------------
`width`     | 14            | resize width
`forceJimp` | `false`       | When this is a falsy, use [sharp](https://sharp.pixelplumbing.com/) to resize if installed.

#### `LqipResult`

```ts
export interface LqipResult {
  content: Buffer;
  metadata: {
    originalWidth: number;
    originalHeight: number;
    width: number;
    height: number;
    type: string;
    dataURIBase64: string;
  };
}
```

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
