import styles from './index.css';
import {Component} from 'react'
import {connect} from 'dva';

// export default function() {
//   return (
//     <div className={styles.normal}>
//       <h1>商品列表</h1>
//     </div>
//   );
// }

@connect(
  state => ({
    // goodList: state.goods
  }),
  {
    addGood: name => ({
      type: 'goods/addGood',
      title: name
    })
  }
)
class Goods extends Component {
  render() {
    return (
      <div className={styles.normal}>
        <h1>商品列表</h1>
        <ul>
          {/*{this.props.goodList.map(good => <li>{good.title}</li>)}*/}
        </ul>
      </div>
    )
  }
}


export default Goods
