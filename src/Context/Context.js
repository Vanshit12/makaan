import React, { createContext, useReducer, useContext, useState, useEffect} from 'react';
import {Makaan} from '../request';
import {authReducer} from './Reducers';
import axios from "axios";

const Auth = createContext();

const  Context = ({children}) => {
   
    const isAuthenticated = localStorage.getItem("access_token");
    const [state, dispatch] = useReducer(authReducer,{
        authUser: isAuthenticated,
        notifications: [],
        user_info: {},
        site_settings:{}
    })

    useEffect(() => {
        let endpoints = [
          `notifications`,
          `users/view-profile`
        ];
        axios.all(endpoints.map((endpoint,i) => {
          if(i === 0) {
            return Makaan.get(`${endpoint}?type=small`);
          }
          
          return Makaan.get(endpoint);
        })).then(
           (res) => {
                dispatch({type:'NOTIFICATION_FETCH',payload:res[0].data.data});
                dispatch({type:'USER_INFO_FETCH',payload:res[1].data.data});
           
        }).catch(error => {
          localStorage.removeItem("access_token")
            dispatch({type:'LOGOUT',payload:undefined});
        });
  
     },[state.authUser]);

     useEffect(() => {
      let endpoints = [
        `site-settings`
      ];
      axios.all(endpoints.map((endpoint,i) => {
        return Makaan.post(`${endpoint}`);
      })).then(
         (res) => {
              dispatch({type:'SITE_SETTINGS',payload:res[0].data.data});
         
      }).catch(error => {
        
      });

   },[state.authUser]);
    return <Auth.Provider value={{state, dispatch}}>{children}</Auth.Provider>
}

export default Context;
export const AuthState = () =>{
    return useContext(Auth);
}