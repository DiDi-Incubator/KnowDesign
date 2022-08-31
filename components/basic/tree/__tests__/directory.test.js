import debounce from 'lodash/debounce';
import React from 'react';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render } from '../../../tests/utils';
import Tree from '../index';

const { DirectoryTree, TreeNode } = Tree;

jest.mock('lodash/debounce');

describe('Directory Tree', () => {
  mountTest(Tree);
  mountTest(DirectoryTree);

  rtlTest(Tree);
  rtlTest(DirectoryTree);

  debounce.mockImplementation(fn => fn);

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    debounce.mockRestore();
  });

  function createTree(props) {
    return (
      <DirectoryTree {...props}>
        <TreeNode key="0-0">
          <TreeNode key="0-0-0" />
          <TreeNode key="0-0-1" />
        </TreeNode>
        <TreeNode key="0-1">
          <TreeNode key="0-1-0" />
          <TreeNode key="0-1-1" />
        </TreeNode>
      </DirectoryTree>
    );
  }

  describe('expand', () => {
    it('click', () => {
      const onExpand = jest.fn();
      const { container } = render(createTree({ onExpand }));

      fireEvent.click(container.querySelector('.ant-tree-node-content-wrapper'));
      act(() => {
        jest.runAllTimers();
      });
      expect(onExpand).toHaveBeenCalledWith(['0-0'], expect.anything());
      onExpand.mockReset();

      act(() => {
        jest.runAllTimers();
      });
      fireEvent.click(container.querySelector('.ant-tree-node-content-wrapper'));
      act(() => {
        jest.runAllTimers();
      });
      expect(onExpand).toHaveBeenCalledWith([], expect.anything());
    });

    it('double click', () => {
      const onExpand = jest.fn();
      const { container } = render(createTree({ expandAction: 'doubleClick', onExpand }));

      fireEvent.doubleClick(container.querySelector('.ant-tree-node-content-wrapper'));
      act(() => {
        jest.runAllTimers();
      });
      expect(onExpand).toHaveBeenCalledWith(['0-0'], expect.anything());
      onExpand.mockReset();

      act(() => {
        jest.runAllTimers();
      });
      fireEvent.doubleClick(container.querySelector('.ant-tree-node-content-wrapper'));
      act(() => {
        jest.runAllTimers();
      });
      expect(onExpand).toHaveBeenCalledWith([], expect.anything());
    });

    describe('with state control', () => {
      class StateDirTree extends React.Component {
        state = {
          expandedKeys: [],
        };

        onExpand = expandedKeys => {
          this.setState({ expandedKeys });
        };

        render() {
          const { expandedKeys } = this.state;

          return (
            <DirectoryTree expandedKeys={expandedKeys} onExpand={this.onExpand} {...this.props}>
              <TreeNode key="0-0" title="parent">
                <TreeNode key="0-0-0" title="children" />
              </TreeNode>
            </DirectoryTree>
          );
        }
      }

      it('click', () => {
        const { container, asFragment } = render(<StateDirTree expandAction="click" />);

        fireEvent.click(container.querySelector('.ant-tree-node-content-wrapper'));
        jest.runAllTimers();
        expect(asFragment().firstChild).toMatchSnapshot();
      });
      it('doubleClick', () => {
        const { container, asFragment } = render(<StateDirTree expandAction="doubleClick" />);

        fireEvent.doubleClick(container.querySelector('.ant-tree-node-content-wrapper'));
        jest.runAllTimers();
        expect(asFragment().firstChild).toMatchSnapshot();
      });
    });
  });

  it('defaultExpandAll', () => {
    const { asFragment } = render(createTree({ defaultExpandAll: true }));
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('DirectoryTree should expend all when use treeData and defaultExpandAll is true', () => {
    const treeData = [
      {
        key: '0-0-0',
        title: 'Folder',
        children: [
          {
            title: 'Folder2',
            key: '0-0-1',
            children: [
              {
                title: 'File',
                key: '0-0-2',
                isLeaf: true,
              },
            ],
          },
        ],
      },
    ];
    const { asFragment } = render(createTree({ defaultExpandAll: true, treeData }));
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('defaultExpandParent', () => {
    const { asFragment } = render(createTree({ defaultExpandParent: true }));
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('expandedKeys update', () => {
    const { rerender, asFragment } = render(createTree());
    rerender(createTree({ expandedKeys: ['0-1'] }));
    jest.runAllTimers();
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('selectedKeys update', () => {
    const { rerender, asFragment } = render(createTree({ defaultExpandAll: true }));
    rerender(createTree({ selectedKeys: ['0-1-0'] }));
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('group select', () => {
    const onSelect = jest.fn();
    const { container, asFragment } = render(
      createTree({
        defaultExpandAll: true,
        expandAction: 'doubleClick',
        multiple: true,
        onSelect,
      }),
    );

    fireEvent.click(container.querySelectorAll('.ant-tree-node-content-wrapper')[0]);
    expect(onSelect.mock.calls[0][1].selected).toBeTruthy();
    expect(onSelect.mock.calls[0][1].selectedNodes.length).toBe(1);

    // Click twice should keep selected
    fireEvent.click(container.querySelectorAll('.ant-tree-node-content-wrapper')[0]);
    expect(onSelect.mock.calls[1][1].selected).toBeTruthy();
    expect(onSelect.mock.calls[0][0]).toEqual(onSelect.mock.calls[1][0]);
    expect(onSelect.mock.calls[1][1].selectedNodes.length).toBe(1);

    fireEvent.click(container.querySelectorAll('.ant-tree-node-content-wrapper')[1], {
      ctrlKey: true,
    });
    expect(asFragment().firstChild).toMatchSnapshot();
    expect(onSelect.mock.calls[2][0].length).toBe(2);
    expect(onSelect.mock.calls[2][1].selected).toBeTruthy();
    expect(onSelect.mock.calls[2][1].selectedNodes.length).toBe(2);

    fireEvent.click(container.querySelectorAll('.ant-tree-node-content-wrapper')[4], {
      shiftKey: true,
    });
    expect(asFragment().firstChild).toMatchSnapshot();
    expect(onSelect.mock.calls[3][0].length).toBe(5);
    expect(onSelect.mock.calls[3][1].selected).toBeTruthy();
    expect(onSelect.mock.calls[3][1].selectedNodes.length).toBe(5);
  });

  it('onDoubleClick', () => {
    const onDoubleClick = jest.fn();
    const { container } = render(createTree({ onDoubleClick }));
    fireEvent.doubleClick(container.querySelector('.ant-tree-node-content-wrapper'));
    expect(onDoubleClick).toBeCalled();
  });

  it('should not expand tree now when pressing ctrl', () => {
    const onExpand = jest.fn();
    const onSelect = jest.fn();
    const { container } = render(createTree({ onExpand, onSelect }));
    fireEvent.click(container.querySelector('.ant-tree-node-content-wrapper'), { ctrlKey: true });
    expect(onExpand).not.toHaveBeenCalled();
    expect(onSelect).toHaveBeenCalledWith(
      ['0-0'],
      expect.objectContaining({ event: 'select', nativeEvent: expect.anything() }),
    );
  });

  it('should not expand tree now when click leaf node', () => {
    const onExpand = jest.fn();
    const onSelect = jest.fn();
    const { container } = render(
      createTree({
        onExpand,
        onSelect,
        defaultExpandAll: true,
        treeData: [
          {
            key: '0-0-0',
            title: 'Folder',
            children: [
              {
                title: 'Folder2',
                key: '0-0-1',
                children: [
                  {
                    title: 'File',
                    key: '0-0-2',
                    isLeaf: true,
                  },
                ],
              },
            ],
          },
        ],
      }),
    );
    const nodeList = container.querySelectorAll('.ant-tree-node-content-wrapper');
    fireEvent.click(nodeList[nodeList.length - 1]);
    expect(onExpand).not.toHaveBeenCalled();
    expect(onSelect).toHaveBeenCalledWith(
      ['0-0-2'],
      expect.objectContaining({ event: 'select', nativeEvent: expect.anything() }),
    );
  });

  it('ref support', () => {
    const treeRef = React.createRef();
    render(createTree({ ref: treeRef }));

    expect('scrollTo' in treeRef.current).toBeTruthy();
  });
});
