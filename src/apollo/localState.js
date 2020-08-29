import { IS_LOGGED_IN } from "../queries/Auth/AuthQueries";

// export const typeDefs = {
//   isLoggedIn: localStorage.getItem("token") !== null ? true : false,
// };

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem("token", token);
      cache.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: true,
        },
      });
      return null;
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem("token");
      window.location.reload();
      return null;
    },
  },
};
