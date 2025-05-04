import React, { useEffect, useState } from 'react'
import { SendOutlined } from "@ant-design/icons";
import Reply from './Reply'
import axios from 'axios';
import { useSelector } from 'react-redux';
useSelector
function Comment({com}) {
  const [replyText, setReplyText] = useState<any>({});
  const [replies, setReplies] = useState<any>([]);
  const [ctog,sctog]=useState<boolean>(true);
  const username = useSelector((state: any) => state.auth.logedin);
  const hlr = (commentId: number, value: string) => {
    setReplyText((prev) => ({
      ...prev,
      [commentId]: value,
    }));
  };
  // useEffect( ()=> {
  //   axios
  //     .get(`http://localhost:3333/sr/${com.id}`)
  //     .then((res) => {
  //       setReplies(res.data)
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching replies:", err);
  //     });
  // },[]);
  const handleReply = (commentId: number, text: string, userId: number) => {
    if (!text.trim()) {
      alert("Please write something.");
      return;
    }
  
    axios
      .post("http://localhost:3333/reply", {
        commentId,
        text,
        userId,
        createdAt: Date.now(),
      })
      .then((res) => {
        setReplyText((prev) => ({
          ...prev,
          [commentId]: "",
        }));
  
        setReplies((prev) => {
          const updatedReplies = [...prev, res.data[0]];
          return updatedReplies.slice(-7);
        });
        
      })
      .catch((err) => {
        console.error("Error submitting reply:", err);
      });
  };
  
  return (
    <>
    
      <div className="_timline_comment_main">
      

          <div 
          // key={comment.id} 
          className="_comment_main">
            <div className="_comment_image">
              <a href="profile.html" className="_comment_image_link">
                <img src="assets/images/txt_img.png" alt="" className="_comment_img1" />
              </a>
            </div>
            <div className="_comment_area">
              <div className="_comment_details">
                <div className="_comment_details_top">
                  <div className="_comment_name">
                    <a href="profile.html">
                      <h4 className="_comment_name_title">
                        {/* {comment.user.username} */}
                        {com.user.username}
                        </h4>
                    </a>
                  </div>
                </div>
                <div className="_comment_status">
                  <p className="_comment_status_text">
                    <span>
                      {/* {comment.text} */}
                      {com.text}
                      </span>
                  </p>
                </div>
                <div className="_comment_reply">
                  <div className="_comment_reply_num">
                    <ul className="_comment_reply_list">
                      <li>
                        {/* <span>Like.</span> */}
                      </li>
                      <li
                       onClick={() => {
                        if (ctog === true) {
                          axios
                            .get(`http://localhost:3333/sr/${com.id}`, {
                              withCredentials:true
                            })
                            .then((res) => {
                              setReplies(res.data);
                            })
                            .catch((err) => {
                              console.error("Error fetching comments:", err);
                            });
                        } else {
                          setReplies([]);
                        }
                        sctog(!ctog);}}
                      >
                        <span>Reply.</span>
                      </li>
                      <li>
                        {/* <span>Share</span> */}
                      </li>
                      <li>
                        <span className="_time_link"></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* {replies.map((res,index)=>(<Reply res={res}
              />))} */}
              {/* {replies?.map((rep,in)=>(<Reply key={in}/>))} */}
              {replies?.map((rep)=>(<Reply rep={rep} key={rep.id}/>))}
              
              <div hidden={ctog ? true : false} className="_feed_inner_comment_box">
                <form className="_feed_inner_comment_box_form">
                    <div className="_feed_inner_comment_box_content">
                        <div className="_feed_inner_comment_box_content_image">
                            <img
                                src="assets/images/comment_img.png"
                                alt=""
                                className="_comment_img"
                            />
                        </div>
                        <div className="_feed_inner_comment_box_content_txt">
                            <textarea
                                className="form-control _comment_textarea"
                                placeholder="Write a reply..."
                            value={replyText[com.id] || ""}
                            onChange={(e) => hlr(com.id, e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="_feed_inner_comment_box_icon">
                        <button
                            type="button"
                            className="_feed_inner_comment_box_icon_btn"
                        onClick={() => handleReply(com.id, replyText[com.id], username.id)}
                        >
                            Reply
                        </button>
                    </div>
                </form>
            </div>
            </div>
          </div>
        
      </div>
    </>
  )
}

export default Comment