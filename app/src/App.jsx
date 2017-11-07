import React, {Component} from 'react'
import {render} from 'react-dom'
import {ipcRenderer} from 'electron';
import {} from './styles/global.css'
import Logo from './components/Logo.jsx'
import Link from './components/Link.jsx'

export default class App extends Component {

  componentDidMount() {
    ipcRenderer.on('PRINT_TEXT', (_e, text) => {
      try {
        console.log('text:', text);

        $('#result_area').append(JSON.stringify(text));
        fs.writeFile('./message2.txt', JSON.stringify(text));
      } catch (e) {
        console.log(e);
      }
    });
  }
    render() {

      return (
        <div>
              <div className="hello">
                  <h1>Hello React3!</h1>
              </div>

              <p>
                  into build/, how global and scoped CSS work, how to compose
                  React components, or simply how Webpack changes relative
                  image paths to public paths after building.
              </p>

              <p>
                  Check out the docs for&nbsp;
                  <Link to='http://electron.atom.io/docs/'>Electron</Link>,&nbsp;
                  <Link to='https://facebook.github.io/react/docs/hello-world.html'>React </Link> and&nbsp;
                  <Link to='https://webpack.js.org/configuration/'>Webpack 2</Link>.
                  Customize this template as you wish by adding any fancy tool
                  you are used to. If you have any issue, please file an issue at this seed's&nbsp;
                  <Link to='https://github.com/pastahito/electron-react-webpack'>
                  repository</Link>.
              </p>
          </div>
      )
    }
}
