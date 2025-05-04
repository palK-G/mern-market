import React, { Component } from "react";
import PropTypes from "prop-types";
// import { withStyles } from "material-ui/styles"
// import Paper from "material-ui/Paper"
// import List, {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "material-ui/List"
// import Avatar from "material-ui/Avatar"
// import IconButton from "material-ui/IconButton"
// import Icon from "material-ui/Icon"
// import Button from "material-ui/Button"
// import Typography from "material-ui/Typography"
// import Edit from "material-ui-icons/Edit"
// import Divider from "material-ui/Divider"
import auth from "./../auth/auth-helper";
import { listByOwner } from "./api-Store.js";
import { Redirect, Link } from "react-router-dom";
import DeleteStore from "./DeleteStore";

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 3}px ${theme.spacing.unit}px` ,
    color: theme.palette.protectedTitle,
    fontSize: "1.2em"
  },
  addButton:{
    float:"right"
  },
  leftIcon: {
    marginRight: "8px"
  }
})
class MyStores extends Component {
  state = {
      Stores:[],
      redirectToSignin: false
  }

  loadStores = () => {
    const jwt = auth.isAuthenticated()
    listByOwner({
      userId: jwt.user._id
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({redirectToSignin: true})
      } else {
        this.setState({Stores: data})
      }
    })
  }
  removeStore = (Store) => {
    const updatedStores = this.state.Stores
    const index = updatedStores.indexOf(Store)
    updatedStores.splice(index, 1)
    this.setState({Stores: updatedStores})
  }
  componentDidMount = () => {
    this.loadStores()
  }
  render() {
    const {classes} = this.props
    const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin) {
      return <Redirect to="/signin"/>
    }
    return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Your Stores
          <span className={classes.addButton}>
            <Link to="/seller/Store/new">
              <Button color="primary" variant="raised">
                <Icon className={classes.leftIcon}>add_box</Icon>  New Store
              </Button>
            </Link>
          </span>
        </Typography>
        <List dense>
        {this.state.Stores.map((Store, i) => {
            return   <span key={i}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar src={"/api/Stores/logo/"+Store._id+"?" + new Date().getTime()}/>
                </ListItemAvatar>
                <ListItemText primary={Store.name} secondary={Store.description}/>
                { auth.isAuthenticated().user && auth.isAuthenticated().user._id == Store.owner._id &&
                  (<ListItemSecondaryAction>
                    <Link to={"/seller/orders/" + Store.name+ "/"+Store._id}>
                      <Button aria-label="Orders" color="primary">
                        View Orders
                      </Button>
                    </Link>
                    <Link to={"/seller/Store/edit/" + Store._id}>
                      <IconButton aria-label="Edit" color="primary">
                        <Edit/>
                      </IconButton>
                    </Link>
                    <DeleteStore Store={Store} onRemove={this.removeStore}/>
                  </ListItemSecondaryAction>)
                }
              </ListItem>
              <Divider/>
            </span>})}
        </List>
      </Paper>
    </div>)
  }
}
MyStores.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MyStore);
