import { requestGPIOAccess } from "./node_modules/node-web-gpio/dist/index.js";

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

let port = null;

export async function blink(abortSignal) {
  const gpioAccess = await requestGPIOAccess();
  port = gpioAccess.ports.get(26);
  await port.export("out");

  await port.write(1);

  while (true) {
    if (abortSignal.aborted) {
      await port.write(0); // 停止
      break;
    }
    await sleep(100); // 適度にCPU負荷を減らす
  }
}
