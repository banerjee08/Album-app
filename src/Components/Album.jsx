function Album(props) {
  const styles = {
    backgroundColor: props.bgColor,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    zIndex: -1,
    opacity: props.edit ? 0.3 : 0.8,
  };

  return (
    <div className="album-container">
      {props.edit && (
        <div className="album-btns">
          <div className="album-edit-btn" onClick={props.editAlbum}>
            <img src="./edit.png" />
          </div>
          <div className="album-del-btn" onClick={props.deleteAlbum}>
            <img src="./cross.png" />
          </div>
        </div>
      )}
      <div className="album" style={styles}>
        <h4 className="album-title">{props.title}</h4>
      </div>
    </div>
  );
}

export default Album;
