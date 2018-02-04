import React from 'react'
import PropTypes from "prop-types"
import cx from 'classnames'
import constants from './constants.js'

const Col = ({
    children,
    className,
    node: C = 'div',
    s,
    m,
    l,
    offset,
    ...other
  }) => {
    let sizes = { s, m, l };
    let classes = { col: true };
    constants.SIZES.forEach(size => {
        classes[size + sizes[size]] = sizes[size];
    })

    if (offset) {
        offset.split(' ').forEach(off => {
            classes['offset-' + off] = true;
        })
    }

    return (
        <C {...other} className={cx(classes, className)}>
            {children}
        </C>
    )
}

Col.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    l: PropTypes.number,
    m: PropTypes.number,
    node: PropTypes.node,
    offset: PropTypes.string,
    s: PropTypes.number
}

export default Col