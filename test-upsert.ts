import { createClient } from '@supabase/supabase-js';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '');

async function run() {
  const { data, error } = await supabase
    .from("app_user_profiles")
    .upsert({
      user_id: "e7c75b21-2040-4d43-a898-6b4e157efb2d",
      email: "igorlucarine10@gmail.com",
      full_name: "Igor Lucarine Presoto",
      onboarding_step: "goals",
    }, { onConflict: "user_id" })

  console.log("UPSERT RESULT:", { data, error })
}

run();
