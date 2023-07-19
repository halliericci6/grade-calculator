import React, {useEffect} from "react";
import "./App.css";
import axios from 'axios';


export default function App() {
  const [data, setData] = React.useState(null);
  //keep track of a variable data

 useEffect(() => {
   //fetch the data found from the server at localhost:3001/api
   //this webpage contains a welcome message we will save
    fetch("/api")
      .then((res) => res.json())
      //turn the result into a json object
      .then((data) => setData(data.message));
      //assign the data variable to whatever you just recieved from the back end
  }, []);

  const handleSubmit = (event) => {
    //when the user submits the form
    const formData = new FormData(event.currentTarget);
    //extract the data from the form and put it into the object, classObject and print it out
    event.preventDefault();
    var classObject = {};
    for(let prop of formData) {classObject[prop[0]] = prop[1]}
    console.log(classObject)
    /*
    this console log will not be visible in the terminal 
    if you go to your front end, right click on the screen, click on inspect, and click on console, you will be able to see this message printed
    */
   

  axios
  .post('http://localhost:3001/class', classObject)
  .then((status) => console.log('class Created with status', status))
  .catch(err => {
    console.error(err);
  });
  //send the data over once it is formatted nicely
}
  
  return (
    <div class="form-container">
       <p>{!data ? "Loading..." : data}</p>
      <form class="register-form" onSubmit={handleSubmit}>
        <input
          id="class-name"
          class="form-field"
          type="text"
          placeholder="Class Name"
          name="className"
        />

        <input
          id="class-section"
          class="form-field"
          type="number"
          placeholder="Class Section"
          name="classSection"
        />
        <button class="form-field" type="submit" >
          Submit
        </button>
      </form>
     
    </div>
  );
}
