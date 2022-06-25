import React, {useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from "axios";
import MultipleProperties from '../Common/MultipleProperties';
import {Makaan} from '../../request';
const Plots = (props) => {

    const { t } = useTranslation();
    const [state,setState] = useState({
        houses_list:[]
    });
    const [total,setTotal] = useState(0);
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        console.log(event.selected,"event.selected&type=Plots");
        Makaan.get(`properties?page=${event.selected+1}`)
			  .then(res => {
					setState({...state,houses_list: res.data.data.properties.data});
        })
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        let endpoints = [
            `properties?page=1&type=Plots`
        ];
        axios.all(endpoints.map((endpoint) => {
            return Makaan.get(endpoint);
        })).then(
            (res) => {
                setTotal(Math.ceil(res[0].data.data.properties.total/2));
                setState({...state,houses_list: res[0].data.data.properties.data })
            }
        );
    },[]);
        return (
            <MultipleProperties unit={true} handlePageClick={handlePageClick} total={total} list={state.houses_list} heading={t('TOP DEALS ON PLOTS')}/>
        );
}

export default Plots;
