class TouchHandler {
  xDown = null;
  yDown = null;

  getTouches(event) {
    return event.touches || event.originalEvent.touches;
  }

  handleTouchStart(event) {
    const firstTouch = this.getTouches(event)[0];
    this.xDown = firstTouch.clientX;
    this.yDown = firstTouch.clientY;
  }

  handleTouchEnd(event) {
    if (!this.xDown || !this.yDown ) {
      return;
    }

    const xUp = event.changedTouches[0].clientX;
    const yUp = event.changedTouches[0].clientY;

    const xDiff = this.xDown - xUp;
    const yDiff = this.yDown - yUp;

    let direction = null;

    if (Math.abs(xDiff) > Math.abs( yDiff )) {
      if (Math.abs(xDiff) > 100) {
        direction = ( this.xDown > xUp ) ? "left" : "right";
      }
    }
    else {
      if (Math.abs(yDiff) > 100) {
        direction = ( this.yDown > yUp ) ? "down" : "up";
      }
    }
    this.xDown = null;
    this.yDown = null;

    return direction;
  }
}

export default TouchHandler;
