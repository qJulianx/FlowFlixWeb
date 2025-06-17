import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('visits')
    .select('count')
    .limit(1)
    .single();

  if (error) return new Response('Błąd pobierania danych', { status: 500 });

  const newCount = (data.count || 0) + 1;

  await supabase
    .from('visits')
    .update({ count: newCount })
    .eq('id', data.id);

  return new Response(JSON.stringify({ count: newCount }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
