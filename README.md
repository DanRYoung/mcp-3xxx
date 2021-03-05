## MCP-3xxx Driver

This is a Node.js, TypeScript-first library for handling SPI communication with the Microchip's MCP3xxx family of analog-to-digital converters (ADCs). See the [Supported Devices](#supported-devices) list for supported chips.

### Installation

With NPM: `npm install mcp-3xxx`

With Yarn: `yarn add mcp-3xxx`

### Usage

```javascript
// I have a MCP3008 chip with an analog sensor hooked up
// to its 4th analog channel (channels are zero indexed!)
const { read, close } = await connect("3008", 3);
const result = await read();
console.log(result); // number
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
