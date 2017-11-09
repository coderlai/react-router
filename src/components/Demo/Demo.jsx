import React from 'react'

class MyDiv extends React.Component {
    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}


export default MyDiv