import spi, { SpiDevice, SpiMessage } from "spi-device";
import { promisify } from "util";
import { McpConfigurations } from "./mcp3xxx-config";
import {
  McpKind,
  Channel,
  McpOptions,
  McpKinds,
  McpDevice,
  McpSpiConfiguration,
} from "./types/mcp-3xxx";

const sleep = promisify(setTimeout);

const _validateKind = (kind: McpKind) => {
  if (McpKinds.indexOf(kind) === -1)
    throw new Error(
      `Expected one of: ${McpKinds.join(", ")}, received ${kind}`
    );
};

const _validateChannel = (kind: McpKind, channel: Channel<string>) => {
  if (channel > McpConfigurations[kind]!.channelCount || channel < 0)
    throw new RangeError(
      `Expected a channel between 0 and ${McpConfigurations[kind]?.channelCount}`
    );
};

const makeSpiMessage = <K extends McpKind>(
  channel: Channel<K>,
  config: McpSpiConfiguration<any>,
  options: McpOptions
) => [
  {
    byteLength: config.transferLength,
    sendBuffer: config.readChannelCommand(channel),
    receiveBuffer: Buffer.alloc(config.transferLength),
    speedHz: options?.speed || config.defaultSpeed,
  },
];

const sendSpiMessage = (
  device: SpiDevice,
  message: SpiMessage,
  config: McpSpiConfiguration<any>
): Promise<number> =>
  new Promise((resolve, reject) => {
    device.transfer(message, (error, message) => {
      if (error) reject(error.message);
      if (!message[0].receiveBuffer)
        reject(`Invalid buffer response ${message}`);
      resolve(config.getValue(message[0].receiveBuffer!));
    });
  });

const closeSpiDevice = (device: SpiDevice): Promise<void> =>
  new Promise<void>((resolveClose, rejectClose) => {
    device.close((error) => {
      if (error) rejectClose();
      resolveClose();
    });
  });

export const connect = <K extends McpKind>(
  kind: K,
  channel: Channel<K>,
  options?: McpOptions
) =>
  new Promise<McpDevice>((resolve, reject) => {
    _validateKind(kind);
    _validateChannel(kind, channel);

    const mergedOptions = { bus: 0, speed: 0, ...options! };
    const config = McpConfigurations[kind]!;

    const device = spi.open(mergedOptions.bus, mergedOptions.speed, (error) => {
      if (error) reject(error.message);
      resolve({
        read: async () => {
          const message = makeSpiMessage(channel, config, { ...options });
          return sendSpiMessage(device, message, config);
        },
        close: async () => closeSpiDevice(device),
      });
    });
  });

const main = async () => {
  while (true) {
    const { read, close } = await connect("3008", 0);

    const result = await read();
    console.log(result);
    await sleep(500);
  }
  // await close();
};

main();
