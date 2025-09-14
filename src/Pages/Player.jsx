import React, { useState } from 'react'
import '../Pages/Player.css'
import Navbar from '../Component/Navbar/Navbar';
import { useParams,useLocation,Link } from 'react-router-dom';
import Recomended from '../Component/Recomended/Recomended';
import Quizpage from '../Pages/Quizpage.jsx'
const Player = () => {
  const [message, setmessage] = useState([{ role: "bot", text: "how can i help you" }]);
  const [input, setinput] = useState("");
  const [activeTab, setActiveTab] = useState("chat"); // 🔹 toggle state
  const [responding,setresponding]=useState(false);
  const api = "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"
  const {id} = useParams();
  const location=useLocation();
    const{video}=location.state;
    const{category}=location.state;
    const query = video.snippet.title.split(" ").slice(0,3).join("");
  function formatBotReply(text) {
    return text
      .replace(/###\s*/g, "\n\n")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\n\d+\.\s/g, "\n🔹 ")
      .replace(/\n-\s/g, "\n🔹 ")
      .replace(/```cpp([\s\S]*?)```/g, "\n\n📘 C++ Example:\n$1\n\n")
      .replace(/```([\s\S]*?)```/g, "\n\n📘 Code:\n$1\n\n");
  }
  function handlekeydown(e){
    if(e.key==='Enter')sendmessage();
  }
  const sendmessage = async () => {
    if (!input.trim()) return;
  const modified = `
You are an AI tutor. The student is currently watching the video titled: "${video.snippet.title}".

Instructions:
- If the student's query is related to the video (concepts, doubts, explanations), answer using the video context.
- If the query is casual (like "ok", "hi", "thanks"), just respond politely without mentioning the video.
- Keep responses clear and engaging.
Student query: ${input}
`;
    setresponding(true);
    const newmessage = [...message, { role: "user", text: input }];
    setmessage(newmessage);
    setinput("");
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${api}`
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324",
          messages: [{ role: "user", content: modified }],
        }),
      });
      const data = await res.json();
      const botReply = data.choices[0].message.content;
      const formatted = formatBotReply(botReply);
      setmessage([...newmessage, { role: "bot", text: formatted }]);
          } catch (error) {
      console.log("error");
      setmessage([...newmessage, { role: "bot", text: "fetching failed" }]);
    } finally{
       setresponding(false);
    }
   
  }

  return (
    <>
      <Navbar />
      <div className='player'>
        {/* Left: Video */}
         <div className="left">
    <div className="top">
      <iframe
        src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&showinfo=1&controls=1&disablekb=0`}
        allowFullScreen
        //  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="YouTube player"
      ></iframe>
    </div>

    {/* Bottom details */}
    <div className="bottom">
      <h1 className="title">{video.snippet.title}</h1>
      <div className="tright">
        
        
        <Link 
        to ={`/quiz/${video.id.videoId}`}
         state={{videotitle:video.snippet.title,
        videoId:video.id.videoId}}
        ><button className="attempt-btn">Attempt quiz</button></Link>
      </div>
    </div>
  </div>
        {/* Right: Toggleable section */}
        <div className="right">
          {/* 🔹 Toggle Buttons */}
          <div className="toggle-buttons">
            <button 
              className={activeTab === "chat" ? "active" : ""} 
              onClick={() => setActiveTab("chat")}
            >
              AI Chat
            </button>
            <button 
              className={activeTab === "recommend" ? "active" : ""} 
              onClick={() => setActiveTab("recommend")}
            >
              Recommended
            </button>
          </div>

          {/* 🔹 Conditional Rendering */}
          {activeTab === "chat" ?
            <>
              <div className="messages">
                {message.map((m, i) => (
                  <div key={i} className={`mole ${m.role}`}>
                    {m.role === "bot"
                      ? <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{m.text}</pre>
                      : <p style={{ margin: 0 }}>{m.text}</p>}
                  </div>
                ))}
                      {(responding) ?
                  <div className="bot thinking">
                <span>Thinking</span>
             <span className="dot">.</span>
             <span className="dot">.</span>
            <span className="dot">.</span>
           </div>:<></>
                      }
              </div>

              <div className="bottom">
                <input 
                  type="text" 
                  placeholder='ask me about video'
                  value={input} 
                  onChange={(e) => setinput(e.target.value)} 
                  onKeyDown={handlekeydown}
                />
                <button onClick={sendmessage}> send</button>
              </div>
            </>
          :

          
            <div className="recommend">
             <Recomended category={query} other={category} />
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default Player
