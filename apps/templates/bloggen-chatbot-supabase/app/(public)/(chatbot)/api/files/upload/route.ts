import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Create Supabase client dynamically to prevent build-time evaluation
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseServiceKey);
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    const supabase = getSupabaseClient();

    // Use a timestamp or random string to avoid collisions
    const filePath = `uploads/${Date.now()}-${(file as File).name}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('chatbot-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('chatbot-files')
      .getPublicUrl(filePath);

    // Return url, name, and contentType for correct attachment rendering
    return NextResponse.json({
      url: publicUrlData.publicUrl,
      name: (file as File).name,
      contentType: (file as File).type,
    });
  } catch (error) {
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}

export function GET() {
  return new Response('Method Not Allowed', { status: 405 });
}
