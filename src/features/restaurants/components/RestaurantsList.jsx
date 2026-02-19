import React, {useEffect, useState} from "react";
import RestaurantCard from "./RestaurantCard";
import {getFilteredSortedRestaurants} from "../services/restaurantsService";
import "../restaurants.scss"

export default function RestaurantsList(){
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const pageSize = 8;
    const [searchType, setSearchType] = useState("name"); // default
    const [searchValue, setSearchValue] = useState("");

    const [filters, setFilters] = useState({
        name: "",
        mealName: ""
    });

    async function loadRestaurants(page, sortBy, filters){
        try{
            setLoading(true);
            const data = await getFilteredSortedRestaurants(page,pageSize,sortBy, filters);
            setRestaurants(data.items);
            setTotalItems(data.count);
            setHasNextPage(data.hasNextPage);
            setHasPreviousPage(data.hasPreviousPage);
        }catch(error){
            setError("Failed to load restaurants.");
        } finally{
            setLoading(false);
        }
    }

    function handleSearch() {
        const newFilters = {
            name: "",
            mealName: ""
        };

        newFilters[searchType] = searchValue;

        setFilters(newFilters);
        setPage(1);
        loadRestaurants(1, sortBy, newFilters);
    }


    function handleReset() {
        setSearchValue("");
        setSearchType("name");

        const emptyFilters = {
            name: "",
            mealName: ""
        };

        setFilters(emptyFilters);
        setPage(1);
        loadRestaurants(1, sortBy, emptyFilters);
    }


    const totalPages = Math.ceil(totalItems / pageSize);

    useEffect(() => {
        loadRestaurants(page, sortBy, filters);
    }, [page, sortBy]);

    if (loading) {
        return <div className="restaurants-page">Loading restaurants...</div>;
    }

    if (error) {
        return <div className="restaurants-page">{error}</div>;
    }

    return (
        <div className="restaurants-page">
            {/* FILTER SECTION */}
            <div className="restaurants-filters">
                <div className="restaurants-hero">
                    <h1>Restaurants</h1>
                </div>

                <div className="filter-item search-wrapper">
                    <input
                        type="text"
                        placeholder={
                            searchType === "name"
                                ? "Search restaurant..."
                                : "Search meal..."
                        }
                        value={searchValue}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchValue(value);

                            if (value.trim() === "") {
                                const emptyFilters = { name: "", mealName: "" };
                                setFilters(emptyFilters);
                                setPage(1);
                                loadRestaurants(1, sortBy, emptyFilters);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />

                    <select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <option value="name">Restaurant</option>
                        <option value="mealName">Meal</option>
                    </select>

                </div>

                {/* SORT */}
                <div className="restaurants-controls">
                    <select
                        value={sortBy}
                        onChange={(e) => {
                            setPage(1);
                            setSortBy(Number(e.target.value));
                        }}
                    >
                        <option value={0}>Name (A-Z)</option>
                        <option value={1}>Name (Z-A)</option>
                    </select>
                </div>
                </div>

            {/* GRID */}
            <div className="restaurants-grid">
                {restaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.name}
                            image={restaurant.imageUrl || "../src/core/images/placeholder.jpg"}
                            name={restaurant.name}
                            description={restaurant.description}
                            onClick={() => navigate(`/restaurants/${restaurant.name}`)}
                        />
                ))}
            </div>

            {/* PAGINATION */}
            <div className="pagination">
                <button
                    disabled={!hasPreviousPage}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>

                <button
                    disabled={!hasNextPage}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );

}