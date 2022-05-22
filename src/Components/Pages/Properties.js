import React, {useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from "axios";
import MultipleProperties from '../Common/MultipleProperties';
import {Makaan} from '../../request';
const Properties = (props) => {

    const { t } = useTranslation();
    const [state,setState] = useState({
        properties_list:[]
    });
    const [total,setTotal] = useState(0);
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        Makaan.get(`properties?page=${event.selected+1}`)
			  .then(res => {
					setState({...state,properties_list: res.data.data.properties.data});
        })
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        let endpoints = [
            `properties?page=1`
        ];
        axios.all(endpoints.map((endpoint) => {
            return Makaan.get(endpoint);
        })).then(
            (res) => {
                console.log(res[0].data.data.properties.data,';res[0].data.data.properties.datares[0].data.data.properties.data')
                setTotal(Math.ceil(res[0].data.data.properties.total/6));
                setState({...state,properties_list: res[0].data.data.properties.data })
            }
        );
    },[]);
        return (
            <MultipleProperties handlePageClick={handlePageClick} total={total} list={state.properties_list} heading={t('Common.Properties')}/>
        );
}

export default Properties;
