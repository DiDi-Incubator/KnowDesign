/* eslint-disable react/no-multi-comp */
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Table from '..';
import Input from '../../input';
import Tooltip from '../../tooltip';
import Button from '../../button';
import Select from '../../select';
import Tree from '../../tree';
import ConfigProvider from '../../config-provider';
import Checkbox from '../../checkbox';
import Menu from '../../menu';

// https://github.com/Semantic-Org/Semantic-UI-React/blob/72c45080e4f20b531fda2e3e430e384083d6766b/test/specs/modules/Dropdown/Dropdown-test.js#L73
const nativeEvent = { nativeEvent: { stopImmediatePropagation: () => {} } };

describe('Table.filter', () => {
  window.requestAnimationFrame = callback => window.setTimeout(callback, 16);
  window.cancelAnimationFrame = window.clearTimeout;

  const filterFn = (value, record) => record.name.indexOf(value) !== -1;
  const column = {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      { text: 'Boy', value: 'boy' },
      { text: 'Girl', value: 'girl' },
      {
        text: 'Title',
        value: 'title',
        children: [
          { text: 'Designer', value: 'designer' },
          { text: 'Coder', value: 'coder' },
        ],
      },
    ],
    onFilter: filterFn,
  };

  const data = [
    { key: 0, name: 'Jack' },
    { key: 1, name: 'Lucy' },
    { key: 2, name: 'Tom' },
    { key: 3, name: 'Jerry' },
  ];

  const longData = [];
  for (let i = 0; i < 100; i += 1) {
    longData.push({
      key: i.toString(),
      name: 'name',
    });
  }

  function createTable(props) {
    return <Table columns={[column]} dataSource={data} pagination={false} {...props} />;
  }

  function renderedNames(wrapper) {
    return wrapper.find('BodyRow').map(row => row.props().record.name);
  }

  it('not show filter icon when undefined', () => {
    const noFilterColumn = { ...column, filters: undefined };
    delete noFilterColumn.onFilter;
    const wrapper = mount(
      createTable({
        columns: [noFilterColumn],
      }),
    );

    expect(wrapper.find('.ant-table-filter-column')).toHaveLength(0);
  });

  // https://github.com/ant-design/ant-design/issues/26988
  it('not show filter icon when filter and filterDropdown is undefined', () => {
    const noFilterColumn = { ...column, filters: undefined, filterDropdown: undefined };
    delete noFilterColumn.onFilter;
    const wrapper = mount(
      createTable({
        columns: [noFilterColumn],
      }),
    );

    expect(wrapper.find('.ant-table-filter-column')).toHaveLength(0);
  });

  it('renders filter correctly', () => {
    const wrapper = mount(createTable());

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders menu correctly', () => {
    const wrapper = mount(createTable());
    const dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(dropdownWrapper.render()).toMatchSnapshot();
  });

  it('renders empty menu correctly', () => {
    jest.useFakeTimers();

    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filters: [],
          },
        ],
      }),
    );
    wrapper.find('span.ant-dropdown-trigger').simulate('click', nativeEvent);
    act(() => {
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find('Empty').length).toBeTruthy();
    // eslint-disable-next-line no-console
    expect(console.error).not.toHaveBeenCalled();
    // eslint-disable-next-line no-console
    console.error.mockRestore();

    jest.useRealTimers();
  });

  it('renders radio filter correctly', () => {
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filterMultiple: false,
          },
        ],
      }),
    );
    const dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(dropdownWrapper.render()).toMatchSnapshot();
  });

  it('renders custom content correctly', () => {
    const filter = <div className="custom-filter-dropdown">custom filter</div>;
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filterDropdown: filter,
          },
        ],
      }),
    );

    const dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(dropdownWrapper.render()).toMatchSnapshot();
  });

  it('override custom filter correctly', () => {
    const filter = ({ prefixCls, setSelectedKeys, confirm, clearFilters }) => (
      <div className={`${prefixCls}-view`} id="customFilter">
        <span onClick={() => setSelectedKeys([42])} id="setSelectedKeys">
          setSelectedKeys
        </span>
        <span onClick={() => confirm()} id="confirm">
          Confirm
        </span>
        <span onClick={() => clearFilters()} id="reset">
          Reset
        </span>
        <span
          onClick={() => {
            setSelectedKeys([43]);
            confirm();
          }}
          id="simulateOnSelect"
        >
          SimulateOnSelect
        </span>
      </div>
    );

    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filterDropdown: filter,
          },
        ],
      }),
    );

    function getFilterMenu() {
      return wrapper.find('FilterDropdown');
    }

    // check if renderer well
    wrapper.find('span.ant-dropdown-trigger').simulate('click', nativeEvent);
    expect(wrapper.find('#customFilter')).toMatchSnapshot();

    // try to use reset btn
    expect(getFilterMenu().props().filterState.filteredKeys).toBeFalsy();
    wrapper.find('#setSelectedKeys').simulate('click');
    wrapper.find('#confirm').simulate('click');
    expect(getFilterMenu().props().filterState.filteredKeys).toEqual([42]);
    wrapper.find('#reset').simulate('click');
    wrapper.find('#confirm').simulate('click');
    expect(getFilterMenu().props().filterState.filteredKeys).toBeFalsy();

    // try to use confirm btn
    wrapper.find('span.ant-dropdown-trigger').simulate('click', nativeEvent);
    wrapper.find('#setSelectedKeys').simulate('click');
    expect(getFilterMenu().find('Dropdown').first().props().visible).toBeTruthy();
    wrapper.find('#confirm').simulate('click');
    expect(getFilterMenu().props().filterState.filteredKeys).toEqual([42]);
    expect(getFilterMenu().find('Dropdown').first().props().visible).toBeFalsy();

    // Simulate onSelect, setSelectedKeys & confirm
    wrapper.find('span.ant-dropdown-trigger').simulate('click', nativeEvent);
    wrapper.find('#simulateOnSelect').simulate('click');
    expect(getFilterMenu().props().filterState.filteredKeys).toEqual([43]);
  });

  it('can be controlled by filterDropdownVisible', () => {
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filterDropdownVisible: true,
          },
        ],
      }),
    );

    let dropdown = wrapper.find('Dropdown').first();
    expect(dropdown.props().visible).toBe(true);

    wrapper.setProps({
      columns: [
        {
          ...column,
          filterDropdownVisible: false,
        },
      ],
    });

    dropdown = wrapper.find('Dropdown').first();
    expect(dropdown.props().visible).toBe(false);
  });

  it('if the filter is visible it should ignore the selectedKeys changes', () => {
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filterDropdownVisible: true,
          },
        ],
      }),
    );

    expect(wrapper.find('FilterDropdown').props().filterState.filteredKeys).toBeFalsy();
    wrapper.find('FilterDropdown').find('input[type="checkbox"]').first().simulate('click');
    wrapper
      .find('FilterDropdown')
      .find('.ant-table-filter-dropdown-btns .ant-btn-primary')
      .simulate('click');
    expect(wrapper.find('FilterDropdown').props().filterState.filteredKeys).toEqual(['boy']);
    wrapper.setProps({ dataSource: [...data, { key: 999, name: 'Chris' }] });
    expect(wrapper.find('FilterDropdown').props().filterState.filteredKeys).toEqual(['boy']);
  });

  it('fires change event when visible change', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            onFilterDropdownVisibleChange: handleChange,
          },
        ],
      }),
    );

    wrapper.find('.ant-dropdown-trigger').first().simulate('click');

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('can be controlled by filteredValue', () => {
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filteredValue: ['Lucy'],
          },
        ],
      }),
    );

    expect(wrapper.find('tbody tr').length).toBe(1);
    wrapper.setProps({
      columns: [
        {
          ...column,
          filteredValue: [],
        },
      ],
    });
    expect(wrapper.find('tbody tr').length).toBe(4);
  });

  it('should handle filteredValue and non-array filterValue as expected', () => {
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filteredValue: ['Lucy', 12, true],
          },
        ],
      }),
    );
    function getFilterMenu() {
      return wrapper.find('FilterDropdown');
    }

    expect(getFilterMenu().props().filterState.filteredKeys).toEqual(['Lucy', '12', 'true']);

    wrapper.setProps({
      columns: [
        {
          ...column,
          filteredValue: null,
        },
      ],
    });
    expect(getFilterMenu().props().filterState.filteredKeys).toEqual(null);
  });

  it('can be controlled by filteredValue null', () => {
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filteredValue: ['Lucy'],
          },
        ],
      }),
    );

    expect(wrapper.find('tbody tr').length).toBe(1);
    wrapper.setProps({
      columns: [
        {
          ...column,
          filteredValue: null,
        },
      ],
    });
    expect(wrapper.find('tbody tr').length).toBe(4);
  });

  it('render checked of checkbox correctly controlled by filteredValue', () => {
    ['Lucy', 23, false].forEach(val => {
      const wrapper = mount(
        createTable({
          columns: [
            {
              ...column,
              filters: [{ text: val, value: val }],
              filteredValue: [val],
            },
          ],
        }),
      );

      wrapper.find('.ant-dropdown-trigger').first().simulate('click');

      expect(wrapper.find('FilterDropdown').find('Checkbox').at(0).props().checked).toEqual(true);
    });

    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filters: [{ text: 'ant', value: 'ant' }],
            filteredValue: ['any-value-not-exists-in-filters'],
          },
        ],
      }),
    );
    wrapper.find('.ant-dropdown-trigger').first().simulate('click');

    expect(wrapper.find('FilterDropdown').find('Checkbox').at(0).props().checked).toEqual(false);
  });

  it('can read defaults from defaultFilteredValue', () => {
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            defaultFilteredValue: ['Lucy'],
          },
        ],
      }),
    );
    expect(wrapper.find('tbody tr').length).toBe(1);
    expect(wrapper.find('tbody tr').text()).toBe('Lucy');

    // Should properly ignore further defaultFilteredValue changes
    wrapper.setProps({
      columns: [
        {
          ...column,
          defaultFilteredValue: [],
        },
      ],
    });
    expect(wrapper.find('tbody tr').length).toBe(1);
    expect(wrapper.find('tbody tr').text()).toBe('Lucy');

    // Should properly be overidden by non-null filteredValue
    wrapper.setProps({
      columns: [
        {
          ...column,
          defaultFilteredValue: ['Lucy'],
          filteredValue: ['Tom'],
        },
      ],
    });
    expect(wrapper.find('tbody tr').length).toBe(1);
    expect(wrapper.find('tbody tr').text()).toBe('Tom');

    // Should properly be overidden by a null filteredValue
    wrapper.setProps({
      columns: [
        {
          ...column,
          defaultFilteredValue: ['Lucy'],
          filteredValue: null,
        },
      ],
    });
    expect(wrapper.find('tbody tr').length).toBe(4);
  });

  it('fires change event', () => {
    const handleChange = jest.fn();
    const wrapper = mount(createTable({ onChange: handleChange }));
    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper.find('FilterDropdown').find('MenuItem').first().simulate('click');
    wrapper
      .find('FilterDropdown')
      .find('.ant-table-filter-dropdown-btns .ant-btn-primary')
      .simulate('click');
    expect(handleChange).toHaveBeenCalledWith(
      {},
      { name: ['boy'] },
      {},
      {
        currentDataSource: [],
        action: 'filter',
      },
    );
  });

  it('fires pagination change event', () => {
    const onPaginationChange = jest.fn();
    const wrapper = mount(createTable({ pagination: { onChange: onPaginationChange } }));
    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper.find('FilterDropdown').find('MenuItem').first().simulate('click');
    wrapper
      .find('FilterDropdown')
      .find('.ant-table-filter-dropdown-btns .ant-btn-primary')
      .simulate('click');

    expect(onPaginationChange).toHaveBeenCalledWith(1, 10);
  });

  it('should not fire change event when close filterDropdown without changing anything', () => {
    const handleChange = jest.fn();
    const wrapper = mount(createTable({ onChange: handleChange }));

    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper.find('.ant-table-filter-dropdown-btns .ant-btn-primary').simulate('click');

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should not fire change event when close a filtered filterDropdown without changing anything', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      createTable({
        onChange: handleChange,
        columns: [
          {
            ...column,
            defaultFilteredValue: ['boy', 'designer'],
          },
        ],
      }),
    );

    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper.find('.ant-table-filter-dropdown-btns .ant-btn-primary').simulate('click');

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('three levels menu', () => {
    const onChange = jest.fn();
    const filters = [
      { text: 'Upper', value: 'Upper' },
      { text: 'Lower', value: 'Lower' },
      {
        text: 'Level2',
        value: 'Level2',
        children: [
          { text: 'Large', value: 'Large' },
          { text: 'Small', value: 'Small' },
          {
            text: 'Level3',
            value: 'Level3',
            children: [
              { text: 'Black', value: 'Black' },
              { text: 'White', value: 'White' },
              { text: 'Jack', value: 'Jack' },
            ],
          },
        ],
      },
    ];
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filters,
          },
        ],
        onChange,
      }),
    );
    jest.useFakeTimers();

    expect(renderedNames(wrapper)).toEqual(['Jack', 'Lucy', 'Tom', 'Jerry']);

    // Open
    wrapper.find('.ant-table-filter-trigger').simulate('click');

    function getFilterMenu() {
      return wrapper.find('FilterDropdown');
    }

    // Seems raf not trigger when in useEffect for async update
    // Need trigger multiple times
    function refreshTimer() {
      for (let i = 0; i < 3; i += 1) {
        act(() => {
          jest.runAllTimers();
          wrapper.update();
        });
      }
    }

    // Open Level2
    getFilterMenu().find('div.ant-dropdown-menu-submenu-title').at(0).simulate('mouseEnter');
    refreshTimer();

    // Open Level3
    getFilterMenu().find('div.ant-dropdown-menu-submenu-title').at(1).simulate('mouseEnter');
    refreshTimer();

    // Select Level3 value
    getFilterMenu().find('li.ant-dropdown-menu-item').last().simulate('click');
    getFilterMenu().find('.ant-table-filter-dropdown-btns .ant-btn-primary').simulate('click');
    refreshTimer();

    onChange.mock.calls.forEach(([, currentFilters]) => {
      const [, val] = Object.entries(currentFilters)[0];
      expect(val).toEqual(['Jack']);
    });

    expect(renderedNames(wrapper)).toEqual(['Jack']);

    // What's this? Is that a coverage case?
    getFilterMenu().find('li.ant-dropdown-menu-item').last().simulate('click');

    jest.useRealTimers();
  });

  describe('should support value types', () => {
    [
      ['Light', 93],
      ['Bamboo', false],
    ].forEach(([text, value]) => {
      it(`${typeof value} type`, () => {
        const onFilter = jest.fn();
        const onChange = jest.fn();
        const filters = [{ text, value }];
        const wrapper = mount(
          createTable({
            columns: [
              {
                ...column,
                filters,
                onFilter,
              },
            ],
            onChange,
          }),
        );

        wrapper.find('.ant-dropdown-trigger').first().simulate('click');

        jest.useFakeTimers();
        wrapper.find('MenuItem').first().simulate('click');
        // This test can be remove if refactor
        wrapper.find('.ant-table-filter-dropdown-btns .ant-btn-primary').simulate('click');
        wrapper.update();

        expect(wrapper.find('FilterDropdown').find('Checkbox').at(0).props().checked).toEqual(true);

        expect(typeof wrapper.find('FilterDropdown').props().filterState.filteredKeys[0]).toEqual(
          'string',
        );
        expect(onFilter.mock.calls.length > 0).toBeTruthy();

        onFilter.mock.calls.forEach(([val]) => {
          expect(val).toBe(value);
        });
        onChange.mock.calls.forEach(([, currentFilters]) => {
          const [, val] = Object.entries(currentFilters)[0];
          expect(val).toEqual([value]);
        });
        // Another time of Filter show
        // https://github.com/ant-design/ant-design/issues/15593
        wrapper.find('MenuItem').first().simulate('click');
        expect(wrapper.find('FilterDropdown').find('Checkbox').at(0).props().checked).toEqual(
          false,
        );
        jest.useRealTimers();
      });
    });
  });

  it('works with JSX in controlled mode', () => {
    const { Column } = Table;

    class App extends React.Component {
      state = {
        filters: {},
      };

      handleChange = (pagination, filters) => {
        this.setState({ filters });
      };

      render() {
        const { filters } = this.state;
        return (
          <Table dataSource={data} onChange={this.handleChange}>
            <Column
              title="name"
              dataIndex="name"
              key="name"
              filters={[
                { text: 'Jack', value: 'Jack' },
                { text: 'Lucy', value: 'Lucy' },
              ]}
              filteredValue={filters.name}
              onFilter={filterFn}
            />
          </Table>
        );
      }
    }

    const wrapper = mount(<App />);

    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    expect(wrapper.find('Dropdown').first().props().visible).toBe(true);
    wrapper.find('MenuItem').first().simulate('click');
    wrapper.find('.ant-table-filter-dropdown-btns .ant-btn-primary').simulate('click');
    wrapper.update();
    expect(wrapper.find('Dropdown').first().props().visible).toBe(false);
    expect(renderedNames(wrapper)).toEqual(['Jack']);

    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper.find('.ant-table-filter-dropdown-btns .ant-btn-link').simulate('click');
    wrapper.update();
    expect(wrapper.find('Dropdown').first().props().visible).toBe(true);
    expect(renderedNames(wrapper)).toEqual(['Jack']);
    wrapper.find('.ant-table-filter-dropdown-btns .ant-btn-primary').simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Jack', 'Lucy', 'Tom', 'Jerry']);
    expect(wrapper.find('Dropdown').first().props().visible).toBe(false);
  });

  it('works with grouping columns in controlled mode', () => {
    const columns = [
      {
        title: 'group',
        key: 'group',
        children: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filters: [
              { text: 'Jack', value: 'Jack' },
              { text: 'Lucy', value: 'Lucy' },
            ],
            onFilter: filterFn,
            filteredValue: ['Jack'],
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
          },
        ],
      },
    ];
    const testData = [
      { key: 0, name: 'Jack', age: 11 },
      { key: 1, name: 'Lucy', age: 20 },
      { key: 2, name: 'Tom', age: 21 },
      { key: 3, name: 'Jerry', age: 22 },
    ];
    const wrapper = mount(<Table columns={columns} dataSource={testData} />);

    expect(renderedNames(wrapper)).toEqual(['Jack']);
  });

  it('confirm filter when dropdown hidden', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filters: [
              { text: 'Jack', value: 'Jack' },
              { text: 'Lucy', value: 'Lucy' },
            ],
          },
        ],
        onChange: handleChange,
      }),
    );

    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper.find('.ant-dropdown-menu-item').first().simulate('click');
    wrapper.find('.ant-dropdown-trigger').first().simulate('click');

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][3].currentDataSource.length).toBe(1);
  });

  it('renders custom filter icon correctly', () => {
    const filterIcon = filtered => (
      <span className="customize-icon">{filtered ? 'filtered' : 'unfiltered'}</span>
    );
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filterIcon,
          },
        ],
      }),
    );

    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper.find('.ant-dropdown-menu-item').first().simulate('click');
    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    expect(wrapper.find('.customize-icon').render()).toMatchSnapshot();

    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper.find('.ant-dropdown-menu-item').first().simulate('click');
    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    expect(wrapper.find('.customize-icon').render()).toMatchSnapshot();
  });

  it('renders custom filter icon as string correctly', () => {
    const filterIcon = () => 'string';
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filterIcon,
          },
        ],
      }),
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders custom filter icon with right Tooltip title', () => {
    const filterIcon = () => (
      <Tooltip title="title" visible>
        Tooltip
      </Tooltip>
    );
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filterIcon,
          },
        ],
      }),
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('renders custom filter icon as ReactNode', () => {
    const filterIcon = <span className="customize-icon" />;
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filterIcon,
          },
        ],
      }),
    );
    expect(wrapper.render()).toMatchSnapshot();
    expect(wrapper.find('span.customize-icon').length).toBe(1);
  });

  // https://github.com/ant-design/ant-design/issues/13028
  it('reset dropdown filter correctly', () => {
    class Demo extends React.Component {
      state = {};

      onChange = () => {
        this.setState({ name: '' });
      };

      render() {
        const { name } = this.state;

        return createTable({
          onChange: this.onChange,
          columns: [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              filteredValue: name,
              // eslint-disable-next-line react/no-unstable-nested-components
              filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
                <div>
                  <Input
                    value={selectedKeys[0]}
                    onChange={e => {
                      setSelectedKeys(e.target.value ? [e.target.value] : []);
                    }}
                  />
                  <Button onClick={confirm}>Confirm</Button>
                </div>
              ),
            },
          ],
        });
      }
    }

    const wrapper = mount(<Demo />);
    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper.find('.ant-input').simulate('change', { target: { value: 'test' } });
    expect(wrapper.find('.ant-input').instance().value).toBe('test');
    wrapper.find('.ant-btn').simulate('click');

    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    expect(wrapper.find('.ant-input').instance().value).toBe('');
  });

  // https://github.com/ant-design/ant-design/issues/17833
  it('should not trigger onChange when bluring custom filterDropdown', () => {
    const onChange = jest.fn();
    const filterDropdown = ({ setSelectedKeys }) => (
      <input onChange={e => setSelectedKeys([e.target.value])} />
    );
    const wrapper = mount(
      createTable({
        onChange,
        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filterDropdown,
          },
        ],
      }),
    );
    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { value: 'whatevervalue' } });
    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should trigger onChange with correct params if defines custom filterDropdown', () => {
    const onChange = jest.fn();
    const filterDropdown = ({ setSelectedKeys, confirm }) => (
      <div>
        <input onChange={e => setSelectedKeys([e.target.value])} />
        <button className="confirm-btn" type="submit" onClick={confirm}>
          Confirm
        </button>
      </div>
    );
    const wrapper = mount(
      createTable({
        onChange,
        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filterDropdown,
          },
        ],
      }),
    );
    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { value: 'test' } });
    wrapper.find('.confirm-btn').first().simulate('click');
    expect(onChange).toHaveBeenCalled();
    onChange.mock.calls.forEach(([, currentFilters]) => {
      const [, val] = Object.entries(currentFilters)[0];
      expect(val).toEqual(['test']);
    });
  });

  it('should work as expected with complex custom filterDropdown', () => {
    const onChange = jest.fn();
    const filterDropdown = ({ setSelectedKeys, selectedKeys, confirm }) => {
      const handleChange = selectedValues => {
        setSelectedKeys(selectedValues);
      };

      return (
        <div>
          <Select
            mode="multiple"
            allowClear
            labelInValue
            style={{ width: 200 }}
            value={selectedKeys}
            onChange={handleChange}
            options={[
              {
                value: 1,
                label: 'Not Identified',
              },
              {
                value: 2,
                label: 'Closed',
              },
              {
                value: 3,
                label: 'Communicated',
              },
            ]}
          />
          <button className="confirm-btn" type="submit" onClick={confirm}>
            Confirm
          </button>
        </div>
      );
    };
    const filteredValue = [
      {
        value: 2,
        label: 'Closed',
      },
    ];
    const selectedValue = [
      {
        key: 2,
        value: 2,
        label: 'Closed',
      },
      {
        key: 1,
        value: 1,
        label: 'Not Identified',
      },
    ];
    const wrapper = mount(
      createTable({
        onChange,
        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filterDropdown,
            filteredValue,
          },
        ],
      }),
    );
    expect(wrapper.find('FilterDropdown').props().filterState.filteredKeys).toEqual(filteredValue);
    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper.find('.ant-select-selector').simulate('mousedown');
    wrapper.find('.ant-select-item-option').first().simulate('click');
    wrapper.find('.confirm-btn').first().simulate('click');
    expect(onChange).toHaveBeenCalled();
    onChange.mock.calls.forEach(([, currentFilters]) => {
      const [, val] = Object.entries(currentFilters)[0];
      expect(val).toEqual(selectedValue);
    });
  });

  // https://github.com/ant-design/ant-design/issues/17089
  it('not crash when dynamic change filter', () => {
    const onChange = jest.fn();

    const Test = ({ filters }) => (
      <Table
        onChange={onChange}
        rowKey="name"
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            filters,
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
          },
        ]}
        dataSource={[
          {
            name: 'Jack',
          },
        ]}
      />
    );

    const wrapper = mount(
      <Test
        filters={[
          {
            text: 'Bill',
            value: 'Bill',
          },
        ]}
      />,
    );

    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper.find('MenuItem').first().simulate('click');
    wrapper.find('.ant-table-filter-dropdown-btns .ant-btn-primary').simulate('click');
    expect(onChange).toHaveBeenCalled();
    onChange.mockReset();
    expect(onChange).not.toHaveBeenCalled();

    wrapper.setProps({
      filters: [
        {
          text: 'Jim',
          value: 'Jim',
        },
      ],
    });

    wrapper.find('MenuItem').first().simulate('click');
    wrapper.find('.ant-table-filter-dropdown-btns .ant-btn-primary').simulate('click');
    expect(onChange).toHaveBeenCalled();
  });

  it('should support getPopupContainer', () => {
    const getPopupContainer = jest.fn(node => node.parentNode);

    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filterDropdownVisible: true,
          },
        ],
        getPopupContainer,
      }),
    );
    expect(wrapper.render()).toMatchSnapshot();
    expect(getPopupContainer).toHaveBeenCalled();
  });

  it('should support getPopupContainer from ConfigProvider', () => {
    const wrapper = mount(
      <ConfigProvider getPopupContainer={node => node.parentNode}>
        {createTable({
          columns: [
            {
              ...column,
              filterDropdownVisible: true,
            },
          ],
        })}
      </ConfigProvider>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('pass visible prop to filterDropdown', () => {
    const filterDropdownMock = jest.fn().mockReturnValue(<span>test</span>);
    const filterDropdown = (...args) => filterDropdownMock(...args);

    const Test = () => (
      <Table
        rowKey="name"
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            filterDropdown,
          },
        ]}
        dataSource={[
          {
            name: 'Jack',
          },
        ]}
      />
    );

    mount(<Test />);
    expect(filterDropdownMock).toHaveBeenCalledWith(
      expect.objectContaining({
        visible: false,
      }),
    );
  });

  it('visible prop of filterDropdown changes on click', () => {
    const filterDropdownMock = jest.fn().mockReturnValue(<span>test</span>);
    const filterDropdown = (...args) => filterDropdownMock(...args);

    const Test = () => (
      <Table
        rowKey="name"
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            filterDropdown,
          },
        ]}
        dataSource={[
          {
            name: 'Jack',
          },
        ]}
      />
    );

    const wrapper = mount(<Test />);

    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    expect(filterDropdownMock).toHaveBeenCalledWith(
      expect.objectContaining({
        visible: true,
      }),
    );

    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    expect(filterDropdownMock).toHaveBeenCalledWith(
      expect.objectContaining({
        visible: false,
      }),
    );
  });

  it('should reset pagination after filter', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      createTable({
        onChange: handleChange,
        dataSource: longData,
        pagination: true,
      }),
    );

    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper.find('MenuItem').first().simulate('click');
    wrapper.find('.ant-table-filter-dropdown-btns .ant-btn-primary').simulate('click');

    expect(handleChange).toHaveBeenCalledWith(
      {
        current: 1,
        pageSize: 10,
      },
      { name: ['boy'] },
      {},
      {
        currentDataSource: [],
        action: 'filter',
      },
    );
    expect(wrapper.find('.ant-pagination-item')).toHaveLength(0);
  });

  it('should keep pagination current after filter', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      createTable({
        onChange: handleChange,
        dataSource: longData,
        pagination: {
          current: 3,
        },
      }),
    );
    expect(wrapper.find('.ant-pagination-item-active').text()).toBe('3');

    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper.find('MenuItem').first().simulate('click');
    wrapper.find('.ant-table-filter-dropdown-btns .ant-btn-primary').simulate('click');

    expect(handleChange).toHaveBeenCalledWith(
      {
        current: 1,
        pageSize: 10,
      },
      { name: ['boy'] },
      {},
      {
        currentDataSource: [],
        action: 'filter',
      },
    );
  });

  // https://github.com/ant-design/ant-design/issues/19274
  it('should not crash', () => {
    class TestTable extends React.Component {
      state = {
        cols: [],
      };

      componentDidMount() {
        this.setState({
          cols: [
            {
              title: 'test',
              itemKey: 'test',
              filterDropdown: 123,
            },
          ],
        });
      }

      render() {
        const { cols } = this.state;
        return <Table columns={cols} dataSource={[]} scroll={{ x: 1000 }} />;
      }
    }

    mount(<TestTable />);
  });

  // https://github.com/ant-design/ant-design/issues/20854
  it('Not cache for onChange state', () => {
    const onChange = jest.fn();

    const wrapper = mount(
      <Table
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
          },
          {
            title: 'Gender',
            dataIndex: 'gender',
            filters: [
              { text: 'Male', value: 'male' },
              { text: 'Female', value: 'female' },
            ],
          },
        ]}
        dataSource={[]}
        onChange={onChange}
      />,
    );

    // Sort it
    wrapper.find('.ant-table-column-sorters').simulate('click');
    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      {
        gender: null,
      },
      expect.objectContaining({
        column: {
          dataIndex: 'name',
          sorter: true,
          title: 'Name',
        },
      }),
      {
        currentDataSource: expect.anything(),
        action: 'sort',
      },
    );

    // Filter it
    onChange.mockReset();
    wrapper.find('span.ant-dropdown-trigger').simulate('click', nativeEvent);
    wrapper.find('.ant-dropdown-menu-item').first().simulate('click');
    wrapper.find('.ant-table-filter-dropdown-btns .ant-btn-primary').simulate('click');
    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      {
        gender: ['male'],
      },
      expect.objectContaining({
        column: {
          dataIndex: 'name',
          sorter: true,
          title: 'Name',
        },
      }),
      {
        currentDataSource: expect.anything(),
        action: 'filter',
      },
    );
  });

  it('locale should work', () => {
    const wrapper = mount(
      createTable({
        locale: { filterConfirm: 'Bamboo' },
        columns: [
          {
            ...column,
            filterDropdownVisible: true,
            filterSearch: true,
            filterMode: 'tree',
          },
        ],
      }),
    );

    expect(wrapper.find('.ant-table-filter-dropdown-btns .ant-btn-primary').text()).toEqual(
      'Bamboo',
    );
    expect(wrapper.find('.ant-table-filter-dropdown-btns .ant-btn-link').last().text()).toEqual(
      'Reset',
    );
    expect(wrapper.find('.ant-table-filter-dropdown-checkall').first().text()).toEqual(
      'Select all items',
    );
    expect(wrapper.find('.ant-input').getDOMNode().getAttribute('placeholder')).toEqual(
      'Search in filters',
    );
  });

  it('filtered should work', () => {
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filtered: true,
          },
        ],
      }),
    );

    expect(wrapper.find('.ant-table-filter-trigger').hasClass('active')).toBeTruthy();
  });

  it('filteredValue with empty array should not active the filtered icon', () => {
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filteredValue: [],
          },
        ],
      }),
    );

    expect(wrapper.find('.ant-table-filter-trigger').hasClass('active')).toBeFalsy();
  });

  it('with onFilter', () => {
    const onFilter = jest.fn((value, record) => record.key === value);
    const columns = [{ dataIndex: 'key', filteredValue: [5], onFilter }];
    const testData = [{ key: 1 }, { key: 3 }, { key: 5 }];
    const wrapper = mount(<Table columns={columns} dataSource={testData} />);

    expect(onFilter).toHaveBeenCalled();
    expect(wrapper.find('tbody tr')).toHaveLength(1);
  });

  it('jsx work', () => {
    const wrapper = mount(
      <Table dataSource={data}>
        <Table.Column
          title="Name"
          dataIndex="name"
          filters={[
            { text: 'Jack', value: 'Jack' },
            { text: 'Lucy', value: 'Lucy' },
          ]}
          onFilter={(value, record) => record.name.includes(value)}
          defaultFilteredValue={['Jack']}
        />
      </Table>,
    );

    expect(wrapper.find('tbody tr')).toHaveLength(1);
    expect(wrapper.find('tbody tr td').text()).toEqual('Jack');
  });

  it(`shouldn't keep status when controlled filteredValue isn't change`, () => {
    const filterControlledColumn = {
      title: 'Name',
      dataIndex: 'name',
      filteredValue: null,
      filters: [
        { text: 'Boy', value: 'boy' },
        { text: 'Girl', value: 'girl' },
      ],
      onFilter: filterFn,
    };
    const wrapper = mount(createTable({ columns: [filterControlledColumn] }));
    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper.find('FilterDropdown').find('MenuItem').first().simulate('click');
    wrapper // close drodown
      .find('FilterDropdown')
      .find('.ant-table-filter-dropdown-btns .ant-btn-primary')
      .simulate('click');
    wrapper.find('.ant-dropdown-trigger').first().simulate('click'); // reopen
    const checkbox = wrapper
      .find('FilterDropdown')
      .find('MenuItem')
      .first()
      .find('Checkbox')
      .first();
    expect(checkbox.props().checked).toEqual(false);
  });

  it('should not trigger onChange when filters is empty', () => {
    const onChange = jest.fn();
    const Test = ({ filters }) => (
      <Table
        onChange={onChange}
        rowKey="name"
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            filters,
          },
        ]}
        dataSource={[
          {
            name: 'Jack',
          },
        ]}
      />
    );
    const wrapper = mount(<Test filters={[]} />);
    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper.find('.ant-table-filter-dropdown-btns .ant-btn-primary').simulate('click');
    expect(onChange).not.toHaveBeenCalled();
    onChange.mockReset();
    wrapper.unmount();
  });

  it('filters in children should render', () => {
    const columns = [
      {
        title: 'English Score',
        dataIndex: 'english',
        filters: [{ text: '1', value: 1 }],
        onFilter: record => String(record.english1).includes(String(1)),
        children: [
          {
            title: 'English Score1',
            dataIndex: 'english1',
            filters: [{ text: '2', value: 2 }],
            onFilter: record => String(record.english2).includes(String(2)),
          },
          {
            title: 'English Score2',
            dataIndex: 'english2',
            filters: [{ text: '2', value: 3 }],
            onFilter: record => String(record.english2).includes(String(3)),
          },
        ],
      },
    ];
    const dataSource = [
      {
        key: '1',
        english: 71,
        english1: 71,
        english2: 72,
      },
      {
        key: '2',
        english: 89,
        english1: 72,
        english2: 72,
      },
      {
        key: '3',
        english: 70,
        english1: 71,
        english2: 73,
      },
      {
        key: '4',
        english: 89,
        english1: 71,
        english2: 72,
      },
    ];
    const wrapper = mount(
      createTable({
        columns,
        dataSource,
      }),
    );

    expect(wrapper.find('.ant-table-filter-column')).toHaveLength(3);
  });

  it('should pagination.current be 1 after filtering', () => {
    const onChange = jest.fn();
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        filters: [
          {
            text: 'Jim',
            value: 'Jim',
          },
          {
            text: 'Joe',
            value: 'Joe',
          },
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
      },
    ];
    const dataSource = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
    ];

    const wrapper = mount(
      <Table onChange={onChange} rowKey="name" columns={columns} dataSource={dataSource} />,
    );
    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper.find('FilterDropdown').find('MenuItem').at(0).simulate('click');
    wrapper.find('.ant-btn-primary').first().simulate('click');
    expect(onChange.mock.calls[0][0].current).toBe(1);

    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    wrapper.find('FilterDropdown').find('MenuItem').at(1).simulate('click');
    wrapper.find('.ant-btn-primary').first().simulate('click');
    expect(onChange.mock.calls[1][0].current).toBe(1);
  });

  // https://github.com/ant-design/ant-design/issues/30454
  it('should not trigger onFilterDropdownVisibleChange when call confirm({ closeDropdown: false })', () => {
    const onFilterDropdownVisibleChange = jest.fn();
    const wrapper = mount(
      createTable({
        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filteredValue: name,
            filterDropdown: ({ confirm }) => (
              <>
                <button id="confirm-and-close" type="button" onClick={() => confirm()}>
                  confirm
                </button>
                <button
                  id="confirm-only"
                  type="button"
                  onClick={() => confirm({ closeDropdown: false })}
                >
                  confirm
                </button>
              </>
            ),
            onFilterDropdownVisibleChange,
          },
        ],
      }),
    );

    wrapper.find('.ant-dropdown-trigger').first().simulate('click');
    expect(onFilterDropdownVisibleChange).toHaveBeenCalledTimes(1);

    wrapper.find('#confirm-only').simulate('click');
    expect(onFilterDropdownVisibleChange).toHaveBeenCalledTimes(1);

    wrapper.find('#confirm-and-close').simulate('click');
    expect(onFilterDropdownVisibleChange).toHaveBeenCalledTimes(2);
    expect(onFilterDropdownVisibleChange).toHaveBeenLastCalledWith(false);
  });

  it('Column with filter and children filters properly.', () => {
    class App extends React.Component {
      state = {
        filteredInfo: null,
        sortedInfo: null,
      };

      handleChange = (pagination, filters, sorter) => {
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
      };

      render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filters: [
              { text: 'Joe', value: 'Joe' },
              { text: 'Jim', value: 'Jim' },
            ],
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            children: [
              {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
              },
            ],
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
            ellipsis: true,
          },
        ];
        return (
          <Table
            columns={columns}
            dataSource={[
              {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
              },
              {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
              },
              {
                key: '3',
                name: 'Joe Black',
                age: 66,
                address: 'Sidney No. 1 Lake Park',
              },
              {
                key: '4',
                name: 'Jim Red',
                age: 32,
                address: 'London No. 2 Lake Park',
              },
            ]}
            onChange={this.handleChange}
          />
        );
      }
    }

    const wrapper = mount(<App />);

    expect(wrapper.find('.ant-table-tbody .ant-table-cell').first().text()).toEqual(`${32}`);
    wrapper.find('.ant-dropdown-trigger.ant-table-filter-trigger').simulate('click');
    wrapper.find('.ant-dropdown-menu-item').first().simulate('click');
    wrapper.find('.ant-btn.ant-btn-primary.ant-btn-sm').simulate('click');
    expect(wrapper.find('.ant-table-tbody .ant-table-cell').first().text()).toEqual(`${66}`);
  });

  describe('filter tree mode', () => {
    it('supports filter tree', () => {
      jest.useFakeTimers();
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const wrapper = mount(
        createTable({
          columns: [
            {
              ...column,
              filterMode: 'tree',
            },
          ],
        }),
      );
      wrapper.find('span.ant-dropdown-trigger').simulate('click', nativeEvent);
      act(() => {
        jest.runAllTimers();
        wrapper.update();
      });
      expect(wrapper.find(Tree).length).toBe(1);
      expect(wrapper.find('.ant-tree-checkbox').length).toBe(5);
    });

    it('supports search input in filter tree', () => {
      jest.useFakeTimers();
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const wrapper = mount(
        createTable({
          columns: [
            {
              ...column,
              filterMode: 'tree',
              filterSearch: true,
            },
          ],
        }),
      );
      wrapper.find('span.ant-dropdown-trigger').simulate('click', nativeEvent);
      act(() => {
        jest.runAllTimers();
        wrapper.update();
      });
      expect(wrapper.find(Tree).length).toBe(1);
      expect(wrapper.find(Input).length).toBe(1);
      wrapper
        .find(Input)
        .find('input')
        .simulate('change', { target: { value: '111' } });
    });

    it('supports search input in filter menu', () => {
      jest.useFakeTimers();
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const wrapper = mount(
        createTable({
          columns: [
            {
              ...column,
              filterSearch: true,
            },
          ],
        }),
      );
      wrapper.find('span.ant-dropdown-trigger').simulate('click', nativeEvent);
      act(() => {
        jest.runAllTimers();
        wrapper.update();
      });
      expect(wrapper.find(Menu).length).toBe(1);
      expect(wrapper.find(Input).length).toBe(1);
      wrapper
        .find(Input)
        .find('input')
        .simulate('change', { target: { value: '111' } });
    });

    it('should skip search when filters[0].text is ReactNode', () => {
      jest.useFakeTimers();
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const wrapper = mount(
        createTable({
          columns: [
            {
              ...column,
              filters: [
                {
                  text: '123',
                  value: '456',
                },
                {
                  text: 123456,
                  value: '456',
                },
                {
                  text: <span>123</span>,
                  value: '456',
                },
              ],
              filterSearch: true,
            },
          ],
        }),
      );
      wrapper.find('span.ant-dropdown-trigger').simulate('click', nativeEvent);
      act(() => {
        jest.runAllTimers();
        wrapper.update();
      });
      expect(wrapper.find(Menu).length).toBe(1);
      expect(wrapper.find(Input).length).toBe(1);
      expect(wrapper.find('li.ant-dropdown-menu-item').length).toBe(3);
      wrapper
        .find(Input)
        .find('input')
        .simulate('change', { target: { value: '123' } });
      expect(wrapper.find('li.ant-dropdown-menu-item').length).toBe(2);
    });

    it('supports check all items', () => {
      jest.useFakeTimers();
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const wrapper = mount(
        createTable({
          columns: [
            {
              ...column,
              filterMode: 'tree',
              filterSearch: true,
            },
          ],
        }),
      );
      wrapper.find('span.ant-dropdown-trigger').simulate('click', nativeEvent);
      act(() => {
        jest.runAllTimers();
        wrapper.update();
      });
      expect(wrapper.find(Checkbox).length).toBe(1);
      expect(wrapper.find(Checkbox).text()).toBe('Select all items');
      expect(wrapper.find('.ant-tree-checkbox-checked').length).toBe(0);
      wrapper
        .find(Checkbox)
        .find('input')
        .simulate('change', { target: { checked: true } });
      expect(wrapper.find('.ant-tree-checkbox-checked').length).toBe(5);
      wrapper
        .find(Checkbox)
        .find('input')
        .simulate('change', { target: { checked: false } });
      expect(wrapper.find('.ant-tree-checkbox-checked').length).toBe(0);
    });

    it('supports check item by selecting it', () => {
      jest.useFakeTimers();
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const wrapper = mount(
        createTable({
          columns: [
            {
              ...column,
              filterMode: 'tree',
              filterSearch: true,
            },
          ],
        }),
      );
      wrapper.find('span.ant-dropdown-trigger').simulate('click', nativeEvent);
      act(() => {
        jest.runAllTimers();
        wrapper.update();
      });
      expect(wrapper.find(Checkbox).length).toBe(1);
      expect(wrapper.find(Checkbox).text()).toBe('Select all items');
      wrapper.find('.ant-tree-node-content-wrapper').at(0).simulate('click');
      expect(wrapper.find('.ant-tree-checkbox').at(0).hasClass('ant-tree-checkbox-checked')).toBe(
        true,
      );
    });
  });

  it('filterMultiple is false - check item', () => {
    jest.useFakeTimers();
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filterMode: 'tree',
            filterMultiple: false,
          },
        ],
      }),
    );
    wrapper.find('span.ant-dropdown-trigger').simulate('click', nativeEvent);
    act(() => {
      jest.runAllTimers();
      wrapper.update();
    });
    expect(wrapper.find('.ant-tree-checkbox').length).toBe(5);
    expect(wrapper.find('.ant-table-filter-dropdown-checkall').exists()).toBe(false);
    expect(wrapper.find('.ant-tree-checkbox-checked').length).toBe(0);
    wrapper.find('.ant-tree-checkbox').at(2).simulate('click');
    expect(wrapper.find('.ant-tree-checkbox').at(2).hasClass('ant-tree-checkbox-checked')).toBe(
      true,
    );
    expect(wrapper.find('.ant-tree-checkbox-checked').length).toBe(1);
    wrapper.find('.ant-tree-checkbox').at(1).simulate('click');
    expect(wrapper.find('.ant-tree-checkbox').at(1).hasClass('ant-tree-checkbox-checked')).toBe(
      true,
    );
    expect(wrapper.find('.ant-tree-checkbox-checked').length).toBe(1);
    wrapper.find('.ant-tree-checkbox').at(1).simulate('click');
    expect(wrapper.find('.ant-tree-checkbox').at(1).hasClass('ant-tree-checkbox-checked')).toBe(
      false,
    );
    expect(wrapper.find('.ant-tree-checkbox-checked').length).toBe(0);
  });

  it('filterMultiple is false - select item', () => {
    jest.useFakeTimers();
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filterMode: 'tree',
            filterMultiple: false,
          },
        ],
      }),
    );
    wrapper.find('span.ant-dropdown-trigger').simulate('click', nativeEvent);
    act(() => {
      jest.runAllTimers();
      wrapper.update();
    });
    expect(wrapper.find('.ant-tree-checkbox').length).toBe(5);
    expect(wrapper.find('.ant-tree-checkbox-checked').length).toBe(0);
    wrapper.find('.ant-tree-node-content-wrapper').at(2).simulate('click');
    expect(wrapper.find('.ant-tree-checkbox').at(2).hasClass('ant-tree-checkbox-checked')).toBe(
      true,
    );
    expect(wrapper.find('.ant-tree-checkbox-checked').length).toBe(1);
    wrapper.find('.ant-tree-node-content-wrapper').at(1).simulate('click');
    expect(wrapper.find('.ant-tree-checkbox').at(1).hasClass('ant-tree-checkbox-checked')).toBe(
      true,
    );
    expect(wrapper.find('.ant-tree-checkbox-checked').length).toBe(1);
    wrapper.find('.ant-tree-node-content-wrapper').at(1).simulate('click');
    expect(wrapper.find('.ant-tree-checkbox').at(1).hasClass('ant-tree-checkbox-checked')).toBe(
      false,
    );
    expect(wrapper.find('.ant-tree-checkbox-checked').length).toBe(0);
  });

  it('should select children when select parent', () => {
    jest.useFakeTimers();
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const wrapper = mount(
      createTable({
        columns: [
          {
            ...column,
            filters: [
              { text: 'Boy', value: 'boy' },
              { text: 'Girl', value: 'girl' },
              {
                text: 'Title',
                value: 'title',
                children: [
                  { text: 'Jack', value: 'Jack' },
                  { text: 'Coder', value: 'coder' },
                ],
              },
            ],
            filterMode: 'tree',
          },
        ],
      }),
    );
    wrapper.find('span.ant-dropdown-trigger').simulate('click', nativeEvent);
    act(() => {
      jest.runAllTimers();
      wrapper.update();
    });
    // check parentnode
    wrapper.find('.ant-tree-checkbox').at(2).simulate('click');
    expect(wrapper.find('.ant-tree-checkbox').at(2).hasClass('ant-tree-checkbox-checked')).toBe(
      true,
    );
    expect(wrapper.find('.ant-tree-checkbox').at(3).hasClass('ant-tree-checkbox-checked')).toBe(
      true,
    );
    expect(wrapper.find('.ant-tree-checkbox').at(4).hasClass('ant-tree-checkbox-checked')).toBe(
      true,
    );
    wrapper.find('.ant-table-filter-dropdown-btns .ant-btn-primary').simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Jack']);
    wrapper.find('.ant-tree-checkbox').at(2).simulate('click');
    wrapper.find('.ant-table-filter-dropdown-btns .ant-btn-primary').simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Jack', 'Lucy', 'Tom', 'Jerry']);
    wrapper.find('.ant-tree-node-content-wrapper').at(2).simulate('click');
    wrapper.find('.ant-table-filter-dropdown-btns .ant-btn-primary').simulate('click');
    expect(renderedNames(wrapper)).toEqual(['Jack']);
  });
});
