import React, {Component} from 'react';
import './Cart.css'

function CartShow(props) {
    console.log('cart', props.cart);
    return (
        <div>
            <ul>
                {props.cart.map(item =>
                    <li key={item.id}>
                        商品号：{item.id},
                        商品：{item.name},
                        总价：¥{item.count * item.price},
                        <button onClick={() => props.reduceCount(item)}>-</button>
                        {item.count}
                        <button onClick={() => props.addCount(item)}>+</button>
                    </li>)}
            </ul>
        </div>
    )
}

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            goods: [{id: 1, name: '鞋子', price: 99}, {id: 2, name: '裤子', price: 80}, {id: 3, name: '衣服', price: 120}],
            text: '',
            price: 0,
            // cart: [{id:1, name:'aaa', count: 2, allprice: 2321}]
            cart: [],
        }
    }

    goodChange = (e) => {
        this.setState({
            text: e.target.value
        })
    };

    priceChange = (e) => {
        this.setState({
            price: e.target.value
        })
    };

    // {/* 解决this指向的三种方法2、使用箭头函数函数赋值 */}
    addGood = () => {
        this.setState(prevState => {
            let le = prevState.goods.length + 1;
            if (this.state.text && this.state.price) {
                return {
                    goods: [...prevState.goods, {id: le, name: this.state.text, price: this.state.price}]
                };
            }
        })
    };

    addToCart = (good) => {
        this.setState(prevState => {
            if (prevState.cart.filter(g => g.id === good.id).length > 0) {

                // 错误写法，map出来的应该还是一个对象的数组，下面这样写的话，i.count++ 返回的是一个数字
                // return {cart: prevState.cart.map(i => i.id === good.id ? i.count++ : i)}

                // 并且由于修改对象里面的count不会改变数组的指针引用，所以不会导致页面刷新，需要将新的数组重新赋值给cart，触发页面渲染

                return {cart: prevState.cart.map(i => i.id === good.id ? {...i, count: i.count += 1} : i)}
            } else {
                return {
                    cart: [...prevState.cart, {
                        id: good.id,
                        name: good.name,
                        count: 1,
                        price: parseFloat(good.price)
                    }]
                }
            }
        });
    };

    addCount = (item) => {
        let newCart = [...this.state.cart];
        let index = newCart.findIndex(i => i.id === item.id);
        newCart.splice(index, 1, {...item, count: item.count += 1});
        this.setState({cart: newCart})
    };
    reduceCount = (item) => {
        let newCart = [...this.state.cart];
        let index = newCart.findIndex(i => i.id === item.id);
        newCart.splice(index, 1, {...item, count: item.count === 0 ? 0 : item.count -= 1});

        // 如果数量为零，则移除
        let result = newCart.filter(g => g.count !== 0);
        this.setState({cart: result})
    };


    render() {
        const title = this.props.title ? <h2>{this.props.title}</h2> : null;
        return (
            <div>
                {title}

                <div>添加商品</div>

                {/* React是单向数据流，不是双向绑定 */}
                <input type="text" name="" title="" placeholder="商品名" ref="good" onChange={(e) => {
                    this.goodChange(e)
                }}/>
                <input type="text" name="" title="" placeholder="单价(默认是0)" ref="price" onChange={(e) => {
                    this.priceChange(e)
                }}/>

                {/* 解决this指向的三种方法1、this.fn.bind(this) */}
                {/*<button onClick={this.addGood.bind(this)}>添加</button>*/}


                {/*
                               ！！！！！！！！！！！！重要！！！！！！！！！！！

                 在render()中，不能直接调用函数，例如下面的 this.addToCart(good), 这样页面渲染的时候，会执行该函数，而该函数
                 又进行了setState操作，导致页面重新渲染，又执行该函数，导致陷入死循环，控制台报[Maximum update depth exceeded.]错误

                 正确的方法是使用 ()=>{this.addToCart(good)}

                 注意! 下面的onClick={this.addGood} 并没有直接调用，该写法和 ()=>{this.addGood()} 是一样的，然而后面的this.addToCart(good)
                 需要传参，所以必须使用()=>{this.addToCart(good)}
                */}
                <button onClick={this.addGood}>添加</button>
                {/*<button onClick={() => this.addGood()}>添加</button>*/}

                <ul>
                    {this.state.goods.map(good => {
                        return (
                            <li key={good.id}>{good.name}，￥{good.price}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button onClick={() => {
                                    this.addToCart(good)
                                }}>加入购物车
                                </button>
                            </li>
                        )
                    })}
                </ul>
                <p>------------</p>
                <CartShow cart={this.state.cart} addCount={this.addCount} reduceCount={this.reduceCount}/>
            </div>
        )
    }
}

export default Cart;