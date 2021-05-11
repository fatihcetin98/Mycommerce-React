import React, { useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { Link } from 'react-router-dom';
import { Grid, Paper, TextField, Button } from '@material-ui/core'


const Signup = (props) => {
    const gridStyle ={marginTop: 100}
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const marginTop = { marginTop: 5 }
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    
    const signup = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            db.collection('UserData').doc(cred.user.uid).set({
                Name: name,
                Email: email,
                Password: password
            }).then(() => {
                setName('');
                setEmail('');
                setPassword('');
                setError('');
                props.history.push('/login');
            }).catch(err => setError(err.message));
        }).catch(err => setError(err.message));
    }

    return (
        <Grid style={gridStyle}>
            <Paper style={paperStyle}>
            <h2>Sign Up</h2>
            <form onSubmit={signup}>
                    <TextField fullWidth label='Name' placeholder="Enter your name"  onChange={(e) => setName(e.target.value)} value={name} />
                    <TextField fullWidth label='Email' placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <TextField fullWidth label='Password' placeholder="Enter your Password"  type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <Button  style ={marginTop} type='submit' variant='contained' color='primary'>Sign up</Button>
                </form>
            {error && <span className='error-msg'>{error}</span>}
            <br />
            <span>Already have an account? Login
                <Link to="/login"> Here</Link>
            </span>
            </Paper>
        </Grid>
    )
}
export default Signup;