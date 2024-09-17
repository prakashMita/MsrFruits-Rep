import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Components/Login/Login';
import Prodect from './Components/Prodect/Prodect';
import Pos from './Components/Pos/Pos'
import DashBoard from './Components/DashBoard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../src/assets/style/Prodect.css'
import '../src/assets/style/Category.css'
import '../src/assets/style/Invoice.css'
import Category from './Components/Category/Category';
import BodyLeft from './Components/Prodect/BodyLeft';
import Invoice from './Components/Invoice/Invoice';
import ReportRight from './Components/ItemReport/ReportRight'
import Itemreport from './Components/ItemReport/Itemreport';
import PosRight from './Components/Pos/PosRight'
import BodyLeftEdit from './Components/Prodect/BodyLeftEdit';
import CusReport from './Components/CustomerReport/CusReport'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/Dashboard' element={<DashBoard />} />
      <Route path='/Pos' element={<Pos />} />
      <Route path="/PosRight" element={<PosRight />} />
      <Route path="/Prodect" element={<Prodect />} />
      <Route path='/Category' element={<Category />} />
      <Route path="/body-left" element={<BodyLeft />} />
      <Route path="/bodyleftedit" element={<BodyLeftEdit />} />
      <Route path="/itemReport" element={<Itemreport />} />
      <Route path="/ReportRight" element={<ReportRight />} />
      <Route path="/invoice" element={<Invoice />} />
      <Route path="/CusReport" element={<CusReport />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
