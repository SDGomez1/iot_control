async function connectToSerial(port: SerialPort | undefined) {
  if ("serial" in navigator) {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    return port;
  } else {
    alert("Serial port is not available in this version");
  }
}

async function writeToPort(port: SerialPort | undefined, message: string) {
  const encoder = new TextEncoder();
  if (port !== undefined) {
    const writer = port.writable.getWriter();
    await writer.write(encoder.encode(message));
    writer.releaseLock();
  }
}

async function closePort(port: SerialPort | undefined) {
  if (port !== undefined) {
    await port.close();
  }
}

export { connectToSerial, writeToPort, closePort };
