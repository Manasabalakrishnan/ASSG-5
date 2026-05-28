function Followers({ followers }) {

  return (

    <div className="card">

      <h2>Followers</h2>

      {followers.map((follower) => (

        <div
          key={follower.id}
          className="follower-card"
        >

          <img
            src={follower.avatar_url}
            alt=""
            width="60"
          />

          <p>{follower.login}</p>

        </div>

      ))}

    </div>

  );

}

export default Followers;