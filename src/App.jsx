import axios from 'axios'
import { useState, useEffect } from 'react'
import PostCard from './components/PostCard'

const initialFormData = {
  id: "",
  title: "",
  content: "",
  image: ""
}

const tagsList = ["viaggi", "mare", "Italia", "estate", "cucina", "ricette", "Italia", "pasta", "tecnologia", "innovazione", "AI", "futuro", "fitness", "salute", "sport", "principianti", "libri", "lettura", "cultura", "consigli"]

const apiURL = import.meta.env.VITE_API_URL

function App() {
  // Variabili reattive
  const [postList, setPostList] = useState([])
  const [formData, setFormData] = useState(initialFormData)
  const [tags, setTags] = useState(tagsList)
  const [filter, setFilter] = useState("all")

  // Axios: index
  useEffect(() => {
    let url = `${apiURL}/posts`
    console.log(filter);

    if (filter !== "all") {
      url += `?tags=${filter}`
    }

    axios.get(url).then((resp) => {
      console.log(resp);
      setPostList(resp.data)
    })
  }, [filter]);

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
        {/* Filter section */}
        <section className='container py-4'>
          <select name="tags" id='' className='form-select w-25' value={filter} onChange={(event) => setFilter(event.target.value)} >
            <option value="all">Tutti i post</option>
            {tags.map((curTag, index) => (
              <option value={curTag} key={index}>{curTag}</option>
            ))}
          </select>
        </section>

        {/* PostsList section */}
        <section className='container'>
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