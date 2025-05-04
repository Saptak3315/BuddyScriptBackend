import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
  id: string;
  text: string;
  replies: string[];
}

interface Post {
  id: number;
  userId:number;
  content: string;
  createdAt:string[],
  isLikedByUser:boolean,
  likeCount:number,
  likers: string[],
  commentCount:number
}

interface User {
  password: string;
}

interface LoggedInUser {
  id: number;
  name: string;
}

interface AuthState {
  allpost: Post[];
  logedin: LoggedInUser;
}

const initialState: AuthState = {
  allpost: [],
  logedin: {
    id: -1,
    name: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setpost: (state, action: PayloadAction<Post[]>) => {
      state.allpost = action.payload;
    },
    appendPost: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.allpost = [...state.allpost, ...action.payload];
      } else {
        console.error("Expected array in appendPost, got:", action.payload);
      }
    },
    logedin: (state, action: PayloadAction<LoggedInUser>) => {
      state.logedin = action.payload;
    },
    addpost: (state, action: PayloadAction<Post>) => {
      state.allpost.unshift(action.payload);
      state.allpost= state.allpost.filter((post,index)=>{
        if(index<15){
          return post
        }
      })
    },
    likepost:(state,action:any)=>{
      const postId=action.payload;
      const index=state.allpost.findIndex((post)=>postId===post.id);
      if(index!==-1){
        state.allpost[index].likeCount=state.allpost[index].likeCount+1;
        state.allpost[index].isLikedByUser=true 
      }
    },
    deletelike:(state,action:any)=>{
      const postId=action.payload;
      const index=state.allpost.findIndex((post)=>postId===post.id);
      if(index!==-1){
        state.allpost[index].likeCount=state.allpost[index].likeCount-1;
        state.allpost[index].isLikedByUser=false
      }
    },
    editPost: (state, action) => {
      const { postId, newContent } = action.payload;
      const postIndex = state.allpost.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        state.allpost[postIndex].content = newContent;
      }
    },
    deletePost: (state, action) => {
      const postIdToDelete = action.payload;
      state.allpost = state.allpost.filter((post) => post.id !== postIdToDelete);
    },
    commentCount: (state, action) => {
      const postId = action.payload;
      const index = state.allpost.findIndex((post) => post.id === postId);
      if(index!==-1){
        state.allpost[index].commentCount=state.allpost[index].commentCount+1
      }
    },
    allLikers:(state,action)=>{
      const postId = action.payload;
      const index = state.allpost.findIndex((post) => post.id === postId.id);
      if(index!==-1){
        state.allpost[index].likers=postId.likers
      }
    }
  },
});

export const { setpost,appendPost ,logedin, addpost,likepost,deletelike,editPost, deletePost,commentCount,allLikers } = authSlice.actions;
export default authSlice.reducer;
