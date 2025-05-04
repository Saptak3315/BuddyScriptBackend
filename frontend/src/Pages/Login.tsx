import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";
import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { logedin } from "../redux/authSlice";
interface FormState {
  username: string;
  pass: string;
}

function Login() {
  const [username, setUsername] = useState<FormState["username"]>("");
  const [pass, setPass] = useState<FormState["pass"]>("");
  const currentUser = useSelector((state: any) => state.auth.logedin)
  const Dispatch=useDispatch()

  useEffect(()=>{
    axios.get('http://localhost:3333/islogin',{withCredentials:true}).then(res=>Dispatch(logedin({id:res.data.id,name:res.data.username})))
  },[])

  const navigate = useNavigate();

  if(currentUser.id!==-1){
    navigate('/feed');
  }

  const ubj = {
    username: username,
    password: pass,
  };

  const  handleLogin = async() => {
    if (!username || !pass) {
      alert("Please enter your username and password.");
      return;
    }
    try {
      const response = await axios.post('http://localhost:3333/login', ubj,{withCredentials:true});
      setUsername("");
      setPass("");
      Dispatch(logedin({id:response.data.id,name:response.data.username}))
      navigate("/feed");
    }
    catch (error: any) {
      if (error.response.status === 400) {
        alert("Please Try Again");
      } 
    }
    setUsername("");
      setPass("");
  };

  return (
    <div>
      <section className="_social_login_wrapper _layout_main_wrapper">
        <div className="_shape_one">
          <img src="assets/images/shape1.svg" alt="" className="_shape_img" />
          <img src="assets/images/dark_shape.svg" alt="" className="_dark_shape" />
        </div>
        <div className="_shape_two">
          <img src="assets/images/shape2.svg" alt="" className="_shape_img" />
          <img src="assets/images/dark_shape1.svg" alt="" className="_dark_shape _dark_shape_opacity" />
        </div>
        <div className="_shape_three">
          <img src="assets/images/shape3.svg" alt="" className="_shape_img" />
          <img src="assets/images/dark_shape2.svg" alt="" className="_dark_shape _dark_shape_opacity" />
        </div>
        <div className="_social_login_wrap">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <div className="_social_login_left">
                  <div className="_social_login_left_image">
                    <img src="assets/images/login.png" alt="Image" className="_left_img" />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <div className="_social_login_content">
                  <div className="_social_login_left_logo _mar_b28">
                    <img src="assets/images/logo.svg" alt="Image" className="_left_logo" />
                  </div>
                  <p className="_social_login_content_para _mar_b8">Welcome back</p>
                  <h4 className="_social_login_content_title _titl4 _mar_b50">Login to your account</h4>
                  <button type="button" className="_social_login_content_btn _mar_b40">
                    <img src="assets/images/google.svg" alt="Image" className="_google_img" />{" "}
                    <span>Or sign-in with Google</span>
                  </button>
                  <div className="_social_login_content_bottom_txt _mar_b40">
                    <span>Or</span>
                  </div>
                  <form className="_social_login_form">
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="_social_login_form_input _mar_b14">
                          <label className="_social_login_label _mar_b8">Username</label>
                          <input
                            type="text"
                            className="form-control _social_login_input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="_social_login_form_input _mar_b14">
                          <label className="_social_login_label _mar_b8">Password</label>
                          <input
                            type="password"
                            className="form-control _social_login_input"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                        <div className="form-check _social_login_form_check">
                          <input
                            className="form-check-input _social_login_form_check_input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked
                          />
                          <label className="form-check-label _social_login_form_check_label" htmlFor="flexRadioDefault2">
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                        <div className="_social_login_form_left">
                          <p className="_social_login_form_left_para">Forgot password?</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                        <div className="_social_login_form_btn _mar_t40 _mar_b60">
                          <button type="button" className="_social_login_form_btn_link _btn1" onClick={handleLogin}>
                            Login now
                          </button>
                        </div>
                        {/* <div className="_social_login_form_btn _mar_t10">
                          <button type="button" className="_social_login_form_btn_link _btn2" onClick={handleRegister}>
                            Register
                          </button>
                        </div> */}
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_login_bottom_txt">
                        <p>
                          Don't have an account?{" "}
                          <a href="#0" onClick={() => navigate("/")}>Create New Account</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
