import React from 'react';
import '../CSS/ListView.css';
import AdminSideMenu from './AdminSideMenu';
import { Redirect, Link } from 'react-router-dom';
import AddIcon from '../Images/add_new.png';

//statezero
import BaseReactComponent from "./../BaseReactComponent";
import {setLastPage} from "../actions/userhelpers"

class AdminItemListPage extends BaseReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            textFieldValue: '',
            validItem: false,
            itemName: '',
            items: []
        };
        this.handleTextboxChange = this.handleTextboxChange.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    filterState({currUser}) {
        return {currUser};
    }

    componentDidMount() {
        // const url = 'http://localhost:3001/items/';
        const url = '/items/';
        const request = new Request(url, {
            method: 'get',
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
            this.setState({items: result});
        }).catch((error) => {
            alert('Failed to fetch items :(');
        })
        setLastPage("/AdminItemListPage");
    }

    handleEnter(event) {
        if (event.key === 'Enter') {
            const contains = this.state.items.map((item) => item.name.toUpperCase())
                .includes(this.state.textFieldValue.toUpperCase());
            if (contains) {
                this.setState({ 
                    validItem: true, 
                    itemName: this.state.textFieldValue.charAt(0).toUpperCase() + this.state.textFieldValue.toLowerCase().slice(1)
                });
            } else {
                alert('Invalid item name selected :)');
            }
        }
    }

    handleTextboxChange(event) {
        this.setState({ textFieldValue: event.target.value });
    }

    handleRowClick(event) {
        this.setState({
            validItem:true,
            itemName: event.target.innerText,
        });
    }

    getTableRows() {
        const rowList = [];

        rowList.push(
            <tr key={this.state.items.length}>
                <th className={'list-view'}>Item Type</th>
            </tr>
        );

        for (let i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i].name.toUpperCase().includes(this.state.textFieldValue.toUpperCase())) {
                rowList.push(
                    <tr key={i}>
                        <td className={'list-view'} onClick={this.handleRowClick}>{this.state.items[i].name}</td>
                    </tr>
                );
            }
        }
        return rowList;
    }

    getItemId() {
        for (let i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i].name.toUpperCase() === this.state.itemName.toUpperCase()) {
                return this.state.items[i]._id;
            }
        }
        return null;
    }

    render() {

        if (this.state.currUser === null) {
            return(
                <Redirect push to={{
                    pathname: "/"
                }} />
            );
        }

        if (this.state.validItem) {
            return <Redirect to={{
                pathname: './AdminItemPage',
                itemId: this.getItemId()
            }} />
        }
        return(
            <div onKeyDown={this.handleEnter} >
                <Link to={'./AdminNewItemPage'}>
                    <img className={'addIcon'} src={AddIcon} alt={'Add Icon'}></img>
                </Link>
                <AdminSideMenu />
                <div className='main'>
                    <div className='mainForm'>
                        <div className={'list-view'}>
                            <div className='listTitle'>Item Types</div>
                            <div id={'inner-container'} className={'list-view'}>
                                <input id={'textfield'} className={'list-view'} type={'text'} onChange={this.handleTextboxChange} value={this.state.textFieldValue} placeholder="Search"></input>
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

export default AdminItemListPage;