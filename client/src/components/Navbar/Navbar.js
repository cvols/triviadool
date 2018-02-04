import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'

const styles = {
    root: {
        width: '100%'
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    font: {
        fontFamily: 'Indie Flower',
        fontSize: '200%',
        flex: 1
    }
}

class Navbar extends React.Component {
    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <AppBar position="fixed" color="white">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography type="title" color="inherit" className={classes.font}>
                            TriviaDuel
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

Navbar.props = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navbar)