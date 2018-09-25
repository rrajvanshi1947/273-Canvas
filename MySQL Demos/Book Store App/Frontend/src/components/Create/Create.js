import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

class Create extends Component{
    constructor(props){
        super(props);
        this.handleChangeBookID = this.handleChangeBookID.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
        this.handleBookCreate = this.handleBookCreate.bind(this);

        this.state = {
            bookID : null,
            title : null,
            author : null,
            bookCreated : false
        }
    }
    
    handleChangeBookID = (e) => {
        this.setState({
            bookID : e.target.value
        })
    }

    handleChangeTitle = (e) => {
        this.setState({
            title : e.target.value
        })
    }

    handleChangeAuthor = (e) => {
        this.setState({
            author : e.target.value
        })
    }

    handleBookCreate = (e) => {
        var data = {
            bookID : this.state.bookID,
            title : this.state.title,
            author : this.state.author
        }
        axios.post('http://localhost:3001/create',data)
            .then(response => {
                if(response.status == 200){
                    this.setState({
                        bookCreated : true
                    })
                }else{
                    this.setState({
                        bookCreated : false
                    })
                }
            })
    }

    render(){
        let redirect = null;
        if(this.state.bookCreated){
            redirect = <Redirect to= "/home"/>
        }
        return(
            <div>
                {redirect}
                <br/>
                <div class="container">
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange = {this.handleChangeBookID} type="text" class="form-control" name="BookID" placeholder="Book ID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChangeTitle} type="text" class="form-control" name="Title" placeholder="Book Title"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.handleChangeAuthor} type="text" class="form-control" name="Author" placeholder="Book Author"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.handleBookCreate} class="btn btn-success" type="submit">Create</button>
                        </div> 
                </div>
            </div>
        )
    }
}

export default Create;