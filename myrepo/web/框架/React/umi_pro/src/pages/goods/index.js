import styles from './index.css';
import {Component} from 'react'
import {connect} from 'dva';
import {Card, Button} from "antd";

// export default function() {
//   return (
//     <div className={styles.normal}>
//       <h1>商品列表</h1>
//     </div>
//   );
// }

@connect(
  state => ({
    goodList: state.goods
  }),
  // (state, props)=>{
  //   return {
  //     ...state,
  //     ...props
  //   }
  // },
  {
    // addGood: name => ({
    //   type: 'goods/addGood',
    //   title: name
    // })
    addGood: name => {
      return {
        type: 'goods/addGood',
        title: name
      }
    },
    initGood: ()=>{
      return {
        type: 'goods/getList'
      }
    }
  }
)
class Goods extends Component {
  componentDidMount() {
    this.props.initGood()
  }
  render() {
    return (
      <div className={styles.normal}>
        <h1>商品列表</h1>
        <ul>
          {this.props.goodList.map(good => <Card>{good.title}</Card>)}
        </ul>
        <Button onClick={()=>{this.props.addGood(`python ${new Date().getTime()}`)}}>添加</Button>
      </div>
    )
  }
}


export default Goods
