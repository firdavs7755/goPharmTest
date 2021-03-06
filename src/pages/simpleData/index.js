import React, {Component, useEffect, useState} from 'react';
import {createStructuredSelector} from "reselect";
import {selectData, selectPersonalData, selectToken} from "../../redux/actions/user_selector";
import {connect} from "react-redux";
import {productApi} from "../../services/product";
import {setData} from "../../redux/actions/userAction";
import {useHistory} from 'react-router-dom'
import {Button, Col, Form, Modal, Row, Table} from 'react-bootstrap'
import {useFilters, useGlobalFilter, usePagination, useSortBy, useTable} from "react-table";
import './product.css';
import Header from "./header";

const Product = ({personal,SETDATA,DATA})=>{
    const history = useHistory();
    const data = DATA;
    const [one,setOne] = useState(undefined);
    const columns = React.useMemo(
        () => [
            {
                Header: 'N#',
                Cell: (row) => {
                    return <div>{Number(row.row.id) + 1}</div>;
                },
            },
            {
                Header:"id",
                accessor:"id"
            },
            {
                Header:"status",
                accessor: "status"
            },
            {
                Header:"Full name",
                accessor: "full_name"
            },
            {
                Header:"phone",
                accessor:"phone",
            },
            {
                Header:"Cashback",
                accessor: "cash"
            },
            {
                Header:"Real summa",
                accessor: "real_total"
            },
            {
                Header:"delivery summa",
                accessor: "delivery_total"
            }

        ],
        []
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        rows,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        previousPage,nextPage,
        pageCount,
        setPageSize,
        state,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 10 }
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    )
    // const [itemCount,setItemCount] = useState(10)
    const { pageIndex, pageSize } = state;
    const {globalFilter} = state;


    useEffect(()=>{
        bringdata();
    },[])

    useEffect(()=>{
        console.log("DATA",DATA)
        console.log("pageindex=",pageIndex)

    },[DATA,pageIndex]);
    const bringdata = ()=>{
        productApi.getData()
            .then(res=>{
                console.log("product",res)
                SETDATA(res.data.results)
            })
    }
    const [show,setShow] = useState(false);
    const toggle =(id)=> {
        setShow(!show)
        setOne(DATA.find(item=>item.id===id))
    }
    return(
        <>
            <Header personal={personal}/>
            <div className={'slide-fwd-bottom'}>
                <Modal size={'lg'} style={{marginLeft:"-120px"}} show={show} onHide={()=>toggle()}>
                    <Modal.Header closeButton>Description</Modal.Header>
                    <Modal.Body>
                        <div>
                            <p>booking number :<span> {one?.id}</span></p>
                            <p>F.I.O :<span> {one?.full_name}</span></p>
                            <p>Address :<span> {one?.address}</span></p>
                            <p>Telephone :<span> +{one?.phone}</span></p>
                            <p>Cashback :<span> {one?.cash}</span></p>
                            <p>Real total :<span> {one?.real_total}</span></p>
                            <p>deliverer_accepted_time :<span> {one?.deliverer_accepted_time}</span></p>
                            <p>payment type :<span> {one?.payment_type?.name}</span></p>
                        </div>
                        <Table>
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>manufacturer</th>
                                    <th>pharmacy</th>
                                    <th>quantity</th>
                                    <th>price a count</th>
                                    <th>all total</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                one?.items?.map((item,index)=>(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>
                                            <img src={item?.drug?.image_thumbnail} alt=""/>
                                            {item.drug.name}
                                        </td>
                                        <td>{item.drug.manufacturer.name}</td>
                                        <td>{item.store.name}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.subtotal}</td>
                                        <td>{item.price}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Modal.Body>
                    Lorem ipsum dolor sit amet, consectetur <h1>{one?.id}</h1>
                </Modal>
            </div>

            <div style={{padding:'10px'}}>
                <Table id='table' hover responsive {...getTableProps()}>
                    <thead style={{backgroundColor:"rgba(110,181,193,0.51)"}}>
                    {headerGroups.map(headerGroup =>{
                        return(
                            <tr {...headerGroup.getHeaderGroupProps()}>

                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
                                        <div className='d-flex align-items-center justify-content-center'>
                                            <span className={`mr-2`}>{column.render('Header')}</span>
                                            <span className={`my-auto`} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                {   (!column.notSort)?
                                                    column.isSorted ?
                                                        column.isSortedDesc?
                                                            <i className='fa fa-chevron-down'/>
                                                            :<i className='fa fa-chevron-up'/>
                                                        :<i className='fa fa-bars'/>
                                                    : ""
                                                }
                                                </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        )
                    })}
                    </thead>
                    <tbody style={{backgroundColor:'rgba(122,217,255,0.12)'}} {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} onDoubleClick={()=>toggle(row.original.id)}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            style={{
                                                padding: '10px',
                                                border: 'solid 1px gray',
                                                // background: 'papayawhip',
                                            }}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>

            <div className="pagination">
                <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {"First"}
                </Button>{" "}
                <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {"prev"}
                </Button>{" "}
                <Button onClick={() => nextPage()} disabled={!canNextPage}>
                    {"next"}
                </Button>{" "}
                <Button onClick={() => gotoPage(pageCount - 1)} disabled={!previousPage}>
                    {"Last"}
                </Button>{" "}
                <span>
          Page{" "}
                    <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>

                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}
const mstp = createStructuredSelector({
    personal: selectPersonalData,
    DATA:selectData
})
const mdtp = dispatch =>({
    SETDATA:(data)=>dispatch(setData(data)),

})
export default connect(mstp,mdtp) (Product);