import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {

  // const [chatHistory, setChatHistory] = useState();
  
  function sendMessage() {
    let url = "http://127.0.0.1:5000/respond"

    console.log(document.getElementById("usermessage").value)

    let message = document.getElementById("usermessage").value

    let text = `<p><b>USER</b>: ${ message }</p>`

    document.getElementById('chat').innerHTML += text

    fetch(url, {
          mode: 'no-cors',
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify({message: message})
      })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log('Authorization failed : ' + error.message));

    // axios.post(url, { message }).then( res => {
    //     console.log(res)
    //     text = `<p><b>USER</b>: ${ res }</p>`
    //     document.getElementById('chat').innerHTML += text
    //   }
    // )

    // axios.post(url, {
    //     message: document.getElementById('usermessage')
    // }).then(function(response) {
    //     console.log(response)
    //     var message = "<p><b>USER</b>: {{ response }}</p>"
    //     document.getElementById('chat').innerHTML += message
    // })
  }

  const messages = [
    {
      role: 'USER',
      message: "Good morning, Annie. Can you tell me what's been bothering you?",
    },
    {
      role: 'ANNIE',
      message: "It's my chest... hurts a lot... hard to breathe...",
      vitals: {
        heartbeat: '110 bpm',
        bloodpressure: '150/90 mmHg',
        bloodoxygen: '92%'
      }
    },
    {
      role: 'USER',
      message: "How long have you been feeling this pain for?",
    },
    {
      role: 'ANNIE',
      message: "Started... few hours ago... getting worse...",
      vitals: {
        heartbeat: '115 bpm',
        bloodpressure: '155/95 mmHg',
        bloodoxygen: '90%'
      }
    },
    {
      role: 'USER',
      message: "Any other symptoms, maybe nausea, sweating, or dizziness?",
    },
    {
      role: 'ANNIE',
      message: "Yes... all of that... feel very sick...",
      vitals: {
        heartbeat: '120 bpm',
        bloodpressure: '160/100 mmHg',
        bloodoxygen: '89%'
      }
    },
    {
      role: 'USER',
      message: "Ok, we should get you on an ECG, and a heart rate immedietly. You're showing signs of a serious heart issue.",
    },
    {
      role: 'ANNIE',
      message: "I'm... really scared...",
      vitals: {
        heartbeat: '125 bpm',
        bloodpressure: '165/100 mmHg',
        bloodoxygen: '88%'
      }
    },
    {
      role: 'USER',
      message: "It's okay, Annie. We're here to help. We're going to take great care of you.",
    },
    {
      role: 'ANNIE',
      message: "I can't... I...",
      vitals: {
        heartbeat: '130 bpm',
        bloodpressure: '170/105 mmHg',
        bloodoxygen: '85%'
      }
    },
    {
      role: 'ANNIE',
      message: "*Annie suddenly becomes unresponsive and appears to enter cardiac arrest.*",
      vitals: {
        heartbeat: '-- bpm',
        bloodpressure: '-- mmHg',
        bloodoxygen: '--'
      }
    },
    {
      role: 'USER',
      message: "She's in cardiac arrest. Nurse, We need to do CPR immediately.",
    },
  ]

  // useEffect(() => {}, [chatHistory])

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
        <div className="w-full h-full absolute z-[-1]">
            <img src="/background.png" className='bg-cover h-full'></img>
        </div>
        <div className="w-[80%] h-[90%] py-[40px] px-[70px] bg-white/80 rounded-2xl flex flex-col items-center justify-start gap-[20px] drop-shadow-xl">
            <h1 className="text-[60px] font-bold">Annie</h1>
            <div className="w-full h-[70%] border-black/40">
                <div id="chat" className="pt-[10px] pb-[10px] w-full h-full flex flex-col rounded-t-2xl bg-gray-300 overflow-scroll">
                  {messages.splice(0,0).map((message, key) => {
                    console.log(message)
                    return(
                      <div key={key} className={`px-[30px] py-[10px] w-full flex flex-row justify-between items-center ${key % 2 != 0 ? 'bg-gray-200' : '' }`}>
                        <p key={key}><b>{message.role}:</b> {message.message}</p>
                        { message.role == "ANNIE" ?
                          <div className='flex flex-row justify-between w-[30%]'>
                            <div className='flex flex-row gap-[5px] items-center'>
                              <svg viewBox="0 0 24 24" height='24' width='24'fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#ff0000"></path> </g></svg>
                              <b className='text-[10px]'>{message.vitals.heartbeat}</b>
                            </div>
                            <div className='flex flex-row gap-[5px] items-center'>
                              <svg viewBox="0 0 48 48" height='24' width='24' fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M36.9228 18C37.4751 18 37.9228 18.4477 37.9228 19C37.9228 20.3228 37.9425 21.692 37.962 23.0465C37.9842 24.5925 38.0062 26.1193 37.9983 27.536C37.9831 30.2549 37.8624 32.8418 37.4203 35.0818C36.9793 37.3163 36.1985 39.3134 34.7793 40.7537C33.3307 42.2238 31.331 43 28.7031 43C24.3102 43 21.8272 41.3632 20.4726 39.5782C19.8121 38.7078 19.4478 37.8388 19.2478 37.1859C19.1476 36.8585 19.0876 36.582 19.0521 36.3816C19.0344 36.2813 19.0227 36.1995 19.0152 36.1395C19.0114 36.1095 19.0087 36.0849 19.0068 36.066L19.0045 36.042L19.0037 36.0334L19.0034 36.0299L19.0033 36.0284C19.0032 36.0277 19.0032 36.027 20 35.9474L19.0032 36.027L18.9236 35.0302L20.9172 34.8709L20.9963 35.8615L20.9965 35.8635C20.9969 35.8675 20.9979 35.8769 20.9997 35.8912C21.0033 35.9198 21.01 35.9681 21.0216 36.0333C21.0446 36.1638 21.0866 36.3602 21.1602 36.6003C21.3077 37.0822 21.578 37.7264 22.0658 38.3692C23.0078 39.6105 24.8765 41 28.7031 41C30.9103 41 32.3556 40.3639 33.3547 39.3499C34.3833 38.3061 35.053 36.7473 35.4582 34.6945C35.8622 32.6473 35.9833 30.2155 35.9983 27.5248C36.0065 26.071 35.9849 24.6161 35.9628 23.122C35.943 21.7884 35.9228 20.4235 35.9228 19C35.9228 18.4477 36.3705 18 36.9228 18Z" fill="#333333"></path> <path fillRule="evenodd" clipRule="evenodd" d="M23.0033 11.4695C23.0036 11.4695 23.0032 11.4729 23.0011 11.4797C23.0019 11.4729 23.003 11.4695 23.0033 11.4695ZM22.9934 11.5C22.9726 11.4519 22.9117 11.3471 22.7451 11.186C22.4319 10.883 21.8739 10.5181 21.0209 10.1691C19.3247 9.47522 16.8435 9 14 9C11.1565 9 8.67526 9.47522 6.97909 10.1691C6.12611 10.5181 5.5681 10.883 5.25487 11.186C5.08832 11.3471 5.02743 11.4519 5.0066 11.5C5.02743 11.5481 5.08832 11.6529 5.25487 11.814C5.5681 12.117 6.12611 12.4819 6.97909 12.8309C8.67526 13.5248 11.1565 14 14 14C16.8435 14 19.3247 13.5248 21.0209 12.8309C21.8739 12.4819 22.4319 12.117 22.7451 11.814C22.9117 11.6529 22.9726 11.5481 22.9934 11.5ZM4.9967 11.4695C4.99702 11.4695 4.99807 11.4729 4.99891 11.4797C4.9968 11.4729 4.99638 11.4695 4.9967 11.4695ZM4.9967 11.5305C4.99638 11.5305 4.9968 11.5271 4.99891 11.5203C4.99807 11.5271 4.99702 11.5305 4.9967 11.5305ZM23.0011 11.5203C23.0032 11.5271 23.0036 11.5305 23.0033 11.5305C23.003 11.5305 23.0019 11.5271 23.0011 11.5203ZM14 16C20.0751 16 25 13.9853 25 11.5C25 9.01472 20.0751 7 14 7C7.92487 7 3 9.01472 3 11.5C3 13.9853 7.92487 16 14 16Z" fill="#333333"></path> <path d="M4 14L13 16.3158V36L4 33.6842V14Z" fill="#333333"></path> <path fillRule="evenodd" clipRule="evenodd" d="M25 12C25 12 24.306 12.5138 23 13.1161C21.1501 13.9692 18.0724 15 14 15C9.84407 15 6.815 13.9958 5 13.1494C3.6779 12.5328 3 12 3 12V34C3 34 6.47368 37 14 37C21.5263 37 25 34 25 34V31.9381C24.6724 31.979 24.3387 32 24 32C23.6613 32 23.3276 31.979 23 31.9381V32.9432C22.651 33.1473 22.1712 33.3976 21.5565 33.6525C19.9799 34.306 17.4896 35 14 35C10.5104 35 8.02005 34.306 6.44352 33.6525C5.82878 33.3976 5.34902 33.1473 5 32.9432V15.3312L5.05561 15.3538C7.11934 16.1895 10.1236 17 14 17C17.7658 17 20.7672 16.1864 22.8458 15.3578C22.8978 15.3371 22.9492 15.3164 23 15.2957V16.0619C23.3276 16.021 23.6613 16 24 16C24.3387 16 24.6724 16.021 25 16.0619V12Z" fill="#333333"></path> <path fillRule="evenodd" clipRule="evenodd" d="M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30ZM24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32Z" fill="#333333"></path> <path d="M26 24C26 25.1046 25.1046 26 24 26C22.8954 26 22 25.1046 22 24C22 22.8954 22.8954 22 24 22C25.1046 22 26 22.8954 26 24Z" fill="#333333"></path> <path d="M23 20C23 19.4477 23.4477 19 24 19C24.5523 19 25 19.4477 25 20V23C25 23.5523 24.5523 24 24 24C23.4477 24 23 23.5523 23 23V20Z" fill="#333333"></path> <path fillRule="evenodd" clipRule="evenodd" d="M37.0096 17.924C39.3867 15.7473 41.187 14.0919 42.407 12.567C43.6075 11.0666 44.0364 9.94361 43.9976 8.85939L43.9975 8.85783C43.9648 7.92472 43.4838 7.0443 42.7595 6.54731L42.7542 6.54363C41.3594 5.5799 39.5548 5.97445 38.5253 7.18885L36.9998 8.98839L35.4742 7.18885C34.4489 5.97938 32.642 5.5839 31.2411 6.54656L31.24 6.54731C30.5161 7.044 30.0352 7.92365 30.002 8.85613C29.9664 9.94337 30.3978 11.0681 31.5955 12.5644C32.8173 14.0907 34.6229 15.7477 37.0096 17.924ZM28.0032 8.78783C27.8863 12.3057 30.9721 15.1255 35.6953 19.4322L35.7942 19.5229C36.478 20.1575 37.5305 20.1575 38.2143 19.5319L38.3043 19.4503L38.3586 19.4006C43.0512 15.1038 46.1218 12.2922 45.9963 8.78783C45.9423 7.24649 45.1596 5.76861 43.8911 4.8982C42.0788 3.64601 39.9418 3.79797 38.3274 4.77004C37.826 5.07194 37.375 5.45294 36.9998 5.89554C36.6257 5.45433 36.1764 5.07484 35.6769 4.77406C34.0618 3.80154 31.9224 3.65171 30.1084 4.8982C28.8399 5.76861 28.0572 7.24649 28.0032 8.78783Z" fill="#333333"></path> </g></svg>
                              <b className='text-[10px]'>{message.vitals.bloodpressure}</b>
                            </div>
                            <div className='flex flex-row gap-[5px] items-center'>
                              <svg viewBox="0 0 1024 1024" height='24' width='24' version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M512 511.9m-379.4 0a379.4 379.4 0 1 0 758.8 0 379.4 379.4 0 1 0-758.8 0Z" fill="#bdbdbd"></path><path d="M512 891.4c100 0 190.9-38.8 258.6-102C434.2 838 251 713.2 140.8 433.5c-5.4 25.3-8.2 51.6-8.2 78.5 0 209.5 169.9 379.4 379.4 379.4z" fill="#9c9c9c"></path><path d="M512 925.5C283.9 925.5 98.5 740 98.5 512 98.5 283.9 284 98.5 512 98.5S925.5 284 925.5 512c0 18.6-1.2 37.3-3.7 55.6-2.5 18.7-19.8 31.8-38.4 29.3-18.7-2.5-31.8-19.7-29.3-38.4 2-15.3 3.1-30.9 3.1-46.4 0-190.3-154.9-345.2-345.2-345.2S166.9 321.7 166.9 512s154.9 345.2 345.2 345.2c40.2 0 79.5-6.8 116.9-20.3 17.7-6.4 37.3 2.9 43.7 20.6 6.4 17.7-2.9 37.3-20.6 43.7-44.9 16.1-92 24.3-140.1 24.3z" fill="#1A1A1A"></path><path d="M755 812.3h77.3c7.7 0 13.6 2 17.6 6 4.1 4.1 6.1 9.5 6.1 16.3 0 6.2-1.6 11.4-4.8 15.6s-8 6.4-14.6 6.4H727.7c-7.4 0-13.2-2.6-17.4-7.8-4.2-5.2-6.2-11.4-6.2-18.4 0-4.5 1.3-10.5 4-18s5.5-13.3 8.8-17.6c13.1-17.4 24.9-32.1 35.5-44.5 10.5-12.4 18.1-20.5 22.6-24.4 8.1-7.3 14.9-14.6 20.2-21.9s9.5-14.9 12.3-22.6c2.8-7.8 4.2-15.2 4.2-22.7 0-8-1.5-15.2-4.5-21.5-3-6.4-7.1-11.3-12.3-14.8-5.2-3.5-10.8-5.3-17-5.3-12.9 0-23.1 7.2-30.5 21.6-1 1.8-2.7 7-5 15.4s-4.9 14.9-7.8 19.4c-3 4.5-7.2 6.7-12.8 6.7-4.9 0-9-2-12.3-6.2-3.2-4.2-4.9-9.8-4.9-16.9 0-8.7 1.6-17.7 4.6-27 3-9.4 7.7-17.9 13.7-25.6 6.1-7.7 13.8-13.8 23.1-18.6 9.3-4.7 20.2-7 32.8-7 15.1 0 28 3 38.7 9 6.9 4.1 13 9.5 18.2 16.5 5.3 7 9.3 15.1 12.2 24.4 3 9.2 4.3 18.7 4.3 28.7 0 15.6-3 29.7-9.1 42.5-6.1 12.7-12.3 22.7-18.6 29.9s-16.9 18.6-31.8 34c-14.9 15.4-25 27.4-30.6 35.9-2.2 3.7-4.7 7.7-7.1 12.5z" fill="#1A1A1A"></path></g></svg>
                              <b className='text-[10px]'>{message.vitals.bloodoxygen}</b>
                            </div>
                          </div>
                          :
                          <></>
                        }
                      </div>
                    )
                  })}
                </div>
                <div className="bottom-0 w-full h-[60px] border-black bg-gray-400 rounded-b-2xl py-[10px] px-[15px] flex flex-row justify-between gap-[10px]">

                      <input id="usermessage" type="text" className="w-[80%] bg-white border-gray-300 border-[1px] rounded-md px-[10px]" placeholder="Write something...">
                      </input>
                      <button className="bg-white rounded-md px-[10px]" type="button" onClick={() => sendMessage()}>
                          Send
                      </button>

                    <div className="w-[1px] h-full border-[1px] border-gray-300"></div>
                    <button className="bg-white rounded-md px-[10px]">
                        Speak
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default App
