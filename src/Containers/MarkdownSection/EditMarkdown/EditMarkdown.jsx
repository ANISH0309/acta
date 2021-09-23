import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import urls from "../../../urls";

import Navbar from "../../../components/Navbar/Navbar";
import Aux from "../../../hoc/Aux/Aux";
import EditMarkdownModal from "../../../UI/Modal/EditMarkdownModal";

const editMarkdown = () => {
  const [show, setShow] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("# Welcome to MOM Website");

  const path = useLocation();
  const id = path.pathname.split("/")[3];

  const secret = sessionStorage.getItem("AM");

  if (
    sessionStorage.getItem("AM") === null ||
    sessionStorage.getItem("AM") === ""
  ) {
    window.location.href = "/";
  } else {
    useEffect(() => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      };
      axios
        .get(`${urls.SERVER_BASEURL}/moms/edit/${id}`, { headers })
        .then((response) => {
          const { data } = response;
          setTitle(data.title);
          setBody(data.body);
        })
        .catch((error) => console.error(`Error: ${error}`));
    }, []);
  }

  const notifyError = () => toast.error("Fill all the fields!");
  const notifySuccess = () =>
    toast.success("MOM successfully edited! Redirecting to Dashboard");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "" || body.trim() === "") {
      notifyError();
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
    };

    axios
      .put(
        `${urls.SERVER_BASEURL}/moms/${id}`,
        {
          title,
          body,
        },
        { headers }
      )
      .then(() => {
        notifySuccess();
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2500);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  console.log(title);
  console.log(body);
  return (
    <Aux>
      <Navbar />
      <ToastContainer />

      <div className="container mx-auto md:mt-0 mt-16">
        <div className="my-4">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="border-b space-x-0 w-72 border-black mx-2">
              <input
                className="font-500 text-black bg-transparent w-72 mr-3 py-1 px-2 leading-tight focus:outline-none "
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={({ target: { value } }) => setTitle(value)}
                placeholder="Title of the MOM"
                aria-label="Title of the MOM"
              />
            </div>
            <div className="container mt-12">
              <div className="mx-2">
                <MDEditor value={body} onChange={setBody} />
              </div>
            </div>
            <div className="flex justify-end my-4 mx-2">
              <button
                type="submit"
                className="inline-flex justify-center font-600 bg-primary border-0 py-2 px-3 w-28 focus:outline-none rounded text-white text-base mt-4 md:mt-0;"
              >
                Update
              </button>

              <div
                onClick={() => setShow(true)}
                className="inline-flex cursor-pointer justify-center ml-4 font-600 bg-red-500 border-0 py-2 px-3 w-28 focus:outline-none rounded text-white text-base mt-4 md:mt-0;"
              >
                Delete
              </div>
            </div>
          </form>
        </div>

        <EditMarkdownModal onClose={() => setShow(false)} show={show} />
      </div>
    </Aux>
  );
};

export default editMarkdown;
