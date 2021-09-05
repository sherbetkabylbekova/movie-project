import MainPage from "./MainPage";
import {BrowserRouter, Route} from "react-router-dom";
import Film from "./Film";
import Credits from "./Credits";
import Acters from "./Acters";

const App = () => {
    return (
        <div className="App  p-3 mb-2 bg-dark text-white">
            <BrowserRouter>
                <Route exact path="/"><MainPage/> </Route>
                <Route path="/film/:id"><Film /></Route>
                <Route path="/credits/:id"><Credits/></Route>
                <Route path="/acters/:id"><Acters/></Route>
            </BrowserRouter>
        </div>
    );
}

export default App;
