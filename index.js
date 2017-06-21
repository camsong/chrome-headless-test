const CDP = require('chrome-remote-interface');
const fs = require('fs');

function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}

const HANDLER = "window.addEventListener('awesomeName', e => { console.log('got event', e); document.result = 'Event catched'; });";
const FIRE = "const event = new CustomEvent('awesomeName', { 'foo': 'bar' });window.dispatchEvent(event);";

CDP(async (client) => {
  const { Page, Runtime } = client;
  try {
    await Page.enable();
    await Page.navigate({ url: 'http://localhost:8081/event.html' });

    await Page.loadEventFired();

    let result = await Runtime.evaluate({ expression: HANDLER });

    // result = await Runtime.evaluate({expression: FIRE});
    await sleep(2000);

    result = await Runtime.evaluate({ expression: 'document.result' });
    console.log(result);

    const { data } = await Page.captureScreenshot({ format: 'png', fromSurface: true });
    fs.writeFileSync('output.png', Buffer.from(data, 'base64'));
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}).on('error', (err) => {
  console.error(err);
});