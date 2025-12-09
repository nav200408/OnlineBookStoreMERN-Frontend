import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "../components/book/Home";
import BookCategory from "../components/book/BookCategory";
export function ExplorePage(){
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const category = query.get("category")

    let[cat,setCat]= useState("");

    useEffect(()=>{
     setCat(category);
    },[category]);

    return(<>
    <BookCategory/>
    <Home category={cat}/>
    </>)
}
