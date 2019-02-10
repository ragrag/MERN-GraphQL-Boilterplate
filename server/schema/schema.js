const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author')
const {
    GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID,
    GraphQLInt, 
    GraphQLList,
    GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:()=> ({
            name:{type:GraphQLString},
            genre: {type:GraphQLString},
            _id:{type:GraphQLString},
            author: {
                type: AuthorType,
                resolve(parent,args){
                    return Author.findOne({_id:parent.authorid});

                }
            }
    }),
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:()=> ({
            name:{type:GraphQLString},
            age: {type:GraphQLInt},
            _id:{type:GraphQLString},
            books: {
                type:new GraphQLList(BookType),
                resolve(parent,args){
                    return Book.find({authorid:parent._id});
                }
            }
    }),
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args:{
                id: {type:GraphQLID},
            },
            resolve(parent,args){
                return Book.findOne({_id:args.id});
            },
        },
        author:{
            type: AuthorType,
            args:{
                id: {type:GraphQLID},
            },
            resolve(parent,args){
                return Author.findOne({_id:args.id});
            },
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find();
            },
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                return Author.find();
            }
        }

        }
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull ( GraphQLString) },
                age:{type:GraphQLInt},
            },
            resolve(parent,args){
                let author = new Author({
                    name:args.name,
                    age:args.age,
                });
               return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull ( GraphQLString)},
                genre:{type: new GraphQLNonNull ( GraphQLString)},
                authorid:{type:new GraphQLNonNull ( GraphQLID)},
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorid:args.authorid
                });

                return book.save();
            }

        },


    },


})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});