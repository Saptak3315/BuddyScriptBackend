import React from 'react'

function Reply({ rep }) {
    console.log(rep);
    return (
        <>
            <div className="_replies_container">




                <div className="_comment_main _reply_box">
                    <div className="_comment_image">
                        <a href="profile.html" className="_comment_image_link">
                            <img
                                src="assets/images/txt_img.png"
                                alt=""
                                className="_reply_img"
                            />
                        </a>
                    </div>
                    <div className="_comment_area">
                        <div className="_comment_details">
                            <div className="_comment_details_top">
                                <div className="_comment_name">
                                    <a href="profile.html">
                                        <h4 className="_comment_name_title">{rep.user.username}</h4>
                                    </a>
                                </div>
                            </div>
                            <div className="_comment_status">
                                <p className="_comment_status_text">
                                    <span>{rep.text}</span>
                                </p>
                            </div>
                            <div className="_comment_reply">
                                <div className="_comment_reply_num">
                                    <ul className="_comment_reply_list">
                                        <li>
                                            {/* <span>Like.</span> */}
                                        </li>
                                        <li>
                                            {/* <span>Reply.</span> */}
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
                    </div>
                </div>
            </div>

        </>
    )
}

export default Reply