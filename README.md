## MCP-3xxx Driver

This is a Node.js, TypeScript-first library for handling SPI communication with Microchip's MCP3xxx family of analog-to-digital converters (ADCs). See the [Supported Devices](#supported-devices) list for supported chips.

### Installation

With NPM: `npm install mcp-3xxx`

With Yarn: `yarn add mcp-3xxx`

### Usage

```javascript
import { connect } from "mcp-3xxx";

// I have a MCP3008 chip with an analog sensor hooked up
// to its 4th analog channel (channels are zero indexed!)
const { read, close } = await connect("3008", 3);
const result = await read();
console.log(result); // number
```

Unless your Node.js version supports top-level async functions, remember to wrap the above snippet in an async function, e.g.:

```javascript
const main = async () => {
  // paste above usage snippet here
};

main();
```

### Supported devices

| Device |
| :----- |
| 3008   |
| 3004   |
| 3002   |
| 3202   |
| 3204   |
| 3208   |
| 3304   |
