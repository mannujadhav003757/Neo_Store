import React from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Dropdown, Card, InputGroup, FormControl } from 'react-bootstrap'
import { useNavigate,Outlet } from 'react-router-dom'
export default function Product(props) {
    const navigate = useNavigate()
    console.warn(props)
    const [record, setRecord] = useState([])
    const [productDetail, setProductDetail] = useState([])
    const [product1, setProduct1] = useState()
    let [searchText, setSearch] = useState('')
    //const colorInput = React.useRef()
    //const categoryInput = React.useRef()
    const data = record
    useEffect(() => {
        axios.get('http://localhost:8081/commonProducts').then(res => {

            const data = res.data.data
            const localData = JSON.parse(localStorage.getItem('cartDetails'))

            if (localData) {
                data.forEach(el => {
                    localData.forEach(local => {
                        if (local._id === el._id) {
                            el.isCart = true
                        }
                    })
                })
            } else {
                data.forEach(el => {
                    el.isCart = false
                })
            }

            setRecord(data)

        }).catch(err => {
            console.log(err)
        })
    }, [])

    const allProducts = () => {
        axios.get('http://localhost:8081/commonProducts').then(res => {
            const data = res.data.data
            const localData = JSON.parse(localStorage.getItem('cartDetails'))

            if (localData) {
                data.forEach(el => {
                    localData.forEach(local => {
                        if (local._id === el._id) {
                            el.isCart = true
                        }
                    })
                })
            } else {
                data.forEach(el => {
                    el.isCart = false
                })
            }

            setRecord(data)
        }).catch(err => {
            console.log(err)
        })

    }

    const [category_id, setCategory_Id] = useState('')
    const [color_id, setColor_Id] = useState('')
    console.log("hereis category id : " + category_id)
    console.log("here is color id : " + color_id)

    const filterProd = {
        category_id,
        color_id
    }

    const filterProduct = () => {
        let param
        if (category_id) {
            param = {
                category_id
            }
        }

        if (color_id) {
            param = {
                color_id
            }
        }

        if (category_id && color_id) {
            param = {
                category_id,
                color_id
            }
        }

        if (param) {
            return axios.get('http://localhost:8081/filteredProduct', {
                params: param
            }).then((res) => {
                const data = res.data.data
                const localData = JSON.parse(localStorage.getItem('cartDetails'))

                if (localData) {
                    data.forEach(el => {
                        localData.forEach(local => {
                            if (local._id === el._id) {
                                el.isCart = true
                            }
                        })
                    })
                } else {
                    data.forEach(el => {
                        el.isCart = false
                    })
                }

                setRecord(data)

            }).catch((err) => {
                //toast.error(err)
            })
        }
    }
    const sortHigherPrice = (e) => {
        e.preventDefault()
        const sortedArr = record.sort((a, b) => { { return b.product_cost - a.product_cost } })
        setRecord([])

        setTimeout(() => {
            setRecord(sortedArr)
        }, 100)
    }
    const sortLowerPrice = () => {
        const sortedArr = record.sort((a, b) => { return a.product_cost - b.product_cost })
        setRecord([])

        setTimeout(() => {
            setRecord(sortedArr)
        }, 100)
    }

    const productDetails = (item, index) => {
        console.log("here is product details",item)
        localStorage.setItem('productDetail',JSON.stringify(item))
        // navigate('/productDetail')
    }

    let tempArr = []
    function addToCart(item, index) {
        item.quantity = 1
        item.total_productCost = item.quantity * item.product_cost

        const indx = record.indexOf(item)

        if (indx > -1) {
            item.isCart = true

            record[indx] = item

            const temp = [...record]
            setRecord(temp)
        }

        const localData = JSON.parse(localStorage.getItem('cartDetails'))

        console.log(localData)

        if (localData) {
            localData.push(item)
            localStorage.setItem('cartDetails', JSON.stringify(localData));
            console.log('if ', JSON.parse(localStorage.getItem('cartDetails')))

        } else {
            tempArr.push(item)
            localStorage.setItem('cartDetails', JSON.stringify(tempArr));

            console.log('else ', JSON.parse(localStorage.getItem('cartDetails')))
        }


    }

    const onSearch = () => {
        if (searchText !== '') {
            const param = {
                desc: searchText
            }

            if (param) {
                return axios.get('http://localhost:8081/filteredProduct', {
                    params: param
                }).then((res) => {
                    const data = res.data.data
                    const localData = JSON.parse(localStorage.getItem('cartDetails'))

                    if (localData) {
                        data.forEach(el => {
                            localData.forEach(local => {
                                if (local._id === el._id) {
                                    el.isCart = true
                                }
                            })
                        })
                    } else {
                        data.forEach(el => {
                            el.isCart = false
                        })
                    }

                    setRecord(data)

                }).catch((err) => {
                    //toast.error(err)
                })
                console.log('fffffff', searchText)
            }
        }
    }

    const onClear = () => {
        setSearch('')
        document.getElementById('search').value = ''
        allProducts()
    }


    return (
        <>
            <Header />
            <hr className="mt-2" />
            <div className="container-fluid mt-4 mb-4">
                <div className="row">
                    <div className='col-sm-3'>
                        <InputGroup>    
                         <FormControl
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="basic-addon1"
                                className="fa fa-search fa-search"
                                id="search"
                                onChange={(e) => setSearch(e.target.value)}
                                style={{width:"40px"}}
                            />
                            <button className='btn btn-primary btn-sm mr-2 ml-2' onClick={onSearch}>Seach</button>

                            <button className='ml-2 btn btn-danger btn-sm' onClick={onClear}>Clear</button>
                        </InputGroup>

                    </div>
                    <div className="col-sm-1" style={{ marginLeft: "70%" }}>

                        <span>Sort By:</span>
                    </div>
                    <div className="col-sm-1">
                        <Button className="fa fa-sort-up btn-sm" variant="secondary" onClick={sortHigherPrice}></Button>
                    </div>
                    <div className="col-sm-1">
                        <Button className="fa fa-sort-down btn-sm" variant="secondary" onClick={sortLowerPrice}></Button>
                    </div>

                </div>
                {/* <h1>Here is products</h1> */}
                <div className="row">
                    <div className="col-sm-2" style={{ borderRight: "solid thin grey" }}>
                        <Button variant="secondary" className="col-sm-12" onClick={allProducts}>All Products</Button>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="col-sm-12 mt-4">
                                Categories
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setCategory_Id("61d6f0964e873c7e57031bbc")} >Sofa</Dropdown.Item>
                                <Dropdown.Item onClick={() => setCategory_Id("61d6fb124e873c7e57031bea")}>Bed</Dropdown.Item>
                                <Dropdown.Item onClick={() => setCategory_Id("61d6fc2a4e873c7e57031bec")}>Chair</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                            <Dropdown.Toggle variant="warning" id="dropdown-basic" className="col-sm-12 mt-4">
                                Color
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setColor_Id("61d6f9a64e873c7e57031be7")} >Black</Dropdown.Item>
                                <Dropdown.Item onClick={() => setColor_Id("61d6f69b4e873c7e57031bd0")}>Red</Dropdown.Item>
                                <Dropdown.Item onClick={() => setColor_Id("61d6f8b34e873c7e57031be5")}>Grey</Dropdown.Item>
                                <Dropdown.Item onClick={() => setColor_Id("61d6f0334e873c7e57031bb9")}>Navy Blue</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Button type='button' className='col-sm-12 mt-4' onClick={filterProduct}>Apply Filter</Button>
                    </div>
                    <div className="col-sm-8 container-fluid">
                        <hr />
                        <div className="row mb-4 mt-4">
                            {record.length > 0 ? record.map((item, index) => <div className="col-sm-4 ml-2 mb-4 " style={{textDecoration:"none"}} onClick={() =>{productDetails(item,index)}} >

                                <Card style={{ border: "solid grey thin", borderRadius: "5px", boxShadow: "5px 10px 8px 10px #888888" }} className="mb-4">
                                    <Card.Img variant="top" href='javascript:void(0)' src={item.product_image} style={{ height: "200px", width: "100%" }} onClick={() =>{productDetails(item,index)}} />
                                    <Card.Body>
                                        <Card.Title className="App">{item.product_name}</Card.Title>
                                        <Card.Text className="App">
                                            <b>Rs. {item.product_cost} /-</b>
                                        </Card.Text>
                                        <div className="App">
                                            {
                                                item.isCart ?
                                                    <Button variant="danger" disabled>Added</Button> :

                                                    <Button variant="danger" onClick={() => addToCart(item, index)}>Add to Cart</Button>

                                            }
                                        </div>
                                        <div className="App mt-2">
                                            <span class="fa fa-star checked"> </span>
                                            <span class="fa fa-star checked"> </span>
                                            <span class="fa fa-star checked"> </span>
                                            <span class="fa fa-star"> </span>
                                            <span class="fa fa-star"> </span>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>  ) : <h1>Products Not Found</h1>}

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
