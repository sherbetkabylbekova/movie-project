import MainPage from "./MainPage";
import {BrowserRouter, Route} from "react-router-dom";
import Film from "./Film";
import Credits from "./Credits";
import Acters from "./Users/Acters";
import Header from "./Header";
import Browse from "./Search/Browse";
import Footer from "./Footer";


const App = () => {
    return (
        <div className="App bg-dark text-white">
            <BrowserRouter>
                <Header/>
                <Route exact path="/"><MainPage/> </Route>
                <Route path="/film/:id"><Film /></Route>
                <Route path="/credits/:id"><Credits/></Route>
                <Route path="/acters/:id"><Acters/></Route>
                <Route path="/browse/:name"><Browse/></Route>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
