import { createStyles } from "antd-style";
import GanttProject from ".";
const useStyles = createStyles(({ cx, css, prefixCls, token, responsive }) => {
	/**
	 * 🚀 xs: 575
	 * 🚀 sm: 767
	 * 🚀 md: 991
	 * 🚀 lg: 1199
	 * 🚀 xl: 1599
	 * 🚀 xxl: 1600
	 * */
	return {
		GanttProject: css`
			width: 80%;
			margin: 0 auto;
			.gantt .bar-milestone .bar {
				fill: tomato;
			}
			.heading {
				text-align: center;
			}
			.gantt-target.dark {
				background-color: #252525;
			}
		`,
	};
});
export default useStyles;
