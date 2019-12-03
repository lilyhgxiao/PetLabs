import React from 'react';
import { Redirect } from 'react-router';

import BaseReactComponent from "./../BaseReactComponent";
import { getState } from "statezero";
import { readCookie } from "../actions/userhelpers";

class RedirectComponent extends BaseReactComponent {

    state = {
        cookieExists: false,
        cookieChecked: false,
        cookieRead: false
    };

    filterState({currUser, lastVisitedPage, cookieRead}) {
        return {currUser, lastVisitedPage, cookieRead};
    }

    componentDidMount() {
        const url = "/cookie/check-session";

        fetch(url)
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }
            }).then((json) => {
                if (json && json.user) {
                    this.setState({
                        cookieExists: true,
                        cookieChecked: true
                    });
                }
                else {
                    this.setState({
                        cookieExists: false,
                        cookieChecked: true
                    });
                }
            })

        const cookieReq = readCookie();

        cookieReq.then((result) => {
            this.setState({
                cookieRead: result
            });
        })
    }w

    render() {
        const {currUser, lastVisitedPage} = this.state;

        if (this.state.cookieChecked) {
            if (this.state.cookieExists) {
                return(
                    <Redirect push to={{
                        pathname: lastVisitedPage
                    }} />
                );
            } else {
                return(
                    <Redirect push to={{
                        pathname: "/login"
                    }} />
                );
            }
        }
        
        return (<div className='app'></div>);
    }

}

export default RedirectComponent;