import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import { Grid, Button, Modal } from 'antd-mobile'
import config from '../../config'
import { isAuth } from '../../utils'
import { getUserInfo, logout } from '../../api'


const alert = Modal.alert;

// 默认头像
const DEFAULT_AVATAR = config.baseURL + '/img/profile/avatar.png'

// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
  { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record' },
  {
    id: 4,
    name: '成为房主',
    iconfont: 'icon-identity'
  },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust' }
]

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: isAuth(),
      userInfo: {}
    }
  }

  token = ''

  componentDidMount () {
    this.getUserInfo()
  }

  getUserInfo = async () => {
    const { isLogin } = this.state
    if (!isLogin) {
      return
    } else {
      this.token = localStorage.getItem('hkzf_token')
      const { data: res } = await getUserInfo(this.token)
      console.log(res);
      if (res.status === 400) {
        this.setState({
          isLogin: false
        })
      } else if (res.status === 200) {
        this.setState({
          userInfo: res.body
        })
      }
    }
  }

  logout = () =>
    alert('提示', '是否确定退出？', [
      {
        text: '确定', onPress: async () => {
          await logout(this.token)
          localStorage.removeItem('hkzf_token')
          this.setState({
            isLogin: false,
            userInfo: {}
          })
        }
      },
      { text: '再看看', onPress: () => { return } },
    ])

  render () {
    const { nickname, avatar } = this.state.userInfo
    return (
      <div className={styles.root}>
        {/* 个人信息 */}
        <div className={styles.title}>
          <img
            className={styles.bg}
            src={config.baseURL + '/img/profile/bg.png'}
            alt="背景图"
          />
          <div className={styles.info}>
            <div className={styles.myIcon}>
              <img
                className={styles.avatar}
                src={avatar ? config.baseURL + avatar : DEFAULT_AVATAR}
                alt="icon"
              />
            </div>
            <div className={styles.user}>
              <div className={styles.name}>{nickname || ''}</div>
              {
                this.state.isLogin ? (<>
                  <div className={styles.auth}>
                    <span onClick={this.logout}>退出</span>
                  </div>
                  <div className={styles.edit}>
                    编辑个人资料
                      <span className={styles.arrow}>
                      <i className="iconfont icon-arrow" />
                    </span>
                  </div>
                </>) : (<div className={styles.edit}>
                  <Button
                    type="primary"
                    size="small"
                    inline
                    onClick={() => this.props.history.push('/login')}
                  >
                    去登录
                        </Button>
                </div>)
              }
            </div>
          </div>
        </div>

        {/* 九宫格菜单 */}
        <Grid
          data={menus}
          columnNum={3}
          hasLine={false}
          renderItem={item =>
            item.to ? (
              <Link to={item.to}>
                <div className={styles.menuItem}>
                  <i className={`iconfont ${item.iconfont}`} />
                  <span>{item.name}</span>
                </div>
              </Link>
            ) : (
                <div className={styles.menuItem}>
                  <i className={`iconfont ${item.iconfont}`} />
                  <span>{item.name}</span>
                </div>
              )
          }
        />

        {/* 加入我们 */}
        <div className={styles.ad}>
          <img src={config.baseURL + '/img/profile/join.png'} alt="" />
        </div>
      </div >
    )
  }
}