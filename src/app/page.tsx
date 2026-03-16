import { promises as fs } from "fs";
import path from "path";
import type { CountryData } from "@/types";
import ClientApp from "@/components/ClientApp";

export default async function Home() {
  const filePath = path.join(process.cwd(), "public", "data", "countries.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const countries: CountryData[] = JSON.parse(raw);

  return <ClientApp countries={countries} />;
}
