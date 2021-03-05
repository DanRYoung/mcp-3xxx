import { ChannelCount, McpKind, McpSpiConfiguration } from "./types/mcp-3xxx";

export type McpConfigurationCatalog = {
  [kind in McpKind]?: McpSpiConfiguration<ChannelCount>;
};

export const McpConfigurations: McpConfigurationCatalog = {
  "3008": {
    channelCount: 8,
    maxReading: 1023,
    defaultSpeed: 1350000,
    transferLength: 3,
    readChannelCommand: (channel) =>
      Buffer.from([0x01, 0x80 + (channel << 4), 0x00]),
    getValue: (buffer) => ((buffer[1] & 0x03) << 8) + buffer[2],
  },
  "3004": {
    channelCount: 4,
    maxReading: 1023,
    defaultSpeed: 1350000,
    transferLength: 3,
    readChannelCommand: (channel) =>
      Buffer.from([0x01, 0x80 + (channel << 4), 0x00]),
    getValue: (buffer) => ((buffer[1] & 0x03) << 8) + buffer[2],
  },
  "3002": {
    channelCount: 2,
    maxReading: 1023,
    defaultSpeed: 1200000,
    transferLength: 2,
    readChannelCommand: (channel) => Buffer.from([0x68 + (channel << 4), 0x00]),
    getValue: (buffer) => ((buffer[0] & 0x03) << 8) + buffer[1],
  },
  "3208": {
    channelCount: 8,
    maxReading: 4095,
    defaultSpeed: 1000000,
    transferLength: 3,
    readChannelCommand: (channel) =>
      Buffer.from([0x06 + (channel >> 2), (channel & 0x03) << 6, 0x00]),
    getValue: (buffer) => ((buffer[1] & 0x0f) << 8) + buffer[2],
  },
  "3204": {
    channelCount: 4,
    maxReading: 4095,
    defaultSpeed: 1000000,
    transferLength: 3,
    readChannelCommand: (channel) =>
      Buffer.from([0x06 + (channel >> 2), (channel & 0x03) << 6, 0x00]),
    getValue: (buffer) => ((buffer[1] & 0x0f) << 8) + buffer[2],
  },
  "3202": {
    channelCount: 2,
    maxReading: 4095,
    defaultSpeed: 900000,
    transferLength: 3,
    readChannelCommand: (channel) =>
      Buffer.from([0x01, 0xa0 + (channel << 6), 0x00]),
    getValue: (buffer) => ((buffer[1] & 0x0f) << 8) + buffer[2],
  },
  "3304": {
    channelCount: 8,
    maxReading: 4095,
    defaultSpeed: 1050000,
    transferLength: 3,
    readChannelCommand: (channel) =>
      Buffer.from([0x0c + (channel >> 1), (channel & 0x01) << 7, 0x00]),
    getValue: (buffer) => ((buffer[1] & 0x0f) << 8) + buffer[2],
  },
};
