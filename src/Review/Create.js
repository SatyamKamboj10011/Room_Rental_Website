import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import FBDataService from "../services/fbServices";

function Create(){
    
    const [feedback, setFeedback] = useState('');
    const [date, setdate] = useState('');
    const [name, setname] = useState('');
    const navigate = useNavigate();
   
    const handleSubmit=(e)=> {
        e.preventDefault();
        console.log('Feedback:'+feedback + 'Date:'+date+  'Name'+name);
        saveFeedback();
      }

    const saveFeedback = async() => {       
        console.log('Feedback:'+feedback + 'Date:'+date+ 'Name'+name);
        const newData = {
          feedback,
          date,
          name,          
        };
        try{         
          await FBDataService.addData(newData);         
          console.log("Data added ");
          navigate("/");
      }catch(err){         
          console.log(err.message)
      }
 
     };

    return (
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">
                Feedback
              </h3>
            </div>
            <div class="panel-body">
              <h4><Link to="/" class="btn btn-primary">Home</Link></h4>
              <form onSubmit={handleSubmit}>
                <div class="form-group">
                  <label for="feedback">Feedback:</label>
                  <textArea class="form-control" name="feedback"  placeholder ={feedback}cols="80" rows="3"  onChange={(e) =>
                    setFeedback(e.target.value)}/> 
                </div>

                <div class="form-group">
                  <label for="DAte">date:</label>
                  <input class="form-control" name="date" type='date'  placeholder ={date}  onChange={(e) =>
                    setdate(e.target.value)}/> 
                </div>
               
                <div class="form-group">
                  <label for="Name">Name:</label>
                  <input type="text" class="form-control" name="Name" placeholder={name}  onChange={(e) =>
                    setname(e.target.value)}/>
                </div>
                <button type="submit" class="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
      );
}

export default Create;