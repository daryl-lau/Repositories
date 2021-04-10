import React, { PureComponent } from "react";

import { Sticky, StickyContainer } from "../index";
import { Header } from "./Header";
import './index.css'

let renderCount = 0;
export class Basic extends PureComponent {
  render() {
    return (
      <div>
        <h2>Content before the Sticky...</h2>
        <div
          className="gap short"
          style={{ background: "linear-gradient(#fff, #ddd)" }}
        />
        <StickyContainer className="container">
          <Sticky>
            {({ style }) => (
              <Header style={style} renderCount={renderCount++} />
            )}
          </Sticky>

          <h2 className="text-center">{"<StickyContainer />"}</h2>
        </StickyContainer>
        <div
          className="gap tall"
          style={{ background: "linear-gradient(#ddd, #fff)" }}
        >
          <h2>Content after the Sticky...</h2>
        </div>
      </div>
    );
  }
}

export default Basic