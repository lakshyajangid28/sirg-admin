import React, { useState } from "react";
import { backend_url, contact } from "../../util/util";
import axios from "axios";
import Swal from "sweetalert2";

const Contact = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [updatedContact, setUpdatedContact] = useState({
    type: "",
    value: "",
  });

  const mail = `mailto:${contact[0].value}`;
  const web = `https://${contact[1].value}`;

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setUpdatedContact({ type: contact.type, value: contact.value });
  };

  const handleUpdateContact = async () => {
    try {
      const { id } = selectedContact;
      const { type, value } = updatedContact;

      if (!type || !value) {
        return Swal.fire("Error", "All fields are required!", "error");
      }

      await axios.put(
        `${backend_url}/api/contacts/edit-contact/${id}`,
        updatedContact
      );
      Swal.fire("Success", "Contact updated successfully!", "success");
      setSelectedContact(null);
    } catch (error) {
      console.error("Error updating contact:", error);
      Swal.fire("Error", "Failed to update contact", "error");
    }
  };

  return (
    <div className="box" id="contact">
      <h2 className="ui top attached inverted header">Contact</h2>
      <div className="ui padded text segment" id="content-box">
        <p>
          <li>
            <a href={mail} className="footer-link">
              {contact[0].value}
            </a>
            <button
              className="ui right floated button blue"
              onClick={() => handleEditContact(contact[0])}
            >
              Edit
            </button>
          </li>
        </p>
        <p>
          <li>
            <a
              href={web}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              {contact[1].value}
            </a>
            <button
              className="ui right floated button blue"
              onClick={() => handleEditContact(contact[1])}
            >
              Edit
            </button>
          </li>
        </p>
      </div>

      {selectedContact && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="ui header">Edit Contact</div>
            <div className="content">
              <div className="ui form">
                <div className="field">
                  <label>Type</label>
                  <input
                    type="text"
                    value={updatedContact.type}
                    onChange={(e) =>
                      setUpdatedContact({
                        ...updatedContact,
                        type: e.target.value,
                      })
                    }
                    placeholder="Type"
                  />
                </div>
                <div className="field">
                  <label>Value</label>
                  <input
                    type="text"
                    value={updatedContact.value}
                    onChange={(e) =>
                      setUpdatedContact({
                        ...updatedContact,
                        value: e.target.value,
                      })
                    }
                    placeholder="Value"
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="actions">
              <button
                className="ui button"
                onClick={() => setSelectedContact(null)}
              >
                Cancel
              </button>
              <button className="ui button blue" onClick={handleUpdateContact}>
                Update Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
