function Modal(props) {
//   console.log(props);
  return (
    props.addNewAlbum && (
      <div className="modal-container">
        {/* Modal close Button */}
        <div className="close-modal-container">
          <button className="close-modal-btn">X</button>
        </div>

        {/* Title */}
        <h3 className="modal-title">Add Title</h3>

        {/* Form */}
        <form onSubmit={props.handleSubmit}>
          {/* Add Title Input field */}
          <input
            type="text"
            placeholder="Add Title"
            onChange={props.newAlbumDetails}
            name="addTitle"
            className="input-add-title"
            value={props.value}
          />

          {/* Edit Title Input field */}
          <input
            type="text"
            placeholder="Edit Title"
            //   onChange={handleChange}
            name="editTitle"
            className="input-edit-title"
          />

          {/* Submit button */}
          <button className="submit-btn">Submit</button>
        </form>
      </div>
    )
  );
}

export default Modal;
