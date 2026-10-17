import { w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { r as Route$8 } from "./_ssr/router-N5Xx92G4.mjs";
import { O as StaffDetailScreen } from "./_ssr/screens-CBKYgEOY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_staffId-Cf_i-PZz.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function StaffRoute() {
	const { staffId } = Route$8.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffDetailScreen, { staffId });
};
//#endregion
export { SplitComponent as component };
