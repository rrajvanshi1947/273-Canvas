import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Home extends Component {
  constructor() {
    super();
    this.deleteBook = this.deleteBook.bind(this);
    this.state = {
      books: []
    };
    // this.deleteBook = this.deleteBook.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    axios.get("http://localhost:3001/home").then(response => {
      //update the state with the response data
      this.setState({
        books: this.state.books.concat(response.data)
      });
    });
  }

  deleteBook(i) {
    // var BookID1 = this.props.BookID1;
    // var Title1 = this.props.Title1;
    // var Author1 = this.props.Author1;
    var headers = new Headers();

    // var i = this.props.index;
    console.log("I is " + i.bindex);
    i.preventDefault();
    var arr = this.state.books;
    arr.splice(1, 1);
    this.setState({ books: arr });
    const data = this.state;
    // console.log(this.state.books[i]);
    // var arr = this.state.books;
    // console.log(arr[index1 + 1].BookID);
    // const data = {
    //   BookID: arr[0].BookID,
    //   Title: arr[0].Title,
    //   Author: arr[0].Author
    // };
    // axios.defaults.withCredentials = true;
    axios.post("http://localhost:3001/home", data).then(response => {
      console.log("Status Code : ", response.status);
    });
  }

  render() {
    //iterate over books to create a table row
    let details = this.state.books.map((book, i) => {
      return (
        <tr index={i}>
          <td className="ID">{book.BookID}</td>
          <td className={book.Title}>{book.Title}</td>
          <td>{book.Author}</td>
          <td>
            <button
              class="btn btn-warning"
              type="submit"
              onClick={this.deleteBook.bind(this)}
              BookID1={book.BookID}
              Title1={book.Title}
              bindex={i}
              Author1={book.Author}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    //if not logged in go to login page
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <div class="container">
          <h2>List of All Books</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Option</th>
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

// var DeleteButton = React.create({
//   onClick: function() {
//     var email = this.props.email;
//     this.props.deleteRow(this.props.index);
//     // $.ajax({
//     //   data: { email_address: email },
//     //   url: "/delete-contact",
//     //   dataType: "html",
//     //   type: "POST",
//     //   success: function(data, status, xhr) {
//     //     $(".delete-success").slideDown(400);
//     //     setTimeout(function() {
//     //       $(".delete-success").slideUp(400);
//     //     }, 5000);
//     //   }
//     // });
//   },
//   render: function() {
//     return (
//       <button
//         onClick={() => {
//           this.onClick(this.props.email);
//         }}
//       >
//         Delete
//       </button>
//     );
//   }
// });

// //export Home Component
// export { Home, DeleteButton };

export default Home;
