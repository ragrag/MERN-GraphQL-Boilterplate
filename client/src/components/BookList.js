import React, { Component } from 'react';

import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries/queries';

class BookList extends Component {
  displayBooks(){
    let data = this.props.data;
    if(data.loading)
    {
      return (<div>Loading BookList.apply.call.</div>)
    }
    else {
      return data.books.map((book)=>{
        return (
          <li key={book._id}>{book.name}  </li>
        );
      });
    }
  }
  render() {
    return (
      <div >
        <ul>
            {this.displayBooks()}
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
