import { List01 } from "./list01";
import { List02 } from "./list02";
import { List03 } from "./list03";

export function Content() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      data-oid="o_l1t8z"
    >
      <div className="md:col-span-2 lg:col-span-1" data-oid="09sg23f">
        <List01 data-oid="lijgpp6" />
      </div>
      <div className="md:col-span-2 lg:col-span-1" data-oid="4vceo77">
        <List02 data-oid="2tqwiri" />
      </div>
      <div className="md:col-span-2 lg:col-span-1" data-oid="6ukoba.">
        <List03 data-oid="hd-wr6j" />
      </div>
    </div>
  );
}
