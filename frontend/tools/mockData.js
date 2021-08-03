const todos = [
  {
    Id: 1,
    Title: "Securing React Apps with Auth0",
    status: false,
  },
  {
    Id: 2,
    Title: "React: The Big Picture",
    status: false,
  },
  {
    Id: 3,
    Title: "Creating Reusable React Components",
    status: false,
  },
  {
    Id: 4,
    Title: "Building a JavaScript Development Environment",
    status: false,
  },
];

const newTodo = {
  Id: null,
  Title: "",
  status: false,
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newTodo,
  todos,
};
