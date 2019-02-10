import {gql} from 'apollo-boost';

const getBooksQuery  = gql`
{
  books{
    name
    genre
    _id
  }
}
`;


const getAuthorsQuery  = gql`
{
  authors{
    name
    _id
  }
}
`;

const addBookMutation = gql`
    mutation($name:String!,$genre:String!,$authorid:ID!){
        addBook(name:$name,genre:$genre,authorid:$authorid){
            name
            _id
        }
}
`;

export {getBooksQuery,getAuthorsQuery,addBookMutation};
