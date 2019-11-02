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
        };
        this.handleTextboxChange = this.handleTextboxChange.bind(this);
        this.handleGoButtonClick = this.handleGoButtonClick.bind(this);
    }

    handleTextboxChange(event) {
        this.setState({ textFieldValue: event.target.value });
    }

    handleGoButtonClick() {
        for (let i = 0; i < Database.userList.length; i++) {
            if (this.getUser()) {
                this.setState({ validUser: true });
                return;
            }
        }
        alert("Invalid username selected :)");
    }

    getTableRows() {
        const rowList = [];

        rowList.push(
            <tr key={Database.userList.length}>
                <th className={'list-view'}>Usernames</th>
            </tr>
        );

        for (let i = 0; i < Database.userList.length; i++) {
            if (!Database.userList[i].isAdmin && Database.userList[i].username.toUpperCase().includes(this.state.textFieldValue.toUpperCase())) {
                rowList.push(
                    <tr key={i}>
                        <td className={'list-view'}>{Database.userList[i].username}</td>
                    </tr>
                );
            }

        }
        return rowList;
    }

    getUser() {
        for (let i = 0; i < Database.userList.length; i++) {
            if (Database.userList[i].username.toUpperCase() === this.state.textFieldValue.toUpperCase()) {
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
                                <input className={'list-view'} type={'text'} onChange={this.handleTextboxChange} value={this.state.textFieldValue} placeholder="Search"></input>
                                <button className={'list-view'} onClick={this.handleGoButtonClick}>Go!</button>
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