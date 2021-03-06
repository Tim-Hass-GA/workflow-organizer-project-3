import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Row, Col } from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../css/App.css';
import {Link} from 'react-router-dom';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import axios from 'axios';
import { liftProjectToState, liftAllProjectsToState } from '../actions/index';




const style = {

  card_styleToDo: {
    width: 340,
    margin: 10,
    textAlign: 'center',
    background: '#FFFFA5'

  },
  card_styleProgress: {
    width: 340,
    margin: 10,
    textAlign: 'center',
    background: '#1ba8b1'

  },
  card_styleReview: {
    width: 340,
    margin: 10,
    textAlign: 'center',
    background: '#ff7455'

  },

  card_styleCompleted: {
    width: 340,

    margin: 10,
    textAlign: 'center',
    background: '#17F76A',
    justifyContent: 'center'

  }
}

const mapDispatchToProps = dispatch => {
  return {
    liftProjectToState: project => dispatch(liftProjectToState(project)),
    liftAllProjectsToState: project => dispatch(liftAllProjectsToState(project))
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token,
    currentProject:state.currentProject
  }
}

class ConnectedKanbanBoard extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentProject: props.currentProject
    }
    this.moveTask = this.moveTask.bind(this)
  }

  componentWillReceiveProps = (newProps) => {
    this.setState({
      currentProject: newProps.currentProject
    })
  }


  moveTask (task, task_status) {
    if (task_status) {
      console.log('this is the task', task)
      console.log('this is the task_status', task_status);
      axios.put('/edit/taskstatus', {
        task,
        task_status
      }).then( result => {
        console.log(result.data)
        this.props.liftProjectToState(result.data)
      })
    }
  }

  componentWillMount() {
    console.log('BELOW IS STATE/PROJECT BEFORE MOUNT', this.props.currentProject)

  }

  handleDelete = (projectId) => {
  console.log(projectId)
  console.log('HANDLING DELETE FUNCTION');
  axios.delete('/destroy/project', {params:
    {projectId}
  }).then( result => {
    console.log(result.data)

    console.log(this.props.currentProject)

  var newProjects =  this.props.currentProject.filter( (project) => {
    if (project._id !== result.data._id) {
      return project
    }
  })
  this.props.liftAllProjectsToState(newProjects)
  this.props.liftProjectToState()
  })
}

handleEdit = (projectId) => {
  console.log(projectId)
  console.log('HANDLING EDIT FUNCTION');
  axios.get('/view/findOne/project', {
    params: {projectId}
  }).then( result => {
    console.log(result.data)
    this.props.liftProjectToState(result.data)
  }).catch( err => console.log(err))
}



  render() {

    if (this.props.currentProject) {
      if (this.props.currentProject.tasks) {
        console.log('currentProject at RENDER',this.props.currentProject )

        // To Do
        var TasksToDo = this.props.currentProject.tasks.filter( task => {
          return task.task_status === "todo"
        })
        if (TasksToDo.length > 0) {
          var ToDoTaskItems = TasksToDo.map( (task, index) => {
            return <TaskItem style={style.card_styleToDo} task={task} moveTask={this.moveTask} key={index} />
          })
        }
        // In Progress
        var TasksInProgress = this.props.currentProject.tasks.filter( task => {
          return task.task_status === "progress"
        })
        if (TasksInProgress.length > 0) {
          var InProgressTaskItems = TasksInProgress.map( (task, index) => {
            return <TaskItem style={style.card_styleProgress} task={task} moveTask={this.moveTask} key={index} />
          })
        }
        // In Review
        var TasksInReview = this.props.currentProject.tasks.filter( task => {
          return task.task_status === "review"
        })
        if (TasksInReview.length > 0) {
          var InReviewTaskItems = TasksInReview.map( (task, index) => {
            return <TaskItem style={style.card_styleReview} task={task} moveTask={this.moveTask} key={index} />
          })
        }
        // Completed
        var TasksCompleted = this.props.currentProject.tasks.filter( task => {
          return task.task_status === "completed"
        })
        if (TasksCompleted.length > 0) {
          var CompletedTaskItems = TasksCompleted.map( (task, index) => {
            return <TaskItem style={style.card_styleCompleted} task={task} moveTask={this.moveTask} key={index} />
          })
        }
      }
    }

    if (this.props.currentProject) {
      var projectHeader = (
        <div>
          <Card style={style.card_style}>
            <CardHeader
              title={this.props.currentProject.title}
            />
            <CardText>
              <p>{this.props.currentProject.description}</p>
            </CardText>
            <CardActions>
                <Link to='/Projects/edit'><RaisedButton label="Edit" onClick={ () => this.handleEdit(this.state.currentProject._id)} /></Link>
                <Link to='/Projects'><RaisedButton label="Delete" onClick={ () => this.handleDelete(this.state.currentProject._id)} /></Link>
                <Link to='/Tasks/create'><RaisedButton label="Create Task" onClick={ () => this.handleEdit(this.state.currentProject._id)} /></Link>
            </CardActions>
          </Card>
        </div>
      )
    } else {
      var projectHeader = (
        <div>
          <Card style={style.card_style}>
            <CardText>
              <h3>No Project Selected</h3>
            </CardText>
            <CardActions>
              {/* <Link to='/Projects/create'>Create Project</Link> */}
                {/* <Link to='/Projects'><RaisedButton label="Delete" onClick={ () => this.handleDelete(this.state.currentProject._id)} /></Link>
                <Link to='/Tasks/create'><RaisedButton label="Create Task" onClick={ () => this.handleEdit(this.state.currentProject._id)} /></Link> */}
            </CardActions>
          </Card>
        </div>
      )
    }


    return (
  <MuiThemeProvider>
        {projectHeader}
        <div>
          <h2 className="kanban">Kanban Board</h2>
          <Row>

            <Col xs={12} sm={6} md={3}>
              <Row center="xs" top="xs">
                <h3 className="kanban">To Do</h3>
              </Row>
              <Row center="xs">
                {ToDoTaskItems || <TaskItem style={style.card_styleToDo}/>}
              </Row>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <Row center="xs" top="xs">
                <h3 className="kanban">In Progress</h3>
              </Row>
              <Row center="xs">
                {InProgressTaskItems || (<TaskItem style={style.card_styleProgress} />)}
              </Row>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <Row center="xs" top="xs">
                <h3 className="kanban">In Review</h3>
              </Row>
              <Row center="xs">
                {InReviewTaskItems || (<TaskItem style={style.card_styleReview} />)}
              </Row>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <Row center="xs" top="xs">
                <h3 className="kanban">Completed</h3>
              </Row>
              <Row center="xs">
                {CompletedTaskItems || (<TaskItem style={style.card_styleCompleted} />)}
              </Row>
            </Col>
          </Row>
        </div>
      </MuiThemeProvider>
    );
  }
}


const KanbanBoard = connect(mapStateToProps, mapDispatchToProps)(ConnectedKanbanBoard)
export default KanbanBoard;
