import { w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route$3 } from "./_ssr/router-N5Xx92G4.mjs";
import { M as TimesheetDetailScreen } from "./_ssr/screens-CBKYgEOY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_timesheetId-D_v9UfxQ.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function TimesheetRoute() {
	const { timesheetId } = Route$3.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimesheetDetailScreen, { timesheetId });
};
//#endregion
export { SplitComponent as component };
