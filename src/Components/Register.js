import { useHistory } from 'react-router-dom'
import React from 'react'
import './Style/Register.css'

export default function Register() {

    const history = useHistory()
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [errorMessage, setErrorMessage] = React.useState("")

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handlePasswordConfirmChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmitKey = (e) => {
        if (e.keyCode === 13)
            handleSubmit(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = "http://localhost:7852/register"
        const header = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })
        }

        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            setErrorMessage("Please fill in the form")
            return
        }
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match")
            return
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
                    type="text"
                    placeholder="Name"
                    required
                    autoFocus
                    onChange={handleNameChange}
                    onKeyDown={handleSubmitKey}
                />
                <input
                    type="email"
                    placeholder="Email"
                    required
                    onChange={handleEmailChange}
                    onKeyDown={handleSubmitKey}
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={handlePasswordChange}
                    onKeyDown={handleSubmitKey}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    onChange={handlePasswordConfirmChange}
                    onKeyDown={handleSubmitKey}
                />
                <input
                    type="submit"
                    value="Register"
                    onClick={handleSubmit}
                />

                {(errorMessage !== "") && 
                    <div className="Error">{errorMessage}</div>
                }
            </form>
        </div>
    )
}