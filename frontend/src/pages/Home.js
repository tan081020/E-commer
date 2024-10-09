import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";

const Home = ()=>{
    return(
        <div>
            <CategoryList></CategoryList>
            <BannerProduct></BannerProduct>
            <HorizontalCardProduct category={"airprodes"} heading={"Top's Airspodes"}></HorizontalCardProduct>

            <HorizontalCardProduct category={"cammera"} heading={"Top's Cammera"}></HorizontalCardProduct>

        </div>)
}

export default Home