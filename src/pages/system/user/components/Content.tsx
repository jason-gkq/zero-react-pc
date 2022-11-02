import React, { useEffect, useMemo, useState } from "react";
import { ProCard } from "@ant-design/pro-components";
import { getTreeselect } from "../service";
import type {
  IDeptTreeList,
  IDeptTreeData,
  IResGetTreeselect,
} from "../service/index.d";

import Treeselect from "./Treeselect";
import TableList from "./TableList";

export default () => {
  const [deptId, setDeptId] = useState<number>();
  const [deptTreeData, setDeptTreeData] = useState<IDeptTreeData[]>([]);
  const [deptTreeList, setDeptTreeList] = useState<IDeptTreeList[]>([]);
  const [deptIds, setDeptIds] = useState<number[]>([]);

  const onSelect = useMemo(() => (dId: number) => setDeptId(dId), []);

  useEffect(() => {
    getTreeselect()
      .then(({ data }: { data: IResGetTreeselect[] }) => {
        const treeList: IDeptTreeList[] = [];
        const defaultKdys: number[] = [];
        const getTreeData = (data: IResGetTreeselect[], pIds: number[]) => {
          return data.reduce((list: any, item: IResGetTreeselect) => {
            treeList.push({ key: item.id, title: item.label, parentIds: pIds });
            defaultKdys.push(item.id);
            if (Reflect.has(item, "children")) {
              list.push({
                key: item.id,
                value: item.id,
                title: item.label,
                parentIds: pIds,
                children: getTreeData((item as any).children, [
                  ...pIds,
                  item.id,
                ]),
              });
            } else {
              list.push({
                key: item.id,
                value: item.id,
                title: item.label,
                parentIds: pIds,
              });
            }
            return list;
          }, []);
        };
        const treeData = getTreeData(data, []);
        setDeptTreeData(treeData);
        setDeptTreeList(treeList);
        setDeptIds(defaultKdys);
      })
      .catch((e) => {});
  }, []);

  return (
    <ProCard split="vertical">
      <ProCard colSpan="23%">
        {useMemo(
          () => (
            <Treeselect
              onSelect={onSelect}
              deptId={deptId}
              deptTreeData={deptTreeData}
              deptTreeList={deptTreeList}
              deptIds={deptIds}
            />
          ),
          [deptId, deptTreeData, deptTreeList, deptIds]
        )}
      </ProCard>
      <ProCard>
        {useMemo(
          () => (
            <TableList deptId={deptId} deptTreeData={deptTreeData} />
          ),
          [deptTreeData, deptId]
        )}
      </ProCard>
    </ProCard>
  );
};
