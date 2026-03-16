import { readFile } from "fs/promises";
import path from "path";
import type { CountryData } from "@/types";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
  const filePath = path.join(process.cwd(), "public", "data", "countries.json");
  const raw = await readFile(filePath, "utf-8");
  const countries: CountryData[] = JSON.parse(raw);

  return <DashboardClient countries={countries} />;
}
