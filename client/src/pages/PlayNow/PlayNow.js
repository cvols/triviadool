import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    },
    menu: {
        width: 200
    }
})

class TextFields extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topic: '',
            limit: ''
        }
    }

    handleTopicChange = event => {
        this.setState({ topic: event.target.value })
    }

    handleLimitChange = event => {
        this.setState({ limit: event.target.value })
    }

    render() {
        const { classes } = this.props

        return (
            <div>
                <h1>Play Now</h1>
                <div className="nav-wrapper">
                    <form>
                        <div className="input-field">
                            <input
                                id="topic"
                                type="search"
                                required
                                onChange={this.handleTopicChange}
                                value={this.state.topic}
                                name="topic"
                                placeholder="topic"
                            />
                            <label
                                className="label-icon"
                                htmlFor="topic">
                                <i className="material-icons">
                                    search
                        </i>
                            </label>
                            <i className="material-icons">
                                close
                    </i>
                            <input
                                id="limit"
                                type="number"
                                required
                                onChange={this.handleLimitChange}
                                value={this.state.limit}
                                name="limit"
                                placeholder="limit"
                            />
                            <label
                                className="label-icon"
                                htmlFor="topic">
                                <i className="material-icons">
                                    search
                        </i>
                            </label>
                            <i className="material-icons">
                                close
                    </i>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

TextFields.props = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TextFields)