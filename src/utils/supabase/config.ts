export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  bucketName: process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME!,
  admin: process.env.SUPABASE_SERVICE_ROLE_KEY!
}
