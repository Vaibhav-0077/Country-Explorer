import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { useState } from "react";

export const MainLayout = () =>{

      const [search, setSearch] = useState("");


    return(
        <>
            <Header search={search} setSearch={setSearch}/>
            <Outlet context={{ search }} />
            <Footer />
        </>
    )
}