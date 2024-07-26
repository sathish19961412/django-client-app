import React,{Component} from 'react'

import {Button,Modal,ModalHeader,ModalFooter,Form,FormGroup,Input,Label, ModalBody} from 'reactstrap'

class CustomModal extends Component{
    constructor(props){
        super(props);
        this.state={
            activeItem:this.props.activeItem
        };
    }
    
    // To Check if the checkbox is checked or not

    handleChange = e => {
        let { name,value } =e.target;
        if(e.target.type==="checkbox"){
            value =e.target
        }
        const activeItem={...this.state.activeItem,[name]:value};
        this.setState({activeItem})
    };

    render(){
        const { toggle,onSave } =this.props;
        return(
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Task Items</ModalHeader>
                <ModalBody>
                    <Form>
                        {/* 1 Title Label */}
                        <FormGroup>
                            <label for="title">Title</label>
                            <Input type='text' name='title' value={this.state.activeItem.title}
                             onChange={this.handleChange} placeholder='Enter Task Title'/>
                        </FormGroup>
                        {/* 2 Description Label */}
                        <FormGroup>
                            <label for='description'>Description</label>
                            <Input type='text' name='description' value={this.state.activeItem.description}
                             onChange={this.handleChange} placeholder='Enter Task Description'/>
                        </FormGroup>
                        {/* 3 Completed Label */}
                        <FormGroup check>
                            <Label for='completed'>Completed
                            <Input type='checkbox' name='completed' value={this.state.activeItem.completed}
                             onChange={this.handleChange} placeholder='Enter Task Description'/>
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color='success' onClick={()=>onSave(this.state.activeItem)}>
                        save
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default CustomModal;