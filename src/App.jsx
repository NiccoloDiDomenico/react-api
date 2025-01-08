import axios from 'axios'
import { useState, useEffect } from 'react'
import PostCard from './components/PostCard'

const initialFormData = {
  id: "",
  title: "",
  content: "",
  image: ""
}

const apiURL = import.meta.env.VITE_API_URL

function App() {
  // Variabili reattive
  const [postList, setPostList] = useState([])

  // Variabili reattive per Input
  const [formData, setFormData] = useState(initialFormData)

  // Axios: index
  useEffect(() => {
    axios.get(`${apiURL}/posts`).then((resp) => {
      console.log(resp);
      setPostList(resp.data)
    })
  }, []);

  // Funzioni
  function handleInputChange(event) {
    const keyToChange = event.target.name
    const valueToChange =
      event.target.type === "checkbox" ?
        event.target.checked : event.target.value

    const newData = {
      ...formData,
      [keyToChange]: valueToChange
    }
    setFormData(newData);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Axios: store
    axios.post(`${apiURL}/posts`, formData).then((resp) => {
      // console.log(resp);
      const newPostList = [...postList, resp.data]
      setPostList(newPostList)
      setFormData(initialFormData)
    })
  }

  function handleDelate(idToRemove) {
    // Axios: destroy
    axios.delete(`${apiURL}/posts/${idToRemove}`).then((resp) => {
      const updutePostList = postList.filter((curPost) => curPost.id !== idToRemove)
      setPostList(updutePostList)
    })
  }

  return (
    <>
      <header className='bg-danger'>
        {/* Title */}
        <h1 className='text-center py-3 m-0'>Blog form multifield</h1>
      </header>

      <main className='bg-danger-subtle'>
        {/* PostsList section */}
        <section className='container pt-5'>
          {postList.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 gx-0 gy-2">
              {postList.map((curPost) => (
                <PostCard key={curPost.id} post={curPost} onCancel={() => handleDelate(curPost.id)} />
              ))}
            </div>
          ) : (
            <h5>Completa il form per creare un post</h5>
          )}
        </section>

        {/* Form section */}
        <section className='container py-4'>
          <h3 className='my-3'>Crea il tuo post!</h3>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label htmlFor="title" className='form-label'>Titolo del post</label>
              <input className='form-control' type="text" id='title' name='title' value={formData.title} onChange={handleInputChange} placeholder='Inserisci il titolo del post' />
            </div>
            {/* Content */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Contenuto del post</label>
              <textarea className="form-control" id="description" rows="3" name='content' value={formData.content} onChange={handleInputChange} placeholder="Inserisci il contenuto del post"></textarea>
            </div>
            {/* Image */}
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Default file input example</label>
              <input className="form-control" type="file" id="image" name='image' value={formData.image} onChange={handleInputChange} />
            </div>
            {/* Submit btn */}
            <button type='submit' className='btn btn-danger my-3'>Invia</button>
          </form>
        </section>
      </main>
    </>
  )
}

export default App