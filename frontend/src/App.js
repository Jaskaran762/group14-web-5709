import { Route, Routes, Navigate } from "react-router-dom";
import AddExpense from "./Components/expense-management/AddExpense";
import ListExpenses from "./Components/expense-management/ListExpenses";
import ViewExpense from "./Components/expense-management/ViewExpense";
import EditExpense from "./Components/expense-management/EditExpense";
import './App.css';
//import Home from './home'; Dhrumil home
import Chat from './chat/chat';
import Home from './Components/Home';
import AddObjective from './Components/AddObjective';
import BasicPie from './Components/budget-planner/budget-planner';
import Navbar from './Components/navbar/navbar';
import WhatsNew from './Components/proversion/WhatsNew';
// import Navbar from './components/Navbar'; Shreya's navbar
import SubscriptionPlans from './Components/proversion/SubscriptionPlans';
import PaymentForm from './Components/proversion/PaymentForm';
import Contactus from './Components/contactus/Contactus';
import Faq from './Components/faq/Faq';
import LandingPage from "./Components/landing/LandingPage";
// okr
import OkrHome from './Components/okr/js/Home';
import AddOkr from './Components/okr/js/AddObjective';

import Success from './Components/proversion/Success';
import Cancel from './Components/proversion/Cancel';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/listexpenses/" element={<ListExpenses/>}/>
        <Route path="/addexpense" element={<AddExpense/>}/>
        <Route path="/viewexpense/:expenseId" element={<ViewExpense/>}/>
        <Route path="/editexpense/:expenseId" element={<EditExpense/>}/>
        {/*  home from Dhrumil <Route path="/home" exact Component={Home} /> */}
        <Route path="/chat" Component={Chat} />
        <Route path="/okr" element={<Home />} />
        <Route path="/add-objective" element={<AddObjective />} />
        <Route path="/budget-planner" element={<BasicPie />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/whatsnew" element={<WhatsNew />} />
        <Route path="/subscription-plans" element={<SubscriptionPlans />} />
        <Route path="/checkout" element={<PaymentForm />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />

        {/* okr */}
        <Route path="/okrhome" element={<OkrHome />} />
        <Route path="/add-okr" element={<AddOkr />} />


        <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

      </Routes>
    </div>
  );
}

export default App;