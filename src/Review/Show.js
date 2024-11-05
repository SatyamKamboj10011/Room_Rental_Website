import React, { useEffect, useState } from "react";


import { Link, useParams, useNavigate } from 'react-router-dom';

function  Show () {
  
  const [feedback, setFeedback] = useState();
  const [date, setdate] = useState();
  const [name, setname] = useState();
  const params = useParams();
  const navigate = useNavigate();

   //const value = useContext(UserContext);


  useEffect(() => {  
    setKey(params.id)
    //console.log("Message from Context"+value);
    console.log("Use effect exectuted show.js key"+params.id);
    getBook();
  }, []);
  const getBook = async () => {
    
    console.log("Get board executed"+key);
    try {
      const docSnap = await FBDataService.getData(params.id);
      console.log("the record is :", docSnap.data());
      setFeedback(docSnap.data().feedback);
      setdate(docSnap.data().date);
      setname(docSnap.data().name);
    } catch (err) {
      
    }   
  };
  const deleteBoard = async (id) => {
   
    alert("Deleting book ")
    await FBDataService.deleteData(params.id);
    //getBoard();
    navigate("/");
  }  
    return (
      <div class="container">
        <div class="panel-heading">
          <h3 class="panel-title">
    show feedback</h3>
        </div>
      <div class="panel panel-default">
        <div class="panel-heading">
        <h4><Link to="/" class="btn btn-primary">Home</Link></h4>
        
          <h3 class="panel-title">
            {feedback}
          </h3>
        </div>
        <div class="panel-body">
          <dl>
            <dt>Feedback</dt>
            <dd>{feedback}</dd>
            <dt>date</dt>
            <dd>{date}</dd>
            <dt>name:</dt>
            <dd>{name}</dd>
          </dl>
          <button  onClick={deleteBoard} class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
    );
  
}

export default Show;