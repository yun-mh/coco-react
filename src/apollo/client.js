import { CachePersistor } from "apollo-cache-persist";
import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  getMainDefinition,
  offsetLimitPagination,
} from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { defaults, resolvers } from "./localState";

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "https://api-coco.herokuapp.com/"
      : "https://api-coco.herokuapp.com/",
});

const authLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem("jwt");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const wsLink = new WebSocketLink({
  uri: `ws://api-coco.herokuapp.com/`,
  options: {
    reconnect: true,
    connectionParams: async () => {
      const token = localStorage.getItem("jwt");
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    },
  },
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        viewFeed: offsetLimitPagination(),
      },
    },
  },
});

export const persistor = new CachePersistor({
  cache,
  storage: localStorage,
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      authLink.concat(httpLink)
    ),
  ]),
});

export default client;
