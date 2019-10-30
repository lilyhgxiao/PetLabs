import React from 'react';
import '../CSS/ListView.css';
import AdminSideMenu from './AdminSideMenu';
import Database from '../TempClasses/Database';
import { Redirect, Link } from 'react-router-dom';
import AddIcon from '../Images/add_new.png';

class AdminPetListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textFieldValue: '',
            validPet: false,
        };
        this.handleTextboxChange = this.handleTextboxChange.bind(this);
        this.handleGoButtonClick = this.handleGoButtonClick.bind(this);
    }

    handleTextboxChange(event) {
        this.setState({ textFieldValue: event.target.value });
    }

    handleGoButtonClick() {
        if (this.getPetTypeId()) {
            this.setState({ validPet: true });
            return;
        }
        alert("Invalid pet type selected :)");
    }

    getTableRows() {
        const rowList = [];

        rowList.push(
            <tr key={Database.petTypes.length}>
                <th className={'list-view'}>Pets</th>
            </tr>
        );

        for (let i = 0; i < Database.petTypes.length; i++) {
            if (Database.petTypes[i].name.toUpperCase().includes(this.state.textFieldValue.toUpperCase())) {
                rowList.push(
                    <tr key={i}>
                        <td className={'list-view'}>{Database.petTypes[i].name}</td>
                    </tr>
                );
            }
        }
        return rowList;
    }

    getPetTypeId() {
        for (let i = 0; i < Database.petTypes.length; i++) {
            if (Database.petTypes[i].name.toUpperCase() === this.state.textFieldValue.toUpperCase()) {
                return Database.petTypes[i].id;
            }
        }
        return null;
    }

    render() {
        if (this.state.validPet) {
            return <Redirect to={{
                pathname: './AdminPetPage',
                petTypeId: this.getPetTypeId()
            }} />
        }
        return(
            <div>
                <Link to={'./AdminNewPetPage'}>
                    <img className={'addIcon'} src={AddIcon} alt={'Add Icon'}></img>
                </Link>
                <AdminSideMenu />
                <div className='main'>
                    <div className='mainForm'>
                        <div className={'list-view'}>
                            <h1>Pets</h1>
                            <div id={'inner-container'} className={'list-view'}>
                                <input className={'list-view'} type={'text'} onChange={this.handleTextboxChange} value={this.state.textFieldValue}></input>
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

export default AdminPetListPage;