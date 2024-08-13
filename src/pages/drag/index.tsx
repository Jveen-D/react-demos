import React from "react";
import useStyles from "./styles";
import { Tree } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
import { FullscreenOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import axios from "axios";
import { mockData } from "./mock";
const namesMap = {
  generalContractCategories: "总包合同分类树",
  purchaseSaleCategories: "物资购销合同树",
  subcontractingCategories: "分包合同分类树",
};

type DragProps = {};

const Drag: React.FC<DragProps> = (props) => {
  const { styles } = useStyles();
  const [gData, setGData] = React.useState<any>([]);
  console.log("🚀 ~ gData:", gData);
  const [expandedKeys, setExpandedKeys] = React.useState([
    "generalContractCategories",
    "purchaseSaleCategories",
    "subcontractingCategories",
  ]);
  // const { data, error, loading } = useRequest(() =>
  //   axios.get(
  //     "http://127.0.0.1:4523/m1/3700456-0-default/contractCategory/fetchContractCategoryTree"
  //   )
  // );
  const datasource = React.useMemo(() => {
    const originData = mockData || [];
    const result: any[] = [];

    for (const key of Object.keys(originData)) {
      const item = originData[key];
      result.push({
        key,
        contractCategoryUuid: key,
        categoryName: namesMap[key],
        childrenCategories: item,
      });
    }
    const loop = (data: any) => {
      return data.map((item: any) => {
        if (item?.childrenCategories?.length) {
          return {
            ...item,
            key: item.contractCategoryUuid,
            children: item.childrenCategories
              ? loop(item.childrenCategories)
              : undefined,
            contractCategoryUuid: item.contractCategoryUuid,
            categoryName: item.categoryName,
          };
        }
        return {
          ...item,
          key: item.contractCategoryUuid,
          contractCategoryUuid: item.contractCategoryUuid,
          categoryName: item.categoryName,
        };
      });
    };
    const final = loop(result);
    return final;
  }, [mockData]);
  React.useEffect(() => {
    setGData(datasource);
  }, [datasource]);

  const onDrop: TreeProps["onDrop"] = (info: any) => {
    console.log("🚀 ~ info:", info.dropPosition);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    // 只有同级可拖拽
    const dropParentCategoryUuid = info.node.parentCategoryUuid;
    const dragParentCategoryUuid = info.dragNode.parentCategoryUuid;

    if (dropParentCategoryUuid !== dragParentCategoryUuid) {
      alert("只能在同级拖拽");
      return;
    }
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]); // the drop position relative to the drop node, inside 0, top -1, bottom 1

    const loop = (
      data: TreeDataNode[],
      key: React.Key,
      callback: (node: TreeDataNode, i: number, data: TreeDataNode[]) => void
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj: TreeDataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    let ar: TreeDataNode[] = [];
    let i: number;
    loop(data, dropKey, (_item, index, arr) => {
      ar = arr;
      i = index;
    });
    if (dropPosition === -1) {
      // Drop on the top of the drop node
      ar.splice(i!, 0, dragObj!);
    } else {
      // Drop on the bottom of the drop node
      ar.splice(i! + 1, 0, dragObj!);
    }
    setGData(data);
  };

  const TitleRender = (props) => {
    const nodeData = props?.nodeData || {};
    return <div>{nodeData.categoryName}</div>;
  };
  return (
    <div className={styles.Drag}>
      <Tree
        className="draggable-tree"
        expandedKeys={expandedKeys}
        onExpand={(keys: any) => {
          setExpandedKeys(keys);
        }}
        draggable={{
          icon: <FullscreenOutlined />,
          nodeDraggable: (e: any) => {
            if (namesMap[e.contractCategoryUuid]) return false;
            return true;
          },
        }}
        titleRender={(nodeData: any) => {
          return <TitleRender nodeData={nodeData} />;
        }}
        blockNode
        onDrop={onDrop}
        treeData={gData}
        fieldNames={{
          title: "categoryName",
        }}
      />
    </div>
  );
};

export default Drag;
