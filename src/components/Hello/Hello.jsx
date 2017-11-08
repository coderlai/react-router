import React from 'react'
import "./Hello.css"
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class Hello extends React.Component {
    render() {
        const Index = () => (
            <h1>这是首页</h1>
        )
        const Hot = () => (
            <h1>这是热门话题</h1>
        )
        const Tech = () => (
            <h1>这是科技动态</h1>
        )

        
        const Dev = ({match}) => (
            <div>
                <h1 className="text-left">这是开发者资讯</h1>
                <ul>
                    <li><Link to={`${match.url}/JS`} component={Topic}>Rendering with React</Link></li>
                    <li><Link to={`${match.url}/PHP`} component={Topic}>Components</Link></li>
                    <li><Link to={`${match.url}/Python`} component={Topic}>Props v. State</Link></li>
                </ul>
                <Route path={`${match.url}/:topicId`} component={Topic} />
                <Route exact path={match.url} render={()=>(
                    <h3>Please select a topic</h3>
                ) }/>
            </div>
            
        )

        const Topic = ({match})=>(
            <h1>{match.params.topicId}</h1>
        )

       
        return (
            <Router>
                <div className="container">
                    <h1 className="text-center">react-router</h1>
                    <nav className="top">
                        <Link to="/">首页</Link>
                        <Link to="/hot">热门话题</Link>
                        <Link to="/tech">科技动态</Link>
                        <Link to="/dev">开发者资讯</Link>
                    </nav>
                    <div className="content">
                        <Route exact  path="/" component={Index}/>
                        <Route path="/hot" component={Hot}/>
                        <Route path="/tech" component={Tech}/>
                        <Route path="/dev" component={Dev}/>
                    </div>
                </div>
            </Router>
        )
    }
}

export default Hello