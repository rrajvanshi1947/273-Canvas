// import React, {Component} from 'react';

// class Create extends Component{
//     render(){
//         return(
//             <div>
//                 <br/>
//                 <div class="container">
//                     <form action="http://localhost:3001/create" method="post">
//                         <div style={{width: '30%'}} class="form-group">
//                             <input  type="text" class="form-control" name="BookID" placeholder="Book ID"/>
//                         </div>
//                         <br/>
//                         <div style={{width: '30%'}} class="form-group">
//                                 <input  type="text" class="form-control" name="Title" placeholder="Book Title"/>
//                         </div>
//                         <br/>
//                         <div style={{width: '30%'}} class="form-group">
//                                 <input  type="text" class="form-control" name="Author" placeholder="Book Author"/>
//                         </div>
//                         <br/>
//                         <div style={{width: '30%'}}>
//                             <button class="btn btn-success" type="submit">Create</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         )
//     }
// }

// export default Create;

import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BookID: "",
      Title: "",
      Author: ""
    };
    this.addNewBookID = this.addNewBookID.bind(this);
    this.addTitle = this.addTitle.bind(this);
    this.addAuthor = this.addAuthor.bind(this);
    this.createBook = this.createBook.bind(this);
  }
  addNewBookID = e => {
    this.setState({
      BookID: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  addTitle = e => {
    this.setState({
      Title: e.target.value
    });
  };
  addAuthor = e => {
    this.setState({
      Author: e.target.value
    });
  };
  createBook = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      BookID: this.state.BookID,
      Title: this.state.Title,
      Author: this.state.Author
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/create", data).then(response => {
      console.log("Status Code : ",response.status);
  })
}

    render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    let redirectVar2 = null;
    if (cookie.load("cookie2")) {
      redirectVar2 = <Redirect to="/home" />;
    }

    return (
      <div>
        {redirectVar}
        {redirectVar2}
        <br />
        <div class="container">
          <form>
            <div style={{ width: "30%" }} class="form-group">
              <input
                onChange={this.addNewBookID}
                type="text"
                class="form-control"
                name="BookID"
                placeholder="Book ID" pattern="\d+"  
              />
            </div>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                onChange={this.addTitle}
                type="text"
                class="form-control"
                name="Title"
                placeholder="Book Title" pattern = "[a-zA-Z]" required 
              />
            </div>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                onChange={this.addAuthor}
                type="text"
                class="form-control"
                name="Author"
                placeholder="Book Author"
              />
            </div>
            <br />
            <div style={{ width: "30%" }}>
              <button
                onClick={this.createBook}
                class="btn btn-success"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Create;
