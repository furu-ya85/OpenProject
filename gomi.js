import { blink } from "./test-async.js";

const controller = new AbortController();
const signal = controller.signal;

blink(signal); // LED をONにする

setTimeout(() => {
  controller.abort(); // 5秒後に停止
}, 15000);
