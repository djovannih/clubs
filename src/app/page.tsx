import AttributeEditor from "@/components/AttributeEditor";
import PlayerInfo from "@/components/PlayerInfo";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4">
      <PlayerInfo />
      <AttributeEditor />
    </main>
  );
}
