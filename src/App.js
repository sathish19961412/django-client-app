import React,{Component} from 'react';
import './App.css';

const tasks=[
  {
    id:1,
    title:"Title1",
    description:'Sending Request Response',
    completed:false
  }
]
class App extends Component{

  constructor(props){
    super(props);
    this.state={
      viewCompleted:false,
      taskList:tasks,
    }  
  }

  displayCompleted = status =>{
    
    if(status){
      return this.setState({viewCompleted:true});
    }
    return this.setState({viewCompleted:false});
  }

  renderTabList=()=>{
    return(
      <div className='my-5 tab-list'>
          <span onClick={() => this.displayCompleted(true)}
           className={this.state.viewCompleted ? "active":""}
          >
          Completed
          </span>
          <span onClick={() => this.displayCompleted(false)}
           className={this.state.viewCompleted ? "":"active"}
          >
          InCompleted
          </span>
      </div>
    )
  };


  //Rendering items in the list(completed|incompleted)
  renderItems=()=>{
    const {viewCompleted}=this.state;
    const newItems =this.state.taskList.filter(
        item => item.completed == viewCompleted
    );
 
   return newItems.map(item=>(
     <li key={item.id} className='list-group-item d-flex justify-content-between align-items-center'>
         <span className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo":""}`}  
         title={item.title}>
          {item.title}
          </span>
          <span>
            <button className='btn btn-info mr-2 tex-white'>Edit</button>
            <button className='btn btn-danger mr-2'>Delete</button>
          </span>
     </li>
   ))
  };
  render(){
    return(
      <main className='context'>
        <h1 className='text-black text-uppercase text-center my-4'>Task Manager</h1>
        <div className='row'>
            <div className='col-md-6 mx-auto p-0'>
               <div className='card p-3'>
                  <div>
                    <button className='btn btn-warning'>Add Task</button>
                  </div>
                  {this.renderTabList()}
                  <ul className='list-group list-group-flush'>
                     {this.renderItems()}
                  </ul>
               </div>
            </div>
        </div>
      </main>
    )
  }
}

export default App;
