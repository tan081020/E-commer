import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = ()=>{
    return(
        <div>
            <CategoryList></CategoryList>
            <BannerProduct></BannerProduct>
            <HorizontalCardProduct category={"airprodes"} heading={"Top's Airspodes"}></HorizontalCardProduct>

            <HorizontalCardProduct category={"cammera"} heading={"Top's Cammera"}></HorizontalCardProduct>

            <VerticalCardProduct category={"mobile"} heading={"Mobiles"}></VerticalCardProduct>
            <VerticalCardProduct category={"mouse"} heading={"Mouse"}></VerticalCardProduct>
            <VerticalCardProduct category={"televisions"} heading={"Televisions"}></VerticalCardProduct>
            <VerticalCardProduct category={"mobile"} heading={"Mobiles"}></VerticalCardProduct>



        </div>)
}

export default Home