import React, {useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from "axios";
import MultipleProperties from '../Common/MultipleProperties';
import {Makaan} from '../../request';
const Apartments = (props) => {

    const { t } = useTranslation();
    const [state,setState] = useState({
        houses_list:[],
        show_paginate:false,
    });
    const [total,setTotal] = useState(0);
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        console.log(event.selected,"event.selected");
        Makaan.get(`properties?page=${event.selected+1}&type=Flat`)
			  .then(res => {
					setState({...state,apartments_list: res.data.data.properties.data});
        })
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        let endpoints = [
            `properties?page=1&type=Flat`
        ];
        axios.all(endpoints.map((endpoint) => {
            return Makaan.get(endpoint);
        })).then(
            (res) => {
                setTotal(Math.ceil(res[0].data.data.properties.total/12));
                setState({...state,apartments_list: res[0].data.data.properties.data, show_paginate:(res[0].data.data.properties.current_page === 1 ? (res[0].data.data.properties.data.length < 12 ? false : true) : true) })
            }
        );
    },[]);
        return (
            <MultipleProperties show_paginate={state.show_paginate} unit={true} handlePageClick={handlePageClick} total={total} list={state.apartments_list} heading={t('TOP DEALS ON APARTMENTS')}/>
        );
}

export default Apartments;
