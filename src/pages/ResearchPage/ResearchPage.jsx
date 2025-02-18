import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { research, backend_url } from "../../util/util";
import Swal from "sweetalert2";
import axios from "axios";
import "./ResearchPage.css";

const AdminResearchPage = ({ setCurrentPage }) => {
  const { id } = useParams();
  const [currentResearch, setCurrentResearch] = useState({});
  const navigate = useNavigate();

  const [newResearch, setNewResearch] = useState({
    name: "",
    overview: "", 
    key_objectives: "",
  });

  useEffect(() => {
    const researchItem = research.find((item) => item.id === parseInt(id));
    if (researchItem) {
      setCurrentResearch(researchItem);
      setNewResearch({
        name: researchItem.name,
        overview: researchItem.overview,
        key_objectives: researchItem.key_objectives,
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setNewResearch({ ...newResearch, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `${backend_url}/api/research-verticals/update-research-vertical/${id}`,
        newResearch
      );
      Swal.fire("Success", "Research updated successfully!", "success");
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data || "Failed to update research",
        "error"
      );
    }
  };

  const handleDeleteResearch = async () => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(
          `${backend_url}/api/research-verticals/delete-research-vertical/${id}`
        );
        Swal.fire("Deleted!", "The research has been removed.", "success");
        setCurrentPage("home");
        navigate("/");
      } catch (error) {
        Swal.fire("Error", "Failed to delete research", "error");
      }
    }
  };

  if (!currentResearch) return <p>Loading...</p>;

  return (
    <div className="research-page">
      <div className="box">
        <h2 className="ui center aligned dividing header">
          <input
            type="text"
            name="name"
            value={newResearch.name}
            onChange={handleChange}
            className="ui input fluid"
            placeholder="Research Name"
          />
        </h2>
      </div>

      <div className="box">
        <h2 className="ui top attached inverted header">Overview</h2>
        <textarea
          name="overview"
          value={newResearch.overview}
          onChange={handleChange}
          className="ui textarea fluid"
          rows="4"
          placeholder="Overview of the research"
        />
      </div>

      <div className="box">
        <h2 className="ui top attached inverted header">Key Objectives</h2>
        <textarea
          name="key_objectives"
          value={newResearch.key_objectives}
          onChange={handleChange}
          className="ui textarea fluid"
          rows="4"
          placeholder="Key Objectives of the research"
        />
      </div>

      <div className="actions">
        <button className="ui button blue" onClick={handleSaveChanges}>
          Save Changes
        </button>
        <button className="ui button red" onClick={handleDeleteResearch}>
          Delete Research
        </button>
      </div>
    </div>
  );
};

export default AdminResearchPage;
