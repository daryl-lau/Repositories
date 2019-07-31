import React, {Component} from 'react';

const Context = React.createContext();
const Provider = Context.Provider;
const Consumer = Context.Consumer;


let store = {
    'name': '徐凤年',
    'sayHi': function () {
        alert('技术活，当赏！')
    }
};

class ContextExp extends Component {
    render() {
        // Provider包一层，把数据传下去,value属性名是固定的
        return <Provider value={store}>
            {/*Consume接收数据，存放在value中，调用数据时需要用函数传参来调用*/}
            <Consumer>
                {
                    (store) => {
                        return (
                            <div onClick={store.sayHi}>
                                {store.name}
                            </div>
                        )
                    }
                }
            </Consumer>
        </Provider>
    }
}

export default ContextExp