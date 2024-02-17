export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <h1>Shop Item: {id}</h1>
    </div>
  );
}
