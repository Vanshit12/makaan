import React, {useState, useEffect, useMemo} from 'react';
import { Row, Col, Table, Dropdown} from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import {AuthState} from '../../../Context/Context';
import {Makaan} from '../../../request'
import axios from "axios";
import NumberFormat from 'react-number-format';
import {useTable, useSortBy, useGlobalFilter, useAsyncDebounce, usePagination} from "react-table";




const PropertyListing = (props) => {

    const skipPageResetRef = React.useRef()
    const {state : {authUser, notifications, user_info}, dispatch} = AuthState();
    const [value, setValue] = useState('')
    const [state,setState] = useState({
        property_listing:[]
    });
    const logout = () => {
        localStorage.removeItem("access_token")
        dispatch({type:'LOGOUT',payload:undefined});
        dispatch({type:'USER_INFO_FETCH',payload:{}});
        toast.success("Logout Successfull !", {
            position: toast.POSITION.TOP_RIGHT,
        });
    }
    const deleteData = (property_uuid) => {
        skipPageResetRef.current = true
        let endpoints = [
            `property-delete`
        ];
        axios.all(endpoints.map((endpoint,i) => {
            return Makaan.post(endpoint,{uuid:property_uuid});
        })).then(
            (res) => {
                if(!res[0].data.error){
                    toast.success("Property Deleted Successfully !", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setState({...state, property_listing:res[0].data.data});
                }else{
                    toast.error(res[0].data.msg, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            }
        ).catch(error => {
        	toast.error(error.message, {
			     position: toast.POSITION.TOP_RIGHT,
			});
        });
    }

    const COLUMNS = [
        {
            Header: 'Title',
            accessor: 'title'
        },
        {
            Header: 'Property Purpose',
            accessor: 'property_purpose',
        },
        {
            Header: 'Property Type',
            accessor: 'child_property_type',
        },
        {
            Header: 'Location',
            accessor: 'address',
        },
        {
            Header: 'Price',
            accessor: 'price',
            Cell : (props)=>{
                return (<NumberFormat
                    value={props.value}
                    displayType="text"
                    thousandSeparator={true}
                    prefix="PKR "
                    isNumericString={false}
                    fixedDecimalScale={false}
                  />);
            }
        },
        {
            Header: 'Area Size',
            accessor: 'rough_area_size',
        },
        {
            Header: 'Status',
            accessor: 'status'
        },
        {
            Header: 'Listed Date',
            accessor: 'created_at'
        },
        {
            Header: 'Action',
            accessor: 'uuid',
            disableSortBy: true,
            Cell : (props)=>{
                const custom_date = 'custom_date'+props.value
                return  <Dropdown>
                            <Dropdown.Toggle variant="icon btn-icon-xs" id="dropdown-basic">
                            
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                            <NavLink to={`/my-account/edit-property/${props.value}`}>
                                <Dropdown.Item href={`/my-account/edit-property/${props.value}`}>Edit</Dropdown.Item>
                            </NavLink>
                                <Dropdown.Item onClick={()=>{deleteData(props.value)}}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
            }
        },
    ];
    const columns = useMemo(()=> COLUMNS, [])
    const data = state.property_listing
    const tableInstance = useTable({
        autoResetPage: !skipPageResetRef.current,
        autoResetExpanded: !skipPageResetRef.current,
        autoResetGroupBy: !skipPageResetRef.current,
        autoResetSelectedRows: !skipPageResetRef.current,
        autoResetSortBy: !skipPageResetRef.current,
        autoResetFilters: !skipPageResetRef.current,
        autoResetRowState: !skipPageResetRef.current,
        columns, data
    }, useGlobalFilter, useSortBy, usePagination)
    const {getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }, prepareRow, preGlobalFilteredRows, setGlobalFilter} = tableInstance;
    
      const count = preGlobalFilteredRows.length
      const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
      }, 200)
    
    useEffect(() => {
            window.scrollTo(0, 0);
            skipPageResetRef.current = false
            let endpoints = [
                `property-listing`
            ];
            axios.all(endpoints.map((endpoint,i) => {
                return Makaan.post(endpoint);
            })).then(
                (res) => {
                    setState({...state, property_listing:res[0].data.data});
                }
            );

    },[]);

    return (
        <div className="property-listing-page">
            <div className="myaccount-head">
                <Row className="align-items-center">
                    <Col xl lg md sm={12}>
                        <div className="myacconut_wrap_toggle">
                            <h2>Property Listing</h2>
                        </div>
                    </Col>
                    <Col xl={5} lg={5} md={5} sm={12}>
                        <span>
                            <input className="form-control" 
                            value={value || ""}
                            onChange={e => {
                                setValue(e.target.value);
                                onChange(e.target.value);
                            }}
                            placeholder="Search Your Property"
                            />
                        </span>
                    </Col>
                </Row>
            </div>
            <div className="myaccount-body">
                <div className="table-overflow">
                    {
                        (page.length > 0 && 
                            <Table striped responsive bordered hover {...getTableProps()}>
                                <thead>
                                    {headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
                                                <th {...column.getHeaderProps(column.getSortByToggleProps)}>
                                                    {column.render('Header')}
                                                    <span className="icon">
                                                        {column.isSorted ? (column.isSortedDesc ?

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>

                                                        : 
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"/></svg>

                                                        ) :
                                                        (!column.disableSortBy ? 
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up-down">
                                                            <polyline className="st0" points="18,9 12,3 6,9 "/>
                                                            <polyline className="st0" points="6,15 12,21 18,15 "/>
                                                        </svg> : '')
                                                    }
                                                    </span>
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {
                                            page.map((row, i) => {
                                            prepareRow(row)
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells.map(cell => {
                                                        return <td {...cell.getCellProps()}>
                                                            <span className="inner-data">{cell.render('Cell')}</span>
                                                        </td>
                                                    })}
                                                </tr>
                                            )
                                        })
                                        }
                                </tbody>

                            </Table>
                        ) || <div className="no-data-message">
                                <div className="wrap">No Listings Found!</div>
                            </div>
                    }
                </div>
                <div className="pagination">
                    <div className="left">
                        <span className="index">Showing {pageIndex + 1} of {pageOptions.length}</span>
                        <select className="form-select" value={pageSize} onChange={e => {setPageSize(Number(e.target.value))}}>
                            {[2, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    <ul>
                        <li className="item">
                            <button title="First Page" className="icon-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevrons-left"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
                            </button>
                        </li>
                        <li className="item">
                            <button title="Previous Page" className="icon-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </button>
                        </li>
                        <li className="item">
                            <button title="Previous Page"  onClick={() => previousPage()} disabled={!canPreviousPage}>
                                1
                            </button>
                        </li>
                        <li className="item">
                            <button title="Previous Page"  onClick={() => previousPage()} disabled={!canPreviousPage}>
                                2
                            </button>
                        </li>
                        <li className="item">
                            <button title="Previous Page"  onClick={() => previousPage()} disabled={!canPreviousPage}>
                                ...
                            </button>
                        </li>
                        <li className="item">
                            <button title="Previous Page" onClick={() => previousPage()} disabled={!canPreviousPage}>
                                5
                            </button>
                        </li>
                        <li className="item">
                            <button title="Next Page" className="icon-item" onClick={() => nextPage()} disabled={!canNextPage}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>
                        </li>
                        <li>
                            <button title="Last Page" className="icon-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevrons-right"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                            </button>
                        </li>   
                    </ul>
                    
                    
                </div>
            </div>
        </div>
                    
    );
}

export default PropertyListing;