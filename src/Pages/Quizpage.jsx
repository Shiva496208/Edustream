import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import back_arrow_icon from '../assets/back_arrow_icon.png'
import './Quizpage.css'
const QuizPage = () => {
   // get videoId from URL
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const[currindx,setcurrindx]=useState(0);
  const location=useLocation();
  const{videotitle,videoId}=location.state||{};
  const[iscorrect,setiscorrect]=useState({});
  const[loading,setLoading]=useState(true);
  const navigate=useNavigate();
  // console.log(videoId);
  // const [Loading,setLoadind]=(true);
    useEffect(() => {
    // Start loading
    setLoading(true);

    fetch(`http://localhost:5000/quiz/${videoId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videotitle }),
    })
      .then(res => res.json())
      .then(data => {
        setQuiz(data.quiz);

        // ✅ Always keep loader for at least 2–3s
        setTimeout(() => {
          setLoading(false);
        }, 2000); 
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [videoId, videotitle]);


  const handleOptionSelect = (qIndex, optionIndex) => {
    setAnswers({ ...answers, [qIndex]: optionIndex });
    if(optionIndex===currquestion.correctAnswer){ setiscorrect({...iscorrect,[qIndex]:true});
    }else{
     setiscorrect({...iscorrect,[qIndex]:false});
    //  setiscorrect({...iscorrect,[currquestion.correctAnswer]:true});
    }
  };

  const submitQuiz = () => {
    let s = 0;
    quiz.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) s++;
    });
    setScore(s);
  };

    
 if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Generating Quiz With AI...</p>
      </div>
    );
  }
  if(!loading && !quiz.length){
     return (
      <div className="loading-container">
        <p>Sorry Could Not Generate The Quiz...</p>
      </div>
    );
  }
  const currquestion=quiz[currindx];
  // console.log(currquestion);
  // console.log("this is",quiz);
  return (
    <div>
      <Navbar/>
      <div><img src={back_arrow_icon} alt=""  className="backarrowi" onClick={()=>{navigate(-1)}}/></div>
    <div className="quiz-container">
      {/* <Navbar/> */}
        {score !== null?
    <h3 className="quiz-score">Your score: {score} / {quiz.length}</h3>:<h3 className="quizheading">Quiz For Video</h3>
  }
 <div className="progress-container">
  <div onClick={()=>{setcurrindx(0)}} className={`progress-step ${currindx ==0 ? "active" : ""}`}>1</div>
  <div className={`progress-line ${currindx >=1 ? "active" : ""}`}></div>
  <div onClick={()=>{setcurrindx(1)}} className={`progress-step ${currindx ==1 ? "active" : ""}`}>2</div>
  <div className={`progress-line ${currindx >=2 ? "active" : ""}`}></div>
  <div onClick={()=>{setcurrindx(2)}} className={`progress-step ${currindx == 2 ? "active" : ""}`}>3</div>
  <div className={`progress-line ${currindx >=3 ? "active" : ""}`}></div>
  <div onClick={()=>{setcurrindx(3)}} className={`progress-step ${currindx == 3 ? "active" : ""}`}>4</div>
  <div className={`progress-line ${currindx >= 4 ? "active" : ""}`}></div>
  <div onClick={()=>{setcurrindx(4)}} className={`progress-step ${currindx ==4 ? "active" : ""}`}>5</div>
</div>

  <div className="quiz-card">
    <p className="quiz-question">
      {currindx + 1}. {currquestion.question}
    </p>

    <div className="quiz-options">
      {currquestion.options.map((q, j) => (
        <button
          key={j}
          className={`option-btn ${(answers[currindx] === j)?(iscorrect[currindx])?"right":"wrong": ""}`}
          onClick={() => {if(score==null &&answers[currindx] === undefined)handleOptionSelect(currindx, j)}}
        >
          {q}
        </button>
      ))}
    </div>
    <div className="quiz-actions">
      {currindx>0?<button  className="prev-btn"
          onClick={() =>{setcurrindx(currindx - 1)}}>
        Prev
      </button>:<button className="none"></button>}
      {currindx < quiz.length - 1 ? (
        <button className="next-btn" onClick={() => {setcurrindx(currindx + 1)}}>
          Next ➡
        </button>
      ) : (
        <button className="submit-btn" onClick={submitQuiz}>
          Submit ✅
        </button>
      )}
    </div>
  </div>
</div>
</div>
  );
};

export default QuizPage;
