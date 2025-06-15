let count = 0; // resetuje się po restarcie

export async function GET() {
  count++;
  return new Response(JSON.stringify({ count }), {
    headers: { 'Content-Type': 'application/json' },
  });
}