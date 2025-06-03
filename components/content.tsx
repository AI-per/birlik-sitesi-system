import { List01 } from "./list01";
import { List02 } from "./list02";
import { List03 } from "./list03";

export function Content() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      data-oid="yka235h"
    >
      <div className="md:col-span-2 lg:col-span-1" data-oid="f.wfj9j">
        <List01 data-oid="3e9_thk" />
      </div>
      <div className="md:col-span-2 lg:col-span-1" data-oid="pd786vw">
        <List02 data-oid="rpnr4e1" />
      </div>
      <div className="md:col-span-2 lg:col-span-1" data-oid="sfgdaz-">
        <List03 data-oid="e5btg7l" />
      </div>
    </div>
  );
}
