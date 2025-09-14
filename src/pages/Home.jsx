import Header from "../components/layout/Header";
import {Outlet} from 'react-router-dom'
import Main from "./Main";


export default function Home(){
    return(
        <>
        <Header/>
        <Outlet/>
        {/* <Main/> */}
        {/*
        outlet : 라우팅 구조에서 부모 레이아웃이 있고 그 안에 자식요소 페이지를 
        구현할 때 자식 라이투가 랜더링 되는 위치
        */}
        </>
    )
}