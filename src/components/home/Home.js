import React, { Component, Fragment } from "react";
import {Link, withRouter} from 'react-router-dom';
import Navbar from '../utility/navbar/Navbar';
import Pagination from '../utility/pagination/Pagination';
import Character from '../character/Character';
import SearchComponent from '../search/SearchComponent';
import Axios from 'axios';
import './Home.css';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            displayData: [],
            currentPage: 1
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

    sortData = (data) => {
        return data.sort((a,b) => Number(a.char_id)-Number(b.char_id));
    }

    handlePageChange = (index) => {
        this.setState({
            currentPage: index
        });
    }

    handleFilteredData = (arr, type) => {
        if(type === 'All') {
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

    render() {
        const characterData = [];
        if(this.state.displayData.length > 0) {
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
                                <Link to={{ pathname: '/character', obj: char }}  key={char.char_id} style={{textDecoration: "none"}}>
                                    <Character char={char}/>
                                </Link>
                            )
                        })
                    }
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Home);