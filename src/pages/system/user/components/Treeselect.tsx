import React, { useEffect, useState, useMemo } from "react";
import { Tree, Input } from "antd";
import type { IDeptTreeList, IDeptTreeData } from "../service/index.d";

type IProps = {
  onSelect: Function;
  deptTreeData: IDeptTreeData[];
  deptTreeList: IDeptTreeList[];
  deptIds: number[];
  deptId?: number;
};

export default (props: IProps) => {
  const { onSelect, deptTreeData, deptTreeList, deptIds } = props;
  const [expandedKeys, setExpandedKeys] = useState<number[]>(deptIds || []);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const [searchValue, setSearchValue] = useState<string>("");
  let timer: any;

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);
  useEffect(() => {
    setExpandedKeys(deptIds);
  }, [deptIds]);

  const [onExpand, onChange, loop] = useMemo<[any, any, any]>(() => {
    const onExpand = (expandedKeys: number[]) => {
      setExpandedKeys(expandedKeys);
      setAutoExpandParent(false);
    };

    const onChange = ({ target }: any) => {
      const { value } = target;
      if (!value) {
        setSearchValue(value);
        return;
      }
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        const expandedKeys = deptTreeList
          .map((item: IDeptTreeList) => {
            if (item.title.indexOf(value) > -1) {
              return item.parentIds;
            }
            return null;
          })
          .filter(Boolean)
          .flat();

        setSearchValue(value);
        setExpandedKeys(expandedKeys as never[]);
      }, 300);
    };
    const loop = (data: IDeptTreeData[]): any => {
      if (!data) {
        return [];
      }
      const ids: number[] = [];
      const rel = data.map((item: IDeptTreeData) => {
        ids.push(item.key);
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return {
            title,
            key: item.key,
            parentIds: item.parentIds,
            children: loop(item.children),
          };
        }

        return {
          title,
          key: item.key,
          parentIds: item.parentIds,
        };
      });
      // setExpandedKeys(ids);
      return rel;
    };
    return [onExpand, onChange, loop];
  }, [searchValue, expandedKeys]);

  return (
    <div style={{ minHeight: "80vh" }}>
      <Input.Search placeholder="请输入名称" onChange={onChange} />
      <Tree
        onExpand={onExpand}
        // defaultExpandAll
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onSelect={(selectedKeys, info) => {
          onSelect(...selectedKeys);
        }}
        treeData={loop(deptTreeData)}
        // treeData={treeData}
      />
    </div>
  );
};
