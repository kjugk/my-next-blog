"use server";

import { Button } from "@/components/ui/button";
import { logout } from "@/features/auth/actions/logout";
import { createClient } from "@/lib/supabase/server";

export const LogoutButton = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return null;
  }

  return (
    <form action={logout}>
      <Button type="submit" variant="outline">
        Logout
      </Button>
    </form>
  );
};
