import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {Row,Col} from "react-bootstrap"
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
          <div class="panel panel-default"
           style={{
            width: "100%",
            backgroundColor: "#f1f9ff",
            borderRadius: "30px",
            boxShadow:  "0 4px 20px rgba(0,0,0,0.2)",
            padding: "25px",          
          }}>
            <div class="panel-heading">
      
              <h3 class="panel-title">
                Feedback
              </h3>
            </div>
            <div class="panel-body">
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
                <br/>
             <Row className="mt-4">
              <Col className="d-flex justify-content-center gap-3">
                <button style={{
                  backgroundColor: '#737373',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  cursor: 'pointer',
                  boxShadow: '0px 4px 6px rgba(0, 123, 255, 0.3)',
                  }}><Link to="/DescriptionPage/:id" style={{ color: 'white', textDecoration: 'none' }}>Back</Link>
                </button>

                <button type="submit" style={{
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  boxShadow: '0px 4px 6px rgba(0, 123, 255, 0.3)',
                  }}>Submit</button>
                 </Col>
              </Row>
              </form>
            </div>
          </div>
        </div>
        
      );
}

export default Create;