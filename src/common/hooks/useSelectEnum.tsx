import React from "react";
import { Select } from "antd";
const { Option } = Select;

export interface IUseSelectEnum {
  getData: Function;
  getEnum: Function;
  getOptions: Function;
  getLabel: Function;
  getKey: Function;
}

/**
 * getEnum
 * getOptions
 * getLabel
 */
export default (data: any[], key: string, label: string): IUseSelectEnum => {
  const getData = () => {
    return data;
  };

  /**
   * 仅用于列表中枚举 ProTable valueEnum
   * 单条数据组装
   * getEnum() 返回格式：{ '0': {text: '停用'}, '1': {text: '启用'} }
   * getEnum({'0': 'Error', '1': 'Success'}) 返回格式：{ '0': {text: '停用', status: 'Error'}, '1': {text: '启用', status: 'Success'} }
   * @param dictType
   * @returns
   */
  const getEnum = (status?: { [key: string]: string }) => {
    if (!data) {
      return {};
    }
    let groups = {};
    data.reduce((groups: any, item: any) => {
      if (status && status[item[key]]) {
        groups[item[key]] = {
          text: String(item[label]),
          status: status[item[key]],
        };
      } else {
        groups[item[key]] = { text: String(item[label]) };
      }
      return groups;
    }, groups);
    return groups;
  };

  /**
   * 单条数据组装，只针对 Select
   * 返回格式：[<Option key="0" >停用</Option>, <Option key="1">启用</Option>]
   * @param dictType
   * @returns
   */
  const getOptions = () => {
    if (!data) {
      return [];
    }
    const chldrens: React.ReactNode[] = [];
    data.forEach((item: any) => {
      chldrens.push(<Option key={item[key]}>{item[label]}</Option>);
    });
    return chldrens;
  };
  /**
   * 获取数据的单个节点名称
   * getLabel('1')  =>  "启用"
   * getLabel('0')  =>  "停用"
   * @param dictType
   * @returns
   */
  const getLabel = (value: string | number): string | number => {
    if (!data) {
      return value;
    }

    let labelName;
    data.forEach((element: any) => {
      if (String(element[key]) == String(value)) {
        labelName = element[label];
      }
    });
    return labelName || value;
  };
  /**
   * 获取数据的单个节点名称
   * getKey('启用')  =>  1
   * getLabel('停用')  =>  0
   * @param dictType
   * @returns
   */
  const getKey = (value: string | number): string | number => {
    if (!data) {
      return value;
    }

    let keyValue;
    data.forEach((element: any) => {
      if (String(element[label]) == String(value)) {
        keyValue = element[key];
      }
    });
    return keyValue || value;
  };
  return { getData, getEnum, getOptions, getLabel, getKey };
};
