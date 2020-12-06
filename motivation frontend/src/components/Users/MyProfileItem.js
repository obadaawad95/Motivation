import React from "react";
import EditUserInfo from "./EditUserInfo";
import UserPosts from "./UserPosts";
import "./MyProfileItem.css";
const MyProfileItem = ({
  UserName,
  PostsNum,
  CommentsNum,
  AboutMe,
  Job,
  Location,
  School,
  Uni,
  Birth,
  Age,
  Img,
}) => {
  return (
    <div
      className=" MyProfile-card MyProfile-container"
      style={{ marginTop: "60px", marginBottom: "70px" }}
    >
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
            <div className="relative">
              <img
                alt={UserName}
                src={`http://localhost:5000/${Img}`}
                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                style={{ maxWidth: "150px" }}
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
            <div className="py-6 px-3 mt-32 sm:mt-0">
              <EditUserInfo />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4 lg:order-1">
            <div className="flex justify-center py-4 lg:pt-4 pt-8">
              <div className="mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                  {Age}
                </span>
                <span className="text-sm text-gray-500">Age</span>
              </div>
              <div className="mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                  {PostsNum}
                </span>
                <span className="text-sm text-gray-500">Posts</span>
              </div>
              <div className="lg:mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                  {CommentsNum}
                </span>
                <span className="text-sm text-gray-500">Comments</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
            {UserName}
          </h3>
          <div className="mb-2 text-gray-700 ">
            <p>LOCATION : {Location}</p>
          </div>
          <div className="mb-2 text-gray-700 ">
            <p>JOB : {Job}</p>
          </div>
          <div className="mb-2 text-gray-700">
            <p>SCHOOL : {School}</p>
          </div>
          <div className="mb-2 text-gray-700">
            <p>UNIVERSITY : {Uni}</p>
          </div>
          <div className="mb-2 text-gray-700">
            <p>BIRTHDAY : {Birth}</p>
          </div>
        </div>

        <div className="mt-10 py-10 border-gray-300 text-center">
          <hr />
          <h3 style={{ marginBottom: "10px" }}> About Me</h3>
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-9/12 px-4">
              <p className="mb-4 text-lg leading-relaxed text-gray-800">
                {AboutMe}
              </p>
            </div>
          </div>
          <hr />
          <h3 style={{ marginBottom: "10px" }}> User Posts</h3>
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-9/12 px-4">
              <div className="mb-4 text-lg leading-relaxed text-gray-800">
                <UserPosts />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileItem;
