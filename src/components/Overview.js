function Overview({ profile }) {

  return (

    <div className="card">

      <h2>Overview</h2>

      <p>
        Name:
        {profile.name}
      </p>

      <p>
        Bio:
        {profile.bio}
      </p>

      <p>
        Location:
        {profile.location}
      </p>

      <p>
        Company:
        {profile.company}
      </p>

    </div>

  );

}

export default Overview;