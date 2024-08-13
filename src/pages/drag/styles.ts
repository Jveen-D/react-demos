import { createStyles } from 'antd-style'
const useStyles = createStyles(({ cx, css, prefixCls, token, responsive }, props) => {
  /**
   * 🚀 xs: 575
   * 🚀 sm: 767
   * 🚀 md: 991
   * 🚀 lg: 1199
   * 🚀 xl: 1599
   * 🚀 xxl: 1600
   * */
  return {
    Drag: css`
				.ant-tree-indent{
					display: none;
				}
				.ant-tree-treenode[draggable=false]{
					.ant-tree-draggable-icon{
						display: none;
					}
				}
			`,
  }
})
export default useStyles
