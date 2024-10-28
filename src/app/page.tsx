import AttributeEditor from "@/components/AttributeEditor";
import PlayerEditor from "@/components/PlayerEditor";
import PlayerInfo from "@/components/PlayerInfo";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col gap-4 p-4">
      <PlayerInfo />
      <PlayerEditor />
      <AttributeEditor />
    </main>
  );
}
