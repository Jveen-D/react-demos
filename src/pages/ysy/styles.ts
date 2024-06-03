import { createStyles } from "antd-style";
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
		Ysy: css`
		#videoElement{
			width: 800px;
			height: 600px;
		}
		`,
	};
});
export default useStyles;
