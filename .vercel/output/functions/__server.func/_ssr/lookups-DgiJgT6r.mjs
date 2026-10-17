import { f as useCC } from "./router-N5Xx92G4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lookups-DgiJgT6r.js
function useLookups() {
	const db = useCC();
	const staffName = (id) => db.staff.find((s) => s.id === id)?.name ?? "Unknown staff";
	const clientName = (id) => db.clients.find((c) => c.id === id)?.name ?? "Unknown client";
	return {
		...db,
		staffName,
		clientName
	};
}
//#endregion
export { useLookups as t };
