import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "antd";

function App() {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/students?page=${page}&pageSize=${pageSize}`
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [update]);
  const submitHandler = (e) => {
    e.preventDefault();
    setUpdate(!update);
    toast.success("Successfully filter");
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Marks",
      dataIndex: "total_marks",
      key: "total_marks",
    },
  ];

  return (
    <div>
      <ToastContainer />
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Kinara Capital
          </a>
          <a >
            Muklasar Rahaman
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="row mt-5 gap-5">
          <div className="col-2 border p-4">
            <p>Total Count: {data?.totalCount}</p>
            <p>Total Pages: {data?.totalPages}</p>
            <p>Current Page: {data?.currentPage}</p>
            <p>Page Size: {data?.pageSize}</p>
          </div>
          <div className="col-4 border p-3 border-rounded">
            <Table dataSource={data?.data} columns={columns}  pagination={{
      pageSize: 5,
    }} />
            {/* <table class="table">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    Id
                  </th>
                  <th scope="col" className="text-center">
                    Name
                  </th>
                  <th scope="col" className="text-center">
                    Total Marks
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((student) => (
                  <tr>
                    <th scope="row" className="text-center">
                      {student.id}
                    </th>
                    <td className="text-center">{student.name}</td>
                    <td className="text-center">{student.total_marks}</td>
                  </tr>
                ))}
              </tbody>
            </table> */}
          </div>
          <div className="col-3 border p-3">
            <p className="text-bold fs-5">Filter</p>
            <form onSubmit={submitHandler}>
              <div class="mb-3 mt-3 ">
                <label for="exampleInputEmail1" class="form-label">
                  Page Number
                </label>
                <div className="d-flex align-items-center justify-content-center">
                  <input
                    type="Number"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={page}
                    name="page"
                    onChange={(e) => setPage(e.target.value)}
                  />
                  <button class="btn border outline-none border-none">
                    filter
                  </button>
                </div>
              </div>
            </form>
            <form onSubmit={submitHandler}>
              <div class="mb-3 mt-3 ">
                <label for="exampleInputEmail1" class="form-label">
                  Page Size
                </label>
                <div className="d-flex align-items-center justify-content-center">
                  <input
                    type="Number"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={pageSize}
                    name="pageSize"
                    onChange={(e) => setPageSize(e.target.value)}
                  />
                  <button class="btn border outline-none border-none">
                    filter
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
