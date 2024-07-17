import React from "react";


export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday
    
    };

    fetch("https://myflix-movie-api.herokuapp.com/users", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        alert('Account created successfully!');
        window.location.reload();
    } else {
        alert('Sign up failed. Please try again.');
      }

    console.log(username, password, email, birthday);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    // props.onLoggedIn(username);
  });
};

return (
  <form onSubmit={handleSubmit}>
    <label>
      Username:
      <input type="text" 
      value={username} 
      onChange={e => setUsername(e.target.value)} 
      />
    </label>
    <label>
      Password:
      <input type="password" 
      value={password} 
      onChange={e => setPassword(e.target.value)} 
      />
    </label>
    <label>
      Email:
      <input type="email" 
      value={email} 
      onChange={e => setEmail(e.target.value)} 
      />
    </label>
    <label>
      Birthday:
      <input type="date" 
      value={birthday} 
      onChange={e => setBirthday(e.target.value)} 
      /> 
    </label> 

  </form>
);

};