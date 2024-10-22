import AttributeEditor from "@/components/AttributeEditor";
import PlayerInfo from "@/components/PlayerInfo";

export default function Home() {
  return (
    <main className="mb-32">
      <PlayerInfo />
      <AttributeEditor />
    </main>
  );
}
