import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, clearState } from "./UserSlice";
import { fetchProducts, productSelector } from "../Product/ProductSlice";

import { useHistory } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Dashboard = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { products } = useSelector(productSelector);
  const { isError } = useSelector(userSelector);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (products.length > 0)
      setColumnDefs(
        Object.keys(products[0]).map((k) => {
          return {
            field: k,
          };
        })
      );
  }, [products]);

  const [columnDefs, setColumnDefs] = useState([]);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      history.push("/login");
    }
  }, [isError]);

  const onLogOut = () => {
    localStorage.removeItem("token");

    history.push("/login");
  };

  return (
    <div className="container mx-auto">
      <Fragment>
        <div className="container mx-auto">Welcome</div>

        <button
          onClick={onLogOut}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Log Out
        </button>
      </Fragment>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          rowData={products}
          columnDefs={columnDefs}
          defaultColDef={{
            cellStyle: () => ({
              display: "flex",
              alignItems: "left",
              justifyContent: "left",
            }),
          }}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default Dashboard;
