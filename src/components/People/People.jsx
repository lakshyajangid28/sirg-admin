import React, { useState } from "react";
import Card from "../Card/Card";
import axios from "axios";
import Swal from "sweetalert2";
import { backend_url, people as initialPeople } from "../../util/util";

const People = () => {
  const [people, setPeople] = useState(initialPeople);
  const [newPerson, setNewPerson] = useState({
    id: "",
    name: "",
    category: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPerson({ ...newPerson, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const { id, name, category, image } = newPerson;

    if (!name || !category || !image) {
      Swal.fire("Error", "All fields are required!", "error");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(
          `${backend_url}/api/people/update-person/${id}`,
          newPerson
        );
        setPeople(
          people.map((p) => (p.id === id ? { ...p, name, category, image } : p))
        );
        Swal.fire("Success", "Person updated successfully!", "success");
      } else {
        const response = await axios.post(
          `${backend_url}api/people/add-person`,
          newPerson
        );
        setPeople([...people, { id: response.data.id, name, category, image }]);
        Swal.fire("Success", "Person added successfully!", "success");
      }
      setNewPerson({ id: "", name: "", category: "", image: null });
      setIsEditing(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving person:", error);
      Swal.fire("Error", "Failed to save person", "error");
    }
  };

  const handleDelete = async (id) => {
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
        await axios.delete(`${backend_url}/api/people/delete-person/${id}`);
        setPeople(people.filter((p) => p.id !== id));
        Swal.fire("Deleted!", "The person has been removed.", "success");
      } catch (error) {
        console.error("Error deleting person:", error);
        Swal.fire("Error", "Failed to delete person", "error");
      }
    }
  };

  const openModal = (person = null) => {
    setIsEditing(!!person);
    setNewPerson(person || { id: "", name: "", category: "", image: null });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setNewPerson({ id: "", name: "", category: "", image: null });
    setIsEditing(false);
    setIsModalOpen(false);
  };

  return (
    <div className="box" id="people">
      <h2 className="ui top attached inverted header">People</h2>
      <div className="ui padded text segment" id="content-box">
        <div className="ui large header">Faculty</div>
        <hr />
        <div className="faculty">
          <div className="ui link cards">
            {people
              .filter((p) => p.category === "faculty")
              .map((p) => (
                <Card
                  key={p.id}
                  person={p}
                  onEdit={() => openModal(p)}
                  onDelete={() => handleDelete(p.id)}
                />
              ))}
          </div>
        </div>
        <br />
        <div className="ui large header">Research</div>
        <hr />
        <div className="students">
          <div className="ui link cards">
            {people
              .filter((p) => p.category === "student")
              .map((p) => (
                <Card
                  key={p.id}
                  person={p}
                  onEdit={() => openModal(p)}
                  onDelete={() => handleDelete(p.id)}
                />
              ))}
          </div>
        </div>
        <br />
        <br />
        <div className="actions">
          <button className="ui button blue" onClick={() => openModal()}>
            Add New Person
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="custom-modal-content">
              <h2 className="ui header">
                {isEditing ? "Edit Person" : "Add New Person"}
              </h2>
              <div className="ui form">
                <div className="field">
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={newPerson.name}
                    onChange={(e) =>
                      setNewPerson({ ...newPerson, name: e.target.value })
                    }
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Enter category (faculty/student)"
                    value={newPerson.category}
                    onChange={(e) =>
                      setNewPerson({ ...newPerson, category: e.target.value })
                    }
                  />
                </div>
                <div className="field">
                  <input type="file" onChange={handleImageChange} />
                </div>
              </div>
              <br />
              <div className="actions">
                <button className="ui button blue" onClick={handleSave}>
                  {isEditing ? "Update Person" : "Add Person"}
                </button>
                <button className="ui button" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default People;
