import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase admin client using the service-role key.
 *
 * NEVER import this file from Client Components — the `server-only`
 * import will cause a build error if you do.
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
