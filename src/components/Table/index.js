import { Table } from 'antd';
import React from 'react'
import { useSelector } from "react-redux";

const columns = [
  {
    title: 'Question',
    dataIndex: 'que',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the que started with `value`
    onFilter: (value, record) => record.que.indexOf(value) === 0,
    sorter: (a, b) => a.que.length - b.que.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Answer',
    dataIndex: 'ans',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.ans.indexOf(value) === 0,
    sorter: (a, b) => a.ans.length - b.ans.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Events',
    dataIndex: 'events',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the events started with `value`
    onFilter: (value, record) => record.events.indexOf(value) === 0,
    sorter: (a, b) => a.events.length - b.events.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Small Talks',
    dataIndex: 'talks',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the talks started with `value`
    onFilter: (value, record) => record.talks.indexOf(value) === 0,
    sorter: (a, b) => a.talks.length - b.talks.length,
    sortDirections: ['descend'],
  },
];



function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

function TableConponemt() {
  const knowledges = useSelector(state => state.knowledgeBase.knowledges);
  console.log('list', knowledges)
  return (
    <div>
      <Table columns={columns} dataSource={knowledges} onChange={onChange} />
    </div>
  )
}


export default TableConponemt
