import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CarePlan, Client, DB, Incident, Invoice, Note, Org, RequestItem, Shift, Staff, Timesheet, Training } from "./types";
import { seed, todayLabel } from "./seed";
import { hoursBetween, perthClock, perthShortDate, perthShortDateYear, uid, displayClock } from "@/lib/utils";

type Actions = {
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  addClient: (c: Omit<Client, "id" | "status" | "staffIds" | "coordinator" | "goals"> & Partial<Client>) => string;
  addStaff: (s: Omit<Staff, "id" | "status" | "wwcc" | "firstAid" | "wwccExpiry" | "firstAidExpiry" | "employment" | "role"> & Partial<Staff>) => string;
  addNote: (n: Omit<Note, "id">) => string;
  addIncident: (i: Omit<Incident, "id">) => string;
  addTimesheet: (t: Omit<Timesheet, "id">) => string;
  setTimesheetStatus: (id: string, status: Timesheet["status"]) => void;
  setIncidentStatus: (id: string, status: Incident["status"]) => void;
  setInvoiceStatus: (id: string, status: Invoice["status"]) => void;
  checkIn: (staffId: string, clientId: string) => void;
  checkOut: (staffId: string) => void;
  completeTask: (id: string) => void;
  addRequest: (r: Omit<RequestItem, "id">) => string;
  setRequestStatus: (id: string, status: RequestItem["status"]) => void;
  addCarePlan: (p: Omit<CarePlan, "id">) => string;
  assignStaff: (clientId: string, staffId: string) => void;
  setStaffStatus: (id: string, status: Staff["status"]) => void;
  setTrainingStatus: (id: string, status: Training["status"]) => void;
  addInvoice: (i: Omit<Invoice, "id" | "number"> & { number?: string }) => string;
  attachApprovedHours: (invoiceId: string) => number;
  addShift: (s: Omit<Shift, "id" | "status"> & { status?: Shift["status"] }) => string;
  setCarePlanStatus: (id: string, status: CarePlan["status"]) => void;
  setClientRisk: (id: string, risk: Client["risk"]) => void;
  setOrg: (patch: Partial<Org>) => void;
  reset: () => void;
};

export const useCC = create<DB & Actions>()(
  persist(
    (set, get) => ({
      ...seed,
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      addClient: (c) => {
        const id = uid("c");
        const name = c.name;
        set({
          clients: [
            {
              id,
              status: "onboarding",
              staffIds: [],
              coordinator: "David Chen",
              goals: "To be confirmed at intake.",
              ...c,
            },
            ...get().clients,
          ],
          onboarding: [
            { id: uid("ob"), subjectType: "client", subjectId: id, name: "Service agreement signed", status: "pending" },
            { id: uid("ob"), subjectType: "client", subjectId: id, name: "Risk assessment complete", status: "pending" },
            ...get().onboarding,
          ],
          carePlans: [
            {
              id: uid("cp"),
              clientId: id,
              name: `${name} intake plan`,
              status: "draft",
              goals: ["Complete intake", "Confirm goals"],
              start: perthShortDateYear(),
            },
            ...get().carePlans,
          ],
        });
        return id;
      },
      addStaff: (s) => {
        const id = uid("s");
        set({
          staff: [
            {
              id,
              status: "active",
              wwcc: "ok",
              firstAid: "ok",
              wwccExpiry: "TBC",
              firstAidExpiry: "TBC",
              employment: "casual",
              role: "support_worker",
              ...s,
            },
            ...get().staff,
          ],
          training: [
            { id: uid("tr"), staffId: id, name: "Provide First Aid", status: "due", expiry: "TBC" },
            { id: uid("tr"), staffId: id, name: "Induction", status: "due", expiry: "TBC" },
            ...get().training,
          ],
          onboarding: [
            { id: uid("ob"), subjectType: "staff", subjectId: id, name: "Induction pack", status: "pending" },
            ...get().onboarding,
          ],
        });
        return id;
      },
      addNote: (n) => {
        const id = uid("n");
        set({ notes: [{ id, ...n }, ...get().notes] });
        return id;
      },
      addIncident: (i) => {
        const id = uid("i");
        set({ incidents: [{ id, ...i }, ...get().incidents] });
        return id;
      },
      addTimesheet: (t) => {
        const id = uid("t");
        set({ timesheets: [{ id, ...t }, ...get().timesheets] });
        return id;
      },
      setTimesheetStatus: (id, status) =>
        set({ timesheets: get().timesheets.map((t) => (t.id === id ? { ...t, status } : t)) }),
      setIncidentStatus: (id, status) =>
        set({ incidents: get().incidents.map((i) => (i.id === id ? { ...i, status } : i)) }),
      setInvoiceStatus: (id, status) =>
        set({ invoices: get().invoices.map((i) => (i.id === id ? { ...i, status } : i)) }),
      checkIn: (staffId, clientId) => {
        const day = todayLabel;
        const clock = perthClock();
        const hour = Number(clock.slice(0, 2));
        const startH = Number.isFinite(hour) ? hour : 7;
        const endH = Math.min(23, startH + 6);
        const pad = (n: number) => String(n).padStart(2, "0");
        const window = `${pad(startH)}–${pad(endH)}`;
        const existing = get().shifts.filter((s) => s.staffId === staffId && s.clientId === clientId && s.day === day);
        let shifts = get().shifts.map((s) =>
          s.staffId === staffId && s.clientId === clientId && s.day === day && s.status !== "complete"
            ? { ...s, status: "in_progress" as const }
            : s,
        );
        if (existing.length === 0) {
          shifts = [{ id: uid("sh"), staffId, clientId, day, window, status: "in_progress" }, ...shifts];
        }
        set({
          checkins: [
            { id: uid("ck"), staffId, clientId, inAt: clock },
            ...get().checkins.filter((c) => !(c.staffId === staffId && !c.outAt)),
          ],
          shifts,
        });
      },
      checkOut: (staffId) => {
        const open = get().checkins.find((c) => c.staffId === staffId && !c.outAt);
        if (!open) return;
        const outAt = perthClock();
        const start = displayClock(open.inAt);
        const date = perthShortDate();
        const already = get().timesheets.some(
          (t) => t.staffId === staffId && t.clientId === open.clientId && t.date === date && t.start === start,
        );
        const sheet: Timesheet | null = already
          ? null
          : {
              id: uid("t"),
              staffId,
              clientId: open.clientId,
              date,
              start,
              end: outAt,
              hours: hoursBetween(start, outAt),
              status: "draft",
            };
        set({
          checkins: get().checkins.map((c) => (c.id === open.id ? { ...c, outAt } : c)),
          shifts: get().shifts.map((s) =>
            s.staffId === staffId && s.clientId === open.clientId && s.day === todayLabel && s.status === "in_progress"
              ? { ...s, status: "complete" }
              : s,
          ),
          timesheets: sheet ? [sheet, ...get().timesheets] : get().timesheets,
        });
      },
      completeTask: (id) => {
        const tasks = get().onboarding.map((t) => (t.id === id ? { ...t, status: "done" as const } : t));
        const task = get().onboarding.find((t) => t.id === id);
        let clients = get().clients;
        if (task?.subjectType === "client") {
          const pending = tasks.filter(
            (t) => t.subjectType === "client" && t.subjectId === task.subjectId && t.status === "pending",
          );
          if (pending.length === 0) {
            clients = clients.map((c) => (c.id === task.subjectId ? { ...c, status: "active" as const } : c));
          }
        }
        set({ onboarding: tasks, clients });
      },
      addRequest: (r) => {
        const id = uid("rq");
        set({ requests: [{ ...r, id }, ...get().requests] });
        return id;
      },
      setRequestStatus: (id, status) =>
        set({ requests: get().requests.map((r) => (r.id === id ? { ...r, status } : r)) }),
      addCarePlan: (p) => {
        const id = uid("cp");
        set({ carePlans: [{ id, ...p }, ...get().carePlans] });
        return id;
      },
      assignStaff: (clientId, staffId) => {
        if (!clientId || !staffId) return;
        set({
          clients: get().clients.map((c) =>
            c.id === clientId && !c.staffIds.includes(staffId) ? { ...c, staffIds: [...c.staffIds, staffId] } : c,
          ),
        });
      },
      setStaffStatus: (id, status) =>
        set({ staff: get().staff.map((s) => (s.id === id ? { ...s, status } : s)) }),
      setTrainingStatus: (id, status) =>
        set({ training: get().training.map((t) => (t.id === id ? { ...t, status } : t)) }),
      addInvoice: (i) => {
        const id = uid("inv");
        const number = i.number ?? `INV-${1047 + get().invoices.length}`;
        set({ invoices: [{ ...i, id, number }, ...get().invoices] });
        return id;
      },
      attachApprovedHours: (invoiceId) => {
        const inv = get().invoices.find((i) => i.id === invoiceId);
        if (!inv) return 0;
        const claimed = new Set(get().invoices.flatMap((i) => i.timesheetIds));
        const extra = get().timesheets.filter(
          (t) => t.clientId === inv.clientId && t.status === "approved" && !claimed.has(t.id),
        );
        if (extra.length === 0) return 0;
        const add = extra.reduce((sum, t) => sum + t.hours * 67, 0);
        set({
          invoices: get().invoices.map((i) =>
            i.id === invoiceId
              ? { ...i, timesheetIds: [...i.timesheetIds, ...extra.map((t) => t.id)], amount: i.amount + add }
              : i,
          ),
        });
        return extra.length;
      },
      addShift: (s) => {
        const id = uid("sh");
        const next: Shift = { id, status: "scheduled", ...s };
        set({
          shifts: [...get().shifts.filter((x) => !(x.staffId === s.staffId && x.day === s.day && x.window === s.window)), next],
        });
        return id;
      },
      setCarePlanStatus: (id, status) =>
        set({ carePlans: get().carePlans.map((p) => (p.id === id ? { ...p, status } : p)) }),
      setClientRisk: (id, risk) => set({ clients: get().clients.map((c) => (c.id === id ? { ...c, risk } : c)) }),
      setOrg: (patch) => set({ org: { ...(get().org ?? seed.org), ...patch } }),
      reset: () => set({ ...seed, hydrated: true }),
    }),
    {
      name: "cc-platform-db-v23",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({
        staff: s.staff,
        clients: s.clients,
        notes: s.notes,
        incidents: s.incidents,
        timesheets: s.timesheets,
        invoices: s.invoices,
        shifts: s.shifts,
        carePlans: s.carePlans,
        training: s.training,
        onboarding: s.onboarding,
        requests: s.requests,
        checkins: s.checkins,
        org: s.org,
      }),
    },
  ),
);

export function staffById(id: string) {
  return useCC.getState().staff.find((s) => s.id === id);
}
export function clientById(id: string) {
  return useCC.getState().clients.find((c) => c.id === id);
}
