import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session } from "./types";
import { CLIENT_PORTAL, accounts } from "./seed";
import { homeFor } from "./nav";
import { useCC } from "./store";

const KEY = "cc-platform-session-v21";
const Ctx = createContext<{
  session: Session | null;
  ready: boolean;
  login: (s: Session) => void;
  logout: () => void;
} | null>(null);

function load(): Session | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(load());
    void useCC.persist.rehydrate();
    useCC.getState().setHydrated(true);
    setReady(true);
  }, []);

  const value = useMemo(
    () => ({
      session,
      ready,
      login: (s: Session) => {
        try {
          localStorage.setItem(KEY, JSON.stringify(s));
        } catch {
          /* storage can be blocked in an embedded preview; the in-memory session still signs them in */
        }
        setSession(s);
        const to = homeFor(s.role);
        window.location.assign(to);
      },
      logout: () => {
        try {
          localStorage.removeItem(KEY);
        } catch {
          /* ignore */
        }
        setSession(null);
        window.location.assign("/login");
      },
    }),
    [session, ready],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSession() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSession must be inside SessionProvider");
  return ctx;
}

export function accountFor(email: string) {
  return accounts.find((a) => a.email === email.trim().toLowerCase());
}

export function portalAccount(username: string, code: string) {
  const user = username.trim().toLowerCase();
  const pin = code.trim();
  if (user === CLIENT_PORTAL.username && pin === CLIENT_PORTAL.accessCode) {
    return accounts.find((a) => a.role === "client");
  }
  return undefined;
}
