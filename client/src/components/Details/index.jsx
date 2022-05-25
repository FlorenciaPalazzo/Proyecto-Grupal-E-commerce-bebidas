import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Detail() {
    const dispatch = useDispatch();
    const { id } = useParams();

    // useEffect(() => {
    //     dispatch
    // })
}