import { readFile } from "fs/promises";
import path from "path";
import type { CountryData } from "@/types";
import DashboardClient from "@/components/DashboardClient";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const filePath = path.join(process.cwd(), "public", "data", "countries.json");
  const sourcesPath = path.join(process.cwd(), "public", "data", "sources.json");
  const [raw, sourcesRaw, supabase] = await Promise.all([
    readFile(filePath, "utf-8"),
    readFile(sourcesPath, "utf-8"),
    createClient(),
  ]);

  const countries: CountryData[] = JSON.parse(raw);
  const sourcesData = JSON.parse(sourcesRaw);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <DashboardClient countries={countries} sourcesData={sourcesData} user={user} />;
}
