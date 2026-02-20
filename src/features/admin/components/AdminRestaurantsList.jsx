import React, {useState, useEffect} from 'react';
import {deleteRestaurant, fetchRestaurants} from "../../restaurants/services/restaurantsService";
import '../administrator.scss'

export default function AdminRestaurantsList() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);

    const [pageSize, setPageSize] = useState(10);

    async function loadRestaurants(){
        try {
            setLoading(true);
            const data = await fetchRestaurants(page, pageSize);
            setRestaurants(data.items);
            setTotalItems(data.count);
            setHasNextPage(data.hasNextPage);
            setHasPreviousPage(data.hasPreviousPage);
        }catch(error){
            setError("Failed to load restaurants.");
        }finally {
            setLoading(false);
        }
    }

    useEffect(() =>{
         loadRestaurants();
    },[page, pageSize]);

    const totalPages = Math.ceil(totalItems / pageSize);

    const handleNextPage = () => {
        if (hasNextPage) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (hasPreviousPage) {
            setPage(prevPage => prevPage - 1);
        }
    };

    async function handleDelete(id){
        try {
            await deleteRestaurant(id);
            loadRestaurants();
        } catch (error) {
            setError("Failed to delete restaurant.");
        }
    }

    if (loading) {
        return <div className="restaurants-list">Loading publishers...</div>;
    }

    if (error) {
        return <div className="restaurants-list">{error}</div>;
    }

    return (
        <div className="restaurants-list">
            <h1>
                Restaurants list
            </h1>
            <div className="restaurants-list-container">
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Owner</th>
                    </tr>
                    </thead>
                    <tbody>
                    {restaurants.map((restaurant) =>(
                        <tr key={restaurant.name}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.description}</td>
                            <td>{restaurant.ownerUserName}</td>
                            <td><button onClick={()=>{
                                handleDelete(restaurant.id);
                            }}>Delete</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button
                        onClick={handlePreviousPage}
                        disabled={!hasPreviousPage || loading}
                    >
                        Previous
                    </button>

                    <span>
         Page {page} of {totalPages} (Total: {totalItems} restaurants)
       </span>
                    <button
                        onClick={handleNextPage}
                        disabled={!hasNextPage || loading}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )

}