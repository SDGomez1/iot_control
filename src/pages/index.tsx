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

  const [contador, setContador] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      // Incrementa el contador cada 5 segundos
      setContador((contador) => contador + 1);
    }, 5000); // 5000 milisegundos = 5 segundos

    return () => clearInterval(intervalo); // Limpia el intervalo al desmontar el componente
  }, []);

  useEffect(() => {
    if (isConected) {
      readcommands.mutateAsync().then((data) => {
        data;
        console.log(data);
        if (data.length > 0) {
          console.log(data[0].command);
          writeToPort(selectedPort, data[0].command);
          deleteCommands.mutate();
        }
      });
    }
  }, [contador, isConected]);

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
        onClick={() => {
          writeToPort(selectedPort, "A");
        }}
      >
        Prender en comando led
      </button>
    </div>
  );
}
