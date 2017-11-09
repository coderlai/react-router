import React from 'react'
import MyDiv from '../Demo/Demo.jsx'

//import bootstrap css style 
import '../../assets/bootstrap/css/bootstrap.min.css'
import './Test.css'

class Test extends React.Component {
    render() {
        const script = {
            __html:"<script></script>"
        }
        return (
            <div className="container">
                <h1 dangerouslySetInnerHTML={script}></h1>
            </div>
        )
    }
}

export default Test