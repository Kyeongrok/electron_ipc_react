import React, {Component} from 'react'
import {render} from 'react-dom'
import {ipcRenderer} from 'electron';
import {} from './styles/global.css'
import Logo from './components/Logo.jsx'
import Link from './components/Link.jsx'
import schedules from './json/schedules';
import PrintSchedule from './components/PrintSchedule.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "ready",
      sourceId: 1947284,
      interval: null,
      isShowSchedules: false,
      event:{},
      teams:[],
      callStarTime:'',
      callEndTime:''
    }
  }

  componentDidMount() {
    console.log(schedules.schedules);
    ipcRenderer.on('PRINT_TEXT', (_e, jsonString) => {
      try {
        const teams = JSON.parse(jsonString);
        console.log(teams);

         this.setState({teams: teams});
      } catch (e) {
        console.log(e);
      }
    });
  }

  callApi() {
    console.log(`callApi:${this.state.sourceId}`);
    ipcRenderer.send('REQUEST_EVENT', this.state.sourceId);
  }

  handleClickStartButton() {
    let interval = setInterval(() => {
      this.callApi();
    }, 1000);
    this.setState({interval: interval, mode: 'start'});
  }

  handleClickEndButton() {
    clearInterval(this.state.interval);
    this.setState({mode: 'ready'});
  }

  handleChangeTf(event) {
    this.setState({sourceId: event.target.value})
  }

  handleToggleSchedules() {
    if (this.state.isShowSchedules == true) {
      this.setState({isShowSchedules: false})
    } else {
      this.setState({isShowSchedules: true})
    }

  }

  render() {
    let homeScore = 0;
    let awayScore = 0;

    try{
      homeScore = this.state.teams[0].score;
      awayScore = this.state.teams[1].score;
    }catch(e){
      console.log('score is null');
    }

    return (
      <div>
        <div>
          <h1>{this.state.mode}</h1>
        </div>
        <div>
          <p>사용방법</p>
          <p>sourceId를 입력하고 start를 누르면 됩니다. 정지는 end를 누르면 됩니다.</p>
          <p>sourceId를 알아내는 방법은 show schedules버튼을 누릅니다. 한번 더 누르면 닫힙니다.</p>

        </div>
        <div className="hello">
          <h1>{homeScore}:{awayScore}</h1>
        </div>
        <input type="text" value={this.state.sourceId} onChange={(event) => this.handleChangeTf(event)}/>
        <button onClick={() => this.handleClickStartButton()}>{'start'}</button>
        <button onClick={() => this.handleClickEndButton()}>{'end'}</button>
        <button onClick={() => this.handleToggleSchedules()}>{'show schedule'}</button>

        {this.state.isShowSchedules === true ? <PrintSchedule schedules={schedules.schedules}/> : null}
      </div>
    )
  }
}
