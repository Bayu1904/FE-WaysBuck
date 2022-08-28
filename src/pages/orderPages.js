import React from 'react'

import DetailProduct from '../components/detailProduct'
import Header from '../components/Header'
import Product from '../API/ListMenu.json'
import { useParams } from 'react-router-dom'

export default function OrderPages() {
    const { id } = useParams()

    return (
        <>
            <Header />
            <DetailProduct data={Product.listMenu} id={id} />

        </>
    )
}

