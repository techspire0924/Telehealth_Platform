// import { useState } from "react";
// import "./Chatbox.css";
// import image1 from "../icons/comment.png";
// import image from "../icons/telegram.png";


// function Chatbox() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [text, setText] = useState("");
//   const [messages, setMessages] = useState([]);

//   function addZero(num) {
//     return num < 10 ? "0" + num : num;
//   }

//   const handleToggleClick = () => {
//     setIsOpen(!isOpen);
//   };

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (text.trim().length > 0) {
//       const message = { message: text.trim().replace(/\n/g, '<br>\n') }
//       fetch('http://127.0.0.1:5000/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(message)
//       })
//       .then(response => response.json())
//       .then(data => {
//         const today = new Date();
//         const newMessage1 = {
//           text: text.trim().replace(/\n/g, '<br>\n'),
//           time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
//           sent: true
//         };
//         setMessages(prevMessages => [...prevMessages, newMessage1]);
//         setText('');
//         const autoReplyMessage = {
//           text: data.res,
//           time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
//           sent: false
//         };
//         setTimeout(() => {
//           setMessages(prevMessages => [...prevMessages, autoReplyMessage]);
//         }, 1000);
//       })
    
//       .catch(error => console.error('Error:', error));
//     }
//   }

//   return (
//     <div className="chatbox-wrapper">
//       <div className="chatbox-toggle" onClick={handleToggleClick}>
//       <img src={image1} width="30px" height="30px" alt=""></img>
//       </div>
//       {isOpen && (
//         <div className="chatbox-message-wrapper">
//           <div className="chatbox-message-header">
//             <div className="chatbox-message-profile">
//               <img
//                 src="https://media.istockphoto.com/id/1283599879/photo/happiness-and-wellbeing.jpg?s=612x612&w=0&k=20&c=3JSSHPtdhL0dtA1zcVu4mfNw6FVlskRC2kk_Rl9FKU8="
//                 alt=""
//                 className="chatbox-message-image"
//               />
//               <div>
//                 <h4 className="chatbox-message-name">Find your Specialist here</h4>
//                 <p className="chatbox-message-status">Recently Seen</p>
//               </div>
//             </div>
//           </div>
//           <div className="chatbox-message-content">
//             {messages.length === 0 && (
//               <h4 className="chatbox-message-no-message">
//                 You don't have message yet!
//               </h4>
//             )}
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`chatbox-message-item ${
//                   message.sent ? "sent" : "received"
//                 }`}
//               >
//                 <span className="chatbox-message-item-text">
//                   {message.text}
//                 </span>
//                 <span className="chatbox-message-item-time float-right">{message.time}</span>
//               </div>
//             ))}
//           </div>
//           <div className="chatbox-message-bottom">
//             <form className="chatbox-message-form" onSubmit={handleSubmit}>
//               <textarea
//                 rows={1}
//                 placeholder="Type message..."
//                 className="chatbox-message-input"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//               />
//               <button type="submit" className="chatbox-message-submit">
//               <img src={image} width="40px" height="40px" alt=""></img>
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chatbox;




// yo latest updated code ho 
// yo code le kam gareko xa so becareful

// import { useState } from "react";
// import "./Chatbox.css";
// import image1 from "../icons/comment.png";
// import image from "../icons/telegram.png";

// function Chatbox() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [text, setText] = useState("");
//   const [messages, setMessages] = useState([]);

//   function addZero(num) {
//     return num < 10 ? "0" + num : num;
//   }

//   const handleToggleClick = () => {
//     setIsOpen(!isOpen);
//   };

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (text.trim().length > 0) {
//       const message = { text: text.trim().replace(/\n/g, '<br>\n') };
//       fetch('http://127.0.0.1:5000/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(message)
//       })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Response data:', data);
//         const today = new Date();
//         const newMessage1 = {
//           text: text.trim().replace(/\n/g, '<br>\n'),
//           time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
//           sent: true
//         };
//         setMessages(prevMessages => [...prevMessages, newMessage1]);
//         setText('');
//         const autoReplyMessage = {
//           text: data.response,
//           time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
//           sent: false
//         };
//         setTimeout(() => {
//           setMessages(prevMessages => [...prevMessages, autoReplyMessage]);
//         }, 1000);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         setMessages(prevMessages => [...prevMessages, {
//           text: 'An error occurred while processing your request. Please try again later.',
//           time: `${addZero(new Date().getHours())}:${addZero(new Date().getMinutes())}`,
//           sent: false
//         }]);
//       });
//     }
//   }

//   return (
//     <div className="chatbox-wrapper">
//       <div className="chatbox-toggle" onClick={handleToggleClick}>
//         <img src={image1} width="30px" height="30px" alt=""></img>
//       </div>
//       {isOpen && (
//         <div className="chatbox-message-wrapper">
//           <div className="chatbox-message-header">
//             <div className="chatbox-message-profile">
//               <img
//                 src="https://media.istockphoto.com/id/1283599879/photo/happiness-and-wellbeing.jpg?s=612x612&w=0&k=20&c=3JSSHPtdhL0dtA1zcVu4mfNw6FVlskRC2kk_Rl9FKU8="
//                 alt=""
//                 className="chatbox-message-image"
//               />
//               <div>
//                 <h4 className="chatbox-message-name">Find your Specialist here</h4>
//                 <p className="chatbox-message-status">Recently Seen</p>
//               </div>
//             </div>
//           </div>
//           <div className="chatbox-message-content">
//             {messages.length === 0 && (
//               <h4 className="chatbox-message-no-message">
//                 You donot have message yet!
//               </h4>
//             )}
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`chatbox-message-item ${
//                   message.sent ? "sent" : "received"
//                 }`}
//               >
//                 <span className="chatbox-message-item-text">
//                   {message.text}
//                 </span>
//                 <span className="chatbox-message-item-time float-right">{message.time}</span>
//               </div>
//             ))}
//           </div>
//           <div className="chatbox-message-bottom">
//             <form className="chatbox-message-form" onSubmit={handleSubmit}>
//               <textarea
//                 rows={1}
//                 placeholder="Type message..."
//                 className="chatbox-message-input"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//               />
//               <button type="submit" className="chatbox-message-submit">
//                 <img src={image} width="40px" height="40px" alt=""></img>
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chatbox;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mathi ko code update gareko xu tala lets see kam garxa ki nai 
// yo code kam gardai xa 

// import { useState, useEffect, useRef } from "react";
// import "./Chatbox.css";
// import image1 from "../icons/comment.png";
// import image from "../icons/telegram.png";

// function Chatbox() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [text, setText] = useState("");
//   const [messages, setMessages] = useState([]);
//   const textareaRef = useRef(null);

//   function addZero(num) {
//     return num < 10 ? "0" + num : num;
//   }

//   const handleToggleClick = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (text.trim().length > 0) {
//       const today = new Date();
//       const newMessage1 = {
//         text: text.trim().replace(/\n/g, '<br>\n'),
//         time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
//         sent: true
//       };
//       setMessages(prevMessages => [...prevMessages, newMessage1]);
//       setText('');
      
//       const message = { text: text.trim().replace(/\n/g, '<br>\n') };
//       fetch('http://127.0.0.1:5000/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(message)
//       })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Response data:', data);
//         const autoReplyMessage = {
//           text: data.message,
//           time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
//           sent: false
//         };
//         setTimeout(() => {
//           setMessages(prevMessages => [...prevMessages, autoReplyMessage]);
//         }, 1000);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         setMessages(prevMessages => [...prevMessages, {
//           text: 'An error occurred while processing your request. Please try again later.',
//           time: `${addZero(new Date().getHours())}:${addZero(new Date().getMinutes())}`,
//           sent: false
//         }]);
//       });
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       handleSubmit(e);
//     }
//   };

//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   }, [text]);

//   return (
//     <div className="chatbox-wrapper">
//       <div className="chatbox-toggle" onClick={handleToggleClick}>
//         <img src={image1} width="30px" height="30px" alt="Toggle Chatbox" />
//       </div>
//       {isOpen && (
//         <div className="chatbox-message-wrapper">
//           <div className="chatbox-message-header">
//             <div className="chatbox-message-profile">
//               <img
//                 src="https://vispdocs.com/wp-content/uploads/2021/01/vein-specialist.jpg"
//                 alt="Profile"
//                 className="chatbox-message-image"
//               />
//               <div>
//                 <h4 className="chatbox-message-name">Find your Specialist here</h4>
//                 <p className="chatbox-message-status">Recently Seen</p>
//               </div>
//             </div>
//           </div>
//           <div className="chatbox-message-content">
//             {messages.length === 0 && (
//               <h4 className="chatbox-message-no-message">
//                 You donot have message yet!
//               </h4>
//             )}
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`chatbox-message-item ${
//                   message.sent ? "sent" : "received"
//                 }`}
//               >
//                 <span className="chatbox-message-item-text">
//                   {message.text}
//                 </span>
//                 <span className="chatbox-message-item-time float-right">
//                   {message.time}
//                 </span>
//               </div>
//             ))}
//           </div>
//           <div className="chatbox-message-bottom">
//             <form className="chatbox-message-form" onSubmit={handleSubmit}>
//               <textarea
//                 ref={textareaRef}
//                 rows={1}
//                 placeholder="Type message..."
//                 className="chatbox-message-input"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 onKeyDown={handleKeyDown}
//               />
//               <button type="submit" className="chatbox-message-submit">
//                 <img src={image} width="40px" height="40px" alt="Send" />
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chatbox;






import { useState, useEffect, useRef } from "react";
import "./Chatbox.css";
import image1 from "../icons/comment.png";
import image from "../icons/telegram.png";
import { TailSpin } from "react-loader-spinner"; // Importing the loader

function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for loading status
  const textareaRef = useRef(null);

  function addZero(num) {
    return num < 10 ? "0" + num : num;
  }

  const handleToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 0) {
      const today = new Date();
      const newMessage1 = {
        text: text.trim().replace(/\n/g, '<br>\n'),
        time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
        sent: true
      };
      setMessages(prevMessages => [...prevMessages, newMessage1]);
      setText('');
      setIsLoading(true); // Set loading to true when request starts

      const message = { text: text.trim().replace(/\n/g, '<br>\n') };
      fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setIsLoading(false); // Set loading to false when request completes
        console.log('Response data:', data);
        const autoReplyMessage = {
          text: data.message,
          time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
          sent: false
        };
        setTimeout(() => {
          setMessages(prevMessages => [...prevMessages, autoReplyMessage]);
        }, 1000);
      })
      .catch(error => {
        setIsLoading(false); // Set loading to false in case of error
        console.error('Error:', error);
        setMessages(prevMessages => [...prevMessages, {
          text: 'An error occurred while processing your request. Please try again later.',
          time: `${addZero(new Date().getHours())}:${addZero(new Date().getMinutes())}`,
          sent: false
        }]);
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <div className="chatbox-wrapper">
      <div className="chatbox-toggle" onClick={handleToggleClick}>
        <img src={image1} width="30px" height="30px" alt="Toggle Chatbox" />
      </div>
      {isOpen && (
        <div className="chatbox-message-wrapper">
          <div className="chatbox-message-header">
            <div className="chatbox-message-profile">
              <img
                src="https://vispdocs.com/wp-content/uploads/2021/01/vein-specialist.jpg"
                alt="Profile"
                className="chatbox-message-image"
              />
              <div>
                <h4 className="chatbox-message-name">Find your Specialist here</h4>
                <p className="chatbox-message-status">Recently Seen</p>
              </div>
            </div>
          </div>
          <div className="chatbox-message-content">
            {messages.length === 0 && (
              <h4 className="chatbox-message-no-message">
                Tell me, how do you feel today?
              </h4>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbox-message-item ${
                  message.sent ? "sent" : "received"
                }`}
              >
                <span className="chatbox-message-item-text">
                  {message.text}
                </span>
                <span className="chatbox-message-item-time float-right">
                  {message.time}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="chatbox-message-loader">
                <TailSpin color="#00BFFF" height={50} width={50} />
              </div>
            )}
          </div>
          <div className="chatbox-message-bottom">
            <form className="chatbox-message-form" onSubmit={handleSubmit}>
              <textarea
                ref={textareaRef}
                rows={1}
                placeholder="Type message..."
                className="chatbox-message-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button type="submit" className="chatbox-message-submit">
                <img src={image} width="40px" height="40px" alt="Send" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbox;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////mathi kai code lai halka styling garna khojeko///////////////////////

// import { useState, useEffect, useRef } from "react";
// import "./Chatbox.css";
// import image1 from "../icons/comment.png";
// import image from "../icons/telegram.png";
// import { BiLoaderAlt } from "react-icons/bi";

// function Chatbox() {
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hi there! How can I assist you today?" },
//   ]);
//   const [newMessage, setNewMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const chatContainerRef = useRef(null);

//   const handleMessageSubmit = async () => {
//     if (newMessage.trim() === "") return;
//     const userMessage = { sender: "user", text: newMessage };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     setLoading(true);
//     try {
//       const response = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text: newMessage }),
//       });
//       const data = await response.json();
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "bot", text: data.message },
//       ]);
//     } catch (error) {
//       console.error("Error fetching response:", error);
//     }
//     setLoading(false);
//     setNewMessage("");
//   };

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const renderMessage = (message, index) => {
//     return (
//       <div
//         key={index}
//         className={`chat-message ${message.sender}`}
//         dangerouslySetInnerHTML={{ __html: message.text }}
//       />
//     );
//   };

//   return (
//     <div className="chat-container">
//       <div className="chatbox-header">
//         <div className="profile-icon">
//           <img src={image1} alt="Profile Icon" />
//         </div>
//         <h3 className="bot-name">DocBot</h3>
//       </div>
//       <div className="chatbox-body" ref={chatContainerRef}>
//         {messages.map((message, index) => renderMessage(message, index))}
//         {loading && (
//           <div className="chat-message bot">
//             <BiLoaderAlt className="loading-spinner" />
//           </div>
//         )}
//       </div>
//       <div className="chatbox-footer">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type your message here..."
//         />
//         <button onClick={handleMessageSubmit}>
//           <img src={image} alt="Send Icon" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Chatbox;
///////////////////////////////////////////////////////////////////////////////////////////////









// import { useState } from "react";
// import "./Chatbox.css";
// import image1 from "../icons/comment.png";
// import image from "../icons/telegram.png";

// function Chatbox() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [text, setText] = useState("");
//   const [messages, setMessages] = useState([]);

//   function addZero(num) {
//     return num < 10 ? "0" + num : num;
//   }

//   const handleToggleClick = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (text.trim().length > 0) {
//       const message = { text: text.trim().replace(/\n/g, '<br>\n') };
//       fetch('http://127.0.0.1:5000/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(message)
//       })
//       .then(response => response.json())
//       .then(data => {
//         const today = new Date();
//         const newMessage1 = {
//           text: text.trim().replace(/\n/g, '<br>\n'),
//           time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
//           sent: true
//         };
//         setMessages(prevMessages => [...prevMessages, newMessage1]);
//         setText('');
//         const autoReplyMessage = {
//           text: data.predictions.map(([disease, probability, specialist]) => 
//             `Disease: ${disease}, Probability: ${probability.toFixed(2)}, Specialist: ${specialist}`
//           ).join('<br>'),
//           time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
//           sent: false
//         };
//         setTimeout(() => {
//           setMessages(prevMessages => [...prevMessages, autoReplyMessage]);
//         }, 1000);
//       })
//       .catch(error => console.error('Error:', error));
//     }
//   };

//   return (
//     <div className="chatbox-wrapper">
//       <div className="chatbox-toggle" onClick={handleToggleClick}>
//         <img src={image1} width="30px" height="30px" alt="Toggle Chatbox" />
//       </div>
//       {isOpen && (
//         <div className="chatbox-message-wrapper">
//           <div className="chatbox-message-header">
//             <div className="chatbox-message-profile">
//               <img
//                 src="https://media.istockphoto.com/id/1283599879/photo/happiness-and-wellbeing.jpg?s=612x612&w=0&k=20&c=3JSSHPtdhL0dtA1zcVu4mfNw6FVlskRC2kk_Rl9FKU8="
//                 alt="Profile"
//                 className="chatbox-message-image"
//               />
//               <div>
//                 <h4 className="chatbox-message-name">Find your Specialist here</h4>
//                 <p className="chatbox-message-status">Mention your symptoms...</p>
//               </div>
//             </div>
//           </div>
//           <div className="chatbox-message-content">
//             {messages.length === 0 && (
//               <h4 className="chatbox-message-no-message">
//                 You don't have message yet!
//               </h4>
//             )}
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`chatbox-message-item ${message.sent ? "sent" : "received"}`}
//               >
//                 <span className="chatbox-message-item-text" dangerouslySetInnerHTML={{ __html: message.text }}></span>
//                 <span className="chatbox-message-item-time float-right">{message.time}</span>
//               </div>
//             ))}
//           </div>
//           <div className="chatbox-message-bottom">
//             <form className="chatbox-message-form" onSubmit={handleSubmit}>
//               <textarea
//                 rows={1}
//                 placeholder="Type message..."
//                 className="chatbox-message-input"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//               />
//               <button type="submit" className="chatbox-message-submit">
//                 <img src={image} width="40px" height="40px" alt="Send" />
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chatbox;




// import { useState } from "react";
// import "./Chatbox.css";
// import image1 from "../icons/comment.png";
// import image from "../icons/telegram.png";

// function Chatbox() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [text, setText] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   function addZero(num) {
//     return num < 10 ? "0" + num : num;
//   }

//   const handleToggleClick = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (text.trim().length > 0) {
//       const today = new Date();
//       const newMessage1 = {
//         text: text.trim().replace(/\n/g, '<br>\n'),
//         time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
//         sent: true
//       };
//       setMessages(prevMessages => [...prevMessages, newMessage1]);
//       setText('');
//       setLoading(true);

//       const message = { text: text.trim().replace(/\n/g, '<br>\n') };
//       fetch('http://127.0.0.1:5000/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(message)
//       })
//       .then(response => response.json())
//       .then(data => {
//         const autoReplyMessage = {
//           text: data.predictions.map(([disease, probability, specialist]) => 
//             `Disease: ${disease}, Probability: ${probability.toFixed(2)}, Specialist: ${specialist}`
//           ).join('<br>'),
//           time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
//           sent: false
//         };
//         setMessages(prevMessages => [...prevMessages, autoReplyMessage]);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         const errorMessage = {
//           text: 'An error occurred while processing your request. Please try again later.',
//           time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
//           sent: false
//         };
//         setMessages(prevMessages => [...prevMessages, errorMessage]);
//         setLoading(false);
//       });
//     }
//   };

//   return (
//     <div className="chatbox-wrapper">
//       <div className="chatbox-toggle" onClick={handleToggleClick}>
//         <img src={image1} width="30px" height="30px" alt="Toggle Chatbox" />
//       </div>
//       {isOpen && (
//         <div className="chatbox-message-wrapper">
//           <div className="chatbox-message-header">
//             <div className="chatbox-message-profile">
//               <img
//                 src="https://media.istockphoto.com/id/1283599879/photo/happiness-and-wellbeing.jpg?s=612x612&w=0&k=20&c=3JSSHPtdhL0dtA1zcVu4mfNw6FVlskRC2kk_Rl9FKU8="
//                 alt="Profile"
//                 className="chatbox-message-image"
//               />
//               <div>
//                 <h4 className="chatbox-message-name">Find your Specialist here</h4>
//                 <p className="chatbox-message-status">Mention your symptoms...</p>
//               </div>
//             </div>
//           </div>
//           <div className="chatbox-message-content">
//             {messages.length === 0 && (
//               <h4 className="chatbox-message-no-message">
//                 You don't have a message yet!
//               </h4>
//             )}
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`chatbox-message-item ${message.sent ? "sent" : "received"}`}
//               >
//                 <span className="chatbox-message-item-text" dangerouslySetInnerHTML={{ __html: message.text }}></span>
//                 <span className="chatbox-message-item-time float-right">{message.time}</span>
//               </div>
//             ))}
//             {loading && (
//               <div className="chatbox-message-item">
//                 <span className="chatbox-message-item-text">Loading...</span>
//               </div>
//             )}
//           </div>
//           <div className="chatbox-message-bottom">
//             <form className="chatbox-message-form" onSubmit={handleSubmit}>
//               <textarea
//                 rows={1}
//                 placeholder="Type message..."
//                 className="chatbox-message-input"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//               />
//               <button type="submit" className="chatbox-message-submit">
//                 <img src={image} width="40px" height="40px" alt="Send" />
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chatbox;





//************************ */ this is the lastest changes made ***********************8/

// import { useState } from "react";
// import "./Chatbox.css";
// import image1 from "../icons/comment.png";
// import image from "../icons/telegram.png";

// function Chatbox() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [text, setText] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   function addZero(num) {
//     return num < 10 ? "0" + num : num;
//   }

//   const handleToggleClick = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (text.trim().length > 0) {
//       const today = new Date();
//       const newMessage1 = {
//         text: text.trim().replace(/\n/g, '<br>\n'),
//         time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
//         sent: true
//       };
//       setMessages(prevMessages => [...prevMessages, newMessage1]);
//       setText('');
//       setLoading(true);

//       const message = { text: text.trim().replace(/\n/g, '<br>\n') };
//       fetch('http://127.0.0.1:5000/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(message)
//       })
//       .then(response => response.json())
//       .then(data => {
//         const today = new Date();
//         const autoReplyMessage = {
//           text: data.predictions.map(prediction => 
//             `Disease: ${prediction.disease}, Probability: ${(prediction.probability * 100).toFixed(2)}%, Specialist: ${prediction.specialist}`
//           ).join('<br>'),
//           time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
//           sent: false
//         };
//         setMessages(prevMessages => [...prevMessages, autoReplyMessage]);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         const errorMessage = {
//           text: 'An error occurred while processing your request. Please try again later.',
//           time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}`,
//           sent: false
//         };
//         setMessages(prevMessages => [...prevMessages, errorMessage]);
//         setLoading(false);
//       });
//     }
//   };

//   return (
//     <div className="chatbox-wrapper">
//       <div className="chatbox-toggle" onClick={handleToggleClick}>
//         <img src={image1} width="30px" height="30px" alt="Toggle Chatbox" />
//       </div>
//       {isOpen && (
//         <div className="chatbox-message-wrapper">
//           <div className="chatbox-message-header">
//             <div className="chatbox-message-profile">
//               <img
//                 src="https://media.istockphoto.com/id/1283599879/photo/happiness-and-wellbeing.jpg?s=612x612&w=0&k=20&c=3JSSHPtdhL0dtA1zcVu4mfNw6FVlskRC2kk_Rl9FKU8="
//                 alt="Profile"
//                 className="chatbox-message-image"
//               />
//               <div>
//                 <h4 className="chatbox-message-name">Find your Specialist here</h4>
//                 <p className="chatbox-message-status">Mention your symptoms...</p>
//               </div>
//             </div>
//           </div>
//           <div className="chatbox-message-content">
//             {messages.length === 0 && (
//               <h4 className="chatbox-message-no-message">
//                 You don't have message yet!
//               </h4>
//             )}
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`chatbox-message-item ${message.sent ? "sent" : "received"}`}
//               >
//                 <span className="chatbox-message-item-text" dangerouslySetInnerHTML={{ __html: message.text }}></span>
//                 <span className="chatbox-message-item-time float-right">{message.time}</span>
//               </div>
//             ))}
//             {loading && (
//               <div className="chatbox-message-item">
//                 <span className="chatbox-message-item-text">Loading...</span>
//               </div>
//             )}
//           </div>
//           <div className="chatbox-message-bottom">
//             <form className="chatbox-message-form" onSubmit={handleSubmit}>
//               <textarea
//                 rows={1}
//                 placeholder="Type message..."
//                 className="chatbox-message-input"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//               />
//               <button type="submit" className="chatbox-message-submit">
//                 <img src={image} width="40px" height="40px" alt="Send" />
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chatbox;
