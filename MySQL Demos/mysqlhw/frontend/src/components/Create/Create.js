import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

class Create extends Component {
  constructor(props) {
    super(props);
    this.handleChangeStudentID = this.handleChangeStudentID.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDepartment = this.handleChangeDepartment.bind(this);
    this.handleStudentCreate = this.handleStudentCreate.bind(this);

    this.state = {
      Name: null,
      StudentID: null,
      Department: null,
      StudentCreated: false
    };
  }

  handleChangeStudentID = e => {
    this.setState({
      StudentID: e.target.value
    });
  };

  handleChangeName = e => {
    this.setState({
      Name: e.target.value
    });
  };

  handleChangeDepartment = e => {
    this.setState({
      Department: e.target.value
    });
  };

  handleStudentCreate = e => {
    var data = {
      Name: this.state.Name,
      StudentID: this.state.StudentID,
      Department: this.state.Department
    };
    axios.post("http://localhost:3001/create", data).then(response => {
      if (response.status === 200) {
        this.setState({
          StudentCreated: true
        });
      } else {
        this.setState({
          StudentCreated: false
        });
      }
    });
  };

  render() {
    let redirect = null;
    if (this.state.StudentCreated) {
      redirect = <Redirect to="/home" />;
    }
    return (
      <div>
        {redirect}
        <br />
        <br />
        <div className ="container">
          <div style={{ width: "30%" }} className="form-group">
            <input
              onChange={this.handleChangeName}
              type="text"
              className="form-control"
              name="Name"
              placeholder="Name"
            />
          </div>
          <br />
          <div style={{ width: "30%" }} className="form-group">
            <input
              onChange={this.handleChangeStudentID}
              type="text"
              className="form-control"
              name="StudentID"
              placeholder="Student ID"
            />
          </div>
          <br />

          <div style={{ width: "30%" }} className="form-group">
            <input
              onChange={this.handleChangeDepartment}
              type="text"
              className="form-control"
              name="Department"
              placeholder="Department"
            />
          </div>
          <br />
          <div style={{ width: "30%" }}>
            <button
              onClick={this.handleStudentCreate}
              className="btn btn-success"
              type="submit"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
