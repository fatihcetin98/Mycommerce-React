import React, { useState } from 'react';
import { auth } from '../../lib/firebase';
import { Link,useHistory  } from 'react-router-dom';
import { Grid, Paper, TextField, Button } from '@material-ui/core'

 const Login = () => {
    let history = useHistory();
    const gridStyle ={marginTop: 100}
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const marginTop = { marginTop: 5 }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setEmail('');
            setPassword('');
            setError('');
            history.push('/');
        }).catch(err => setError(err.message));
    }

    return (
        <Grid style={gridStyle}>
            <Paper style={paperStyle}>
            <h2>Login</h2>
            <form onSubmit={login} autoComplete="off">
                    <TextField fullWidth label='Email' placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <TextField fullWidth label='Password' placeholder="Enter your Password"  type="password"onChange={(e) => setPassword(e.target.value)} value={password} />
                    <Button  style ={marginTop} type='submit' variant='contained' color='primary'>LOGIN</Button>
                </form>
            {error && <span className='error-msg'>{error}</span>}
            <br />
            <span>Don't have an account? Register
                <Link to="/signup"> Here</Link>
            </span>
            </Paper>
        </Grid>
    )
}
export default Login;

