import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import AddCircle from '@material-ui/icons/AddCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import logoImg from '../../src/res/img/logo.png'
import { onRemoveCategoryClick, onRemoveLocationClick, DialogEvent } from '../actions';

class Header extends Component {
    renderContent = () => {
        const { classes } = this.props;
        const path = this.props.location.pathname.slice(1);
        switch (path) {
            case "categories":
                return (
                    <Grid container justify="flex-end" alignItems="flex-end">
                        <Button
                            color="inherit"
                            onClick={() => this.props.DialogEvent(true)}
                        >
                            <AddCircle className={classes.extendedIcon} />
                            Add Category
                        </Button>
                        <Button
                            color="inherit"
                            onClick={() => this.props.onRemoveCategoryClick()}
                        >
                            <RemoveCircle className={classes.extendedIcon} />
                            Remove Category
                        </Button>
                    </Grid>
                );
            case "locations":
                return (
                    <Grid container justify="flex-end" alignItems="flex-end">
                        <Button
                            color="inherit"
                            component={Link}
                            to="/locations/addLocation"
                        >
                            <AddCircle className={classes.extendedIcon} />
                            Add Location
                    </Button>
                        <Button
                            color="inherit"
                            onClick={() => this.props.onRemoveLocationClick()}
                        >
                            <RemoveCircle className={classes.extendedIcon} />
                            Remove Location
                    </Button>
                    </Grid>
                );
            default:
                return null;
        }
    }

    render() {
        const { classes } = this.props;
        const path = this.props.location.pathname.slice(1);
        console.log(path)
        return (
            <div className={classes.root}>
                <AppBar position="fixed" color="primary" className={classes.appBar}>
                    <Toolbar>
                    {path.includes('locations') || path.includes('categories') ? 
                    <a href="/api/logout" style={{textDecoration: 'none', display: 'flex', color: 'white'}}>
                    <ExitToAppIcon className={classes.extendedIcon} />
                    <Typography>
                    Logout
                    </Typography>
                    </a> 
                    : 
                    <NavLink to="/" style={{ textDecoration: 'none', color: 'unset', display: 'flex' }}>
                    <img src={logoImg}  className="imgLogo" alt="Smiley face" />
                    <Typography variant="h6" style={{ marginTop: '13px', marginLeft: '2px'}}>
                            MyLocations
                    </Typography>
                    </NavLink>}
                        {this.renderContent()}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const styles = theme => ({
    appBar: {
        bottom: 'auto',
        top: 0,
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
});

export default connect(null, { onRemoveCategoryClick, onRemoveLocationClick, DialogEvent })(withRouter(withStyles(styles)(Header)));

