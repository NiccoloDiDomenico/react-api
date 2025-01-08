const apiURL = import.meta.env.VITE_API_URL

function PostCard(props) {
    // console.log(props);

    return (
        <div className="card">
            <img src={`${apiURL}/${props.post.image}`} className="card-img-top" alt="" />
            <div className="card-body">
                <h5 className="card-title">{props.post.title}</h5>
                <p className="card-text">{props.post.content}</p>
                <button className='btn btn-danger' onClick={props.onCancel}>Cancella</button>
            </div>
        </div>
    )
};

export default PostCard