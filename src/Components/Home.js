import './Style/Home.css'

export default function Home() {
    return (
        <div>
            <div className="Header">
                <div className="Title">BUROKAMERAD</div>
                <div className="LoginButton">
                    <a href="/login">Login</a>
                </div>
            </div>
            <div className="Body">
                <h1>Welcome to BuroKamerad</h1>
            </div>
        </div>
    )
}