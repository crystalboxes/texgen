import React from "react"
import { DisplayableComponent } from './DisplayableComponent.jsx'
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time

export class ScriptComponent extends DisplayableComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeDrags: 0,
      deltaPosition: {
        x: 0, y: 0
      },
      controlledPosition: {
        x: -400, y: 200
      }
    }
  }

  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };

  onStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags });
  };

  onStop = () => {
    this.setState({ activeDrags: --this.state.activeDrags });
  };

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop }
    return <Draggable handle="strong" {...dragHandlers}>
      <div className={this.instance.className}>
        <strong className="cursor"><div>Drag here</div></strong>
        <div className='paramsContainer'>{this.getElements()}</div>
      </div>
    </Draggable>

  }
}
// {/*  */}