import { useCC } from "./store";

export function useLookups() {
  const db = useCC();
  const staffName = (id: string) => db.staff.find((s) => s.id === id)?.name ?? "Unknown staff";
  const clientName = (id: string) => db.clients.find((c) => c.id === id)?.name ?? "Unknown client";
  return { ...db, staffName, clientName };
}
