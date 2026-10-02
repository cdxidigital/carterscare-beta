import { w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route$3 } from "./_ssr/router-CrqVoe2c.mjs";
import { M as TimesheetDetailScreen } from "./_ssr/screens-BZI-udnl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_timesheetId-BJ71QJYZ.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function TimesheetRoute() {
	const { timesheetId } = Route$3.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimesheetDetailScreen, { timesheetId });
};
//#endregion
export { SplitComponent as component };
