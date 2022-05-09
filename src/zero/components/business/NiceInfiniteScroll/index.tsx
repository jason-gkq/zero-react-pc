/**
 * InfiniteScroll：
 * https://ant.design/components/list-cn/
 * 使用示例：
 *
 * const ref: any = useRef(); // ref.current.scrollToTop(); 滚动条回到顶部
 * const [data, setData] = useState([]);
 * const [loading, setLoading] = useState(false);
 * const [hasMore, setHasMore] = useState(true);
 * const [startId, setStartId] = useState<string>("");
 * const [pageSize, setPageSize] = useState<number>(10);
 *
 * const loadMoreData = async (params: any, flag: boolean = false) => {
 *   if (loading) {
 *     return;
 *   }
 *   setLoading(true);
 *   if (!flag && params ) {
 *     Object.assign(params, {
 *       startId,
 *     });
 *   }
 *   const { list } = await queryGroupList({
 *     ...params,
 *   });
 *   if (!list) {
 *     setHasMore(false);
 *     setLoading(false);
 *     return;
 *   }
 *   setStartId(list[list.length - 1]["id"]);
 *   setHasMore(!(list.length < pageSize));
 *   if (flag) {
 *     setData(list);
 *   } else {
 *     setData([...data, ...list]);
 *   }
 *   setLoading(false);
 * };
 *
 * <NiceInfiniteScroll
 *   next={() => {
 *     loadMoreData(searchReq);
 *   }}
 *   dataLength={data.length}
 *   hasMore={hasMore}
 *   ref={ref}
 * >
 *   <Table
 *     columns={columns}
 *     rowKey={"id"}
 *     pagination={false}
 *     dataSource={data}
 *     search={false}
 *   />
 * </NiceInfiniteScroll>
 *
 * <NiceInfiniteScroll
 *   next={() => {
 *     loadMoreData(searchReq);
 *   }}
 *   dataLength={data.length}
 *   hasMore={hasMore}
 *   ref={ref}
 * >
 *   <ProTable
 *     columns={columns}
 *     rowKey={"id"}
 *     pagination={false}
 *     dataSource={data}
 *     search={false}
 *   />
 * </NiceInfiniteScroll>
 *
 * <NiceInfiniteScroll
 *   next={() => {
 *     loadMoreData(searchReq);
 *   }}
 *   dataLength={data.length}
 *   hasMore={hasMore}
 *   ref={ref}
 * >
 *   <List
 *     columns={columns}
 *     rowKey={"id"}
 *     dataSource={data}
 *     search={false}
 *   />
 * </NiceInfiniteScroll>
 */

import React, { useRef, LegacyRef, useMemo, useImperativeHandle } from "react";
import { Skeleton, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

import "./index.less";

/**
 * 滚动条滚动加载更多数据
 * next：加载下一页时会自动调用该方法
 * dataLength：数据长度
 * children：展示区域内容，可以是table|list
 * hasMore：是否需要加载下一页，false时不在触发 next方法
 */
export default React.forwardRef((props: Record<string, any>, ref) => {
  const scrollRef: any = useRef() as LegacyRef<InfiniteScroll>;
  const containerRef: any = useRef();
  const { next, dataLength, children, hasMore } = props;
  const scrollToTop = useMemo(() => {
    return () => {
      containerRef.current.scrollTo(0, scrollRef.current.offsetTop || 0);
    };
  }, [containerRef, scrollRef]);
  //用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(ref, () => {
    // 需要将暴露的接口返回出去
    return {
      scrollToTop,
    };
  });
  return (
    <div
      id='scrollableDiv'
      className='search-result-list'
      style={{
        height: "90vh",
        overflow: "auto",
      }}
      ref={containerRef}
    >
      <InfiniteScroll
        dataLength={dataLength}
        next={next}
        hasMore={hasMore}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget='scrollableDiv'
        ref={scrollRef}
      >
        {children}
      </InfiniteScroll>
    </div>
  );
});
