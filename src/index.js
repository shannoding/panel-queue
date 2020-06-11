import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Panel(props) {
  const r = props.rgb.r;
  const g = props.rgb.g;
  const b = props.rgb.b;
  const rgba = "rgba(" + r + "," + g + "," + b + ", 0.5)";

  return (
      <div className="panel" style={{backgroundColor: rgba}}>
        <img src={"./panel-design.jpg"} alt="panel" />
      </div>
    );
}

function Panels(props) {
  const rgbPanels = props.panels.map((v, i) => {
      return <Panel rgb={v} key={i} />
    }
    );
  return (<div key={props.id}>{rgbPanels}</div>);
}

class PanelViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.cueStack.name,
      cueStack: this.props.cueStack.panels,
      current: 0,
      stackLength: this.props.cueStack.panels.length
    }
    this.handleNextCue = this.handleNextCue.bind(this);
    this.handlePrevCue = this.handlePrevCue.bind(this);
  }


  handleNextCue() {
    const c = (this.state.current + 1) % this.state.stackLength;
    this.setState({
      current: c,
    });
  }
  handlePrevCue() {
    const c = (this.state.current + this.state.stackLength - 1) % this.state.stackLength;
    this.setState({
      current: c,
    });
  }

  render() {
    const c = this.state.current;
    const currentCue = this.state.cueStack[c];
    return (
    <div className="viewer">
      <p>Design by {this.state.name}</p>
      <Panels panels={currentCue.panel} id={this.state.name + "-" + c} />
      <p>Cue {c} of {this.state.stackLength}</p>
      <p>Duration: {currentCue.duration}s</p>
      <button onClick={() => this.handlePrevCue()}>prev</button>
      <button onClick={() => this.handleNextCue()}>next</button>
      </div>
    )
  }
}

class Queue extends Component {
  renderEntry(value, index, acc, rej, view) {
    let classes = "undecided";
    if (value.accepted === null) {
      if (index === this.props.view) {
        classes = "viewing";
      }
    }
    else if (value.accepted) {
      classes = " accepted";
      return;
    }
    else {
      classes = "rejected";
      return;
    }

    return (
      <div className="entry" key={index}>
        <p className={classes}>{value.name}</p>
        <ul className="options">
          <li className="view" onClick={() => view(index)}>view</li>
          <li className="accept" onClick={() => acc(index)}>accept</li>
          <li className="reject" onClick={() => rej(index)}>reject</li>
        </ul>
      </div>
    );
  }
  render() {
    const queue = this.props.queue.map(
      (value, index) => {
        return this.renderEntry(value, index, this.props.onAccept, this.props.onReject, this.props.onView);
      }
    );
    console.log(queue.length);
    if (queue.length === 0) {
      console.log("wack yo");
    }
    return (
      <div className="panel-queue">
      {queue}
      </div>
    );

  }
}

let QUEUE = [
  {
    "name": "Jerry",
    "panels": [
    { "duration": 5, "panel": [{"r": 255, "g": 0, "b": 0}, {"r": 0, "g": 255, "b": 0}, {"r": 0, "g": 0, "b": 255}] },
    { "duration": 5, "panel": [{"r": 0, "g": 100, "b": 0}] },
    { "duration": 5, "panel": [{"r": 0, "g": 0, "b": 100}] },
    ],
    "accepted": null,
    "designID": 0
  },
  {
    "name": "Kerry",
    "panels": [
    { "duration": 3, "panel": [{"r": 100, "g": 0, "b": 0}] },
    { "duration": 3, "panel": [{"r": 0, "g": 100, "b": 0}] },
    { "duration": 3, "panel": [{"r": 0, "g": 0, "b": 100}] },
    ],
    "accepted": null,
    "designID": 1
  },
  {
    "name": "Lerry",
    "panels": [
    { "duration": 1, "panel": [{"r": 100, "g": 0, "b": 0}] },
    { "duration": 1, "panel": [{"r": 0, "g": 100, "b": 0}] },
    { "duration": 1, "panel": [{"r": 0, "g": 0, "b": 100}] },
    ],
    "accepted": null,
    "designID": 2
  },
  {
    "name": "Merry",
    "panels": [
    { "duration": 5, "panel": [{"r": 100, "g": 0, "b": 0}] },
    { "duration": 5, "panel": [{"r": 0, "g": 100, "b": 0}] },
    { "duration": 5, "panel": [{"r": 0, "g": 0, "b": 100}] },
    ],
    "accepted": null,
    "designID": 3
  },
  {
    "name": "Nerry the Platypus",
    "panels": [
    { "duration": 3, "panel": [{"r": 100, "g": 0, "b": 0}] },
    { "duration": 3, "panel": [{"r": 0, "g": 100, "b": 0}] },
    { "duration": 3, "panel": [{"r": 0, "g": 0, "b": 100}] },
    ],
    "accepted": null,
    "designID": 4
  },
  {
    "name": "Oerry",
    "panels": [
    { "duration": 1, "panel": [{"r": 100, "g": 0, "b": 0}] },
    { "duration": 1, "panel": [{"r": 0, "g": 100, "b": 0}] },
    { "duration": 1, "panel": [{"r": 0, "g": 0, "b": 100}] },
    ],
    "accepted": null,
    "designID": 5
  }
]

class QueueView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queue: QUEUE,
      accepted: [],
      rejected: [],
      currentView: null
    }
  }

  handleAccept(i) {
    let queue = this.state.queue.slice();
    queue[i].accepted = true;
    this.state.accepted.push(i);
    let c = this.state.currentView
    if (i === c) {
      c = null;
    }
    this.setState({
      queue: queue,
      currentView: c
    });

    const sendTheme = async () => {
      const response = await fetch("http://pbridge.adm.cs.cmu.edu:5000/theme",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.queue[i].name,
          panels: this.state.queue[i].panels
        })
      });
      const res = await response.json();
      console.log(res);
      return res;
    }

    sendTheme();
  }

  handleReject(i) {
    let queue = this.state.queue.slice();
    queue[i].accepted = false;
    this.state.rejected.push(i);
    let c = this.state.currentView
    if (i === c) {
      c = null;
    }
    this.setState({
      queue: queue,
      currentView: c
    });
  }

  handleView(i) {
    if (i === this.state.currentView) {
      this.setState({
        currentView: null,
      });
    }
    else {
      this.setState({
        currentView: i,
      });
    }
    
  }



  render() {
    let currentView;
    if (this.state.currentView === null) {
      currentView = <p>No current view</p>;
    }
    else {
      let cueStack = this.state.queue[this.state.currentView];
      currentView = <PanelViewer cueStack={cueStack} key={this.state.currentView} />
    }



    return (
      <div className="queue-view">
        <div className="queue">
          <Queue queue={this.state.queue} 
                onAccept={(i) => this.handleAccept(i)}
                onReject={(i) => this.handleReject(i)} 
                onView={(i) => this.handleView(i)} 
                view={this.state.currentView} />
        </div>
        {currentView}
      </div>
    );
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: "test",
      loggedIn: false,
      value: ""
    }
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  handleLogin(event) {
    event.preventDefault();
    if (this.state.value === this.state.pass) {
      this.setState({
        loggedIn:true
      });
    }
    else {
      alert('Incorrect password. Hint: the password is "test"')
      this.setState({
        value: ""
      });
    }
  }

  render() {
    if (this.state.loggedIn) {
      return <QueueView />;
    }
    return (
    <div id="login">
      <form onSubmit={(e) => this.handleLogin(e)}>
        <label>Password:
        <input type="text" name="password" 
            value={this.state.value} onChange={(e) => this.handleChange(e)} />
        </label>
        <input type="submit" value="Submit" />
      </form>

    </div> )
  }
}

// ========================================

ReactDOM.render(
  <Login />,
  document.getElementById('root')
);
