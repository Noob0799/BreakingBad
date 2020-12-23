import React, {Component, Fragment} from "react";
import './SearchComponent.css';

//Component to handle search feature
class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characterData: [], //to store character data on which searching will be done
            filteredSearchResult: [], //to store the search result after filtering the rest out
        };
    }

    static getDerivedStateFromProps(nextProps,prevState) {
        console.log('SearchList',nextProps.searchData);
        return {
            characterData: nextProps.searchData
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.filteredSearchResult !== this.state.filteredSearchResult) return true;
        if(nextProps.searchData.length === this.props.searchData.length) return false;
        return true;
    }

    //function to select the suggested option on searching
    handleSearchClick = (obj) => {
        this.props.filteredData([obj]);
        this.setState({
            filteredSearchResult: []
        });
    }

    //function to handle keypress in the searchbar
    handleChange = () => {
        let input = document.getElementById('searchTerm').value;
        console.log(input);
        const searchResult = [];
        if(input.length>0) {
            input = input.toLowerCase();
            this.state.characterData.forEach(obj => {
                const name = obj.name.toLowerCase();
                const nickname = obj.nickname.toLowerCase();
                const  portrayed = obj.portrayed.toLowerCase();
                if(name.includes(input) || nickname.includes(input) || portrayed.includes(input)) {
                    searchResult.push(obj);
                }
            });
            const filteredSearchResult = searchResult.splice(0,5);
            console.log(filteredSearchResult);
            this.setState({
                filteredSearchResult: [...filteredSearchResult]
            });
        } else {
            this.props.filteredData([], 'All');
            this.setState({
                filteredSearchResult: []
            });
        }
    }

    //function to handle change in episode selection for filtering
    handleEpisodeChange = () => {
        const episode = document.getElementById('episode-select').value;
        console.log(episode);
        if(episode === 'All') {
            this.props.filteredData([], episode);
        } else {
            const searchResult = [];
            if(episode) {
                this.state.characterData.forEach(obj => {
                    const episodeArr = obj.appearance;
                    let found = false;
                    for(let i=0;i<episodeArr.length;i++) {
                        if(episodeArr[i] === Number(episode)) {
                            found = true;
                            break;
                        }
                    }
                    if(found) {
                        searchResult.push(obj);
                    }
                });
            }
            console.log('Characters', searchResult.length);
            this.props.filteredData([...searchResult]);
        }
    }

    render() {
        const filterOptions = ['All'];
        if(this.state.characterData.length > 0) {
            for(let keys in this.state.characterData[0]) {
                if(keys !== 'better_call_saul_appearance' && keys !== 'category' && keys!== 'char_id' && keys !== 'img') {
                    filterOptions.push(keys);
                }
            }
        }
        console.log('Filtered search result:', this.state.filteredSearchResult);
        return(
            <Fragment>
                <div className="search">
                    <input type="text" className="searchTerm" id="searchTerm" placeholder="Search by name,nickname or actor name" onKeyUp={this.handleChange}/>
                    <button type="button" className="searchButton" disabled>
                        <i className="fa fa-search"></i>
                    </button>
                </div>
                <ul className="searchContainer" id="searchContainer">
                    {
                        this.state.filteredSearchResult.map(elem => {
                            return (
                                <li key={elem.char_id} onClick={() => {this.handleSearchClick(elem)}}>
                                    <div className="row searchSuggest">
                                        <div className="col-4 search-text">
                                            {elem.name}
                                        </div>
                                        <div className="col-3 search-text">
                                            {elem.nickname}
                                        </div>
                                        <div className="col-5 search-text">
                                            {elem.portrayed}
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="filter">
                    <div className="episode-filter">
                        <label className="episode-select-label">Episode: </label>
                        <select className="episode-select" id="episode-select" onChange={this.handleEpisodeChange}>
                            <option value="All">All</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default SearchComponent;