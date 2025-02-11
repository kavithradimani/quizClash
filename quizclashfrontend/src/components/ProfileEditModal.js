import axios from "axios";
import React, { lazy, useState } from "react";
import { toast } from "react-toastify";
import tostDefault from "../data/tostDefault";
import { getUserID } from "../util/Authentication";

const LodingSpinner = lazy(() => import('./LodingSpinner'))

export default function ProfileEditModal({ user }) {

  const [formData, setFormData] = useState({
    "username": user?.username,
    "email": user?.email,
    "address": user?.address,
    "phone": user?.phone,
    "first_name": user?.first_name,
    "last_name": user?.last_name,
  })

  const [loading, setLoading] = useState(false)

  const handlechange = ({ currentTarget: input }) => {
    let newData = { ...formData };
    newData[input.name] = input.value;
    setFormData(newData);
  }


  const submitForm = async (e) => {
    e.preventDefault();
    const id = toast.loading("Please wait...", tostDefault);
    setLoading(true)
    await axios
      .patchForm(`accounts/update-user/${getUserID()}`, formData)
      .then((response) => {
        // console.log(response.data)
        if (response.status === 200) {

          toast.update(id, {
            ...tostDefault,
            render: "saved",
            type: "success",
            isLoading: false,
            closeButton: true,
          });
        }
        setLoading(false)
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          toast.update(id, {
            ...tostDefault,
            render: "Invaild input",
            type: "error",
            isLoading: false,
            closeButton: true,
          });
        } else if (error?.code === "ERR_NETWORK") {
          toast.update(id, {
            ...tostDefault,
            render: "Network Error",
            type: "error",
            isLoading: false,
            closeButton: true,
          });
        } else {
          toast.update(id, {
            ...tostDefault,
            render: "Something went wrong",
            type: "error",
            isLoading: false,
            closeButton: true,
          });
        }

        console.log({
          message: error.message,
          code: error.code,
          response: error.response?.data
        });

        setLoading(false)

      })
      .finally(() =>{
        setLoading(false)
      });
  };

  return (
    <>
      {(loading) ? (<LodingSpinner />) : (<>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#editModal"
        >
          Edit Profile
        </button>

        <div>
          {" "}
          {/*start edit modal*/}
          <div
            className="modal"
            id="editModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="editModalLabel"
            aria-hidden="true"
          >
            <form onSubmit={(e) => (submitForm(e))}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="editModalLabel">
                      Edit Details
                    </h5>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">

                    <div className="form-group">
                      <label for="editName">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editName"
                        placeholder="Enter your name"
                        name="username"
                        onChange={(e) => {
                          handlechange(e);
                        }}
                        value={formData.username}
                        readOnly
                      />
                    </div>
                    <br></br>
                    <div className="d-flex">
                      <div className="form-group me-1">
                        <label for="editName">Firstname</label>
                        <input
                          type="text"
                          className="form-control w-100"
                          id="editName"
                          placeholder="Enter your name"
                          name="first_name"
                          onChange={(e) => {
                            handlechange(e);
                          }}
                          value={formData.first_name}
                        />
                      </div>

                      <div className="form-group ms-1">
                        <label for="editName">Lastname</label>
                        <input
                          type="text"
                          className="form-control w-100"
                          id="editName"
                          placeholder="Enter your name"
                          name="last_name"
                          onChange={(e) => {
                            handlechange(e);
                          }}
                          value={formData.last_name}
                        />
                      </div>
                    </div>
                    <br></br>
                    <div className="form-group">
                      <label for="editEmail">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="editEmail"
                        placeholder="Enter your email"
                        name="email"
                        onChange={(e) => {
                          handlechange(e);
                        }}
                        value={formData.email}
                        readOnly
                      />

                    </div>
                    <br></br>
                    <div className="form-group">
                      <label for="editEmail">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editEmail"
                        placeholder="Enter your address"
                        name="address"
                        onChange={(e) => {
                          handlechange(e);
                        }}
                        value={formData.address}
                        required
                      />
                    </div>
                    <br></br>
                    <div className="form-group">
                      <label for="editEmail">Phone No.</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editEmail"
                        placeholder="Enter your phone number"
                        name="phone"
                        onChange={(e) => {
                          handlechange(e);
                        }}
                        value={formData.phone}
                        required
                      />
                    </div>

                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>

                    <button type="submit" className="btn btn-primary"
                      data-bs-dismiss="modal">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/*end edit modal*/}
        </div>
      </>
      )}
    </>
  );
}
