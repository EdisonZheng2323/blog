import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username'); 
    const password = formData.get('password');
    const response = await fetch('http://localhost:5001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token); 
      navigate('/posts');
    } else {
      console.error('Login failed');
      navigate('/login');
    }

  }
  return (
   <div>
    <h1>Login</h1>
    <form onSubmit = {onSubmit}>
      <label htmlFor="username">Username </label>
      <input id="username" name="username" placeholder = "Username" type="text" />
      <label htmlFor="password">Password </label>
      <input id="password" name="password" placeholder = "Password" type="password" />
      <button>Login</button>
    </form>
   </div>
  );
};

export default Login;