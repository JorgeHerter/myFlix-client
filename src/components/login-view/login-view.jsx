import { on } from 'process';
import React from 'react';


export const LoginView = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault ();

        const data = {
            access: 'username',
            secret: 'password'
        };

    fetch("https://myflix-movie-api.herokuapp.com/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Login response: ", data);
        if (data.user) {
            onLoggedIn(data.user, data.token);
        }
        else {
            alert("Invalid username or password");
        }
    })
    .catch((error) => {
        alert('Error: Something went wrong');
    });

    };
    return (
        <form onSubmit={handleSubmit}>  
            <label>
                Username:
                <input 
                type="text" 
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                minLength= "5"
                />
            </label>
            <label>
                Password:
                <input 
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required 
                />
            </label>
            <label>
                Birthday:
                <input
                type='date'
                value={birthday}
                onChange={(event) => setBirthday(event.target.value)}
                required
                />
            </label>
            <button type="submit">Submit</button> 
        </form>
    );
};

const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    };

    fetch('https://myflix-movie-api.herokuapp.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => {
        if (response.ok) {
            alert('Account created successfully');
            window.location.reload();
        }else {
            alert('Error: Account not created');
        }
    });

};