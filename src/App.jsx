import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Album from './Components/Album';
import Modal from './Components/Modal';

function App() {
  const [albumArray, setAlbumArray] = useState([]);
  const [modal, setModal] = useState(false);
  const [editAlbums, setEditAlbums] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState(false);
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
          bgColor: getRandomColor(),
        }));
        setAlbumArray(albums);
      });
  }, []);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const albumList = albumArray.map((album) => {
    return (
      <Album
        key={album.id}
        id={album.id}
        title={album.title}
        bgColor={album.bgColor}
        edit={editAlbums}
        editAlbum={() => editAlbum(album.id, album.title)}
        deleteAlbum={() => deleteAlbum(album.id)}
      />
    );
  });

  function editAlbumList() {
    setEditAlbums((prevState) => !prevState);
  }

  function addAlbum() {
    setModal((prevState) => !prevState);
  }

  function newAlbumDetails(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  // console.log(formData);
  // function newAlbumDetails(event) {
  //   setFormData((prevFormData) => {
  //     return {
  //       ...prevFormData,
  //       [event.target.name]: event.target.value,
  //     };
  //   });
  // }

  function handleSubmit(event) {
    event.preventDefault();

    if (!editAlbums) {
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
              bgColor: getRandomColor(),
            },
          ]);
        });
    } else {
      const updatedTitle = formData.editTitle;
      const updatedAlbum = {
        title: updatedTitle,
      }

      fetch(`https://jsonplaceholder.typicode.com/albums/${selectedAlbumId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAlbum),
      })
        .then(res => res.json())
          .then(data => {
            const updatedAlbums = albumArray.map((album) => 
              album.id === selectedAlbumId
                ? { ...album, title: updatedTitle }
                : album
            )
            setAlbumArray(updatedAlbums);
        })
    }

    // Setting the input field to empty
    setFormData((prevData) => ({
      ...prevData,
      addTitle: '',
      editTitle: '',
    }));

    // Closing the modal
    setModal((prevState) => !prevState);
    setEditAlbums(false)
  }

  function editAlbum(id, title) {
    setSelectedAlbumId(id)
    setFormData((prevData) => ({
      ...prevData,
      editTitle: title,
    }))
    setEditAlbums(true)
    setModal(true)
  }

  function deleteAlbum(id) {
    setSelectedAlbumId(id)
    fetch(`https://jsonplaceholder.typicode.com/albums/${selectedAlbumId}`, {
      method: 'DELETE',
      headers: {
        contentType: 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not okay');
        }
        return res.json();
      })
      .then(data => {
        const updatedAlbums = albumArray.filter(album => album.id !== id);
        setAlbumArray(updatedAlbums);
        // setEditAlbums(false)
      })
      .catch(err => {
        console.log('Error deleting album: ', err)
      })
  }
  
  function closeModal() {
    setModal(false)
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
        modal={modal}
        newAlbumDetails={newAlbumDetails}
        edit={editAlbums}
        value={formData.addTitle}
        handleSubmit={handleSubmit}
        closeModal={closeModal}
      />
    </>
  );
}

export default App;
