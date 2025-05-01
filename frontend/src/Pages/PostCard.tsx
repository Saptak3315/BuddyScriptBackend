import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { addComment, deletePost, editPost, likePost, replyToComment } from "../redux/authSlice";
import { RootState } from "../redux/store";
import conf from "../conf/conf";
import axios from "axios";
import { deletePost, editPost } from "../redux/authSlice";
import { ColumnHeightOutlined, LikeFilled, LikeOutlined, SendOutlined } from "@ant-design/icons";
import Reply from "./Reply";
import { likepost, deletelike, commentCount, allLikers } from "../redux/authSlice";
import Comment from "./Comment";
import { Button, Tooltip } from "antd";
<LikeOutlined />
interface PostType {
  id: number;
  user: string;
  content: string;
  likers: string[];
  comments: CommentType[];
  timeofcreate: number;
}

interface CommentType {
  id: number;
  user: string;
  text: string;
  replies: { user: string; text: string }[];
}

interface PostCardProps {
  obj: PostType;
}

const PostCard: React.FC<any> = ({ obj }) => {
  // console.log(obj)
  // console.log(obj)

  const [liked, setLiked] = useState<boolean>(obj.isLikedByUser);

  const [tog, setTog] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<{ [key: number]: string }>({});
  const [showLikers, setShowLikers] = useState<boolean>(false);
  const [Likes, setLikers] = useState<[]>(obj.likers || [])
  const [coc, scoc] = useState<number>(obj.commentCount);
  const [comments, setComments] = useState<[]>([])
  const [col, scol] = useState<number>(obj.likeCount);
  const [ctog, sctog] = useState<boolean>(true)
  const posts = useSelector((state: RootState) => state.auth.allpost);
  const username = useSelector((state: RootState) => state.auth.logedin);
  const dispatch = useDispatch();
  const [page, setpage] = useState<number>(1);
  const LoadMore = () => {
    axios.get(`http://localhost:3333/showcomment/${obj.id}/${page + 1}`, { withCredentials: true, params: { postId: obj.id, page: page + 1 }, })
      .then(res => {
        const newcomment = res.data.data;

        if (Array.isArray(newcomment)) {
          setComments([...comments, ...newcomment])

          setpage(page + 1);
        } else {
          console.error("Expected an array but got:");
        }
      })
      .catch(err => {
        console.error("Error loading more posts", err);
      });
  };









  // useEffect(() => {
  //   // axios
  //   //   .get("http://localhost:3333/gl", {
  //   //     params: { postId: obj.id },
  //   //   })
  //   //   .then((res) => {
  //   //     scol(res.data);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.error("Error fetching col:", err);
  //   //   });\

  // }, [obj.id]);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3333/sl", {
  //       params: { postId: obj.id },
  //     })
  //     .then((res) => {
  //       setLikers(res.data);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching col:", err);
  //     });
  // }, [obj.id]);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3333/showcomment", {
  //       params: { postId: obj.id },
  //     })
  //     .then((res) => {
  //       setComments(res.data);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching comments:", err);
  //     });
  // }, [obj.id]);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3333/gc", {
  //       params: { postId: obj.id },
  //     })
  //     .then((res) => {
  //       scoc(res.data);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching comments:", err);
  //     });
  // }, [obj.id]);




  const handleLike = async (postId: number, userId: number) => {
    const likedBefore = liked === true;

    if (!likedBefore) {
      await axios.post("http://localhost:3333/like", { postId, userId }).then((res) => {


        setLiked(true);
        scol(col + 1);
        // setLikers(prev => [...prev, obj.user.username]);


        console.log(Likes, "Likes")
        dispatch(likepost(obj.id));
        dispatch(allLikers({ id: obj.id, likers: [...Likes, username.name] }))
        setLikers(res.data.ln);
        scol(res.data.nol)
      });
    } else {
      await axios.post("http://localhost:3333/dl", { postId, userId }).then((res) => {


        setLiked(false);
        scol(col - 1);

        console.log(Likes, "UnLikes")
        console.log(Likes);
        const lc = [...Likes];
        lc.pop()
        dispatch(deletelike(obj.id));
        dispatch(allLikers({ id: obj.id, likers: [...lc] }))
        setLikers(res.data.ln);
        scol(res.data.nol)
      });
    }



  };

  const postToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setTog((prev) => !prev);
  };
  const handleEdit = (postId: number) => {
    const postToEdit = posts.find((post: any) => post.id === postId);
    if (!postToEdit) {
      alert("Post not found!");
      return;
    }

    const newContent = prompt("Edit your post:", postToEdit.content);
    if (!newContent?.trim()) {
      alert("Please write something.");
      return;
    }
    axios.post('http://localhost:3333/up', { postId: obj.id, content: newContent, userId: username.id })
      .then((res) => {
        dispatch((editPost({ postId, newContent })));
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update post.");
      });
    setTog(false);
  };

  const getTimeAgo = (postTime: string): string => {
    const postTimestamp = new Date(postTime).getTime();

    const seconds = Math.floor((Date.now() - postTimestamp) / 1000);

    if (seconds < 60) {
      return seconds <= 1 ? "1 second ago" : `${seconds} seconds ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return minutes <= 1 ? "1 minute ago" : `${minutes} minutes ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return hours <= 1 ? "1 hour ago" : `${hours} hours ago`;
    }

    const days = Math.floor(hours / 24);
    return days <= 1 ? "1 day ago" : `${days} days ago`;
  };

  const handleDelete = (event: React.MouseEvent, postId: number) => {
    event.preventDefault();
    axios
      .post('http://localhost:3333/dp', { postId }, { withCredentials: true })
      .then(() => {
        dispatch(deletePost(postId));
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to delete the post.");
      });
    setTog(false);
  };


  const handleComment = (postId: number, userId: number) => {
    const text = commentText[postId]?.trim();

    if (!text) {
      alert("Please write something.");
      return;
    }

    const createdAt = Date.now();

    axios
      .post('http://localhost:3333/comment', {
        postId,
        text,
        userId,
        createdAt,
      })
      .then((res) => {
        const nw = [res.data[0], ...comments];
        scoc(coc + 1);
        if (nw.length > 7) {
          const pre = nw.filter((e, i) => {
            if (i < 7) {
              return e;
            }
          });
          setComments(pre);
        }
        else {
          setComments(nw);
        }
        dispatch(commentCount(obj.id))
        setCommentText("");
      })
      .catch((err) => {
        console.error("Comment failed:", err);
        alert("An error occurred.");
      });
  };

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              <img src="assets/images/post_img.png" alt="" className="_post_img" />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title">{obj?.user?.username}</h4>
              <p className="_feed_inner_timeline_post_box_para">
                {getTimeAgo(obj.createdAt)}
                {/* <a href="#0">Public</a> */}
              </p>
            </div>
          </div>
          <div className="_feed_inner_timeline_post_box_dropdown">
            <div className="_feed_timeline_post_dropdown">
              <a href="" onClick={postToggle} className="_feed_timeline_post_dropdown_link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="17"
                  fill="none"
                  viewBox="0 0 4 17"
                >
                  <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                </svg>
              </a>
            </div>

            <div className={`_feed_timeline_dropdown ${tog ? "show" : ''}`} >
              <ul className="_feed_timeline_dropdown_list">
                <li className="_feed_timeline_dropdown_item">
                </li>
                <li className="_feed_timeline_dropdown_item">
                </li>
                <li className="_feed_timeline_dropdown_item">
                </li>
                <li hidden={obj.userId !== username.id} className="_feed_timeline_dropdown_item" onClick={() => handleEdit(obj.id)}>
                  <a href="#0" className="_feed_timeline_dropdown_link">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="#1890FF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M8.25 3H3a1.5 1.5 0 00-1.5 1.5V15A1.5 1.5 0 003 16.5h10.5A1.5 1.5 0 0015 15V9.75"
                        />
                        <path
                          stroke="#1890FF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M13.875 1.875a1.591 1.591 0 112.25 2.25L9 11.25 6 12l.75-3 7.125-7.125z"
                        />
                      </svg>
                    </span>
                    Edit Post
                  </a>
                </li>
                <li hidden={obj.userId !== username.id} className="_feed_timeline_dropdown_item" onClick={(e) => handleDelete(e, obj.id)}>
                  <a href="" className="_feed_timeline_dropdown_link">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="#1890FF"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.2"
                          d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5zM7.5 8.25v4.5M10.5 8.25v4.5"
                        />
                      </svg>
                    </span>
                    Delete Post
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <h4 className="_feed_inner_timeline_post_title">{obj.content}</h4>
        <div className="_feed_inner_timeline_image">
          {<img src="https://scontent.fdac154-1.fna.fbcdn.net/v/t39.30808-6/481445979_1953911858466248_9018550123220504226_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHIJ0-rDDuZJlQiafBl43yqFva9O8G70ysW9r07wbvTKzz4Q07Sr61DXNdmZsju6nLbvTbh9dPr1QdlWwJAkU63&_nc_ohc=qiTQusMDt7cQ7kNvwGdg5Ye&_nc_oc=AdkLIB5u59NB-F_Iu1xbylpRcKo93owF0j5ky8PDlc0cVPrYpEwcQ0xgwIbVDPRPflk&_nc_zt=23&_nc_ht=scontent.fdac154-1.fna&_nc_gid=5ALvnrl9TIWbiQbtDQOhFQ&oh=00_AfFg3Ff-Kg5xIVJWAJIXJCjl7QO7-EDyu2dD1-gPf8oKpA&oe=6817701B" />}
          {/* <img src="https://scontent.fdac154-1.fna.fbcdn.net/v/t39.30808-6/481445979_1953911858466248_9018550123220504226_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHIJ0-rDDuZJlQiafBl43yqFva9O8G70ysW9r07wbvTKzz4Q07Sr61DXNdmZsju6nLbvTbh9dPr1QdlWwJAkU63&_nc_ohc=5AgPXNP5uqAQ7kNvwEvlJK0&_nc_oc=AdlLZIiQSLCwhiqwGhTOmyy4kgdeCB8RYvwZswrDtakgbNxksUenDaJ6Z41C549ZG0k&_nc_zt=23&_nc_ht=scontent.fdac154-1.fna&_nc_gid=EQBnzH3nuxAcGXLuZ32AUg&oh=00_AfEt54MkYSpyETI4KuUVdoRz9JkQHGXHmSG4pPD2y1vZdQ&oe=6811491B" alt="" className="_time_img" /> */}
        </div>
      </div>
      <div className="_feed_inner_timeline_reactions" style={{ display: "flex", alignItems: "center", gap: "480px" }}>
        <div
          className="_feed_inner_timeline_total_reacts_image"
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
            display: "inline-block",
            position: "relative"
          }}
          onMouseEnter={() => setShowLikers(true)}
          onMouseLeave={() => setShowLikers(false)}
        >
          {col}
          {col < 2 ? " Like" : " Likes"}

          {showLikers && Likes.length > 0 && (
            <div style={{
              position: "absolute",
              top: "100%",
              left: "0",
              marginTop: "8px",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "6px",
              padding: "10px",
              zIndex: 999,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
            }}>
              <h4 style={{ margin: "0 0 6px 0", fontSize: "14px" }}>Liked by:</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, maxHeight: "150px", overflowY: "auto" }}>
                {Likes.map((liker, index) => (
                  <li key={index} style={{ padding: "4px 0", fontSize: "13px", borderBottom: "1px solid #eee" }}>
                    {liker}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div
          className="_feed_inner_timeline_total_reacts_comments"
          style={{
            fontSize: "14px",
            color: "#333"
          }}
        >
          {coc} {coc < 2 ? "Comment" : "Comments"}
        </div>
      </div>
      <div className="_feed_inner_timeline_reaction">
        <button
          className="_feed_inner_timeline_reaction_emoji _feed_reaction _feed_reaction_active"
          onClick={() => handleLike(obj.id, username.id)}
        >
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              {liked ? (
                <Tooltip title="You liked this">

                  <LikeFilled />
                  Liked
                </Tooltip>
              ) : (
                <Tooltip title="Click to like">

                  <LikeOutlined />
                  Like

                </Tooltip>
              )}
            </span>


          </span>
        </button>

        <a onClick={() => {
          if (ctog === true) {
            axios
              .get(`http://localhost:3333/showcomment/${obj.id}/1`, {
                withCredentials: true,
                params: { postId: obj.id, page: 1 },
              })
              .then((res) => {
                setComments(res.data.data);
              })
              .catch((err) => {
                console.error("Error fetching comments:", err);
              });
          } else {
            setComments([]);
            setpage(1);
          }
          sctog(!ctog);
        }

        }

          //       onClick={() => {
          //   if (ctog === true) {
          //     axios
          //       .get(`http://localhost:3333/showcomment/${1}`</div>, {
          //         params: { postId: obj.id },
          //       })
          //       .then((res) => {
          //         setComments(res.data);
          //       })
          //       .catch((err) => {
          //         console.error("Error fetching comments:", err);
          //       });
          //   } else {
          //     setComments([]);
          //   }
          //   sctog(!ctog);
          // }} 
          className="_feed_inner_timeline_reaction_comment _feed_reaction"
        >
          <span className="_feed_inner_timeline_reaction_link">
            <svg
              className="_reaction_svg"
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              fill="none"
              viewBox="0 0 21 21"
            >
              <path
                stroke="#000"
                d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"
              ></path>
              <path
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.938 9.313h7.125M10.5 14.063h3.563"
              ></path>
            </svg>
            Comment
          </span>

        </a>


        <button className="_feed_inner_timeline_reaction_share _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link">
            <svg
              className="_reaction_svg"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="21"
              fill="none"
              viewBox="0 0 24 21"
            >
              <path
                stroke="#000"
                stroke-linejoin="round"
                d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"
              ></path>
            </svg>
            Share
          </span>
        </button>
      </div>
      <div hidden={ctog ? true : false} className="_feed_inner_timeline_cooment_area">
        <div className="_feed_inner_comment_box">
          <form className="_feed_inner_comment_box_form" onSubmit={(e) => e.preventDefault()}>
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
                  placeholder="Write a comment"
                  value={commentText[obj.id] || ""}
                  onChange={(e) =>
                    setCommentText((prev) => ({ ...prev, [obj.id]: e.target.value }))
                  }

                  id="floatingTextarea1"
                ></textarea>
              </div>


            </div>
            <div className="_feed_inner_comment_box_icon">
              <button className="_feed_inner_comment_box_icon_btn"
                onClick={() => handleComment(obj.id, username.id)}

              >
                <SendOutlined />
              </button>
              <button className="_feed_inner_comment_box_icon_btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="#000"
                    fill-opacity=".46"
                    fill-rule="evenodd"
                    d="M13.167 6.534a.5.5 0 01.5.5c0 3.061-2.35 5.582-5.333 5.837V14.5a.5.5 0 01-1 0v-1.629C4.35 12.616 2 10.096 2 7.034a.5.5 0 011 0c0 2.679 2.168 4.859 4.833 4.859 2.666 0 4.834-2.18 4.834-4.86a.5.5 0 01.5-.5zM7.833.667a3.218 3.218 0 013.208 3.22v3.126c0 1.775-1.439 3.22-3.208 3.22a3.218 3.218 0 01-3.208-3.22V3.887c0-1.776 1.44-3.22 3.208-3.22zm0 1a2.217 2.217 0 00-2.208 2.22v3.126c0 1.223.991 2.22 2.208 2.22a2.217 2.217 0 002.208-2.22V3.887c0-1.224-.99-2.22-2.208-2.22z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button className="_feed_inner_comment_box_icon_btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="#000"
                    fill-opacity=".46"
                    fill-rule="evenodd"
                    d="M10.867 1.333c2.257 0 3.774 1.581 3.774 3.933v5.435c0 2.352-1.517 3.932-3.774 3.932H5.101c-2.254 0-3.767-1.58-3.767-3.932V5.266c0-2.352 1.513-3.933 3.767-3.933h5.766zm0 1H5.101c-1.681 0-2.767 1.152-2.767 2.933v5.435c0 1.782 1.086 2.932 2.767 2.932h5.766c1.685 0 2.774-1.15 2.774-2.932V5.266c0-1.781-1.089-2.933-2.774-2.933zm.426 5.733l.017.015.013.013.009.008.037.037c.12.12.453.46 1.443 1.477a.5.5 0 11-.716.697S10.73 8.91 10.633 8.816a.614.614 0 00-.433-.118.622.622 0 00-.421.225c-1.55 1.88-1.568 1.897-1.594 1.922a1.456 1.456 0 01-2.057-.021s-.62-.63-.63-.642c-.155-.143-.43-.134-.594.04l-1.02 1.076a.498.498 0 01-.707.018.499.499 0 01-.018-.706l1.018-1.075c.54-.573 1.45-.6 2.025-.06l.639.647c.178.18.467.184.646.008l1.519-1.843a1.618 1.618 0 011.098-.584c.433-.038.854.088 1.19.363zM5.706 4.42c.921 0 1.67.75 1.67 1.67 0 .92-.75 1.67-1.67 1.67-.92 0-1.67-.75-1.67-1.67 0-.921.75-1.67 1.67-1.67zm0 1a.67.67 0 10.001 1.34.67.67 0 00-.002-1.34z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <Comment/> */}

      {
        comments?.map((com, id) => (
          <Comment com={com} key={com.id} />
        ))
      }
      <Button hidden={ctog === true || page * 7 >= coc} color="cyan" variant="filled" onClick={LoadMore}>
        Load more
      </Button>

    </div>
  );
}
export default PostCard;