const { ApolloServer, gql } = require("apollo-server");
require("dotenv").config();
const cases = require("./Data/cases.json");
const clues = require("./Data/clues.json");

const {
  getCase,
  getAll,
  upsertCase,
} = require("./repositories/caseRepository");
const { getClue } = require("./repositories/clueRepository");
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Case {
    number: Int
    description: String
    clues: Clues
    name: String
  }

  type Clue {
    number: Int
    text: String
  }

  type Clues {
    chemist: Clue
    bank: Clue
    carriageDepot: Clue
    docks: Clue
    hotel: Clue
    locksmith: Clue
    museum: Clue
    newsagents: Clue
    park: Clue
    pawnbroker: Clue
    theatre: Clue
    boarsHead: Clue
    scotlandYard: Clue
    tobacconist: Clue
  }

  input CluesInput {
    chemist: Int!
    bank: Int!
    carriageDepot: Int!
    docks: Int!
    hotel: Int!
    locksmith: Int!
    museum: Int!
    newsagents: Int!
    park: Int!
    pawnbroker: Int!
    theatre: Int!
    boarsHead: Int!
    scotlandYard: Int!
    tobacconist: Int!
  }

  input upsertCaseInput {
    name: String!
    number: Int!
    clues: CluesInput!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    cases: [Case]
    case(number: Int): Case
  }

  type Mutation {
    Case(input: upsertCaseInput): Boolean
  }
`;

const resolvers = {
  Query: {
    cases: async () => await getAll(),
    case: async (parent, args) => await getCase(args.number),
  },
  Case: {
    clues: (parent) => parent.clues,
  },
  Clues: {
    chemist: async (parent) => await getClue(parent.chemist),
    bank: async (parent) => await getClue(parent.chemist),
    carriageDepot: async (parent) => await getClue(parent.carriageDepot),
    docks: async (parent) => await getClue(parent.docks),
    hotel: async (parent) => await getClue(parent.hotel),
    locksmith: async (parent) => await getClue(parent.locksmith),
    museum: async (parent) => await getClue(parent.museum),
    newsagents: async (parent) => await getClue(parent.newsagents),
    park: async (parent) => await getClue(parent.park),
    pawnbroker: async (parent) => await getClue(parent.pawnbroker),
    theatre: async (parent) => await getClue(parent.theatre),
    boarsHead: async (parent) => await getClue(parent.boarsHead),
    scotlandYard: async (parent) => await getClue(parent.scotlandYard),
    tobacconist: async (parent) => await getClue(parent.tobacconist),
  },
  Mutation: {
    Case: async (_, input) => {
      const value = await upsertCase(input);
      return value.acknowledged;
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
