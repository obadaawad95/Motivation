import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import "./ReactotronConfig";

import AuthContextProvider from "./states/contexts/AuthContext";
import PostContextProvider from "./states/contexts/PostContext";
import CommentContextProvider from "./states/contexts/CommentContext";
import UserContextProvider from "./states/contexts/UserContext";
import CategoryContextProvider from "./states/contexts/CategoryContext";
import ArticleContextProvider from "./states/contexts/ArticleContext";
import BookContextProvider from "./states/contexts/BooksContext";
import VideoContextProvider from "./states/contexts/VideoContext";

ReactDOM.render(
  <AuthContextProvider>
    <UserContextProvider>
      <CategoryContextProvider>
        <ArticleContextProvider>
          <BookContextProvider>
            <VideoContextProvider>
              <PostContextProvider>
                <CommentContextProvider>
                  <App />
                </CommentContextProvider>
              </PostContextProvider>
            </VideoContextProvider>
          </BookContextProvider>
        </ArticleContextProvider>
      </CategoryContextProvider>
    </UserContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
