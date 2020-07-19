import React, { Component } from "react";
import { createBrowserHistory } from "history";
import pathToReg from "path-to-regexp";

const RouterContext = React.createContext();
const Provider = RouterContext.Provider
const Consumer = RouterContext.Consumer

export class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory(this.props);
    // console.log(this.history, this.props);
    this.state = {
      location: this.history.location
    };

    // history.listen 默认有一个返回的函数，用来注销监听
    this.unlisten = this.history.listen(location => {
      this.setState({
        location
      });
    });
  }
  componentWillUnmount () {
    if (this.unlisten) {
      this.unlisten();
    }
  }
  render () {
    let value = {
      history: this.history,
      location: this.state.location
    };
    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    )
  }
}

export class Route extends Component {
  render () {
    return (
      <Consumer>
        {value => {
          let { path, component: Component, exact = false }
            = this.props;
          let pathname = value.location.pathname;
          // 要使⽤路径中找到的键填充的数组
          let keys = [];
          let reg = pathToReg(path, keys, { end: exact });

          keys = keys.map(item => item.name);
          let result = pathname.match(reg);
          let [url, ...values] = result || [];
          //path="list/:user"
          let props = {
            location: value.location,
            history: value.history,
            match: {
              //params:{id:123}
              params: keys.reduce((obj, current, index) => {
                console.log(keys);
                obj[current] = values[index];
                console.log(obj);
                return obj;
              }, {})
            }
          };
          if (result) {
            return <Component {...props}></Component>;
          }
          return null;
        }}
      </Consumer>
    );
  }
}


export class Link extends React.Component {
  handleClick (event, history) {
    event.preventDefault();
    history.push(this.props.to);
  }
  render () {
    const { to, ...rest } = this.props;
    return (
      <Consumer>
        {context => {
          return (
            <a
              {...rest}
              onClick={event => this.handleClick(event,
                context.history)}
              href={to}
            >
              {this.props.children}
            </a>
          );
        }}
      </Consumer>
    );
  }
}
