import { trpc } from "../utils/trpc";

export default function User() {
  const addCommands = trpc.admin.create.useMutation();

  return (
    <div>
      <button
        onClick={() => {
          addCommands.mutate({ word: "A" });
        }}
      >
        Prender led
      </button>
      <button
        onClick={() => {
          addCommands.mutate({ word: "S" });
        }}
      >
        Apagar led
      </button>
    </div>
  );
}
