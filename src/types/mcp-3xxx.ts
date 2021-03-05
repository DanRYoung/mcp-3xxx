export const TwoChannels = [0, 1] as const;
export type TwoChannel = typeof TwoChannels[number];

export const FourChannels = [0, 1, 2, 3] as const;
export type FourChannel = typeof FourChannels[number];

export const EightChannels = [0, 1, 2, 3, 4, 5, 6, 7] as const;
export type EightChannel = typeof EightChannels[number];

export type ChannelCount = 2 | 4 | 8;

export type McpOptions = {
  speed?: number;
  bus?: number;
};

export const McpKinds = [
  "3008",
  "3004",
  "3002",
  "3202",
  "3204",
  "3208",
  "3304",
] as const;
export type McpKind = typeof McpKinds[number];

export type Channel<K> = K extends "3008"
  ? EightChannel
  : K extends "3004"
  ? FourChannel
  : K extends "3002"
  ? TwoChannel
  : K extends "3202"
  ? TwoChannel
  : K extends "3204"
  ? FourChannel
  : K extends "3208"
  ? EightChannel
  : EightChannel;

export type MaxMcpReading = 1023 | 4095;

export type Pin<C> = C extends 8
  ? EightChannel
  : C extends 4
  ? FourChannel
  : TwoChannel;

export interface McpSpiConfiguration<C extends ChannelCount> {
  channelCount: C;
  maxReading: MaxMcpReading;
  defaultSpeed: number;
  transferLength: number;
  readChannelCommand: (channel: Pin<C>) => Buffer;
  getValue: (response: Buffer) => number;
}

export interface McpDevice {
  read: () => Promise<number>;
  close: () => Promise<void>;
}
