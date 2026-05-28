import { useState, useEffect } from "react";

import "./App.css";

import Tabs from "./components/Tabs";
import Overview from "./components/Overview";
import Repositories from "./components/Repositories";
import Followers from "./components/Followers";

function App() {

  const [username, setUsername] =
    useState("");

  const [searchUser, setSearchUser] =
    useState("");

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("overview");

  const [repos, setRepos] =
    useState([]);

  const [followers, setFollowers] =
    useState([]);

  const [repoLoading, setRepoLoading] =
    useState(false);

  const [followersLoading,
    setFollowersLoading] =
    useState(false);

  // PROFILE FETCH

  useEffect(() => {

    if (!searchUser) return;

    const controller =
      new AbortController();

    setLoading(true);

    fetch(
      `https://api.github.com/users/${searchUser}`,
      {
        signal: controller.signal
      }
    )

      .then((res) => {

        if (!res.ok) {
          throw new Error("User not found");
        }

        return res.json();

      })

      .then((data) => {

        setProfile(data);

        setError("");

      })

      .catch((err) => {

        if (
          err.name !== "AbortError"
        ) {

          setError(err.message);

        }

      })

      .finally(() => {

        setLoading(false);

      });

    return () => {

      controller.abort();

    };

  }, [searchUser]);

  // REPOSITORIES FETCH

  useEffect(() => {

    if (
      activeTab !== "repos" ||
      !searchUser
    )
      return;

    setRepoLoading(true);

    fetch(
      `https://api.github.com/users/${searchUser}/repos`
    )

      .then((res) => res.json())

      .then((data) => {

        setRepos(data);

      })

      .finally(() => {

        setRepoLoading(false);

      });

  }, [activeTab, searchUser]);

  // FOLLOWERS FETCH

  useEffect(() => {

    if (
      activeTab !== "followers" ||
      !searchUser
    )
      return;

    setFollowersLoading(true);

    fetch(
      `https://api.github.com/users/${searchUser}/followers`
    )

      .then((res) => res.json())

      .then((data) => {

        setFollowers(data);

      })

      .finally(() => {

        setFollowersLoading(false);

      });

  }, [activeTab, searchUser]);

  // PERSISTENT SCROLL

  useEffect(() => {

    const savedScroll =
      localStorage.getItem(
        "scrollPosition"
      );

    if (savedScroll) {

      window.scrollTo(
        0,
        Number(savedScroll)
      );

    }

    const handleScroll = () => {

      localStorage.setItem(
        "scrollPosition",
        window.scrollY
      );

    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };

  }, []);

  return (

    <div className="container">

      <h1>GitHub Profile App</h1>

      {/* SEARCH */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <button
          onClick={() =>
            setSearchUser(username)
          }
        >
          Search
        </button>

      </div>

      {/* LOADING */}

      {loading && <h2>Loading...</h2>}

      {/* ERROR */}

      {error && <h2>{error}</h2>}

      {/* PROFILE */}

      {profile && (

        <div className="profile-card">

          <img
            src={profile.avatar_url}
            alt="profile"
            width="150"
          />

          <h2>{profile.name}</h2>

          <p>{profile.bio}</p>

          <p>
            Followers:
            {profile.followers}
          </p>

          <p>
            Repositories:
            {profile.public_repos}
          </p>

        </div>

      )}

      {/* TABS */}

      {profile && (

        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

      )}

      {/* OVERVIEW */}

      {activeTab === "overview"
        && profile && (

          <Overview profile={profile} />

      )}

      {/* REPOSITORIES */}

      {activeTab === "repos" && (

        <div>

          {repoLoading ? (

            <h2>
              Loading Repositories...
            </h2>

          ) : (

            <Repositories repos={repos} />

          )}

        </div>

      )}

      {/* FOLLOWERS */}

      {activeTab === "followers" && (

        <div>

          {followersLoading ? (

            <h2>
              Loading Followers...
            </h2>

          ) : (

            <Followers followers={followers} />

          )}

        </div>

      )}

    </div>

  );

}

export default App;