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
            petName: '',
        };
        this.handleTextboxChange = this.handleTextboxChange.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleEnter(event) {
        if (event.key === 'Enter') {
            const contains = Database.petTypes.map((petType) => petType.name.toUpperCase())
                .includes(this.state.textFieldValue.toUpperCase());
            if (contains) {
                this.setState({ 
                    validPet: true, 
                    petName: this.state.textFieldValue.charAt(0).toUpperCase() + this.state.textFieldValue.toLowerCase().slice(1)
                });
            } else {
                alert('Invalid pet type name selected :)');
            }
        }
    }

    handleTextboxChange(event) {
        this.setState({ textFieldValue: event.target.value });
    }

    handleRowClick(event) {
        this.setState({
            validPet: true,
            petName: event.target.innerText,
        });
    }

    getTableRows() {
        const rowList = [];

        rowList.push(
            <tr key={Database.petTypes.length}>
                <th className={'list-view'}>Pets</th>
            </tr>
        );

        for (let i = 0; i < Database.petTypes.length; i++) {
            if (Database.petTypes[i].name.toUpperCase().includes(this.state.petName.toUpperCase())) {
                rowList.push(
                    <tr key={i}>
                        <td className={'list-view'} onClick={this.handleRowClick}>{Database.petTypes[i].name}</td>
                    </tr>
                );
            }
        }
        return rowList;
    }

    getPetTypeId() {
        for (let i = 0; i < Database.petTypes.length; i++) {
            if (Database.petTypes[i].name.toUpperCase() === this.state.petName.toUpperCase()) {
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
                            <div className='listTitle'>Pets</div>
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

export default AdminPetListPage;