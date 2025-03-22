import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const onSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username'); 
    const password = formData.get('password');
    const response = await fetch('http://localhost:5001/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ username, password }),
    })
    
    if(response.ok){
      const data = await response.json();
      console.log(data.users);
      navigate("/");
    }
    else{
      console.error(response);
      navigate("/signup");
    }
  }
  return (
    <div>
     <h1>Sign Up</h1>
     <form onSubmit = {onSubmit}>
       <label htmlFor="username">Username </label>
       <input id="username" name="username" placeholder = "Username" type="text" />
       <label htmlFor="password">Password </label>
       <input id="password" name="password" placeholder = "Password" type="password" />
       <button>Sign Up</button>
     </form>
    </div>
   );
}

export default Signup;