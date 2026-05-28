function Repositories({ repos }) {

  return (

    <div className="card">

      <h2>Repositories</h2>

      {repos.map((repo) => (

        <div
          key={repo.id}
          className="repo-card"
        >

          <h3>{repo.name}</h3>

          <p>
            Language:
            {repo.language}
          </p>

          <p>
            ⭐ Stars:
            {repo.stargazers_count}
          </p>

        </div>

      ))}

    </div>

  );

}

export default Repositories;