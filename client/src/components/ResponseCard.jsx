function ResponseCard({ data }) {
  if (!data) return null;

  return (
    <div>
      <h2>Response</h2>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default ResponseCard;