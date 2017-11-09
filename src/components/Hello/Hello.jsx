import React from 'react'
import "./Hello.css"
import { BrowserRouter as Router, Route, Link, withRouter,Redirect } from 'react-router-dom'

export default class Hello extends React.Component {
    render() {
        const Index = () => (<h1>这是首页</h1>)

        const Hot = () => (<h1>这是热门话题</h1>)

        const Tech = () => (<h1>这是科技动态</h1>)



        const Dev = ({ match }) => (
            <div>
                <h1 className="text-left">这是开发者资讯</h1>
                <ul>
                    <li><Link to={`${match.url}/JS`} component={Topic}>Rendering with React</Link></li>
                    <li><Link to={`${match.url}/PHP`} component={Topic}>Components</Link></li>
                    <li><Link to={`${match.url}/Python`} component={Topic}>Props v. State</Link></li>
                </ul>
                <Route path={`${match.url}/:topicId`} component={Topic} />
                <Route exact path={match.url} render={() => (
                    <h3>Please select a topic</h3>
                )} />
            </div>

        )

        const Topic = ({ match }) => (
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
                        <Route exact path="/" component={Index} />
                        <Route path="/hot" component={Hot} />
                        <Route path="/tech" component={Tech} />
                        <Route path="/dev" component={Dev} />
                    </div>
                </div>
            </Router>
        )
    }
}

export class Param extends React.Component {
    render() {

        const Person = ({ match }) => (
            <h1 className="text-center">name:{match.params.name}</h1>
        )
        return (
            <Router>
                <div className="container">
                    <h1>react-router路由传参</h1>
                    <nav className="top">
                        <Link to="/Jack">Jack</Link>
                        <Link to="/Mary">Mary</Link>
                        <Link to="/Alice">Alice</Link>
                    </nav>
                    <div className="content">
                        <Route path="/:name" component={Person}></Route>
                    </div>
                </div>
            </Router>
        )
    }
}

export class Redir extends React.Component {
    render() {
        const fakeAuth = {
            isAuthenticated: false,
            authenticate(cb) {
                this.isAuthenticated = true
                setTimeout(cb, 100)
            },
            singout(cb) {
                this.isAuthenticated = false
                setTimeout(cb, 100)
            }
        }

        const AuthButton = withRouter(({ history }) => (
            fakeAuth.isAuthenticated ? (
                <p>
                    welcome !<button onClick={() => { fakeAuth.singout(() => { history.push("/") }) }}>Sing Out</button>
                </p>

            ) : (
                    <p>you are not logged in</p>
                )
        ))


        const Public = () => (
            <h1 className="text-center">pubic</h1>
        )
        const Protected = () => (
            <h1 className="text-center">pubic</h1>
        )

        var Private = ({component:Component,...rest})=>(
            <Route {...rest} render={props =>(
                fakeAuth.isAuthenticated ? (
                    <Component {...props} />
                ) :(
                    <Redirect to={{
                        pathname:'/login',
                        state:{from:props.location}   
                    }} />
                )    
            )} />
        )


        return (
            <Router>
                <div className="container">
                    <h1>react-router重定向</h1>
                    <nav className="top">
                        AuthButton
                        <Link to="/public">public</Link>
                        <Link to="/protected">protected</Link>
                    </nav>
                    <div className="content">
                        <Route path="/public" component={Public}></Route>
                        <Route path="/public" component={Protected}></Route>
                    </div>
                </div>
            </Router>
        )
    }
}

class Login extends React.Component{
    state = {
        redirectToReferrer:false
    }
    login(){
        fakeAuth.authenticate(()=>{
            this.setState({redirectToReferrer:true})
        })
    }
    render(){
        const {from} = this.props.location.state || {from:{pathname:"/"}}
        const {redirectToReferrer} = this.state
        if(redirectToReferrer){
            return (
                <Redirect to={from} />
            )
        }
        return (
            <div>
                <p>you must log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        )
    }
}
