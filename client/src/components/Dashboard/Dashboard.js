import { useState, useEffect } from "react";
import { Loader, Tab, Menu } from "semantic-ui-react";
import { useHistory, useLocation, Link } from "react-router-dom";
import AllCourses from "./AllCourses";
import BoughtCourses from "./BoughtCourses";
function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { search } = useLocation();
  const tab = search.includes("1") ? 1 : 0;

  useEffect(() => {
    fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/courses26269ff.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  const handleBuyCourse = (c) => {
    history.push("/checkout", { course: c });
  };

  if (loading) {
    return <Loader active inline="centered" />;
  }

  if (!courses.length) {
    return <div>Courses Not found</div>;
  }

  const getMenuitem = (isActive, title, tab) => {
    return (
      <Menu.Item
        key={title}
        as={() => (
          <Link
            className={`item ${isActive ? "active" : ""}`}
            to={`/dashboard?tabIndex=${tab}`}
          >
            {title}
          </Link>
        )}
      />
    );
  };

  const panes = [
    {
      menuItem: getMenuitem(tab == 0, "All courses", 0),
      render: () => (
        <Tab.Pane attached={false}>
          <AllCourses courses={courses} handleBuyCourse={handleBuyCourse} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: getMenuitem(tab == 1, "My courses", 1),
      render: () => (
        <Tab.Pane attached={false}>
          <BoughtCourses courses={courses} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Tab
      activeIndex={tab}
      menu={{ secondary: true, pointing: true }}
      panes={panes}
    />
  );
}

export default Dashboard;
