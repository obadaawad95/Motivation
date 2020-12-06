import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// import AuthContextProvider from "./states/contexts/AuthContext";
import PostContextProvider from "./states/contexts/PostContext";
import CommentContextProvider from "./states/contexts/CommentContext";
import UserContextProvider from "./states/contexts/UserContext";
import ArticleContextProvider from "./states/contexts/ArticleContext";
import BooksContextProvider from "./states/contexts/BooksContext";
import VideoContextProvider from "./states/contexts/VideoContext";
import CategoryContextProvider from "./states/contexts/CategoryContext";
ReactDOM.render(
  //   <AuthContextProvider>
  <CategoryContextProvider>
    <BooksContextProvider>
      <ArticleContextProvider>
        <VideoContextProvider>
          <UserContextProvider>
            <PostContextProvider>
              <CommentContextProvider>
                <App />
              </CommentContextProvider>
            </PostContextProvider>
          </UserContextProvider>
        </VideoContextProvider>
      </ArticleContextProvider>
    </BooksContextProvider>
  </CategoryContextProvider>,

  //   </AuthContextProvider>
  document.getElementById("root")
);
