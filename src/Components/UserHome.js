import React from 'react'
import { useHistory } from "react-router-dom"
import './Style/UserHome.css'

export default function UserHome() {

    const history = useHistory()
    const [file, setFile] = React.useState(null)

    if (localStorage.getItem("name") === null)
        history.push('/')

    const disconnect = () => {
        localStorage.removeItem("name")
        localStorage.removeItem("email")
        localStorage.removeItem("uuid")
        history.push('/')
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleFileUpload = (e) => {
        e.preventDefault()
        const imageData = new FormData()
        imageData.append('hologram', file)

        const url = `http://localhost:7852/upload/${localStorage.getItem("uuid")}`
        const header = {
            method: 'POST',
            body: imageData
        }

        fetch(url, header)
        .then(response => response.json())
        .catch(err => console.error(err))
    }

    return (
        <div>
            <div>Welcome {localStorage.getItem("name")}</div>
            <div style={{ fontStyle: "italic" }}>{localStorage.getItem("email")}</div>
            <img alt="defaultImage" src={`http://localhost:7852/image/${localStorage.getItem("uuid")}`} />
            <form>
                <label htmlFor="fileUpload">Upload new Image</label>
                <input type="file" id="fileUpload" name="hologram" onChange={handleFileChange} />
                <input type="submit" value="Upload" onClick={handleFileUpload}/>
            </form>
            <button onClick={disconnect}>Logout</button>
        </div>
    )
}