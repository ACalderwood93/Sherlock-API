const {ApolloServer, gql} = require('apollo-server');
const cases = require('./Data/cases.json');
const clues = require('./Data/clues.json')
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Case {
    number: Int
    description: String
    clues : Clues
    name : String
  }
  
  type Clue {
    number:Int
    text: String
  }
  
  type Clues {
    chemist : Clue
    bank : Clue
    carriageDepot : Clue
    docks : Clue
    hotel : Clue
    locksmith : Clue
    museum : Clue
    newsagents : Clue
    park : Clue
    pawnbroker : Clue
    theatre : Clue
    boarsHead : Clue
    scotlandYard : Clue
    tobacconist : Clue
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    cases: [Case]
    case(number:Int) : Case
  }
`;


const resolvers = {
    Query: {
        cases : () => cases,
        case : (parent, args) => cases.find(x => x.number === args.number)
    },
    Case : {
        clues : (parent) => parent.clues
    },
    Clues : {
        chemist : (parent) => clues.find(clue => clue.number === parent.chemist),
        bank : (parent) => clues.find(clue => clue.number === parent.bank),
        carriageDepot : (parent) => clues.find(clue => clue.number === parent.carriageDepot),
        docks : (parent) => clues.find(clue => clue.number === parent.docks),
        hotel : (parent) => clues.find(clue => clue.number === parent.hotel),
        locksmith : (parent) => clues.find(clue => clue.number === parent.locksmith),
        museum : (parent) => clues.find(clue => clue.number === parent.museum),
        newsagents : (parent) => clues.find(clue => clue.number === parent.newsagents),
        park : (parent) => clues.find(clue => clue.number === parent.park),
        pawnbroker : (parent) => clues.find(clue => clue.number === parent.pawnbroker),
        theatre : (parent) => clues.find(clue => clue.number === parent.theatre),
        boarsHead : (parent) => clues.find(clue => clue.number === parent.boarsHead),
        scotlandYard : (parent) => clues.find(clue => clue.number === parent.scotlandYard),
        tobacconist : (parent) => clues.find(clue => clue.number === parent.tobacconist),
    }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

