import React, { Component } from 'react'
import { ToolBar } from './ToolBar'

export default class BacktoTop extends Component {

  ScrollTop = (scrollDuration) => {
    let cosParameter = window.scrollY / 2,
        scrollCount = 0,
        oldTimestamp = performance.now();
    const step = (newTimestamp) => {
      scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
      if (scrollCount >= Math.PI) window.scrollTo(0, 0);
      if (window.scrollY === 0) return;
      window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
      oldTimestamp = newTimestamp;
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  render() {
    return (
      <ToolBar onClick={(e) => this.ScrollTop(500, e)} border>
        ページの先頭へ
      </ToolBar>
    )
  }

}
