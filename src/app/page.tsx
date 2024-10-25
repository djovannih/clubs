import AttributeEditor from "@/components/AttributeEditor";
import PlayerEditor from "@/components/PlayerEditor";
import PlayerInfo from "@/components/PlayerInfo";

export default function Home() {
  return (
    <main className="mb-32">
      <PlayerInfo />
      <PlayerEditor />
      <AttributeEditor />
    </main>
  );
}
