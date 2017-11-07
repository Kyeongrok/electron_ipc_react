import React, {Component}  from 'react'

export default class PrintSchedule extends Component {
  render() {
    const schedules = this.props.schedules;
    console.log(schedules);
    return (
      <div>
        <table>
          <Thead />
          <tbody>
          {schedules.map(TrSchedule)}
          </tbody>
        </table>
      </div>
    )
  }
};

const Thead = () => {
  return(
    <thead>
      <tr>
        <th>sourceId</th>
        <th>year</th>
        <th>month</th>
        <th>day</th>
        <th>hour</th>
        <th>minutes</th>
        <th>seconds</th>
      </tr>
    </thead>
    )
};

const TrSchedule = (schedule) => {
  console.log(schedule);
  return(
    <tr>
      <td>{schedule.sourceId}</td>
      <td>{schedule.year}</td>
      <td>{schedule.month}</td>
      <td>{schedule.day}</td>
      <td>{schedule.hour}</td>
      <td>{schedule.minutes}</td>
      <td>{schedule.seconds}</td>
    </tr>
  )
};
