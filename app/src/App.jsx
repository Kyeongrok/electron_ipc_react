import React, {Component} from 'react'
import {render} from 'react-dom'
import {ipcRenderer} from 'electron';
import {} from './styles/global.css'
import Logo from './components/Logo.jsx'
import Link from './components/Link.jsx'
import schedules from './json/schedules';
import PrintSchedule from './components/PrintSchedule.jsx';
import yymmddGetter from './getter/yymmddGetter';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "ready",
      sourceId: 1947284,
      interval: null,
      isShowSchedules: false,
      event: {},
      teams: [],
      callStartTime: '00:00:00',
      callEndTime: '00:00:00',
      startTimestamp:'00:00:00',
      endTimestamp:'00:00:00',
      callResult:{}
    }
  }
  componentDidMount() {
    console.log(schedules.schedules);
    ipcRenderer.on('PRINT_TEXT', (_e, jsonString) => {
      try {
        const callResult = JSON.parse(jsonString);
        console.log(callResult);
        this.setState({callResult: callResult, callEndTime: yymmddGetter(new Date()), startTimestamp:callResult.startTimestamp, endTimestamp:callResult.endTimestamp});
      } catch (e) {
        console.log(e);
      }
    });
  }

  callApi() {
    console.log(`callApi:${this.state.sourceId}`);
    const date = new Date();
    this.setState({callStartTime: yymmddGetter(date)})
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
    try {
      homeScore = this.state.callResult.teams[0].score;
      awayScore = this.state.callResult.teams[1].score;
    } catch (e) {
      console.log('score is null');
    }
    return (
      <div className="wrapper">
        <span className='size'>{this.state.mode}</span>
        <table>
          <tbody>
          <tr>
            <td className='firstColumn'></td>
            <td></td>
            <td><span className='size'>{'callStart : '}</span></td>
            <td className='timeColumn'><span className='size'>{this.state.callStartTime}</span></td>

          </tr>
          <tr>
            <td className='firstColumn'></td>
            <td></td>
            <td><span className='size_color'>{'score:'} </span></td>
            <td className='timeColumn'><span className='size_color'>{homeScore} : {awayScore}</span></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>startTimestamp:</td>
            <td className='timeColumn'>{this.state.startTimestamp}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>endTimestamp:</td>
            <td className='timeColumn'>{this.state.endTimestamp}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>timeTaken:</td>
            <td className='timeColumn'>{this.state.callResult.timeTaken}</td>
          </tr>
          <tr>
            <td className='firstColumn'></td>
            <td></td>
            <td><span className='size'>{'callEnd : '}</span></td>
            <td className='timeColumn'><span className='size'>{this.state.callEndTime}</span></td>
          </tr>
          </tbody>
        </table>
        <div className='url'>
          <a href={this.state.callResult.url}>{this.state.callResult.url}</a>
        </div>
        <div>
          <p>
            sourceId를 입력하고 start를 누르면 됩니다. 정지는 end를 누르면 됩니다.<br/>
            sourceId를 알아내는 방법은 show schedules버튼을 누릅니다. 한번 더 누르면 닫힙니다.
          </p>
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
