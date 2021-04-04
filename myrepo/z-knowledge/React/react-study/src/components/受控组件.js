import React from 'react'

class ControlComp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            text: '',
            textarea: '',
            city: 'bj',
            isChecked: true
        }
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = name === 'isChecked' ? e.target.checked : e.target.value
        this.setState({
            [name]: value
        })
    }

    render () {
        return (
            <div>
                <p><input name="text" onChange={this.handleChange} value={this.state.text} /></p>
                <textarea name="textarea" onChange={this.handleChange} value={this.state.textarea}></textarea><br />
                <select name="city" onChange={this.handleChange} value={this.state.city}>
                    <option valus="bj">北京</option>
                    <option valus="sh">上海</option>
                    <option valus="sz">深圳</option>
                </select>
                <br />
                <input name="isChecked" type="checkbox" checked={this.state.isChecked} onChange={this.handleChange} />
            </div>
        )
    }
}

export default ControlComp