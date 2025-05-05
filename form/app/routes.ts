import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("pages/Login.jsx"), // Login as the index route
  {
    path: "cadastro",
    file: "pages/Cadastro.jsx", // Cadastro route
  },
  {
    path: "principal",
    file: "pages/Principal.jsx", // Principal route
  },
] satisfies RouteConfig;
