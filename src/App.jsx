import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Album from './Components/Album';
import Modal from './Components/Modal';

function App() {
  const [albumArray, setAlbumArray] = useState([]);
  const [addNewAlbum, setAddNewAlbum] = useState(false);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    addTitle: '',
    editTitle: '',
  });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then((res) => res.json())
      .then((data) => {
        const albums = data.slice(0, 9).map((album) => ({
          id: album.id,
          title: album.title,
          bgColor: '',
        }));
        setAlbumArray(albums);

        fetch('https://www.colr.org/json/color/random')
          .then((res) => res.json())
          .then(data => {
            console.log(data)
            const colors = data.colors;
            const albumWithColorBg = colors.map(color => {
              return {
                
              }
            })
          })
      });
    
  }, []);

  // useEffect(() => {
  //   fetch('https://www.colr.org/json/color/random')
  //     .then((res) => res.json())
  //     .then((data) => console.log(data.colors[0].hex));
  // }, [albumArray]);

  const albumList = albumArray.map((album) => {
    return (
      <Album
        key={album.id}
        id={album.id}
        title={album.title}
        image={album.image}
        edit={edit}
      />
    );
  });

  function editAlbumList() {
    setEdit((prevState) => !prevState);
  }

  function addAlbum() {
    setAddNewAlbum((prevState) => !prevState);
  }

  function newAlbumDetails(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }
  // console.log(formData)

  function handleSubmit(event) {
    event.preventDefault();
    const newAlbum = {
      title: formData.addTitle,
      userId: albumArray.length + 1,
    };

    fetch('https://jsonplaceholder.typicode.com/albums', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAlbum),
    })
      .then((res) => res.json())
      .then((data) => {
        setAlbumArray((prevAlbums) => [
          ...prevAlbums,
          {
            id: data.id,
            title: data.title,
            image: '',
          },
        ]);
      });

    setFormData((prevData) => ({
      ...prevData,
      addTitle: '',
    }));

    setAddNewAlbum((prevState) => (!prevState))
  }

  return (
    <>
      <div className="app-container">
        {/* rendering navbar component */}
        <Navbar />

        <main className="container">
          {/* rendering Albums */}
          <div className="album-list">{albumList}</div>

          {/* edit button */}
          <div className="edit-btn" onClick={editAlbumList}>
            <img src="./src/assets/edit.png" />
          </div>

          {/* add album button */}
          <div className="add-btn" onClick={addAlbum}>
            <img src="./src/assets/plus.png" />
          </div>
        </main>
      </div>

      {/* Modal */}
      <Modal
        addNewAlbum={addNewAlbum}
        newAlbumDetails={newAlbumDetails}
        value={formData.addTitle}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default App;
