import { connectToSerial, writeToPort, closePort } from "../inc/SerialFunction";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

export default function Page() {
  const [selectedPort, setSelectedPort] = useState<SerialPort | undefined>(
    undefined
  );
  const readcommands = trpc.admin.read.useMutation();
  const deleteCommands = trpc.admin.delete.useMutation();
  const [isConected, setIsConected] = useState(false);

  useEffect(() => {
    if (isConected) {
      console.log("conected");
      setInterval(() => {
        readcommands.mutateAsync().then((data) => {
          data;
          console.log(data);
          if (data.length > 0) {
            console.log("entra");
            writeToPort(selectedPort, data[0].command);
            deleteCommands.mutate();
          }
        });
      }, 5000);
    }
  }, []);

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
                  console.log(isConected);
                }
              })
              .catch((error) => console.log(error));
          }}
        >
          Conectar
        </button>
      )}
    </div>
  );
}
