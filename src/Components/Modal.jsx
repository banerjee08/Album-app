function Modal(props) {
  return (
    props.modal && (
      <div className="modal-container">
        {/* Modal close Button */}
        <div className="close-modal-container" onClick={props.closeModal}>
          <button className="close-modal-btn">X</button>
        </div>

        {/* Title */}
        <h3 className="modal-title">
          {props.edit ? 'Edit Title' : 'Add Title'}
        </h3>

        {/* Form */}
        <form onSubmit={props.handleSubmit}>
          {/* Add Title Input field */}
          {!props.edit ? (
            <input
              type="text"
              placeholder="Add Title"
              onChange={props.newAlbumDetails}
              name="addTitle"
              className="input-add-title"
              value={props.value}
            />
          ) : (
            <input
              type="text"
              placeholder="Edit Title"
              onChange={props.newAlbumDetails}
              name="editTitle"
              className="input-edit-title"
            />
          )}

          {/* Submit button */}
          <button className="submit-btn">Submit</button>
        </form>
      </div>
    )
  );
}

export default Modal;
