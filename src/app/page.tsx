import AttributeEditor from "@/components/AttributeEditor";

export default function Home() {
  return (
    <>
      <div className="rounded-lg bg-background p-6">
        <h2 className="mb-4 text-2xl font-bold">Attributes</h2>
      </div>
      <AttributeEditor />
    </>
  );
}
