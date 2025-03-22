import App from "./App";
import Signup from "./Signup";
import Login from "./Login";
import Posts from "./Posts";
import Post from "./Post";

const routes = [
  {
    path: "/",
    element: <App />
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/posts",
    element: <Posts />
  },
  {
    path: "/posts/:postId",
    element: <Post />
  }
]

export default routes;