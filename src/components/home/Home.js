import React, { Component, Fragment } from "react";
import {withRouter} from 'react-router-dom';
import Navbar from '../utility/navbar/Navbar';
import Pagination from '../utility/pagination/Pagination';
import Character from '../character/Character';
import SearchComponent from '../search/SearchComponent';
import Axios from 'axios';
import './Home.css';
import { createStore } from 'redux';
import charReducer from '../reducer/charReducer';

//Component to display list of characters via pagination and implement searching and filtering. Component rendered at /
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],  //to store character data from api
            displayData: [], //to store data to be displayed
            currentPage: 1 //to store current page number
        };
    }

    componentDidMount() {
        Axios.get('https://www.breakingbadapi.com/api/characters?category=Breaking+Bad')
            .then(response => {
                console.log({response});
                const resData = this.sortData(response.data);
                this.setState({
                    data: resData,
                    displayData: resData
                });
            })
            .catch(error => {
                console.log({error});
            })
    }

    componentDidUpdate() {
        let elementRef = '';

        //pagination css effect
        for(let i=1;i<=Math.ceil(this.state.data.length/10);i++) {
            if(i !== this.state.currentPage) {
                elementRef = document.getElementById("page-no-"+i);
                if(elementRef) {
                    elementRef.style.borderBottom = "1px solid black";
                }
            }
        }
        elementRef = document.getElementById("page-no-"+this.state.currentPage);
        if(elementRef) {
            elementRef.style.borderBottom = "3px solid black";
        }
    }

    //function to sort character data according to char_id
    sortData = (data) => {
        return data.sort((a,b) => Number(a.char_id)-Number(b.char_id));
    }

    //function to handle page change
    handlePageChange = (index) => {
        this.setState({
            currentPage: index
        });
    }

    //function to handle filtered data after searching or filtering and displaying it
    handleFilteredData = (arr, type) => {
        if(type === 'All') {  //All is for the 'All' option in season dropdown
            this.setState({
                displayData: [...this.state.data],
                currentPage: 1
            });
        } else {
            this.setState({
                displayData: [...this.sortData(arr)],
                currentPage: 1
            });
        }
    }

    sendDataToCharacterInfo = (obj) => {
        const store = createStore(charReducer);
        store.dispatch({type: 'UPDATE_CHAR_INFO', charObj: obj});
        this.props.history.push('/character');
    }

    render() {
        const characterData = [];
        if(this.state.displayData.length > 0) {  //handling pagination depending on current page
            for(let i=(this.state.currentPage-1)*10;i<Math.min(this.state.currentPage*10, this.state.displayData.length);i++) {
                characterData.push(this.state.displayData[i]);
            }
        }
        return (
            <Fragment>
                <Navbar type='home'/>
                <Pagination dataSize={this.state.displayData.length} getIndex={this.handlePageChange}/>
                <div className="home-search">
                    <SearchComponent searchData={this.state.data} filteredData={this.handleFilteredData}/>
                </div>
                <div className="home-data">
                    {
                        characterData.map(char => {
                            return (
                                <div onClick={() => {this.sendDataToCharacterInfo(char)}} key={char.char_id}>
                                    <Character char={char}/>
                                </div>
                            )
                        })
                    }
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Home);