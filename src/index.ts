import { Component, createElement } from "react"
import React from 'react';
import ReactDOM from 'react-dom';
import screenfull from 'screenfull';

export type IReactComponent<P = any> =
  | React.StatelessComponent<P>
  | React.ComponentClass<P>
  | React.ClassicComponentClass<P>

function getDisplayName(Cpt: IReactComponent) {
  // @ts-ignore
  return Cpt.displayName || Cpt.name || 'Component';
}

export default (Cpt: IReactComponent) => {
  let last: number = 0;
  let interval = 300;
  return (millisecond: number) => {
    if (millisecond) {
      interval = millisecond;
    }
    return class Screenfuller extends Component {
      static displayName = `Screenfuller(${getDisplayName(Cpt)})`

      componentDidMount() {
        if (super.componentDidMount) {
          super.componentDidMount();
        }
        const el = ReactDOM.findDOMNode(this);
        el.addEventListener('click', () => {
          const now = +new Date();
          if (now - last < interval) {
            if (screenfull.enabled) {
              screenfull.request();
            }
          } else {
            last = now;
          }
        });
      }

      render() {
        return createElement(Cpt, this.props)
      }
    };
  }
};