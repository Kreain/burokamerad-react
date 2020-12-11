import { useHistory } from 'react-router-dom'
import React from 'react'
import './Style/Login.css'

export default function Login() {

    const history = useHistory()
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [errorMessage, setErrorMessage] = React.useState("")

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmitKey = (e) => {
        if (e.keyCode === 13)
            handleSubmit(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = "http://localhost:7852/login"
        const header = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
        
        fetch(url, header)
        .then(res => res.json())
        .then(res => {
            if (!res.success)
                setErrorMessage((res.reason !== undefined) ? res.reason : "Error validating")
            else {
                localStorage.setItem("name", res.data.name)
                localStorage.setItem("email", res.data.email)
                localStorage.setItem("uuid", res.data.uuid)
                history.push('/user')
            }
        })
        .catch(error => console.error(error))
    }

    return (
        <div className="LoginContainer">
            <form className="Form">
                <input
                    type="email"
                    placeholder="Email"
                    required
                    autoFocus
                    onChange={handleEmailChange}
                    onKeyDown={handleSubmitKey}
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={handlePasswordChange}
                    onKeyDown={handleSubmitKey}
                    autoComplete="on"
                />
                <input
                    type="submit"
                    value="Login"
                    onClick={handleSubmit}
                />
                <a href="/register" className="Register">Don't have an account ? Register</a>

                {(errorMessage !== "") && 
                    <div className="Error">{errorMessage}</div>
                }
            </form>
        </div>
    )
}