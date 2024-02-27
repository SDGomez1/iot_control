"use client";

import { connectToSerial, writeToPort, closePort } from "./SerialFunction";
import { useState } from "react";

export default function Page() {
  const [selectedPort, setSelectedPort] = useState<SerialPort | undefined>(
    undefined
  );
  const [isConected, setIsConected] = useState(false);

  return (
    <div>
      {isConected ? (
        <button
          onClick={() => {
            closePort(selectedPort).catch((e) => {
              console.log(e);
            });
            setIsConected(false);
          }}
        >
          Cerrar conexion
        </button>
      ) : (
        <button
          onClick={async () => {
            connectToSerial(selectedPort)
              .then((value) => {
                if (value) {
                  setSelectedPort(value);
                  setIsConected(true);
                }
              })
              .catch((error) => console.log(error));
          }}
        >
          Conectar
        </button>
      )}

      <button
        onClick={() =>
          writeToPort(selectedPort, "A").catch((e) => console.log(e))
        }
      >
        Prender led
      </button>
      <button
        onClick={() =>
          writeToPort(selectedPort, "S").catch((e) => console.log(e))
        }
      >
        Apagar led
      </button>
    </div>
  );
}
