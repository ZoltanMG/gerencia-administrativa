import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadCategories } from "../../redux/configSlice";
import './nav.css';
import { getConfigSheet } from "../../utils/getConfigSheet";

function Nav() {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.config);

    useEffect(() => {
            getConfigSheet().then((data) => {
                dispatch(loadCategories(data));
            })
        }, [dispatch]);
    console.log("nav");
    
    return (
        <nav>
            {Object.entries(categories).map(([key, value]) => (
                <Link
                    key={key}
                    className="link-navbar"
                    to={value.path !== 'contratos' ? '/' : `/${value.path}`}
                >
                    {value.categoryName}
                </Link>
            ))
            }
        </nav>
    );
}

export default Nav;
