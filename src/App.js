import React,{Component} from 'react';
import './App.css';
import CustomModal from './components/Modal';
import { Modal } from 'reactstrap';
import axios from 'axios'
class App extends Component{

  constructor(props){
    super(props);
    this.state={
      modal:false,
      viewCompleted:false,
      activeItem:{
        title:"",
        description:"",
        completed:false
      },
      todoList:[]
    };  
  }
   componentDidMount(){
        this.refreshList()
   }
   refreshList=()=>{
    axios.get('http://127.0.0.1:8000/api/tasks/')
    .then(res=>this.state({todoList:res.data}))
    .catch(err=>console.log(err))
   };

  //Create Toggle Property
  toggle = () =>{
    this.setState({ modal: !this.state.modal });
  };

  //Submit HandleSubmit Property
  handleSubmit = item =>{
    this.toggle();
    if(item.id){
      axios.get(`http://127.0.0.1:8000/api/tasks/${item.id}/`,item)
      .then(res=>this.refreshList())
    }
    axios.post('http://127.0.0.1:8000/api/tasks/',item)
    .then(res=>this.refreshList())
  };

  //Delete HandleDelete Property
  handleDelete = item =>{
    axios.get(`http://127.0.0.1:8000/api/tasks/${item.id}/`)
    .then(res=>this.refreshList())
  };
   
  //CreateItem in Modal
  createItem=()=>{
    const item ={title:"",modal:!this.state.modal};
    this.setState({activeItem:item,modal:!this.state.modal})
  };

  //editItem in Modal
  createItem= item =>{
    this.setState({activeItem:item,modal: !this.state.modal});
  };


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
    const newItems =this.state.todoList.filter(
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
      <main className='content p-3 mb-2 bg-info'>
        <h1 className='text-white text-uppercase text-center my-4'>Task Manager</h1>
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
        { this.state.modal ?(
          <Modal activeItem={this.state.activeItem} toggle={this.toggle}
           onSave={this.handleSubmit}/>
        ) : null}
      </main>
    )
  }
}

export default App;
