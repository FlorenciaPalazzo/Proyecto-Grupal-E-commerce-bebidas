import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../redux/actions";
import AdminPanel from "../AdminPanel";

export const AdminStats = () => {
  const dispatch = useDispatch();
  const stat = useSelector((state) => state.stats);
  useEffect(() => {
    dispatch(getStats());
  }, []);
  return (
    <div>
      <AdminPanel />
      <div className="stats-cont"></div>
    </div>
  );
};
