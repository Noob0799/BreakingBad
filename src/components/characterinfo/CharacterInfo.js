import React, {Component, Fragment} from "react";
import Axios from "axios";
import Navbar from '../utility/navbar/Navbar';
import './CharacterInfo.css';
import { createStore } from 'redux';
import charReducer from '../reducer/charReducer';

//Component to display character info at /character route
class CharacterInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characterQuotes: [], //to store famous quotes of characters
            charObject: null //to store character information
        };
    }

    componentDidMount() {
        const store = createStore(charReducer);
        console.log(store.getState());
        const object = store.getState().charDetails;
        console.log(object);

        //extracting first and last names of characters for fetching quotes
        const name = object.name.split(" ");
        if(name[0] === 'Henry' || name[0] === 'Gustavo') {
            name[0] = object.nickname;
        }
        let fullname = '';
        for(let i=0;i<name.length;i++) {
            if(i===name.length-1) {
                fullname += name[i];
            } else {
                fullname += name[i] + '+';
            }
        }
        Axios.get('https://www.breakingbadapi.com/api/quote?author=' + fullname)
            .then(response=> {
                console.log({response});
                this.setState({
                    characterQuotes: [...response.data],
                    charObject: object
                });
            })
            .catch(error => {
                console.log({error});
            })
    }

    render() {
        const object = this.state.charObject;
        let charDetails = null;
        if(object) {
            charDetails = (
                <div className="row">
                    <div className="img-container col-6">
                        <img src={object.img} className="char-img" alt={object.name}/>
                    </div>
                    <div className="details-container col-5">
                        <p className="char-name"><b>Name:</b> {object.name}</p>
                        <p className="char-nickname"><b>Nickname:</b> {object.nickname}</p>
                        <p className="char-appearance"><b>Appearance in season(s):</b> {object.appearance.toString()}</p>
                        <p className="char-birthday"><b>Birthday:</b> {object.birthday}</p>
                        <p className="char-occupation"><b>Occupation:</b> {object.occupation.toString()}</p>
                        <p className="char-portrayed"><b>Portrayed by:</b> {object.portrayed}</p>
                        <p className="char-status"><b>Status(Dead/ALive):</b> {object.status}</p>
                    </div>
                </div>
            );
        }
        let charQuotes = null;
        if(this.state.characterQuotes.length>0) {
            charQuotes = (
                <div className="quotes">
                    <div className="quote-heading mx-4">
                        <p>Famous Quotes:</p>
                    </div>
                    {
                        this.state.characterQuotes.map(obj => {
                            return (
                                <p className="char-quotes mx-4" key={obj.quote_id}>{obj.quote}</p>
                            );
                        })
                    }
                </div>
            );
        }
        return (
            <Fragment>
                <Navbar type='character'/>
                {
                    charDetails
                }
                {
                    charQuotes
                }
            </Fragment>
        );
    }
    
}

export default CharacterInfo;