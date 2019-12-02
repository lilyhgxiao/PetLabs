import React from 'react';
import '../CSS/ListView.css';
import AdminSideMenu from './AdminSideMenu';
import { Redirect } from 'react-router-dom';

class AdminUserListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textFieldValue: '',
            validUser: false,
            users: []
        };
        this.handleTextboxChange = this.handleTextboxChange.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    componentDidMount() {
        const url = 'http://localhost:3001/users';

        const request = new Request(url, {
            method: 'GET',
            headers: { 
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });

        fetch(request)
        .then((result) => {
            if (result.status === 200) {
                return result.json();
            }
        }).then((result) => {
            this.setState({users: result});
        }).catch((error) => {
            alert('Failed to fetch pet types :(');
        });
    }

    handleEnter(event) {
        if (event.key === 'Enter') {
            const contains = this.state.users.map((user) => user.username.toUpperCase())
                .includes(this.state.textFieldValue.toUpperCase());
            if (contains) {
                this.setState({ 
                    validUser: true, 
                    username: this.state.textFieldValue.charAt(0).toUpperCase() + this.state.textFieldValue.toLowerCase().slice(1)
                });
            } else {
                alert('Invalid username selected :)');
            }
        }
    }

    handleTextboxChange(event) {
        this.setState({ textFieldValue: event.target.value });
    }

    handleRowClick(event) {
        this.setState({
            validUser: true,
            username: event.target.innerText,
        });
    }

    getTableRows() {
        const rowList = [];

        rowList.push(
            <tr key={this.state.users.length}>
                <th className={'list-view'}>Usernames</th>
            </tr>
        );

        for (let i = 0; i < this.state.users.length; i++) {
            if (!this.state.users[i].isAdmin && this.state.users[i].username.toUpperCase().includes(this.state.textFieldValue.toUpperCase())) {
                rowList.push(
                    <tr key={i}>
                        <td className={'list-view'} onClick={this.handleRowClick}>{this.state.users[i].username}</td>
                    </tr>
                );
            }

        }
        return rowList;
    }

    getUserID() {
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].username.toUpperCase() === this.state.username.toUpperCase()) {
                return this.state.users[i]._id;
            }
        }
        return null;
    }

    render() {
        if (this.state.validUser) {
            return <Redirect to={{
                pathname: './AdminUserPage',
                userId: this.getUserID()
            }} />
        }
        return(
            <div>
                <AdminSideMenu />
                <div className='main'>
                    <div className='mainForm'>
                        <div className={'list-view'}>
                            <div className='listTitle'>Users</div>
                            <div id={'inner-container'} className={'list-view'}>
                                <input onKeyDown={this.handleEnter} id={'textfield'} className={'list-view'} type={'text'} onChange={this.handleTextboxChange} value={this.state.textFieldValue} placeholder="Search"></input>
                                <br /> <br />
                                <table className={'list-view'}>
                                    <tbody>
                                        {this.getTableRows()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminUserListPage;