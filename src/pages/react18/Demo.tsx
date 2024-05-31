import React from "react";
import useStyles from "./styles";

type DemoProps = {};

const Demo: React.FC<DemoProps> = (props) => {
	const { sunNum } = props;
	console.log("Demo render");

	return <div>{sunNum}</div>;
};

export default Demo;
