import React, {
  Component
} from 'react'
import WebSocket from 'websocket'
import '../../Style.css'
export default class Chat extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      name: '',
      message: '',
      socket: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const socket = io.connect('http://localhost:3000');
    this.setState({ socket: socket })
    socket.onmessage = function (event) {
      console.log(event)
      const incomingMessages = event.data;
    }

    // when another person adds a message
    socket.on('messageBraodcast', (newMessage) => {
      const messages = this.state.messages.slice();
      messages.push(newMessage)

      this.setState({ messages })
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, message } = this.state;
    if (name !== '' && message !== '') {
      const newMessage = { name, message }
      const messages = this.state.messages.slice();
      messages.push(newMessage)

      this.setState({
        messages,
        message: ''
      })
      this.state.socket.emit('message', newMessage);
    }
  }

  render() {
    const messages = [];

    for (let i = 0; i < this.state.messages.length; i++) {
      const message = this.state.messages[i]
      messages.push(
        <div key={i}>
          <span className="message-name"><strong>{message.name}: </strong></span>
          <span classname="message">{message.message}</span>
        </div>
      )
    }
    // this.setState({messages: incomingMessages})
    return (
      <div className="chat-box">
        <form onSubmit={this.handleSubmit}>
          <input name='name' type="text" id="name" placeholder="Enter your name" value={this.state.name} onChange={this.handleChange} /><br />
          <input name='message' type="text" id="textField" placeholder="Message" value={this.state.message} onChange={this.handleChange} value={this.state.message} /><br />
          <button id='submit-message'> Send </button>
        </form>
        <div className='chat'>
          <div className='indivMessage' > {messages} </div>
        </div>
      </div>
    )
  }
}