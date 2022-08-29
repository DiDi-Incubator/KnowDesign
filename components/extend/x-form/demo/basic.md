---
order: 0
title: 基本
---
``` tsx
import React, { useState } from "react";
import { Form, DatePicker, XForm, FormItemType } from "knowdesign";

const Demo = () => {
  const [form] = Form.useForm();
  const initFormData = {
    identifier: "",
    name: "",
    cabinet: "",
    cabinet_location: "",
    place: "",
    layout: "",
    price: "",
    unit: "",
    business: "",
    system: "",
    device_ip: "",
    offering: "",
    serial_num: "",
    typ: "",
    model: "",
    enabled_at_stamp: "",
    warranted_at_stamp: "",
    manufacturer: "",
    supplier: "",
    supplier_phone: "",
    spare_phone: "",
    service_life: "",
    comment: "",
  };

  const options = {
    cabinet: [], // 所属机柜
    cabinet_location: [], // 机柜位置
    place: [], // 放置地点
    layout: [], // 设备布局
    business: [], // 所属业务
    system: [], // 所属系统
    offering: [], // 硬件配置信息
    device_type: [], // 设备类型
    model: [], // 型号
    service_life: [], // 使用寿命
    supplier: [], // 供应商
    manufacturer: [], // 生产厂商
  };
  const getFormMap = () => {
    return [
      {
        key: "name",
        label: "设备名称",
        colSpan: 24,
        attrs: {
          placeholder: "请输入设备名称",
          maxLength: 32,
        },
        rules: [
          {
            required: true,
            message: "请输入设备名称",
          },
        ],
      },
      {
        key: "identifier",
        label: "设备编号",
        attrs: {
          placeholder: "请输入设备编号",
          maxLength: 32,
        },
        rules: [
          {
            required: true,
            message: "请输入设备编号",
          },
        ],
      },
      {
        key: "cabinet",
        label: "所属机柜",
        type: 'autoComplete',
        options: options.cabinet,
        attrs: {
          // showSearch: true,
          placeholder: "请输入或选择所属机柜",
        },
      },
      {
        key: "cabinet_location",
        label: "机柜位置",
        type: 'autoComplete',
        options: options.cabinet_location,
        attrs: {
          // showSearch: true,
          placeholder: "请输入或选择机柜位置",
        },
      },
      {
        key: "place",
        label: "放置地点",
        type: 'autoComplete',
        options: options.place,
        attrs: {
          // showSearch: true,
          placeholder: "请输入或选择放置地点",
        },
      },
      {
        key: "layout",
        label: "设备布局",
        type: 'autoComplete',
        options: options.layout,
        attrs: {
          // showSearch: true,
          placeholder: "请输入或选择设备布局",
        },
      },
      {
        key: "price",
        label: "单价",
        attrs: {
          placeholder: "请输入单价",
          suffix: "元",
          maxLength: 32,
        },
        rules: [
          {
            required: true,
            message: "请输入单价",
          },
        ],
      },
      {
        key: "unit",
        label: "单位",
        attrs: {
          placeholder: "请输入单位",
          maxLength: 4,
        },
        rules: [
          {
            required: true,
            message: "请输入单位",
          },
        ],
      },
      {
        key: "business",
        label: "所属业务",
        type: 'autoComplete',
        options: options.business,
        attrs: {
          // showSearch: true,
          placeholder: "请选择所属业务",
        },
        rules: [
          {
            required: true,
            message: "请选择所属业务",
          },
        ],
      },
      {
        key: "system",
        label: "所属分系统",
        type: 'autoComplete',
        options: options.system,
        attrs: {
          // showSearch: true,
          placeholder: "请选择所属分系统",
        },
        rules: [
          {
            required: true,
            message: "请选择所属分系统",
          },
        ],
      },
      {
        key: "typ",
        label: "设备类型",
        type: 'autoComplete',
        options: options.device_type,
        attrs: {
          // showSearch: true,
          placeholder: "请选择设备类型",
        },
        rules: [
          {
            required: true,
            message: "请选择设备类型",
          },
        ],
      },
      {
        key: "model",
        label: "设备型号",
        type: 'autoComplete',
        options: options.model,
        attrs: {
          // showSearch: true,
          placeholder: "请选择设备型号",
        },
        rules: [
          {
            required: true,
            message: "请选择设备型号",
          },
        ],
      },
      {
        key: "offering",
        label: "硬件配置信息",
        type: 'autoComplete',
        options: options.offering,
        attrs: {
          showSearch: true,
          placeholder: "请选择硬件配置信息",
        },
      },
      {
        key: "serial_num",
        label: "设备序列号",
        attrs: {
          maxLength: 40,
          placeholder: "请输入设备序列号",
        },
        rules: [
          {
            required: true,
            message: "请输入设备序列号",
          },
        ],
      },
      {
        key: "device_ip",
        label: "设备IP",
        attrs: {
          maxLength: 40,
          placeholder: "请输入设备IP",
        },
        rules: [
          {
            required: true,
            message: "请输入设备IP",
          },
        ],
      },
      {
        key: "manufacturer",
        label: "生产厂商",
        type: 'autoComplete',
        options: options.manufacturer,
        attrs: {
          // showSearch: true,
          placeholder: "请输入或选择生产厂商",
        },
        rules: [
          {
            required: true,
            message: "请输入或选择生产厂商",
          },
        ],
      },
      {
        key: "supplier",
        label: "供应商",
        type: 'autoComplete',
        options: options.supplier,
        attrs: {
          // showSearch: true,
          placeholder: "请选择供应商",
        },
        rules: [
          {
            required: true,
            message: "请选择供应商",
          },
        ],
      },
      {
        key: "supplier_phone",
        label: "供应商联系方式",
        attrs: {
          maxLength: 40,
          placeholder: "请输入供应商联系方式",
        },
        rules: [
          {
            required: true,
            message: "请输入供应商联系方式",
          },
        ],
      },
      {
        key: "spare_phone",
        label: "维保电话",
        attrs: {
          maxLength: 40,
          placeholder: "请输入维保电话",
        },
        rules: [
          {
            required: true,
            message: "请输入维保电话",
          },
        ],
      },
      {
        key: "service_life",
        label: "使用寿命",
        attrs: {
          placeholder: "请输入使用寿命，单位不限（年、月、日）",
        },
        rules: [
          {
            required: true,
            message: "请输入维保电话",
          },
        ],
      },
      {
        key: "enabled_at_stamp",
        type: 'custom',
        customFormItem: (
          <DatePicker placeholder="请选择启用时间" format="YYYY-MM-DD" />
        ),
        label: "启用日期",
        attrs: {
          placeholder: "请选择启用日期",
        },
        rules: [
          {
            required: true,
            message: "请选择启用日期",
          },
        ],
      },
      {
        key: "warranted_at_stamp",
        type: 'custom',
        customFormItem: (
          <DatePicker placeholder="请选择启用时间" format="YYYY-MM-DD" />
        ),
        label: "过保日期",
        attrs: {
          placeholder: "请选择过保日期",
        },
        rules: [
          {
            required: true,
            message: "请选择过保日期",
          },
        ],
      },
      {
        key: "comment",
        colSpan: 12,
        type: 'textArea',
        attrs: {
          placeholder: "请输入备注",
          maxLength: 256,
        },
        label: "备注",
      },
    ];
  };
  const [formData, setFormData] = useState(initFormData);

  return (
    <XForm
      form={form}
      formData={formData}
      formMap={getFormMap()}
      layout="horizontal"
    />
  );
};


ReactDOM.render(
  <Demo />,
  mountNode
)

```