"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const logout = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
    throw new Error("Failed to sign out");
  }

  redirect("/admin/login");
};
