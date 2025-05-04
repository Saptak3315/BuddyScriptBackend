import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logedin, setpost } from '../redux/authSlice';

export default function Nb() {
	const navigate = useNavigate();
	const Dispatch=useDispatch();
	const username=useSelector((state:any) => state.auth.logedin);
	const handleonclick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    try{
		axios.get('http://localhost:3333/logout',{withCredentials:true});
		Dispatch(logedin({id:-1,name:""}))
		Dispatch(setpost([]));
		navigate("/login");
		
	}catch{
		
	}
  };
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light _header_nav _padd_t10">
				<div className="container _custom_container">
					<div className="_logo_wrap">
						<a className="navbar-brand" href="feed.html">
							<img src="assets/images/logo.svg" alt="Image" className="_nav_logo"/>
						</a>
					</div>
					<button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<div className="_header_form ms-auto">
							<form className="_header_form_grp">
								<svg className="_header_form_svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
									<circle cx="7" cy="7" r="6" stroke="#666" />
									<path stroke="#666" stroke-linecap="round" d="M16 16l-3-3" />
								</svg>
								<input className="form-control me-2 _inpt1" type="search" placeholder="input search text" aria-label="Search"/>
							</form>
						</div>
						<ul className="navbar-nav mb-2 mb-lg-0 _header_nav_list ms-auto _mar_r8">
							<li className="nav-item _header_nav_item">
								<a className="nav-link _header_nav_link_active _header_nav_link" aria-current="page" href="feed.html">
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" fill="none" viewBox="0 0 18 21">
										<path className="_home_active" stroke="#000" stroke-width="1.5" stroke-opacity=".6" d="M1 9.924c0-1.552 0-2.328.314-3.01.313-.682.902-1.187 2.08-2.196l1.143-.98C6.667 1.913 7.732 1 9 1c1.268 0 2.333.913 4.463 2.738l1.142.98c1.179 1.01 1.768 1.514 2.081 2.196.314.682.314 1.458.314 3.01v4.846c0 2.155 0 3.233-.67 3.902-.669.67-1.746.67-3.901.67H5.57c-2.155 0-3.232 0-3.902-.67C1 18.002 1 16.925 1 14.77V9.924z" />
										<path className="_home_active" stroke="#000" stroke-opacity=".6" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.857 19.341v-5.857a1 1 0 00-1-1H7.143a1 1 0 00-1 1v5.857" />
									</svg>
								</a>
							</li>
							<li className="nav-item _header_nav_item">
								<a className="nav-link _header_nav_link" aria-current="page" href="friend-request.html">
									<svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" fill="none" viewBox="0 0 26 20">
										<path fill="#000" fill-opacity=".6" fill-rule="evenodd" d="M12.79 12.15h.429c2.268.015 7.45.243 7.45 3.732 0 3.466-5.002 3.692-7.415 3.707h-.894c-2.268-.015-7.452-.243-7.452-3.727 0-3.47 5.184-3.697 7.452-3.711l.297-.001h.132zm0 1.75c-2.792 0-6.12.34-6.12 1.962 0 1.585 3.13 1.955 5.864 1.976l.255.002c2.792 0 6.118-.34 6.118-1.958 0-1.638-3.326-1.982-6.118-1.982zm9.343-2.224c2.846.424 3.444 1.751 3.444 2.79 0 .636-.251 1.794-1.931 2.43a.882.882 0 01-1.137-.506.873.873 0 01.51-1.13c.796-.3.796-.633.796-.793 0-.511-.654-.868-1.944-1.06a.878.878 0 01-.741-.996.886.886 0 011.003-.735zm-17.685.735a.878.878 0 01-.742.997c-1.29.19-1.944.548-1.944 1.059 0 .16 0 .491.798.793a.873.873 0 01-.314 1.693.897.897 0 01-.313-.057C.25 16.259 0 15.1 0 14.466c0-1.037.598-2.366 3.446-2.79.485-.06.929.257 1.002.735zM12.789 0c2.96 0 5.368 2.392 5.368 5.33 0 2.94-2.407 5.331-5.368 5.331h-.031a5.329 5.329 0 01-3.782-1.57 5.253 5.253 0 01-1.553-3.764C7.423 2.392 9.83 0 12.789 0zm0 1.75c-1.987 0-3.604 1.607-3.604 3.58a3.526 3.526 0 001.04 2.527 3.58 3.58 0 002.535 1.054l.03.875v-.875c1.987 0 3.605-1.605 3.605-3.58S14.777 1.75 12.789 1.75zm7.27-.607a4.222 4.222 0 013.566 4.172c-.004 2.094-1.58 3.89-3.665 4.181a.88.88 0 01-.994-.745.875.875 0 01.75-.989 2.494 2.494 0 002.147-2.45 2.473 2.473 0 00-2.09-2.443.876.876 0 01-.726-1.005.881.881 0 011.013-.721zm-13.528.72a.876.876 0 01-.726 1.006 2.474 2.474 0 00-2.09 2.446A2.493 2.493 0 005.86 7.762a.875.875 0 11-.243 1.734c-2.085-.29-3.66-2.087-3.664-4.179 0-2.082 1.5-3.837 3.566-4.174a.876.876 0 011.012.72z" clip-rule="evenodd" />
									</svg>
								</a>
							</li>
							<li className="nav-item _header_nav_item">
								<span id="_notify_btn" className="nav-link _header_nav_link _header_notify_btn">
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="none" viewBox="0 0 20 22">
										<path fill="#000" fill-opacity=".6" fill-rule="evenodd" d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0zm0 1.535c-3.6 0-6.11 2.802-6.11 5.316 0 2.127-.595 3.11-1.12 3.978-.422.697-.755 1.247-.755 2.444.173 1.93 1.455 2.944 7.986 2.944 6.494 0 7.817-1.06 7.988-3.01-.003-1.13-.336-1.681-.757-2.378-.526-.868-1.12-1.851-1.12-3.978 0-2.514-2.51-5.316-6.111-5.316z" clip-rule="evenodd" />
									</svg>
									<span className="_counting">6</span> 
									<div id="_notify_drop" className="_notification_dropdown">
										<div className="_notifications_content">
											<h4 className="_notifications_content_title">Notifications</h4>
											<div className="_notification_box_right">
												<button type="button" className="_notification_box_right_link">
													<svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
														<circle cx="2" cy="2" r="2" fill="#C4C4C4"></circle>
														<circle cx="2" cy="8" r="2" fill="#C4C4C4"></circle>
														<circle cx="2" cy="15" r="2" fill="#C4C4C4"></circle>
													</svg>
												</button>
												<div className="_notifications_drop_right">
													<ul className="_notification_list">
														<li className="_notification_item">
															<span className="_notification_link">Mark as all read</span>
														</li>
														<li className="_notification_item">
															<span className="_notification_link">Notifivations seetings</span>
														</li>
														<li className="_notification_item">
															<span className="_notification_link">Open Notifications</span>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="_notifications_drop_box">
											<div className="_notifications_drop_btn_grp">
												<button className="_notifications_btn_link">
													All
												</button>
												<button className="_notifications_btn_link1">
													Unread
												</button>
											</div>
											<div className="_notifications_all">
												<div className="_notification_box">
													<div className="_notification_image">
														<img src="assets/images/friend-req.png" alt="Image" className="_notify_img"/>
													</div>
													<div className="_notification_txt">
														<p className="_notification_para">
															<span className="_notify_txt_link">
																Steve Jobs
															</span>
															posted a link in your timeline.
														</p>
														<div className="_nitification_time">
															<span>42 miniutes ago</span>
														</div>
													</div>
												</div>
												<div className="_notification_box">
													<div className="_notification_image">
														<img src="assets/images/profile-1.png" alt="Image" className="_notify_img"/>
													</div>
													<div className="_notification_txt">
														<p className="_notification_para">
															An admin changed the name of the group 
															<span className="_notify_txt_link">
																Freelacer usa
															</span>
															to
															<span className="_notify_txt_link">
																Freelacer usa 
															</span>
														</p>
														<div className="_nitification_time">
															<span>42 miniutes ago</span>
														</div>
													</div>
												</div>
												<div className="_notification_box">
													<div className="_notification_image">
														<img src="assets/images/friend-req.png" alt="Image" className="_notify_img"/>
													</div>
													<div className="_notification_txt">
														<p className="_notification_para">
															<span className="_notify_txt_link">
																Steve Jobs
															</span>
															posted a link in your timeline.
														</p>
														<div className="_nitification_time">
															<span>42 miniutes ago</span>
														</div>
													</div>
												</div>
												<div className="_notification_box">
													<div className="_notification_image">
														<img src="assets/images/profile-1.png" alt="Image" className="_notify_img"/>
													</div>
													<div className="_notification_txt">
														<p className="_notification_para">
															An admin changed the name of the group 
															<span className="_notify_txt_link">
																Freelacer usa
															</span>
															to
															<span className="_notify_txt_link">
																Freelacer usa 
															</span>
														</p>
														<div className="_nitification_time">
															<span>42 miniutes ago</span>
														</div>
													</div>
												</div>
												<div className="_notification_box">
													<div className="_notification_image">
														<img src="assets/images/friend-req.png" alt="Image" className="_notify_img"/>
													</div>
													<div className="_notification_txt">
														<p className="_notification_para">
															<span className="_notify_txt_link">
																Steve Jobs
															</span>
															posted a link in your timeline.
														</p>
														<div className="_nitification_time">
															<span>42 miniutes ago</span>
														</div>
													</div>
												</div>
												<div className="_notification_box">
													<div className="_notification_image">
														<img src="assets/images/profile-1.png" alt="Image" className="_notify_img"/>
													</div>
													<div className="_notification_txt">
														<p className="_notification_para">
															An admin changed the name of the group 
															<span className="_notify_txt_link">
																Freelacer usa
															</span>
															to
															<span className="_notify_txt_link">
																Freelacer usa 
															</span>
														</p>
														<div className="_nitification_time">
															<span>42 miniutes ago</span>
														</div>
													</div>
												</div>
												<div className="_notification_box">
													<div className="_notification_image">
														<img src="assets/images/friend-req.png" alt="Image" className="_notify_img"/>
													</div>
													<div className="_notification_txt">
														<p className="_notification_para">
															<span className="_notify_txt_link">
																Steve Jobs
															</span>
															posted a link in your timeline.
														</p>
														<div className="_nitification_time">
															<span>42 miniutes ago</span>
														</div>
													</div>
												</div>
												<div className="_notification_box">
													<div className="_notification_image">
														<img src="assets/images/profile-1.png" alt="Image" className="_notify_img"/>
													</div>
													<div className="_notification_txt">
														<p className="_notification_para">
															An admin changed the name of the group 
															<span className="_notify_txt_link">
																Freelacer usa
															</span>
															to
															<span className="_notify_txt_link">
																Freelacer usa 
															</span>
														</p>
														<div className="_nitification_time">
															<span>42 miniutes ago</span>
														</div>
													</div>
												</div>
												<div className="_notification_box">
													<div className="_notification_image">
														<img src="assets/images/friend-req.png" alt="Image" className="_notify_img"/>
													</div>
													<div className="_notification_txt">
														<p className="_notification_para">
															<span className="_notify_txt_link">
																Steve Jobs
															</span>
															posted a link in your timeline.
														</p>
														<div className="_nitification_time">
															<span>42 miniutes ago</span>
														</div>
													</div>
												</div>
												<div className="_notification_box">
													<div className="_notification_image">
														<img src="assets/images/profile-1.png" alt="Image" className="_notify_img"/>
													</div>
													<div className="_notification_txt">
														<p className="_notification_para">
															An admin changed the name of the group 
															<span className="_notify_txt_link">
																Freelacer usa
															</span>
															to
															<span className="_notify_txt_link">
																Freelacer usa 
															</span>
														</p>
														<div className="_nitification_time">
															<span>42 miniutes ago</span>
														</div>
													</div>
												</div>
												<div className="_notification_box">
													<div className="_notification_image">
														<img src="assets/images/friend-req.png" alt="Image" className="_notify_img"/>
													</div>
													<div className="_notification_txt">
														<p className="_notification_para">
															<span className="_notify_txt_link">
																Steve Jobs
															</span>
															posted a link in your timeline.
														</p>
														<div className="_nitification_time">
															<span>42 miniutes ago</span>
														</div>
													</div>
												</div>
												<div className="_notification_box">
													<div className="_notification_image">
														<img src="assets/images/profile-1.png" alt="Image" className="_notify_img"/>
													</div>
													<div className="_notification_txt">
														<p className="_notification_para">
															An admin changed the name of the group 
															<span className="_notify_txt_link">
																Freelacer usa
															</span>
															to
															<span className="_notify_txt_link">
																Freelacer usa 
															</span>
														</p>
														<div className="_nitification_time">
															<span>42 miniutes ago</span>
														</div>
													</div>
												</div>
												<div className="_notification_box">
													<div className="_notification_image">
														<img src="assets/images/friend-req.png" alt="Image" className="_notify_img"/>
													</div>
													<div className="_notification_txt">
														<p className="_notification_para">
															<span className="_notify_txt_link">
																Steve Jobs
															</span>
															posted a link in your timeline.
														</p>
														<div className="_nitification_time">
															<span>42 miniutes ago</span>
														</div>
													</div>
												</div>
												<div className="_notification_box">
													<div className="_notification_image">
														<img src="assets/images/profile-1.png" alt="Image" className="_notify_img"/>
													</div>
													<div className="_notification_txt">
														<p className="_notification_para">
															An admin changed the name of the group 
															<span className="_notify_txt_link">
																Freelacer usa
															</span>
															to
															<span className="_notify_txt_link">
																Freelacer usa 
															</span>
														</p>
														<div className="_nitification_time">
															<span>42 miniutes ago</span>
														</div>
													</div>
												</div>
												<div className="_notification_box">
													<div className="_notification_image">
														<img src="assets/images/friend-req.png" alt="Image" className="_notify_img"/>
													</div>
													<div className="_notification_txt">
														<p className="_notification_para">
															<span className="_notify_txt_link">
																Steve Jobs
															</span>
															posted a link in your timeline.
														</p>
														<div className="_nitification_time">
															<span>42 miniutes ago</span>
														</div>
													</div>
												</div>
												<div className="_notification_box">
													<div className="_notification_image">
														<img src="assets/images/profile-1.png" alt="Image" className="_notify_img"/>
													</div>
													<div className="_notification_txt">
														<p className="_notification_para">
															An admin changed the name of the group 
															<span className="_notify_txt_link">
																Freelacer usa
															</span>
															to
															<span className="_notify_txt_link">
																Freelacer usa 
															</span>
														</p>
														<div className="_nitification_time">
															<span>42 miniutes ago</span>
														</div>
													</div>
												</div>
												<div className="_notification_box">
													<div className="_notification_image">
														<img src="assets/images/friend-req.png" alt="Image" className="_notify_img"/>
													</div>
													<div className="_notification_txt">
														<p className="_notification_para">
															<span className="_notify_txt_link">
																Steve Jobs
															</span>
															posted a link in your timeline.
														</p>
														<div className="_nitification_time">
															<span>42 miniutes ago</span>
														</div>
													</div>
												</div>
												<div className="_notification_box">
													<div className="_notification_image">
														<img src="assets/images/profile-1.png" alt="Image" className="_notify_img"/>
													</div>
													<div className="_notification_txt">
														<p className="_notification_para">
															An admin changed the name of the group 
															<span className="_notify_txt_link">
																
															</span>
															to
															<span className="_notify_txt_link">
																Freelacer usa 
															</span>
														</p>
														<div className="_nitification_time">
															<span>42 miniutes ago</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</span>
							</li>
							<li className="nav-item _header_nav_item">
								<a className="nav-link _header_nav_link" aria-current="page" href="chat.html">
									{username.name}
								</a>
							</li>
						</ul>
						<div className="_header_nav_profile">
							<Link onClick={handleonclick} to='/login'>logout</Link>
						</div>
					</div>
				</div>
			</nav>
    </div>
  )
}