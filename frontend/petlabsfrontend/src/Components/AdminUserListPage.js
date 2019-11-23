import React from 'react';
import '../CSS/ListView.css';
import AdminSideMenu from './AdminSideMenu';
import Database from '../TempClasses/Database';
import { Redirect } from 'react-router-dom';

class AdminUserListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textFieldValue: '',
            validUser: false,
            username: '',
        };
        this.handleTextboxChange = this.handleTextboxChange.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleEnter(event) {
        if (event.key === 'Enter') {
            const contains = Database.userList.map((user) => user.username.toUpperCase())
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
            <tr key={Database.userList.length}>
                <th className={'list-view'}>Usernames</th>
            </tr>
        );

        for (let i = 0; i < Database.userList.length; i++) {
            if (!Database.userList[i].isAdmin && Database.userList[i].username.toUpperCase().includes(this.state.username.toUpperCase())) {
                rowList.push(
                    <tr key={i}>
                        <td className={'list-view'} onClick={this.handleRowClick}>{Database.userList[i].username}</td>
                    </tr>
                );
            }

        }
        return rowList;
    }

    getUser() {
        for (let i = 0; i < Database.userList.length; i++) {
            if (Database.userList[i].username.toUpperCase() === this.state.username.toUpperCase()) {
                return Database.userList[i].username;
            }
        }
        return null;
    }

    render() {
        if (this.state.validUser) {
            return <Redirect to={{
                pathname: './AdminUserPage',
                username: this.getUser()
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