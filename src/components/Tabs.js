function Tabs({
  activeTab,
  setActiveTab
}) {

  return (

    <div className="tabs">

      <button
        className={
          activeTab === "overview"
            ? "active"
            : ""
        }
        onClick={() =>
          setActiveTab("overview")
        }
      >
        Overview
      </button>

      <button
        className={
          activeTab === "repos"
            ? "active"
            : ""
        }
        onClick={() =>
          setActiveTab("repos")
        }
      >
        Repositories
      </button>

      <button
        className={
          activeTab === "followers"
            ? "active"
            : ""
        }
        onClick={() =>
          setActiveTab("followers")
        }
      >
        Followers
      </button>

    </div>

  );

}

export default Tabs;