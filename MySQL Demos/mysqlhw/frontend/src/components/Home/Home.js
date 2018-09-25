import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      students: []
    };
    this.deleteStudent = this.deleteStudent.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    axios.get("http://localhost:3001/home").then(response => {
      this.setState({
        students: this.state.students.concat(response.data)
      });
    });
  }

  deleteStudent(i){
    // console.log("I is " + i.bindex);
    console.log("Inside delete");
    var StudentID = i.target.value
    // i.preventDefault();
    var object = this
    let data = {StudentID:StudentID} 

    var arr = this.state.students;
    var index = arr.findIndex(x => x.StudentID === StudentID)
    console.log(index);
    arr.splice(index, 1);
    this.setState({ students: arr });
    // const data = this.state;

    axios.delete(`http://localhost:3001/delete/${data.StudentID}`).then(response => {
      console.log("Status Code : ", response.status);
      if(response.status ===200){
          // let students = [...this.state.students];
          // students = students.filter(student => student.StudentID !== StudentID)
          // object.setState(prevState => {students: students})
          // this.state.students = students;
          console.log(this.state.students);
      }
    });
  }

  render() {
      //if not logged in go to login page
    let redirectVar = null;
    if(!cookie.load('cookie')){
        redirectVar = <Redirect to= "/"/>
    } 


    //iterate over students to create a table row
    let details = this.state.students.map((student, i) => {
      return (
        <tr >
          <td>{student.Name}</td>
          <td>{student.StudentID}</td>
          <td>{student.Department}</td>
          <td>
            <button
              className="btn btn-warning"
              type="submit"
              onClick={this.deleteStudent}
              value = {student.StudentID}
              index = {i}
              Name={student.Name}
              StudentID={student.StudentID}
              bindex={i}
              Department={student.Department}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
   
    return (
      <div>
          {redirectVar}   
        <div className="container">
          <h2>List of All Students</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>StudentID</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {/*Display the Tbale row based on data recieved*/}
              {details}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
//export Home Component
export default Home;
