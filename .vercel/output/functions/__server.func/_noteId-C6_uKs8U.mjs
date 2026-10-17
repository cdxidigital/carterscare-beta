import { w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as Route$20 } from "./_ssr/router-N5Xx92G4.mjs";
import { v as NoteDetailScreen } from "./_ssr/screens-CBKYgEOY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_noteId-C6_uKs8U.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function NoteRoute() {
	const { noteId } = Route$20.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteDetailScreen, { noteId });
};
//#endregion
export { SplitComponent as component };
