import React, { useEffect, useState } from "react";
import { Collapse, Tag } from "antd";
import { listNotice } from "../service";
import { IResQueryNoticeList } from "../service/index.d";
import "../index.less";

const { Panel } = Collapse;

export default () => {
  const [notices, setNotices] = useState<IResQueryNoticeList[]>([]);
  useEffect(() => {
    const getNotices = async () => {
      const { rows } = await listNotice();
      setNotices(rows);
    };
    getNotices();
  }, []);
  return (
    <>
      <div className="app-container">
        <div className="title">系统公告:</div>
        {notices.length ? (
          <Collapse ghost>
            {notices.map((item) => {
              return (
                <Panel
                  key={item.noticeId}
                  header={item.createTime + "  " + item.noticeTitle}
                >
                  <Tag color="success">{item.createBy}</Tag>
                  <Tag color="processing">{item.createTime}</Tag>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: item.noticeContent }}
                  ></div>
                </Panel>
              );
            })}
          </Collapse>
        ) : (
          <div className="empty">暂无公告</div>
        )}
      </div>
    </>
  );
};
