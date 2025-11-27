import { Outlet } from 'react-router-dom'
import Footer from './footer'
import  Header  from './header'

const Layout = () => {
  return (
    <div>
        <Header/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default Layout