import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import {getAuthorsQuery, addBookMutation,getBooksQuery} from '../queries/queries';

class AddBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            bookName:'',
            bookGenre:'',
            authorid:'',
        }
    }
    displayAuthors(){
        let data = this.props.getAuthorsQuery;
        if(data.loading){
            return (<option disabled>Loading Author Data...</option>);
        } 
        else {
            return data.authors.map((author)=>{
                return (<option key={author._id} value={author._id}>{author.name}</option>)
            });
        }
    }
    submitForm(e){
        e.preventDefault();
        this.props.addBookMutation(
            {
                variables:{
                    name:this.state.bookName,
                    genre:this.state.bookGenre,
                    authorid:this.state.authorid,
                },
                refetchQueries:[{query:getBooksQuery}],
            });
    }
    render() {
      return (
        <form id="add-book" onSubmit={this.submitForm.bind(this)}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={(e)=> this.setState({bookName:e.target.value}) } />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e)=> this.setState({bookGenre:e.target.value}) } />
            </div>

            <div className="field">
                <label>Author</label>
                <select onChange={(e)=> this.setState({authorid:e.target.value}) } >
                    <option>Select Author</option>
                    {this.displayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
        
      );
    }
  }


  export default compose(
      graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
      graphql(addBookMutation,{name:"addBookMutation"}),
  )(AddBook);