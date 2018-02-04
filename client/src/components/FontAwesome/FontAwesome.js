import React from 'react'
import PropTypes from 'prop-types'

export default class FontAwesome extends React.Component {
    render() {
        const { name } = this.props

        return (
            <i className={name}></i>
        )
    }
}

FontAwesome.props = {
    name: PropTypes.string
}