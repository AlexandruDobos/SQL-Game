import React, {Component} from "react";
import IPv4 from '../index.js'
export class Forgot extends Component {
    
    handleSubmit = e => {
        e.preventDefault();
    };
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Forgot Password</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Email"
                           onChange={e => this.email = e.target.value}/>
                </div>
                <button className="btn btn-primary btn-block">Submit</button>
            </form>
        )
    }
}