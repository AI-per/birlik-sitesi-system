import { List01 } from "./list01";
import { List02 } from "./list02";
import { List03 } from "./list03";

export function Content() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      data-oid="k2ng03h"
    >
      <div className="md:col-span-2 lg:col-span-1" data-oid="on:yf-2">
        <List01 data-oid="blxhh93" />
      </div>
      <div className="md:col-span-2 lg:col-span-1" data-oid="8sq172w">
        <List02 data-oid="4ea4y22" />
      </div>
      <div className="md:col-span-2 lg:col-span-1" data-oid="sdmy1vi">
        <List03 data-oid="9ty.5ag" />
      </div>
    </div>
  );
}
