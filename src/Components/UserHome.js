import { useHistory } from "react-router-dom"

export default function UserHome() {

    const history = useHistory()

    if (localStorage.getItem("name") === null)
        history.push('/')

    const disconnect = () => {
        localStorage.removeItem("name")
        localStorage.removeItem("email")
        localStorage.removeItem("uuid")
        history.push('/')
    }

    return (
        <div>
            <div>Welcome {localStorage.getItem("name")}</div>
            <div style={{ fontStyle: "italic" }}>{localStorage.getItem("email")}</div>
            <button onClick={disconnect}>Logout</button>
        </div>
    )
}