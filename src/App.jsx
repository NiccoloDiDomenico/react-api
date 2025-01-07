import axios from 'axios'
import { useState, useEffect } from 'react'

const initialFormData = {
  id: "",
  title: "",
  content: "",
  image: "",
}


function App() {
  // Variabili reattive
  const [postList, setPostList] = useState([])

  // Variabili reattive per Input
  const [formData, setFormData] = useState(initialFormData)

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

    const newPost = {
      ...formData,
      id: Date.now()
    }

    const newPostList = [...postList, newPost]

    setPostList(newPostList)

    setFormData(initialFormData)
  }

  function removePost(itemToRemove) {
    const updutePostList = postList.filter((curPost) => curPost.id !== itemToRemove)
    setPostList(updutePostList)
  }

  return (
    <>
      <header className='bg-danger'>
        {/* Title */}
        <h1 className='text-center py-3 m-0'>Blog form multifield</h1>
      </header>
      <main className='bg-danger-subtle'>
        {/* Form section */}
        <section className='container py-3'>
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
              <textarea className="form-control" id="description" rows="3" name='description' value={formData.content} onChange={handleInputChange} placeholder="Inserisci il contenuto del post"></textarea>
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
        {/* PostsList section */}
        <section className='container pb-3'>
          {postList.length > 0 ? (
            <ul className="list-group">
              {postList.map((curPost) => (
                <li key={curPost.id} className="list-group">
                  <div className="card text-bg-danger mb-3">
                    <div className="card-header">{curPost.image}</div>
                    <div className="card-body">
                      <h3 className="card-title">{curPost.title}</h3>
                      <p className="card-text">{curPost.content}</p>
                    </div>
                    <button className='btn text-end' onClick={() => removePost(curPost.id)}>Elimina</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <h5>Completa il form per creare un post</h5>
          )}
        </section>
      </main>
    </>
  )
}

export default App