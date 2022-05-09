/**
 * 使用示例：
 *
 * import React, { useState } from "react";
 * import { NiceInfiniteScrollTable } from "@/zero/components";
 * import { queryGroupList } from "../service";
 * import type { IResPushpro, IReqPushpro } from "../service/index.d";
 * import { dateFormat } from "@/zero/utils";
 * import useColumns from "../hooks/useColumns";
 *
 * const pageSize = 10;
 *
 * export default ({ dictPushProSource, getDictData }: any) => {
 *
 *   const columns = useColumns(showModal, dictPushProSource);
 *   const [startId, setStartId] = useState<string>("");
 *
 *   const loadMoreData = async (params: IReqPushpro, actionType: string) => {
 *     const { createTime, ...restParams } = params as any;
 *     Object.assign(restParams, {
 *       createTimeStart: dateFormat("YYYY-mm-dd", createTime[0]) + " 00:00:00",
 *       createTimeEnd: dateFormat("YYYY-mm-dd", createTime[1]) + " 23:59:59",
 *     });
 *     if (actionType === "scroll") {
 *       Object.assign(restParams, {
 *         startId,
 *       });
 *     }
 *     const { list } = await queryGroupList({
 *       sort: "DESC",
 *       orderBy: "createTime",
 *       pageSize,
 *       ...restParams,
 *     });
 *     if (list) {
 *       setStartId(list[list.length - 1]["id"]);
 *     }
 *     return {
 *       data: list,
 *       hasMore: !(list.length < pageSize),
 *     };
 *   };
 *
 *   return (
 *     <>
 *       <NiceInfiniteScrollTable<IResPushpro>
 *         columns={columns}
 *         rowKey={"id"}
 *         pagination={{
 *           defaultPageSize: pageSize,
 *         }}
 *         loadMoreData={loadMoreData}
 *       />
 *     </>
 *   );
 * };
 *
 */
import React, { useRef, LegacyRef, useState, useEffect, useMemo } from "react";
import ProTable from "@ant-design/pro-table";
import { Skeleton, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import type { ProFormInstance } from "@ant-design/pro-form";
import type { ProTableProps } from "@ant-design/pro-table";
import type { ParamsType } from "@ant-design/pro-provider";
import { BetaSchemaForm } from "@ant-design/pro-form";
import "./index.less";

type DataItem = {
  name: string;
  state: string;
};

/**
 * 继承ProTableProps并且添加参数loadMoreData
 */
type IProps<T, U, ValueType = "text"> = ProTableProps<T, U, ValueType> & {
  loadMoreData: (
    payload: Record<string, any>,
    actionType: "init" | "scroll" | "search"
  ) => Promise<{
    data: any[];
    hasMore?: boolean;
    reset?: boolean;
  }>;
};

// interface IProps<T, U, ValueType> extends ProTableProps<T, U, ValueType> {
//   loadMoreData: Function,
//   pageSize: number,
//   startKey: string,
//   [key : string]: any,
// }

/**
 * 参数：
 * loadMoreData 获取数据方法
 *  请求参数：
 *    payload：搜索表单中数据，是采用 ProTable 表单，但是如果是 dateRange 则返回是数组，自行处理
 *    actionType：操作类型 "init" 初始化 | "scroll" 滚动条触发 | "search" 点击搜索按钮触发
 *  返回Promise
 *    data：是数据数组
 *    hasMore：是否有下一页请求，如果不返还则和defaultPageSize对比，小于defaultPageSize则没有下一页
 *    reset：是否重置数据，比如点击搜索或者页面初始化时候，会清空当前数据从第一页请求
 * 其他参数参考：https://procomponents.ant.design/components/table/?current=1&pageSize=5
 * 滚动列表是滚动条和搜索触发加载更多数据，所以在使用时候 ProTable 的分页会被禁掉
 * 而且使用loadMoreData获取列表数据放入dataSource，所以无需定义request
 */
export default <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = "text"
>(
  props: IProps<DataType, Params, ValueType>
) => {
  const scrollRef: any = useRef() as LegacyRef<InfiniteScroll>;
  const containerRef: any = useRef();
  const formRef: any = useRef<ProFormInstance>();

  const { loadMoreData, params, pagination, columns, ...restProps } = props;
  const { defaultPageSize = 10 } = pagination || {};

  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { formColumns, tableColumns } = useMemo(() => {
    const formColumns: any = [];
    const tableColumns: any = [];
    columns?.forEach((item) => {
      if (!Reflect.has(item, "hideInTable") || !item.hideInTable) {
        tableColumns.push(item);
      }
      if (!Reflect.has(item, "hideInSearch") || !item.hideInSearch) {
        formColumns.push(item);
      }
    });
    return { formColumns, tableColumns };
  }, [columns]);

  const defaultProps = {
    pagination: false,
    onRequestError: (error: any) => {
      console.error(error);
    },
    options: false,
    search: false,
    defaultSize: "small",
    dateFormatter: "string",
    columns: tableColumns,
    dataSource: data,
    ...restProps,
  } as ProTableProps<DataType, Params, ValueType>;

  const next = useMemo(() => {
    const next = async (
      actionType: "init" | "scroll" | "search" = "scroll"
    ) => {
      if (loading) {
        return;
      }
      setLoading(true);
      const { data: resData, ...restRes } = await loadMoreData(
        formRef.current.getFieldsValue(),
        actionType
      );
      if (!resData) {
        setHasMore(false);
        setLoading(false);
        return;
      }
      if (Reflect.has(restRes, "hasMore")) {
        setHasMore(!!restRes.hasMore);
      } else {
        setHasMore(!(resData.length < defaultPageSize));
      }

      if (Reflect.has(restRes, "reset")) {
        if (restRes.reset) {
          containerRef.current.scrollTo(0, scrollRef.current.offsetTop || 0);
          setData(resData);
        } else {
          setData([...data, ...resData]);
        }
      } else {
        if (actionType !== "scroll") {
          containerRef.current.scrollTo(0, scrollRef.current.offsetTop || 0);
          setData(resData);
        } else {
          setData([...data, ...resData]);
        }
      }
      setLoading(false);
    };
    return next;
  }, [
    loading,
    setLoading,
    defaultPageSize,
    data,
    formRef,
    scrollRef,
    containerRef,
  ]);

  useEffect(() => {
    next("init");
  }, []);

  return (
    <>
      <div className='search-form'>
        <BetaSchemaForm<DataItem>
          layoutType={"QueryFilter"}
          // rowProps={{
          //   gutter: [16, 16],
          // } as any}
          // grid={false}
          onFinish={async (values: any) => {
            setHasMore(true);
            next("search");
          }}
          formRef={formRef}
          columns={formColumns}
          defaultCollapsed={false}
        />
      </div>
      <div
        id='scrollableDiv'
        className='search-result-list'
        style={{
          height: "58vh",
          overflow: "auto",
        }}
        ref={containerRef}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={next}
          hasMore={hasMore}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget='scrollableDiv'
          ref={scrollRef}
        >
          <ProTable<DataType, Params, ValueType> {...defaultProps} />
        </InfiniteScroll>
      </div>
    </>
  );
};
