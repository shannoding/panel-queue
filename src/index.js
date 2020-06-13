import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Panel(props) {
  return (
      <div className="panel" style={{backgroundColor: props.color}}>
        <img src={"./panel-design.jpg"} alt="panel" />
      </div>
    );
}

function Panels(props) {
  const panels = Object.values(props.panels);
  const colorPanels = panels.map((v, i) => {
      return <Panel color={v} key={i} />
    }
    );
  return (<div className="panels">{colorPanels}</div>);
}

class PanelViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    }
    this.handleNextCue = this.handleNextCue.bind(this);
    this.handlePrevCue = this.handlePrevCue.bind(this);
  }


  handleNextCue() {
    var len = Object.keys(this.props.entry['design']).length;
    const c = (this.state.current + 1) % len;
    this.setState({
      current: c
    });
  }
  handlePrevCue() {
    var len = Object.keys(this.props.entry['design']).length;
    const c = (this.state.current + len - 1) % len;
    this.setState({
      current: c
    });
  }

  render() {
    const cueStack = this.props.entry['design'];
    const c = this.state.current;
    const currentCue = cueStack[c + ""];
    console.log(currentCue);
    return (
    <div className="viewer">
      <p className="designBy">Design by {this.props.entry['user_id']}</p>
      <Panels panels={currentCue.colors} />
      <div className="viewer-controls">
      <p>Cue {c} of {Object.keys(cueStack).length}</p>
      <p>Duration: {currentCue.duration['$numberInt']}s</p>
      <button onClick={() => this.handlePrevCue()}>prev</button>
      <button onClick={() => this.handleNextCue()}>next</button>
      </div>
      </div>
    )
  }
}

function QueueEntry(props) {
  let classes = "undecided";
  const did = props.did;
    if (did === props.currentView) {
      classes = "viewing";
    }
    return (
      <div className="entry">
        <p className={classes}>{props.uid}</p>
        <ul className="options">
          <li className="view" onClick={() => props.view(did)}>view</li>
          <li className="accept" onClick={() => props.acc(did)}>accept</li>
          <li className="reject" onClick={() => props.rej(did)}>reject</li>
        </ul>
      </div>
    );
}

class Queue extends Component {
  render() {
    const queue = Object.values(this.props.queue);
    const entries = queue.map(
      (entry) => {
        return <QueueEntry did={entry['_id']['$oid']} 
                          uid={entry['user_id']}
                          acc={this.props.onAccept}
                          rej={this.props.onReject}
                          view={this.props.onView} 
                          currentView={this.props.view}
                          key={entry['_id']['$oid']} />
      }
    );
    if (queue.length === 0) {
      return (<div className="panel-queue" >
      <p>No entries</p>
      </div>)
    }
    return (
      <div className="panel-queue" >
      {entries}
      </div>
    );

  }
}

let QUEUE = [
   {
        "_id":  {"$oid":"5edc39064754c6a2c030e10f"}, // unique for each request
        "user_id":  "Srinu Lade 1",
        "design":   {
            "0":{
                "colors":{"0":"#808080","1":"#808080","2":"#808080","3":"#808080","4":"#808080","5":"#808080","6":"#808080","7":"#808080","8":"#808080","9":"#808080","10":"#808080","11":"#808080","12":"#808080","13":"#808080","14":"#808080","15":"#808080","16":"#808080","17":"#808080","18":"#808080","19":"#808080","20":"#808080","21":"#808080","22":"#808080","23":"#808080","24":"#808080","25":"#808080","26":"#808080","27":"#808080","28":"#808080","29":"#808080","30":"#808080","31":"#808080","32":"#808080","33":"#808080","34":"#808080","35":"#808080","36":"#808080","37":"#808080","38":"#808080","39":"#808080","40":"#808080","41":"#808080","42":"#808080","43":"#808080","44":"#808080","45":"#808080","46":"#808080","47":"#808080","48":"#808080","49":"#808080","50":"#808080","51":"#808080"},
                "duration":{"$numberInt":"1"}
            },
            "1":{
                "colors":{"0":"#808080","1":"#808080","2":"#808080","3":"#808080","4":"#808080","5":"#808080","6":"#808080","7":"#808080","8":"#808080","9":"#808080","10":"#808080","11":"#808080","12":"#808080","13":"#808080","14":"#808080","15":"#808080","16":"#808080","17":"#808080","18":"#808080","19":"#808080","20":"#808080","21":"#808080","22":"#808080","23":"#808080","24":"#808080","25":"#808080","26":"#808080","27":"#808080","28":"#808080","29":"#808080","30":"#808080","31":"#808080","32":"#808080","33":"#808080","34":"#808080","35":"#808080","36":"#808080","37":"#808080","38":"#808080","39":"#808080","40":"#808080","41":"#808080","42":"#808080","43":"#808080","44":"#808080","45":"#808080","46":"#808080","47":"#808080","48":"#808080","49":"#808080","50":"#808080","51":"#808080"},
                "duration":{"$numberInt":"1"}
            }
        }
    },
   {
        "_id":  {"$oid":"5edc39064754c6a2c030e10g"}, // unique for each request
        "user_id":  "Srinu Lade Srinu Lade 2",
        "design":   {
            "0":{
                "colors":{"0":"#808080","1":"#808080","2":"#808080","3":"#808080","4":"#808080","5":"#808080","6":"#808080","7":"#808080","8":"#808080","9":"#808080","10":"#808080","11":"#808080","12":"#808080","13":"#808080","14":"#808080","15":"#808080","16":"#808080","17":"#808080","18":"#808080","19":"#808080","20":"#808080","21":"#808080","22":"#808080","23":"#808080","24":"#808080","25":"#808080","26":"#808080","27":"#808080","28":"#808080","29":"#808080","30":"#808080","31":"#808080","32":"#808080","33":"#808080","34":"#808080","35":"#808080","36":"#808080","37":"#808080","38":"#808080","39":"#808080","40":"#808080","41":"#808080","42":"#808080","43":"#808080","44":"#808080","45":"#808080","46":"#808080","47":"#808080","48":"#808080","49":"#808080","50":"#808080","51":"#808080"},
                "duration":{"$numberInt":"1"}
            },
            "1":{
                "colors":{"0":"#808080","1":"#808080","2":"#808080","3":"#808080","4":"#808080","5":"#808080","6":"#808080","7":"#808080","8":"#808080","9":"#808080","10":"#808080","11":"#808080","12":"#808080","13":"#808080","14":"#808080","15":"#808080","16":"#808080","17":"#808080","18":"#808080","19":"#808080","20":"#808080","21":"#808080","22":"#808080","23":"#808080","24":"#808080","25":"#808080","26":"#808080","27":"#808080","28":"#808080","29":"#808080","30":"#808080","31":"#808080","32":"#808080","33":"#808080","34":"#808080","35":"#808080","36":"#808080","37":"#808080","38":"#808080","39":"#808080","40":"#808080","41":"#808080","42":"#808080","43":"#808080","44":"#808080","45":"#808080","46":"#808080","47":"#808080","48":"#808080","49":"#808080","50":"#808080","51":"#808080"},
                "duration":{"$numberInt":"1"}
            }
        }
    },
    {
        "_id":  {"$oid":"5edc39064754c6a2c030e10h"}, // unique for each request
        "user_id":  "Srinu Lade 3",
        "design":   {
            "0":{
                "colors":{"0":"#808080","1":"#808080","2":"#808080","3":"#808080","4":"#808080","5":"#808080","6":"#808080","7":"#808080","8":"#808080","9":"#808080","10":"#808080","11":"#808080","12":"#808080","13":"#808080","14":"#808080","15":"#808080","16":"#808080","17":"#808080","18":"#808080","19":"#808080","20":"#808080","21":"#808080","22":"#808080","23":"#808080","24":"#808080","25":"#808080","26":"#808080","27":"#808080","28":"#808080","29":"#808080","30":"#808080","31":"#808080","32":"#808080","33":"#808080","34":"#808080","35":"#808080","36":"#808080","37":"#808080","38":"#808080","39":"#808080","40":"#808080","41":"#808080","42":"#808080","43":"#808080","44":"#808080","45":"#808080","46":"#808080","47":"#808080","48":"#808080","49":"#808080","50":"#808080","51":"#808080"},
                "duration":{"$numberInt":"1"}
            },
            "1":{
                "colors":{"0":"#808080","1":"#808080","2":"#808080","3":"#808080","4":"#808080","5":"#808080","6":"#808080","7":"#808080","8":"#808080","9":"#808080","10":"#808080","11":"#808080","12":"#808080","13":"#808080","14":"#808080","15":"#808080","16":"#808080","17":"#808080","18":"#808080","19":"#808080","20":"#808080","21":"#808080","22":"#808080","23":"#808080","24":"#808080","25":"#808080","26":"#808080","27":"#808080","28":"#808080","29":"#808080","30":"#808080","31":"#808080","32":"#808080","33":"#808080","34":"#808080","35":"#808080","36":"#808080","37":"#808080","38":"#808080","39":"#808080","40":"#808080","41":"#808080","42":"#808080","43":"#808080","44":"#808080","45":"#808080","46":"#808080","47":"#808080","48":"#808080","49":"#808080","50":"#808080","51":"#808080"},
                "duration":{"$numberInt":"1"}
            }
        }
    }
]

class QueueView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queue: QUEUE,
      currentViewID: null
    }

    this.removeDesignID = this.removeDesignID.bind(this);
    this.removeFromQueue = this.removeFromQueue.bind(this);
    this.getEntryFromID = this.getEntryFromID.bind(this);
    this.sendTheme = this.sendTheme.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.handleView = this.handleView.bind(this);

  }

  componentDidMount() {
    // // Initialize the App Client
    // this.client = Stitch.initializeDefaultAppClient("pausch-bridge-pmulj");
    // // Get a MongoDB Service Client
    // // This is used for logging in and communicating with Stitch
    // const mongodb = this.client.getServiceClient(
    //   RemoteMongoClient.factory,
    //   "mongodb-atlas"
    // );
    // // Get a reference to the todo database
    // this.collection = mongodb.db("bridge").collection("designs");
    // this.client.auth
    //   .loginWithCredential(new AnonymousCredential())
    //   .then(() => console.log("Authenticated"))
    //   .catch(console.error);
  }

  getRequests() {
    alert("Get requests");
    // this.collection
    //   .find()
    //   .toArray()
    //   .then((results) => this.setState({ queue: results }))
    //   .catch((err) => console.error("Failed to get requests" + { err }));
  }

  removeDesignID(id) {
    // go to database and remove with designID

  }

  removeFromQueue(id, queue) {
    return queue.filter(obj => (obj['_id']['$oid'] !== id));
  }

  getEntryFromID(id, queue) {
    for (var i = 0; i < queue.length; i++) {
      if (queue[i]['_id']['$oid'] === id) {
        return queue[i];
      }
    }
    throw "Invalid design ID";
  }

  async sendTheme(id) {
    const entry = this.getEntryFromID(id, this.state.queue);
      // code copied from previous sendTheme button in front end
    const res = await fetch("http://pbridge.adm.cs.cmu.edu:5000/theme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: entry['user_id'], panels: entry['design'] }), // this should be written however necessary to match backend code
    });

    const ans = await res.json();
    console.log(ans);
  }

  handleAccept(id) {
    let c = this.state.currentViewID;
    if (id === c) {
      c = null;
    }
    this.setState({
      queue: this.removeFromQueue(id, this.state.queue),
      currentViewID: c
    });

    this.sendTheme(id);
    this.removeDesignID(id);
  }

  handleReject(id) {
    let c = this.state.currentViewID;
    if (id === c) {
      c = null;
    }
    this.setState({
      queue: this.removeFromQueue(id, this.state.queue),
      currentViewID: c
    });

    this.removeDesignID(id);
  }

  handleView(id) {
    if (id === this.state.currentViewID) {
      this.setState({
        currentViewID: null,
      });
    }
    else {
      this.setState({
        currentViewID: id,
      });
    }
    
  }



  render() {
    let currentView;
    console.log(this.state.currentViewID);
    if (this.state.currentViewID === null) {
      currentView = <p>No current view</p>;
    }
    else {
      const entry = this.getEntryFromID(this.state.currentViewID, this.state.queue);
      currentView = <PanelViewer entry={entry} key={entry['_id']['$oid']} />
    }



    return (
      <div className="queue-view">
        <div className="queue">
        <div className="loadmore"><button onClick={() => this.getRequests()}>Load more</button></div>
          <Queue queue={this.state.queue} 
                onAccept={(i) => this.handleAccept(i)}
                onReject={(i) => this.handleReject(i)} 
                onView={(i) => this.handleView(i)} 
                view={this.state.currentViewID} />
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
      loggedIn: false,
      value: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  checkLogin(value) {
    if (value === process.env.REACT_APP_PASS) {
      this.setState({
        loggedIn:true
      });
    }
    else {
      alert('Incorrect password.')
      this.setState({
        value: ""
      });
    }
  }

  handleLogin(event) {
    event.preventDefault();
    this.checkLogin(this.state.value);
  }

  render() {
    if (this.state.loggedIn) {
      return <QueueView />;
    }
    return (
    <div id="login">
      <form onSubmit={(e) => this.handleLogin(e)}>
        <label>Password:
        <input type="password" name="password" 
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
