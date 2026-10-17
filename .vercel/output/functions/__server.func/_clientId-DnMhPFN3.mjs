import { w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { s as Route$18 } from "./_ssr/router-N5Xx92G4.mjs";
import { i as ClientDetailScreen } from "./_ssr/screens-CBKYgEOY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_clientId-DnMhPFN3.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function ClientRoute() {
	const { clientId } = Route$18.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientDetailScreen, { clientId });
};
//#endregion
export { SplitComponent as component };
