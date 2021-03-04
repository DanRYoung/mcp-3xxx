import { sourceCommitSha } from "./sha";

console.log(`Hello world!, I was built from 0x${sourceCommitSha.toString(16)}`);
